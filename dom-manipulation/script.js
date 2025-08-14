// ===== Initial Quotes Data =====
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Inspiration" },
  { text: "The purpose of our lives is to be happy.", category: "Life" },
  { text: "Don’t let yesterday take up too much of today.", category: "Motivation" },
  { text: "If life were predictable it would cease to be life, and be without flavor.", category: "Life" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Motivation" },
  { text: "Do what you can with all you have, wherever you are.", category: "Motivation" },
  { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
  { text: "Act as if what you do makes a difference. It does.", category: "Motivation" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Motivation" },
  { text: "Never bend your head. Always hold it high. Look the world straight in the eye.", category: "Motivation" },
  { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", category: "Motivation" },
  { text: "Believe you can and you’re halfway there.", category: "Motivation" },
  { text: "When you have a dream, you’ve got to grab it and never let go.", category: "Motivation" },
  { text: "I can’t change the direction of the wind, but I can adjust my sails to always reach my destination.", category: "Inspiration" },
  { text: "No matter what you’re going through, there’s a light at the end of the tunnel.", category: "Inspiration" },
  { text: "Limit your ‘always’ and your ‘nevers’.", category: "Motivation" },
  { text: "Nothing is impossible. The word itself says ‘I’m possible!’", category: "Inspiration" },
  { text: "You are never too old to set another goal or to dream a new dream.", category: "Inspiration" },
  { text: "Try to be a rainbow in someone’s cloud.", category: "Life" },
  { text: "Do not allow people to dim your shine because they are blinded. Tell them to put on some sunglasses.", category: "Motivation" },
  { text: "Be yourself; everyone else is already taken.", category: "Life" },
  { text: "Happiness is not something ready made. It comes from your own actions.", category: "Life" },
  { text: "Life is short, and it’s up to you to make it sweet.", category: "Life" },
  { text: "Everything you’ve ever wanted is on the other side of fear.", category: "Motivation" },
  { text: "Opportunities don’t happen, you create them.", category: "Motivation" },
  { text: "It always seems impossible until it’s done.", category: "Motivation" },
  { text: "Start where you are. Use what you have. Do what you can.", category: "Motivation" },
  { text: "Dream big and dare to fail.", category: "Inspiration" },
  { text: "Be so good they can’t ignore you.", category: "Motivation" },
  { text: "Turn your wounds into wisdom.", category: "Life" },
  { text: "We must let go of the life we have planned, so as to accept the one that is waiting for us.", category: "Life" },
  { text: "Do one thing every day that scares you.", category: "Motivation" },
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "The mind is everything. What you think you become.", category: "Life" },
  { text: "An unexamined life is not worth living.", category: "Life" },
  { text: "Change your thoughts and you change your world.", category: "Inspiration" },
  { text: "Everything has beauty, but not everyone sees it.", category: "Life" },
  { text: "Life isn’t about getting and having, it’s about giving and being.", category: "Life" },
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", category: "Motivation" },
  { text: "Life is really simple, but we insist on making it complicated.", category: "Life" },
  { text: "Don’t watch the clock; do what it does. Keep going.", category: "Motivation" },
  { text: "The way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "You miss 100% of the shots you don’t take.", category: "Motivation" },
  { text: "Whether you think you can or you think you can’t, you’re right.", category: "Motivation" },
  { text: "I have learned over the years that when one’s mind is made up, this diminishes fear.", category: "Inspiration" },
  { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", category: "Inspiration" },
  { text: "You only live once, but if you do it right, once is enough.", category: "Life" },
  { text: "Live in the sunshine, swim in the sea, drink the wild air.", category: "Life" },
  { text: "Keep smiling, because life is a beautiful thing and there’s so much to smile about.", category: "Life" },
  { text: "The best revenge is massive success.", category: "Motivation" },
  { text: "Life is made of ever so many partings welded together.", category: "Life" },
  { text: "Don’t settle for what life gives you; make life better and build something.", category: "Motivation" },
  { text: "The good life is one inspired by love and guided by knowledge.", category: "Life" },
  { text: "Life is trying things to see if they work.", category: "Life" },
  { text: "May you live all the days of your life.", category: "Life" },
  { text: "Life is not a problem to be solved, but a reality to be experienced.", category: "Life" },
  { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", category: "Inspiration" },
  { text: "Be the change that you wish to see in the world.", category: "Inspiration" },
  { text: "Do not let making a living prevent you from making a life.", category: "Life" },
  { text: "Love the life you live. Live the life you love.", category: "Life" },
  { text: "Life is short, and it is up to you to make it sweet.", category: "Life" },
  { text: "You cannot shake hands with a clenched fist.", category: "Life" },
  { text: "Courage is grace under pressure.", category: "Motivation" },
  { text: "Keep going. Be all in.", category: "Motivation" },
  { text: "Life is ours to be spent, not to be saved.", category: "Life" },
  { text: "Go confidently in the direction of your dreams! Live the life you’ve imagined.", category: "Motivation" },
  { text: "In three words I can sum up everything I’ve learned about life: it goes on.", category: "Life" },
  { text: "Do not be afraid to give up the good to go for the great.", category: "Motivation" },
  { text: "The secret of success is to do the common thing uncommonly well.", category: "Motivation" },
  { text: "Opportunities are usually disguised as hard work, so most people don’t recognize them.", category: "Motivation" },
  { text: "Do not wait for leaders; do it alone, person to person.", category: "Inspiration" },
  { text: "I never dreamed about success, I worked for it.", category: "Motivation" },
  { text: "Hardships often prepare ordinary people for an extraordinary destiny.", category: "Inspiration" },
  { text: "Life is about making an impact, not making an income.", category: "Life" },
  { text: "Don’t count the days, make the days count.", category: "Motivation" },
  { text: "When you reach the end of your rope, tie a knot in it and hang on.", category: "Motivation" },
  { text: "If you want to live a happy life, tie it to a goal, not to people or things.", category: "Life" },
  { text: "A journey of a thousand miles begins with a single step.", category: "Motivation" },
  { text: "Do what you feel in your heart to be right – for you’ll be criticized anyway.", category: "Life" },
  { text: "Do not pray for an easy life, pray for the strength to endure a difficult one.", category: "Motivation" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", category: "Inspiration" },
  { text: "Happiness depends upon ourselves.", category: "Life" },
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "We become what we think about.", category: "Motivation" },
  { text: "The harder you work for something, the greater you’ll feel when you achieve it.", category: "Motivation" },
  { text: "Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.", category: "Inspiration" },
  { text: "Focus on being productive instead of busy.", category: "Motivation" },
  { text: "Great things never come from comfort zones.", category: "Motivation" }
];


// ===== DOM Elements =====
const categorySelect = document.getElementById('categorySelect');
const categoryFilter = document.getElementById('categoryFilter');
const showQuoteBtn = document.getElementById('showQuoteBtn');
const quoteDisplay = document.getElementById('quoteDisplay');
const addQuoteForm = document.getElementById('addQuoteForm');
const quoteTextInput = document.getElementById('quoteText');
const quoteCategoryInput = document.getElementById('quoteCategory');
const exportBtn = document.getElementById('exportBtn');
const importFile = document.getElementById('importFile');

// ===== Storage Functions =====
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))].sort();

  // Populate "Show Random Quote" select
  categorySelect.innerHTML = '';
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });

  // Populate filter dropdown
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  // Restore last selected filter
  const savedFilter = localStorage.getItem('lastCategoryFilter');
  if (savedFilter && [...categoryFilter.options].some(o => o.value === savedFilter)) {
    categoryFilter.value = savedFilter;
  }
}

