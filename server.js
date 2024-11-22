const express = require('express');
const translate = require('@vitalets/google-translate-api');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

// Apply rate limiting
app.use(limiter);

// CORS configuration
const allowedOrigins = [
    'https://formybaby.vercel.app',
    'http://localhost:3000'
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['POST'],
    allowedHeaders: ['Content-Type']
}));

// Body parser middleware
app.use(express.json());

// Input validation middleware
const validateTranslationInput = (req, res, next) => {
    const { text, fromLang, toLang } = req.body;
    
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({ error: 'Invalid or missing text' });
    }
    
    if (!fromLang || !toLang) {
        return res.status(400).json({ error: 'Missing language parameters' });
    }
    
    next();
};

// Translation endpoint
app.post('/translate', validateTranslationInput, async (req, res) => {
    const { text, fromLang, toLang } = req.body;
    
    try {
        const response = await translate(text, { 
            from: fromLang, 
            to: toLang 
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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false,
        error: 'Server error',
        message: 'An unexpected error occurred'
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
