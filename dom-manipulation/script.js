// Initial Quotes Data
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Inspiration" },
  { text: "The purpose of our lives is to be happy.", category: "Life" }
];


// DOM Elements
const categorySelect = document.getElementById('categorySelect');
const showQuoteBtn = document.getElementById('showQuoteBtn');
const quoteDisplay = document.getElementById('quoteDisplay');
const addQuoteForm = document.getElementById('addQuoteForm');
const quoteTextInput = document.getElementById('quoteText');
const quoteCategoryInput = document.getElementById('quoteCategory');
const exportBtn = document.getElementById('exportBtn');
const importFile = document.getElementById('importFile');


// Save & Load Functions

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

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


// Show Random Quote
function showRandomQuote() {
  const selectedCategory = categorySelect.value;
  const filteredQuotes = quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const selectedQuote = filteredQuotes[randomIndex];
  quoteDisplay.textContent = `"${selectedQuote.text}"`;

  // Save last viewed quote to session storage
  sessionStorage.setItem('lastQuote', JSON.stringify(selectedQuote));
}

// Add New Quote
function createAddQuoteForm(event) {
  event.preventDefault();

  const newQuoteText = quoteTextInput.value.trim();
  const newQuoteCategory = quoteCategoryInput.value.trim();

  if (!newQuoteText || !newQuoteCategory) {
    alert("Please enter both quote and category.");
    return;
  }

  quotes.push({ text: newQuoteText, category: newQuoteCategory });
  saveQuotes(); // persist new quote

  loadCategories();

  quoteTextInput.value = '';
  quoteCategoryInput.value = '';

  alert("Quote added successfully!");
}

// Export Quotes as JSON
function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();

  URL.revokeObjectURL(url);
}

// Import Quotes from JSON
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        loadCategories();
        alert('Quotes imported successfully!');
      } else {
        alert('Invalid file format.');
      }
    } catch {
      alert('Error reading the file.');
    }
  };
  fileReader.readAsText(event.target.files[0]);
}


// Event Listeners
showQuoteBtn.addEventListener('click', showRandomQuote);
addQuoteForm.addEventListener('submit', createAddQuoteForm);
exportBtn.addEventListener('click', exportQuotes);
importFile.addEventListener('change', importFromJsonFile);

// Initial Load

loadCategories();

// Load last viewed quote from session storage if available
const lastQuote = sessionStorage.getItem('lastQuote');
if (lastQuote) {
  const parsedQuote = JSON.parse(lastQuote);
  quoteDisplay.textContent = `"${parsedQuote.text}"`;
}
