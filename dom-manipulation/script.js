// ======== Local Storage Helpers ========

// Load quotes from local storage
function loadQuotesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('quotes') || '[]');
}

// Save quotes to local storage
function saveQuotesToLocalStorage(quotes) {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// ======== Mock API Simulation ========

// Fetch quotes from server (mock API)
async function fetchQuotesFromServer() {
    console.log("Fetching quotes from server...");
    return new Promise((resolve) => {
        setTimeout(() => {
            // Mock server response
            const serverQuotes = [
                { id: 1, text: "Stay hungry, stay foolish.", author: "Steve Jobs", updatedAt: 1723536000000 },
                { id: 2, text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", updatedAt: 1723622400000 }
            ];
            resolve(serverQuotes);
        }, 1000);
    });
}

// Post new quote to server (mock API)
async function postQuoteToServer(quote) {
    console.log("Posting new quote to server:", quote);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, ...quote });
        }, 1000);
    });
}

// ======== Conflict Resolution Logic ========

function mergeQuotes(localQuotes, serverQuotes) {
    const merged = [...localQuotes];

    serverQuotes.forEach(serverQuote => {
        const localIndex = merged.findIndex(q => q.id === serverQuote.id);
        if (localIndex === -1) {
            merged.push(serverQuote);
            showNotification(`New quote added from server: "${serverQuote.text}"`);
        } else {
            // Conflict resolution: pick latest updatedAt
            if (serverQuote.updatedAt > merged[localIndex].updatedAt) {
                merged[localIndex] = serverQuote;
                showNotification(`Quote updated from server: "${serverQuote.text}"`);
            }
        }
    });

    return merged;
}

// ======== UI Notifications ========

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ======== Synchronization ========

async function syncQuotes() {
    const localQuotes = loadQuotesFromLocalStorage();
    const serverQuotes = await fetchQuotesFromServer();
    const mergedQuotes = mergeQuotes(localQuotes, serverQuotes);
    saveQuotesToLocalStorage(mergedQuotes);
}

// Periodically check for new quotes every 10 seconds
setInterval(syncQuotes, 10000);

// ======== Add Quote Handler ========

async function addQuote(text, author) {
    const newQuote = {
        id: Date.now(),
        text,
        author,
        updatedAt: Date.now()
    };

    // Save locally
    const quotes = loadQuotesFromLocalStorage();
    quotes.push(newQuote);
    saveQuotesToLocalStorage(quotes);

    // Push to server
    await postQuoteToServer(newQuote);
    showNotification(`Quote added: "${text}"`);
}

// ======== UI ========

document.addEventListener("DOMContentLoaded", () => {
    // Initial sync
    syncQuotes();

    // Add quote form listener
    document.getElementById("quoteForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const text = document.getElementById("quoteText").value;
        const author = document.getElementById("quoteAuthor").value;
        if (text && author) {
            addQuote(text, author);
        }
    });
});
