const express = require('express');
const translate = require('@vitalets/google-translate-api');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Simple request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Allow all origins
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'POST');
    next();
});

app.post('/translate', async (req, res) => {
    const { text } = req.body;
    
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({ 
            success: false, 
            error: 'Please enter some text to translate' 
        });
    }

    try {
        const response = await translate(text, { 
            from: 'tl',  // Tagalog
            to: 'en'     // English
        });

        res.json({
            success: true,
            originalText: text,
            translatedText: response.text
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
