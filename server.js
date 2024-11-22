// Import the required packages
const express = require('express');
const translate = require('@vitalets/google-translate-api');  // Updated package

const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

// Enable CORS for all origins (this is for testing, restrict in production)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to handle translation requests
app.post('/translate', (req, res) => {
    const { text, fromLang, toLang } = req.body;

    // Ensure the required parameters are provided
    if (!text || !fromLang || !toLang) {
        return res.status(400).json({ error: 'Missing text, fromLang, or toLang in the request body' });
    }

    // Perform the translation
    translate(text, { from: fromLang, to: toLang })
        .then(response => {
            // Send back the translated text
            res.json({
                originalText: text,
                translatedText: response.text,
                detectedLanguage: response.from.language.iso,
            });
        })
        .catch(err => {
            // Handle errors during translation
            console.error(err);
            res.status(500).json({ error: 'Translation failed', details: err.message });
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
