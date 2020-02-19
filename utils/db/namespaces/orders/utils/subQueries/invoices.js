module.exports = `
  SELECT
    id as invoiceId,
    charge,
    currency,
    isCharged,
    paymentMethod
  FROM invoices
`;
