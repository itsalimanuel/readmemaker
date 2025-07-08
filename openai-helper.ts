import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getReadmeFromOpenAI(prompt: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    temperature: 0.3,
    messages: [{ role: "user", content: prompt }],
  });

  return (
    response.choices[0]?.message?.content || "# README\nSomething went wrong."
  );
}
