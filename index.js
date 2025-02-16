import dotenv from "dotenv";
import fs from "fs";
import OpenAI from "openai";
import path from "path";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate Story-Based Topic
const generateStoryTopic = async (userTopic) => {
  const prompt = `
  Convert the custom topic '${userTopic}' into an **engaging and thought-provoking narrative**.
  - Make it **relatable** to professionals and decision-makers.
  - Incorporate **emotional engagement** by creating urgency or intrigue.
  - Structure the story to **spark discussion** and **drive curiosity**.
  - Ensure it has a **human-centric perspective** that appeals to a wide audience.
  `;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an expert in crafting viral, high-impact LinkedIn stories that generate engagement.",
        },
        { role: "user", content: prompt },
      ],
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating story topic:", error);
    return "Error generating story topic.";
  }
};

// Generate LinkedIn Post
const generateLinkedInPost = async (storyTopic) => {
  const prompt = `
  Generate a **viral LinkedIn post** based on the topic: "${storyTopic}".

  ### **Step 1: Create an Engaging Story-Based Hook**
  - Avoid **restating the topic directly**.
  - Use a **powerful question, bold statement, or surprising stat** to grab attention.
  - Ensure the hook is **emotionally compelling** (shock, excitement, curiosity).

  ### **Step 2: Build Engagement Through Relatable Insights**
  - Write in **short, impactful sentences** (under 60 characters each).
  - Use **list formats, personal anecdotes, and relevant statistics**.
  - Add **spacing between each paragraph** for readability.
  - Incorporate **3-5 high-impact hashtags** to maximize reach.
  - End with a **clear and compelling call-to-action (CTA)** (e.g., "What do you think?" or "Share your thoughts below!").

  ### **Step 3: Optimize the Post for Maximum Engagement**
  - Keep the language **natural, conversational, and free of jargon**.
  - Maintain a professional yet **approachable and human tone**.
  - Ensure that every generated post is **unique in structure and storytelling**.
  - Follow **LinkedIn's best practices** for viral content.
  `;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a LinkedIn content specialist, generating high-impact, viral posts that drive engagement.",
        },
        { role: "user", content: prompt },
      ],
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating LinkedIn post:", error);
  }
};

// Main Function
const main = async () => {
  // Create output directory if it doesn't exist
  const outputDir = path.join(process.cwd(), "output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const userTopic = "Remote working is turning cities into ghost cities.";
  const storyTopic = await generateStoryTopic(userTopic);
  const linkedinPost = await generateLinkedInPost(storyTopic);

  const timestamp = new Date().toISOString().replace(/:/g, "-");
  const filename = path.join(outputDir, `${timestamp}.md`);
  const markdownContent = `# LinkedIn Post Analysis

## Generated Story Topic
${storyTopic}

## Generated Post
${linkedinPost}

*Generated on: ${new Date().toISOString()}*
`;

  fs.writeFileSync(filename, markdownContent, "utf-8");
  console.log(`\n✅ Post saved to '${filename}'`);
};

main();
