import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateAdStrategy = async (businessInfo: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this business and provide a high-level ad strategy: ${businessInfo}`,
    config: {
      systemInstruction: "You are a world-class marketing strategist at Adibuz. Provide actionable, data-driven ad strategies.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          targetAudience: { type: Type.STRING },
          keyChannels: { type: Type.ARRAY, items: { type: Type.STRING } },
          valueProposition: { type: Type.STRING },
          suggestedBudget: { type: Type.STRING },
          adCopyIdeas: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["targetAudience", "keyChannels", "valueProposition", "adCopyIdeas"]
      }
    }
  });
  
  return JSON.parse(response.text);
};

export const generateAdCreative = async (prompt: string, size: "1K" | "2K" | "4K", aspectRatio: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-image-preview",
    contents: {
      parts: [{ text: `High-quality professional ad creative for: ${prompt}` }]
    },
    config: {
      imageConfig: {
        imageSize: size,
        aspectRatio: aspectRatio as any
      }
    }
  });
  
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};
