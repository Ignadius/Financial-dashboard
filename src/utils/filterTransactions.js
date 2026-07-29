export function filterTransactions(
  transactions,
  {
    selectedMonth,
    selectedType,
    selectedCategory = "all",
    searchTerm,
  },
) {
  // Normalise the search value so matching is case-insensitive.
  const normalisedSearch = searchTerm.trim().toLowerCase();

  return transactions.filter((transaction) => {
    // Check whether the transaction belongs to the selected month.
    const matchesMonth =
      !selectedMonth || transaction.date.startsWith(selectedMonth);

    // Check whether the transaction matches the selected type.
    const matchesType =
      selectedType === "all" || transaction.type === selectedType;

    // Check whether the transaction belongs to the selected category.
    const matchesCategory =
      selectedCategory === "all" || transaction.category === selectedCategory;

    // Check the description and category for the search term.
    const matchesSearch =
      !normalisedSearch ||
      transaction.description.toLowerCase().includes(normalisedSearch) ||
      transaction.category.toLowerCase().includes(normalisedSearch);

    // Keep the transaction only when every active filter matches.
    return matchesMonth && matchesType && matchesCategory && matchesSearch;
  });
}
