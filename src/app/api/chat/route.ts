import { NextRequest, NextResponse } from "next/server";
import { GenerateContentParameters, GoogleGenAI, Part } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const POST = async (req: NextRequest) => {
  try {
    const { prompt, videoUrl, history } = await req.json();

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const contents: { role: "user" | "model"; parts: Part[] }[] = [...history];
    contents.push({
      role: "user",
      parts: [
        { text: prompt },
        ...(videoUrl
          ? [
              {
                fileData: {
                  mimeType: "video/mp4",
                  fileUri: videoUrl,
                },
              },
            ]
          : []),
      ],
    });

    const request: GenerateContentParameters = {
      model: "gemini-2.0-flash",
      contents: contents,
    };
    const result = await ai.models.generateContent(request);
    console.log("Result: " + result);
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log(text);

    if (!text) {
      return NextResponse.json(
        { error: "No response from model" },
        { status: 500 },
      );
    }

    return NextResponse.json({ text });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
