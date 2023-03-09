const stripe = require('stripe')("pk_test_51MRGm1Lq2BvYijBiDuN5i552dbwsM0Kg2ps3UXbhSo2aJfPTiNzpMQmHzBTQZmHmLzQI92YN0Be4iRzxwIjSVZEp007tP4Nsy7");
apiVersion: '11.12.0',
async function fetchLatestTransactions() {
  const transactions = await stripe.charges.list({ limit: 10 });
  return transactions.data;
}

module.exports = { fetchLatestTransactions };