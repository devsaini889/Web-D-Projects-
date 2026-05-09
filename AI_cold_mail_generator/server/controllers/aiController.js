import axios from 'axios';
import EmailHistory from '../models/emailHistory.js';

export const generateEmail = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required' });
    }

    // Validate prompt length
    if (prompt.trim().length < 10) {
        return res.status(400).json({ message: 'Prompt must be at least 10 characters' });
    }

    if (prompt.length > 2000) {
        return res.status(400).json({ message: 'Prompt cannot exceed 2000 characters' });
    }

    // Check if API key is configured
    if (!process.env.GROQ_API_KEY) {
        return res.status(500).json({ message: 'Server configuration error: API key not set' });
    }

    try {
        const systemPrompt = `You are an expert cold email copywriter. 
Generate a professional cold email based on the user prompt.
Return ONLY valid JSON in this exact format:
{
  "subject": "...",
  "emailbody": "...",
  "linkedInDM": "...",
  "followUpEmail": "..."
}`;

        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: prompt }
            ],
            max_tokens: 1200,
            temperature: 0.7,
            response_format: { type: "json_object" }
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            timeout: 30000
        });

        const aiResponse = response.data.choices[0].message.content;
        const parsed = JSON.parse(aiResponse);

        const { subject, emailbody, linkedInDM, followUpEmail } = parsed;

        // Validate response
        if (!subject || !emailbody || !linkedInDM || !followUpEmail) {
            return res.status(500).json({ message: 'Invalid AI response format' });
        }

        const emailHistory = new EmailHistory({
            user: req.user._id,
            prompt,
            subject,
            emailbody,
            linkedInDM,
            followUpEmail
        });

        await emailHistory.save();

        res.status(200).json({ subject, emailbody, linkedInDM, followUpEmail });

    } catch (error) {
        console.error('Error generating email:', error.response?.data || error.message);
        
        if (error.response?.status === 413 || error.message?.includes('tokens')) {
            return res.status(400).json({ message: 'Request too large. Please shorten your prompt.' });
        }

        if (error.code === 'ECONNABORTED') {
            return res.status(504).json({ message: 'Request timeout. Please try again.' });
        }

        res.status(500).json({ 
            message: 'Failed to generate email', 
            error: error.message 
        });
    }
};

// Get Email History
export const getEmailHistory = async (req, res) => {
    try {
        const history = await EmailHistory.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .limit(20);   // Limit to latest 20 emails

        res.status(200).json(history);
    } catch (error) {
        console.error('Error fetching email history:', error.message);
        res.status(500).json({ 
            message: 'Failed to fetch email history', 
            error: error.message 
        });
    }
};