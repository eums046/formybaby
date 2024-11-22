const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// API endpoint
app.post('/translate', async (req, res) => {
  const { text, fromLang, toLang } = req.body;

  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ success: false, error: 'Please provide text to translate' });
  }

  try {
    const response = await axios.post('http://localhost:4000/translate', { text, fromLang, toLang });
    res.json({ success: true, originalText: text, translatedText: response.data.translatedText });
  } catch (error) {
    console.error('Translation error:', error.message);
    res.status(500).json({ success: false, error: 'Translation failed. Please try again.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
