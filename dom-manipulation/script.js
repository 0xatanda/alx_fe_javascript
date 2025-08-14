let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Inspiration" },
  { text: "The purpose of our lives is to be happy.", category: "Life" }
];

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch('/quotes.json'); // Replace with your API or JSON file path
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const serverQuotes = await response.json();
    
    if (Array.isArray(serverQuotes) && serverQuotes.length > 0) {
      quotes = serverQuotes;
      localStorage.setItem('quotes', JSON.stringify(quotes));
      console.log("Quotes updated from server");
    } else {
      console.warn("No quotes found on server, using local storage");
    }
  } catch (error) {
    console.error("Error fetching quotes from server:", error);
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchQuotesFromServer();
});
