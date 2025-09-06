
import { GoogleGenAI } from "@google/genai";

// Access the API key from Vite's environment variables
const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  console.error("VITE_API_KEY environment variable not set. Please create a .env file in the project root.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const analyzeSymptoms = async (symptoms: string): Promise<string> => {
  if (!API_KEY) {
    return "API Key is not configured. Please contact support.";
  }
  
  try {
    const prompt = `
      You are a helpful AI medical assistant for a telemedicine app serving rural India. Your goal is to provide preliminary guidance based on user-described symptoms. You must be cautious and always prioritize user safety.

      Analyze the following symptoms described by the user.

      User Symptoms: "${symptoms}"

      Based on these symptoms, provide the following information in a clear, simple, and easy-to-understand format using markdown for structure:

      ### Possible Conditions
      List 2-3 potential, common conditions that might be associated with these symptoms. Use simple language.

      ### Recommended Specialist
      Suggest the type of doctor the user should consult (e.g., General Physician, Cardiologist, Dermatologist).

      ### Next Steps
      Advise the user on immediate next steps they can take.

      ### **Crucial Disclaimer**
      You MUST include the following disclaimer at the end, exactly as written: "**IMPORTANT**: This is an AI-powered analysis and not a medical diagnosis. Please consult a qualified doctor for accurate diagnosis and treatment. Do not ignore professional medical advice because of this information."

      Keep your entire response concise and clear, suitable for someone with low health literacy. Do not use complex medical jargon.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    return "Sorry, I couldn't process your request at the moment. Please try again later.";
  }
};
