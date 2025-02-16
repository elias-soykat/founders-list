import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createChatCompletion = async (prompt, systemRole) => {
  try {
    const response = await client.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: [
        {
          role: "system",
          content: systemRole,
        },
        { role: "user", content: prompt },
      ],
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error in chat completion:", error);
  }
};
