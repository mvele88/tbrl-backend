const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.BLOCKONOMICS_API_KEY;

let paymentRecords = {}; // Temporary in-memory store

app.post('/create-payment', async (req, res) => {
  const { address, type } = req.body;
  const price = type === 'activation' ? 250 : 0.1; // USD

  try {
    const { data } = await axios.post(
      'https://www.blockonomics.co/api/new_address',
      {},
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    const btcAddress = data.address;
    paymentRecords[btcAddress] = { address, type, status: 'pending' };

    res.json({
      btcAddress,
      message: type === 'activation' ?
        'Pay $250 in BTC to activate your bot.' :
        'Pay 10% withdrawal fee in BTC to unlock profits.'
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create payment address' });
  }
});

app.get('/check-status/:btcAddress', async (req, res) => {
  const { btcAddress } = req.params;
  try {
    const { data } = await axios.get(
      `https://www.blockonomics.co/api/address/${btcAddress}`,
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );

    if (data.status === 2 || data.status === 1) {
      paymentRecords[btcAddress].status = 'paid';
    }

    res.json({ status: paymentRecords[btcAddress] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to check payment status' });
  }
});

app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
