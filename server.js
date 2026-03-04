const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Simple API to get project info
app.get('/api/projects', (req, res) => {
  res.json([
    { id: 'Elektronika', name: 'Elektronika', description: 'Elektronika' },
    { id: 'Pola figur', name: 'Pola figur', description: 'Pola figur' },
    { id: 'Operacje na ułamkach', name: 'Operacje na ułamkach', description: 'Operacje na ułamkach' }
  ]);
});

// Serve static files from the current directory
app.use(express.static(__dirname));

// For URLs like /A or /B without trailing slash, Express static handles it 
// but we want to ensure any unmatched route returns the main index.html (SPA style) 
// BUT we must not break the subfolders. 

// Better catch-all for root:
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback for subfolders if they aren't handled by express.static (unlikely)
// or for real SPA routing.
app.get('*', (req, res) => {
  // If the request doesn't match any file/folder, just go home
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
