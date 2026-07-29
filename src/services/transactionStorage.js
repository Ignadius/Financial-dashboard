// Key used to store transactions in the browser.
const STORAGE_KEY = "financial-dashboard-transactions";

// Reads transactions from localStorage.
export function loadTransactions() {
  try {
    // Get the stored JSON string.
    const storedTransactions = localStorage.getItem(STORAGE_KEY);

    // Return an empty array when no saved data exists.
    if (!storedTransactions) {
      return [];
    }

    // Convert the JSON string back into JavaScript data.
    return JSON.parse(storedTransactions);
  } catch (error) {
    // Log invalid or inaccessible stored data.
    console.error("Failed to load transactions:", error);

    // Return a safe fallback.
    return [];
  }
}

// Saves transactions to localStorage.
export function saveTransactions(transactions) {
  try {
    // Convert the array into JSON before storing it.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    // Log storage errors without crashing the application.
    console.error("Failed to save transactions:", error);
  }
}
