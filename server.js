const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

// API endpoint to handle translation
app.get('/translate', async (req, res) => {
    const { q, langpair } = req.query;
    const mymemoryBaseURL = 'https://api.mymemory.translated.net/get';
    const apiKey = '8f0aec1d9fb2c8a3d879'; // Your API key

    if (!q || !langpair) {
        return res.status(400).json({ responseStatus: 400, error: 'Missing required parameters' });
    }

    try {
        // Add the API key as a parameter in the request
        const response = await axios.get(`${mymemoryBaseURL}?q=${encodeURIComponent(q)}&langpair=${langpair}&key=${8f0aec1d9fb2c8a3d879}`);
        const translatedText = response.data.responseData.translatedText;

        res.json({
            responseStatus: 200,
            responseData: {
                translatedText: translatedText
            }
        });
    } catch (error) {
        console.error('Translation error:', error.message);
        res.status(500).json({
            responseStatus: 500,
            error: 'Translation failed. Please try again.'
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
