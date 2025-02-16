import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { createChatCompletion } from "./utils/ai.js";
dotenv.config();

// Generate Story-Based Topic
const generateStoryTopic = async (topicName) => {
  const prompt = `
  "Take the topic name: '${topicName}' and generate a compelling, engaging, and thought-provoking **topic story**.  

  📌 **Guidelines:**  
  - The story should be **concise yet powerful**.  
  - Present the **real-world impact** of the topic with **clear, digestible insights**.  
  - Use a **structured flow**, starting with **a bold opening statement**, followed by key effects, and ending with a sense of urgency.  
  - Make the story **emotionally resonant**—evoke curiosity, concern, or action.  
  - Avoid technical jargon—keep it **relatable and engaging**.  
  - Ensure that **every generated story is unique and fresh**."  
  `;

  return createChatCompletion(
    prompt,
    "You are an expert in crafting viral, high-impact LinkedIn stories that help to create a linkedin post."
  );
};

// Generate LinkedIn Post
const generateLinkedInPost = async (topicStory) => {
  const prompt = `
 "Write a high-impact, viral LinkedIn post based on the topic story: '${topicStory}'  

  📌 **Formatting & Readability:**  
  - Short, crisp sentences (**under 60 characters**).  
  - Use **bullet points** for clarity and easy skimming.  
  - Maintain **world-class formatting** with **spaced-out paragraphs**.  

  🎯 **Engagement & Virality:**  
  - Start with a **bold, attention-grabbing hook**.  
  - Use **strong visuals in words** (e.g., 'Empty streets. Silent cafes.').  
  - Highlight **key pain points and insights** in a punchy style.  
  - Keep the **language conversational, yet professional**.  

  🚀 **Best Practices:**  
  - Avoid AI jargon or robotic phrases.  
  - Ensure every post is **unique, engaging, and discussion-worthy**.  
  - End with a **strong call to action (CTA)**, encouraging interaction.  
  - Add **3-5 relevant hashtags** to maximize visibility.  

💡 **Generate a fresh, distinct post every time this prompt is run.**"  
  `;

  return createChatCompletion(
    prompt,
    "You are a LinkedIn content specialist, generating high-impact, viral posts that drive engagement."
  );
};

// Main Function
const main = async () => {
  const outputDir = path.join(process.cwd(), "output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const userTopic = "The Urban Shift: How Remote Work is Reshaping Cities.";
  const storyTopic = await generateStoryTopic(userTopic);
  const linkedinPost = await generateLinkedInPost(storyTopic);

  const timestamp = new Date().toISOString().replace(/:/g, "-");
  const filename = path.join(outputDir, `${timestamp}.md`);
  const markdownContent = `

## Generated Story Topic
${storyTopic}

## Generated Post
${linkedinPost}

`;

  fs.writeFileSync(filename, markdownContent, "utf-8");
  console.log(`\n✅ Post saved to '${filename}'`);
};

main();
