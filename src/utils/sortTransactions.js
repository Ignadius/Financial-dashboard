// Returns a new array sorted by the requested field and direction.
// The original transactions array is not mutated.
export function sortTransactions(
  transactions,
  sortBy = "date",
  sortDirection = "desc",
) {
  const directionMultiplier = sortDirection === "asc" ? 1 : -1;

  return [...transactions].sort((firstTransaction, secondTransaction) => {
    let comparison;

    if (sortBy === "amount") {
      comparison = firstTransaction.amount - secondTransaction.amount;
    } else if (sortBy === "description") {
      comparison = firstTransaction.description.localeCompare(
        secondTransaction.description,
        undefined,
        { sensitivity: "base" },
      );
    } else {
      comparison = firstTransaction.date.localeCompare(secondTransaction.date);
    }

    return comparison * directionMultiplier;
  });
}
