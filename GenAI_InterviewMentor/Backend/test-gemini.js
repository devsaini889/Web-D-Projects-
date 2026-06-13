require("dotenv").config()
const { GoogleGenAI } = require("@google/genai")

const apiKey = process.env.GOOGLE_GENAI_API_KEY

const ai = new GoogleGenAI({
    apiKey: apiKey
})

async function testGeminiConnection() {
    try {
        console.log("Testing Gemini API connection...")
        console.log("Using API Key: " + (apiKey ? `Present (starts with "${apiKey.substring(0, 7)}...")` : "NOT FOUND"))

        if (!apiKey || apiKey === "your_google_genai_api_key_here") {
            console.log("\n[WARNING] You have not replaced the default placeholder key in Backend/.env with your actual Gemini API key.")
            return
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Hi! Reply with 'Gemini is connected successfully!' if you receive this message."
        })

        console.log("\n[SUCCESS] Response from Gemini:")
        console.log(response.text)

    } catch (err) {
        console.error("\n[ERROR] Failed to connect to Gemini API:")
        console.error(err.message || err)
    }
}

testGeminiConnection()
