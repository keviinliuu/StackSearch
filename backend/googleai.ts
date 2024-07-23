import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const API_KEY = process.env.GOOGLEAI_API_KEY ?? '';
const client = new GoogleGenerativeAI(API_KEY);

export async function summarizePost(answer: string, question: string): Promise<string> {
    const parseWithGenerativeAI = async (question: string, answer: string) => {
        try {
            const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
    
            const prompt = `Summarize the following StackOverflow post:

                            Question: ${question}

                            Answer: ${answer}

                            Provide a concise summary of what the question is asking and what the answer is saying.`;
        
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
    
            return text;
        } catch (error) {
            console.error("Error parsing with Generative AI API:", error);
            return `Question: ${question}\nAnswer: ${answer}`;
        }
    };
    
    const parsedBody = await parseWithGenerativeAI(question, answer);
    return parsedBody;
}
