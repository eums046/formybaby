const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Lingva Translate server URL (replace with your Lingva instance URL if self-hosted)
const lingvaBaseURL = 'https://lingva.ml'; // Public Lingva instance

// Endpoint to handle translation
app.post('/translate', async (req, res) => {
    const { text, fromLang, toLang } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({
            success: false,
            error: 'Please provide text to translate',
        });
    }

    try {
        const response = await axios.get(`${lingvaBaseURL}/api/v1/${fromLang}/${toLang}/${encodeURIComponent(text)}`);
        const translatedText = response.data.translation;

        res.json({
            success: true,
            originalText: text,
            translatedText,
        });
    } catch (error) {
        console.error('Translation error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Translation failed. Please try again.',
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
