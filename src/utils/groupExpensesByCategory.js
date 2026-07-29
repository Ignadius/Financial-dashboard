export function groupExpensesByCategory(transactions) {
  // Keep only expense transactions.
  const expenses = transactions.filter(
    (transaction) => transaction.type === "expense",
  );

  // Build an object where each key is a category.
  const totalsByCategory = expenses.reduce((totals, transaction) => {
    // Use zero when the category has not been added yet.
    const currentTotal = totals[transaction.category] ?? 0;

    // Add the current transaction amount to its category.
    totals[transaction.category] = currentTotal + transaction.amount;

    return totals;
  }, {});

  // Convert the object into the array format expected by Recharts.
  return Object.entries(totalsByCategory).map(([name, value]) => ({
    name,
    value,
  }));
}
