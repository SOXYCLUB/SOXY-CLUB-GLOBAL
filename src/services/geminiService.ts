import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  // @ts-ignore
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const streamGeminiResponse = async (
  history: { role: string; text: string }[],
  newMessage: string,
  onChunk: (text: string) => void
) => {
  const client = getClient();
  if (!client) {
    onChunk("I apologize, but I am currently offline. (Missing API Key)");
    return;
  }

  try {
    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are the "Soxy Comfort Specialist", a warm, polite, and helpful customer support assistant for SOXY (www.soxyclub.com). 
        
        Brand Tone:
        - Warm, homey, and comforting (like oatmeal and morning sunlight).
        - Professional but approachable.
        - Emphasize "Simplicity", "Comfort", and "No Odor/No Pilling".
        
        Context:
        - SOXY is now a global brand shipping worldwide.
        - Primary currency is USD for international customers, but you can convert approx to MYR/SGD if asked.
        
        Your Goal:
        - Help users choose subscription plans (Men, Women, Couple/Family).
        - Explain the benefits: Premium cotton, breathable, automatic seasonal renewal.
        - Answer questions about international shipping (We ship globally!).
        - If asked about the "Couple Bundle", mention they save 20%.
        - Keep answers concise and helpful.
        
        Do not make up pricing that isn't provided (just say affordable subscription starting from $15/month).`,
      },
      history: history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
    });

    const result = await chat.sendMessageStream({ message: newMessage });

    for await (const chunk of result) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    onChunk("\n(I seem to be having trouble connecting to the comfort cloud. Please try again later.)");
  }
};