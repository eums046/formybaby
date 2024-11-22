const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Enable all CORS requests
app.use(express.json());
app.use(express.static('public'));

// Simple request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

app.post('/translate', async (req, res) => {
    const { text, fromLang = 'tl', toLang = 'en' } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({ 
            success: false, 
            error: 'Please enter some text to translate' 
        });
    }

    try {
        // Use CORS proxy (e.g., cors-anywhere) to avoid CORS issues
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://libretranslate.de/translate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                source: fromLang,
                target: toLang,
            }),
        });

        if (!response.ok) {
            throw new Error('Translation failed');
        }

        const data = await response.json();

        res.json({
            success: true,
            originalText: text,
            translatedText: data.translatedText,
        });
    } catch (error) {
        console.error('Translation error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Translation failed. Please try again.'
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
