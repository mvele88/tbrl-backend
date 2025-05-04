
const express = require('express');
const app = express();

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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

