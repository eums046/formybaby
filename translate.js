async function translateText() {
    const text = document.getElementById('search').value;
    const targetLang = 'tl|en'; // Example: translating to Filipino

    if (!text) {
        alert("Type your sentence here, baby.");
        return;
    }

    try {
        const response = await fetch(`/translate?q=${encodeURIComponent(text)}&langpair=${targetLang}`);
        const data = await response.json();

        if (data.responseStatus === 200) {
            document.getElementById('translation').innerText = data.responseData.translatedText;
        } else {
            document.getElementById('translation').innerText = "Translation failed. Please try again.";
        }
    } catch (error) {
        console.error("Translation error:", error);
        document.getElementById('translation').innerText = "An error occurred. Please try again later.";
    }
}
