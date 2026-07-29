// Returns only transactions that match the selected YYYY-MM value.
export function filterTransactionsByMonth(transactions, selectedMonth) {
  // Show every transaction when no month is selected.
  if (!selectedMonth) {
    return transactions;
  }

  // Transaction dates already use the YYYY-MM-DD format.
  return transactions.filter((transaction) =>
    transaction.date.startsWith(selectedMonth),
  );
}
