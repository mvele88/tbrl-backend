const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('TRBL backend is live!');
});

// Add routes for sniping and staking
app.get('/sniping', (req, res) => {
  res.send('Sniping feature will be here');
});

app.get('/staking', (req, res) => {
  res.send('Staking feature will be here');
});

// Fallback route (important for Vercel deployments)
app.all('*', (req, res) => {
  res.status(404).send('Page not found');
});

// Listen to the port defined by Vercel or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
