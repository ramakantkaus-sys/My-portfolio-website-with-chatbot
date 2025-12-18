export const handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const SYSTEM_PROMPT = `You are the professional AI assistant for Ramakant Kaushik.
You are deployed on his personal portfolio website.

You represent Ramakant as a capable, thoughtful, and technically grounded
AI and Data Science professional.

Core profile:
- Name: Ramakant Kaushik
- Age: 22
- Education: B.Sc. (Physics, Chemistry, Mathematics)
- Academic performance: 90% in Class 10, 91% in Class 12
- Strong analytical foundation from pure science background
- Transitioned into AI and Data Science by deliberate choice

Professional training:
- Completed a Data Science professional course from private institutes
  based in Gurugram and Noida
- Training focused on practical, industry-oriented skills rather than
  purely academic learning

Professional experience:
- Data Science Intern at AAM Infotech Pvt. Ltd.
- Research Associate at Keywords Studios (2025–present)
- Worked on training and evaluating advanced AI agents using internal tools
- Maintained ~90–92% evaluation accuracy
- Specific project details at Keywords Studios are restricted due to NDA

Core strengths:
- Machine Learning and Data Science
- Generative AI and LLM-based systems
- Retrieval-Augmented Generation (RAG)
- Model evaluation and analytical reasoning
- Strong problem-solving mindset
- Interest in AI psychology and human behavior

Key projects:
- CineMatch: Smart movie recommendation system built on a 5,000-movie dataset
- YouTube Transcript RAG Chatbot: Summarizes videos and provides Q&A using captions
- Chronic Disease Risk Prediction System: Decision-tree-based model using 16–17 parameters
  (age, gender, income, habits, family history, etc.) to estimate risk
- Emotion Detector: Multimodal emotion detection (text, voice, facial cues)
- Student Performance Analytics Dashboard
- Power BI data analysis projects
- Database management and SQL-based projects

Behavior rules:
- Keep answers strictly under 3–4 short sentences.
- Use simple, direct language.
- No long explanations.
- No bullet lists unless explicitly asked.
- If the answer gets long, summarize it.
- Do not exaggerate or fabricate information.
- Maintain calm confidence.

Your goal is to accurately represent Ramakant’s skills,
projects, and thinking to recruiters, but STRICTLY be concise.`;

    try {
        const body = JSON.parse(event.body);
        const userMessage = body.message;

        if (!userMessage) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Message is required" }),
            };
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.error("OPENAI_API_KEY is not set");
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Server configuration error" }),
            };
        }

        // --- RAG INTEGRATION POINT ---
        // If you want to add RAG (Retrieval Augmented Generation) in the future:
        // 1. Receive the userMessage.
        // 2. Embed the message using OpenAI headers.
        // 3. Query your Pinecone/Supabase vector DB.
        // 4. Append context to the SYSTEM_PROMPT or user message below.

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    // We don't accept full history from client to keep it simple and stateless as requested,
                    // but for a better chat experience we might want strictly 1-turn or limited context.
                    // The requirements said "Does not store conversation history long-term", implying short-term session state might be okay on client.
                    // However, to keep backend simple and strictly follow "Accepts POST... {message} ... Injects SYSTEM_PROMPT... Sends user message",
                    // I will send just System + User message. This effectively makes it memory-less per request if I don't implement history handling.
                    // Given constraints "The chatbot must be fast, minimal", single turn is safest. 
                    // But usually chatbots need thread history.
                    // I'll check if the client sends history or just message.
                    // The instructions say: "Accepts POST requests with JSON body: { "message": "..." }".
                    // This implies NO history is sent from client to server in the request body, just the latest message.
                    // So I will only send System + User Message. The bot won't remember previous context.
                    // If the user wants history, they would need to send `messages: [...]`.
                    // I will stick to the STRICT requirement: `{ "message": "..." }` in input.
                    { role: "user", content: userMessage },
                ],
                max_tokens: 300,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("OpenAI API Error:", errorText);
            throw new Error(`OpenAI API responded with ${response.status}`);
        }

        const data = await response.json();
        const reply = data.choices[0].message.content;

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ reply }),
        };
    } catch (error) {
        console.error("Error processing request:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to process request" }),
        };
    }
};
