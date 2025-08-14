// Initial quotes data
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Inspiration" },
  { text: "The purpose of our lives is to be happy.", category: "Life" }
];

// DOM elements
const categorySelect = document.getElementById('categorySelect');
const showQuoteBtn = document.getElementById('showQuoteBtn');
const quoteDisplay = document.getElementById('quoteDisplay');
const addQuoteForm = document.getElementById('addQuoteForm');
const quoteTextInput = document.getElementById('quoteText');
const quoteCategoryInput = document.getElementById('quoteCategory');

// Load categories into dropdown
function loadCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];
  categorySelect.innerHTML = '';
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

// Show a random quote from selected category
function showRandomQuote() {
  const selectedCategory = categorySelect.value;
  const filteredQuotes = quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  quoteDisplay.textContent = `"${filteredQuotes[randomIndex].text}"`;
}

// Handle new quote form submission
function createAddQuoteForm(event) {
  event.preventDefault();

  const newQuoteText = quoteTextInput.value.trim();
  const newQuoteCategory = quoteCategoryInput.value.trim();

  if (!newQuoteText || !newQuoteCategory) {
    alert("Please enter both quote and category.");
    return;
  }

  // Add to array
  quotes.push({ text: newQuoteText, category: newQuoteCategory });

  // Reload categories
  loadCategories();

  // Clear inputs
  quoteTextInput.value = '';
  quoteCategoryInput.value = '';

  alert("Quote added successfully!");
}

// Event Listeners
showQuoteBtn.addEventListener('click', showRandomQuote);
addQuoteForm.addEventListener('submit', createAddQuoteForm);

// Initial load
loadCategories();
