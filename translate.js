// translate.js in the api folder
const axios = require('axios');

module.exports = async (req, res) => {
    const { q, langpair } = req.query;
    const mymemoryBaseURL = 'https://api.mymemory.translated.net/get';
    const apiKey = '8f0aec1d9fb2c8a3d879'; // Replace with your actual API key

    if (!q || !langpair) {
        return res.status(400).json({ responseStatus: 400, error: 'Missing required parameters' });
    }

    try {
        const response = await axios.get(`${mymemoryBaseURL}?q=${encodeURIComponent(q)}&langpair=${langpair}&key=${apiKey}`);
        const translatedText = response.data.responseData.translatedText;

        res.json({
            responseStatus: 200,
            responseData: {
                translatedText: translatedText,
            },
        });
    } catch (error) {
        console.error('Translation error:', error.message);
        res.status(500).json({
            responseStatus: 500,
            error: 'Translation failed. Please try again.',
        });
    }
};
