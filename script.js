async function translateText() {
    const text = document.getElementById('search').value;
    const targetLang = 'tl|en'; // Example: translating to Filipino to English

    if (!text) {
        alert("Type your sentence here, baby.");
        return;
    }

    // Check if you're running on Vercel (in production) or locally (localhost)
const baseUrl = window.location.hostname === 'formybaby.vercel.app' 
                ? 'https://formybaby.vercel.app' 
                : 'http://localhost:3000'; // Local URL for development


    const response = await fetch(`${baseUrl}/api/translate?q=${encodeURIComponent(text)}&langpair=${targetLang}`);
    const data = await response.json();

    if (data.responseStatus === 200) {
        document.getElementById('translation').innerText = data.responseData.translatedText;
    } else {
        document.getElementById('translation').innerText = "Translation failed. Please try again.";
    }
}
