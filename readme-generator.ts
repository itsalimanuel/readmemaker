import fs from "fs";
import path from "path";
import tree from "tree-node-cli";
import ora from "ora";
import chalk from "chalk";
import { getReadmeFromOpenAI } from "./openai-helper";

export async function generateReadme() {
  const spinner = ora();

  spinner.text = chalk.cyan("✨ Bootstrapping readmemaker...");
  spinner.start();
  await delay(500);
  spinner.succeed(chalk.green("🚀 CLI Started"));

  spinner.start("📦 Reading package.json...");
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  await delay(300);
  spinner.succeed(chalk.green("📦 Loaded package.json"));

  spinner.start("📑 Loading template.md...");
  const template = fs.readFileSync(
    path.join(import.meta.dir || __dirname, "template.md"),
    "utf-8",
  );
  await delay(300);
  spinner.succeed(chalk.green("📑 Template loaded"));

  spinner.start("📂 Scanning project files...");
  const files = getFiles("./", ["node_modules", ".git", ".next", "dist"]);
  await delay(400);
  spinner.succeed(chalk.green("📂 Project files scanned"));

  spinner.start("🧠 Talking to OpenAI...");
  const context = {
    projectName: pkg.name,
    tagline: pkg.description || "A modern app built with Bun and Next.js",
    overview:
      "This project uses Next.js and modern tooling to build a web application.",
    features: "- Feature 1\n- Feature 2\n- Feature 3",
    fileTree: formatFileTree("./"),
    scripts: formatScripts(pkg.scripts),
    notableFiles: listNotableFiles(files),
    technologies: detectTech(pkg),
  };
  const prompt = `
  You are an expert open source README.md writer. Using the Markdown template and context below, generate a professional README.md.

  ⚠️ Important:
  - Do not ignore the file tree. It must appear under "📂 File Structure".
  - Base features and overview on the folders and files seen.
  - Respect the structure exactly, including "app/","pages/" ,"src/", "lib/", and "prisma/".

  ---

  ${fillTemplate(template, context)}
  `;
  const markdown = await getReadmeFromOpenAI(prompt);
  await delay(500);
  spinner.succeed(chalk.green("🤖 OpenAI response received"));

  spinner.start("📝 Writing README.md...");
  fs.writeFileSync("README.md", markdown);
  await delay(300);
  spinner.succeed(chalk.green("📝 README.md generated"));

  console.log(
    chalk.bold.green("\n🎉 All done! Your shiny new README.md is ready."),
  );
}

function getFiles(dir: string, ignore: string[] = []): string[] {
  let results: string[] = [];
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    if (ignore.includes(file)) continue;
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(filePath, ignore));
    } else {
      results.push(filePath);
    }
  }
  return results;
}

function formatScripts(scripts: Record<string, string>) {
  return Object.entries(scripts || {})
    .map(([k, v]) => `- \`${k}\`: ${v}`)
    .join("\n");
}

function listNotableFiles(files: string[]) {
  const notables = files.filter((f) =>
    /(schema\.prisma|postcss|bunfig|\.env|favicon|layout|globals\.css)/.test(f),
  );
  return notables.map((f) => `- \`${f}\``).join("\n");
}

function detectTech(pkg: any) {
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  const keys = Object.keys(deps || {});
  const techs = ["next", "prisma", "bun", "tailwindcss", "openai"];
  return techs
    .filter((t) => keys.includes(t))
    .map((t) => `- ${t}`)
    .join("\n");
}

function formatFileTree(root: string): string {
  return tree(root, {
    maxDepth: 2,
    allFiles: true,
    exclude: [
      /node_modules/,
      /\.git/,
      /\.next/,
      /dist/,
      /bun.lock/,
      /README\.md/,
    ],
  });
}

function fillTemplate(template: string, values: Record<string, string>) {
  return template.replace(/{{(.*?)}}/g, (_, key) => values[key.trim()] || "");
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
