async function translateText() {
    const text = document.getElementById('search').value;
    const targetLang = 'en|es'; // Example: translating to Spanish

    if (!text) {
        alert("Please enter a text to translate.");
        return;
    }

    const response = await fetch(`/translate?q=${encodeURIComponent(text)}&langpair=${targetLang}`);
    const data = await response.json();

    if (data.responseStatus === 200) {
        document.getElementById('translation').innerText = data.responseData.translatedText;
    } else {
        document.getElementById('translation').innerText = "Translation failed. Please try again.";
    }
}
