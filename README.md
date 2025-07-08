# 📘 readmemaker

> Automatically generate beautiful, professional README.md files for your projects using OpenAI.
> Works with Bun, Next.js, Node.js, and any monorepo/project structure.

---

## ✨ Features

- 📦 Analyzes your project structure (`app/`, `lib/`, `prisma/`, etc.)
- 🧠 Uses OpenAI to generate a clean, context-aware README
- 📂 Visualizes your file tree
- 📜 Includes scripts, technologies, and notable files
- 🎛 Supports custom `template.md`
- 🐇 Built on [Bun](https://bun.sh) — super fast!

---

## 🚀 Getting Started

### 1. Install globally

```bash
bun add -g @itsalik/readmemaker
```

or clone locally for development:

```bash
git clone https://github.com/itsalik/readmemaker.git
cd readmemaker
bun install
bun link
```

### 2. Add your OpenAI key

Create a `.env` file in the root of your project:

```
OPENAI_API_KEY=sk-xxxxxxx
```

### 3. Run the tool

Navigate into any project directory:

```bash
cd my-nextjs-project
readmemaker
```

A fully formatted `README.md` will be generated in that folder 🎉

---

## 🧪 Example Output

```md
# my-nextjs-project

> A modern web application with dynamic pages, Telegram integration, and user search.

## 📦 Project Overview

This app enables users to upload images, search profiles, and interact through API endpoints.

## 📂 File Structure

app/
├── layout.tsx
├── page.tsx
├── api/
│   └── users/
lib/
├── auth.ts
prisma/
├── schema.prisma

## 📜 Scripts

- \`dev\`: Start dev server
- \`build\`: Generate Prisma client + build
- \`start\`: Start production server

...
```

---

## 📄 Customization

Want to use your own format?

Create a `template.md` file in your project root.

Example placeholders supported:
- `{{projectName}}`
- `{{tagline}}`
- `{{fileTree}}`
- `{{scripts}}`
- `{{features}}`
- etc.

---

## 📬 Contributing

Pull requests and issues are welcome! Feel free to fork and suggest improvements or file bugs.

---

## 📄 License

MIT © 2025 [Ali Manuel](https://github.com/itsalimanuel)