// ===== Quote Display Functions =====
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

function filterQuotes() {
  const selectedFilter = categoryFilter.value;
  localStorage.setItem('lastCategoryFilter', selectedFilter);

  let filteredList = selectedFilter === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedFilter);

  if (filteredList.length === 0) {
    quoteDisplay.textContent = "No quotes found for this category.";
  } else {
    quoteDisplay.textContent = `"${filteredList[0].text}"`; // Show first match
  }
}

// ===== Add New Quote =====
function createAddQuoteForm(event) {
  event.preventDefault();

  const newQuoteText = quoteTextInput.value.trim();
  const newQuoteCategory = quoteCategoryInput.value.trim();

  if (!newQuoteText || !newQuoteCategory) {
    alert("Please enter both quote and category.");
    return;
  }

  quotes.push({ text: newQuoteText, category: newQuoteCategory });
  saveQuotes();
  populateCategories();

  quoteTextInput.value = '';
  quoteCategoryInput.value = '';

  alert("Quote added successfully!");
}

// ===== Export Quotes =====
function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();

  URL.revokeObjectURL(url);
}

// ===== Import Quotes =====
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
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

// ===== Event Listeners =====
showQuoteBtn.addEventListener('click', showRandomQuote);
addQuoteForm.addEventListener('submit', createAddQuoteForm);
exportBtn.addEventListener('click', exportQuotes);
importFile.addEventListener('change', importFromJsonFile);
categoryFilter.addEventListener('change', filterQuotes);

// ===== Initial Load =====
populateCategories();

// Load last viewed quote from session storage if available
const lastQuote = sessionStorage.getItem('lastQuote');
if (lastQuote) {
  const parsedQuote = JSON.parse(lastQuote);
  quoteDisplay.textContent = `"${parsedQuote.text}"`;
}

// Apply last saved filter
filterQuotes();
