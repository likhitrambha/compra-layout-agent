import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI;

export async function callLLM(
  systemPrompt,
  history,
  userMessage,
  currentLayout
) {
  // MOCK MODE
  if (process.env.MOCK_MODE === 'true') {
    return {
      explanation: `Mock mode enabled. Processed instruction: ${userMessage}`,
      updatedLayout: currentLayout,
    };
  }

  if (
    !process.env.GEMINI_API_KEY ||
    process.env.GEMINI_API_KEY === 'your_key_here'
  ) {
    throw new Error(
      'Gemini API Key is missing. Please set GEMINI_API_KEY in server/.env'
    );
  }

  // Initialize Gemini client
  if (!genAI) {
    genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );
  }

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: systemPrompt,
  });

  // Format history
  const formattedHistory = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }));

  const chat = model.startChat({
    history: formattedHistory,
  });

  const result = await chat.sendMessage(userMessage);
  const text = result.response.text();

  try {
    const jsonStr = text
      .replace(/```json\\n?/g, '')
      .replace(/\\n?```/g, '')
      .trim();

    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Failed to parse Gemini response:', text);
    throw new Error('LLM returned invalid JSON structure.');
  }
}