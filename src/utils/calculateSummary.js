// Calculates the financial totals from a list of transactions.
export function calculateSummary(transactions) {
  // Add all income transaction amounts.
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  // Add all expense transaction amounts.
  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  // Return one object containing all dashboard totals.
  return {
    income,
    expenses,
    balance: income - expenses,
  };
}
