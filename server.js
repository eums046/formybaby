const express = require('express');
const translate = require('@vitalets/google-translate-api');
const app = express();
const port = process.env.PORT || 3000;

// Basic middleware
app.use(express.json());

// Simple request logging middleware (optional)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Translation endpoint
app.post('/translate', async (req, res) => {
    const { text, fromLang, toLang } = req.body;
    
    // Input validation
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({ 
            success: false, 
            error: 'Invalid or missing text' 
        });
    }

    try {
        const response = await translate(text, { 
            from: fromLang || 'tl', 
            to: toLang || 'en' 
        });

        res.json({
            success: true,
            originalText: text,
            translatedText: response.text,
            detectedLanguage: response.from.language.iso
        });
    } catch (error) {
        console.error('Translation error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Translation failed',
            message: 'An error occurred during translation'
        });
    }
});

// Basic error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false,
        error: 'Server error',
        message: 'An unexpected error occurred'
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
