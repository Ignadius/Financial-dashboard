import "./dashboard.css";
import { useEffect, useState } from "react";
import CategoryChart from "./CategoryChart";
import IncomeExpenseChart from "./IncomeExpenseChart";
import SummaryCard from "./SummaryCard";
import TransactionForm from "../transactions/TransactionForm";
import TransactionList from "../transactions/TransactionList";
import { calculateSummary } from "../../utils/calculateSummary";
import { groupExpensesByCategory } from "../../utils/groupExpensesByCategory";
import {
  loadTransactions,
  saveTransactions,
} from "../../services/transactionStorage";
import { filterTransactions } from "../../utils/filterTransactions";
import { sortTransactions } from "../../utils/sortTransactions";
import { exportTransactionsToCsv } from "../../utils/exportTransactionToCsv";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../../data/categories";
import { loadTheme, saveTheme } from "../../services/themeStorage";

const TRANSACTIONS_PER_PAGE = 5;
const TRANSACTION_CATEGORIES = [
  ...new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]),
];

function Dashboard() {
  // Load and store the user's preferred color theme.
  const [theme, setTheme] = useState(() => loadTheme());

  // Load saved transactions from localStorage.
  const [transactions, setTransactions] = useState(() => loadTransactions());

  // Store the selected month filter.
  const [selectedMonth, setSelectedMonth] = useState("");

  // Store the selected transaction type.
  const [selectedType, setSelectedType] = useState("all");

  // Store the selected transaction category.
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Store the text used to search descriptions and categories.
  const [searchTerm, setSearchTerm] = useState("");

  // Store the active sorting options.
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  // Store how many transactions should currently be displayed.
  const [visibleCount, setVisibleCount] = useState(TRANSACTIONS_PER_PAGE);

  // Apply filters first, then sort the visible transactions.
  const filteredTransactions = sortTransactions(
    filterTransactions(transactions, {
      selectedMonth,
      selectedType,
      selectedCategory,
      searchTerm,
    }),
    sortBy,
    sortDirection,
  );

  // Calculate totals using the filtered transactions.
  const { income, expenses, balance } = calculateSummary(filteredTransactions);

  // Build chart data using the filtered transactions.
  const categoryData = groupExpensesByCategory(filteredTransactions);

  // Save every transaction change to localStorage.
  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  // Apply and persist every theme change.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
  }, [theme]);

  // Store the transaction currently being edited.
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Select a transaction for editing.
  function handleEditTransaction(transaction) {
    setEditingTransaction(transaction);
  }

  // Replace the existing transaction with the updated version.
  function handleUpdateTransaction(updatedTransaction) {
    setTransactions((currentTransactions) =>
      currentTransactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction,
      ),
    );

    // Exit editing mode after saving.
    setEditingTransaction(null);
  }
  // Add a new transaction without mutating the current array.
  function handleAddTransaction(newTransaction) {
    setTransactions((currentTransactions) => [
      newTransaction,
      ...currentTransactions,
    ]);
  }

  // Ask for confirmation before removing the selected transaction.
  function handleDeleteTransaction(transactionToDelete) {
    const deletionConfirmed = window.confirm(
      `Delete "${transactionToDelete.description}"? This action cannot be undone.`,
    );

    if (!deletionConfirmed) {
      return;
    }

    setTransactions((currentTransactions) =>
      currentTransactions.filter(
        (transaction) => transaction.id !== transactionToDelete.id,
      ),
    );

    // Exit editing mode if the deleted transaction was being edited.
    if (editingTransaction?.id === transactionToDelete.id) {
      setEditingTransaction(null);
    }
  }

  // Limit the filtered transactions shown in the list.
  const visibleTransactions = filteredTransactions.slice(0, visibleCount);

  // Check whether more transactions are available.
  const hasMoreTransactions = visibleCount < filteredTransactions.length;

  // Render the complete dashboard interface.
  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Financial Dashboard</h1>

        <button
          type="button"
          className="theme-toggle"
          aria-pressed={theme === "dark"}
          onClick={() => {
            setTheme((currentTheme) =>
              currentTheme === "light" ? "dark" : "light",
            );
          }}
        >
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
      </header>

      <div className="dashboard-filter">
        <div className="filter-field">
          <label htmlFor="month-filter">Month</label>

          <input
            id="month-filter"
            type="month"
            value={selectedMonth}
            onChange={(event) => {
              setSelectedMonth(event.target.value);
              setVisibleCount(TRANSACTIONS_PER_PAGE);
            }}
          />
        </div>
        <div className="filter-field">
          <label htmlFor="type-filter">Type</label>

          <select
            id="type-filter"
            value={selectedType}
            onChange={(event) => {
              setSelectedType(event.target.value);
              setVisibleCount(TRANSACTIONS_PER_PAGE);
            }}
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
        </div>
        <div className="filter-field">
          <label htmlFor="category-filter">Category</label>

          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(event) => {
              setSelectedCategory(event.target.value);
              setVisibleCount(TRANSACTIONS_PER_PAGE);
            }}
          >
            <option value="all">All categories</option>
            {TRANSACTION_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-field">
          <label htmlFor="transaction-search">Search</label>

          <input
            id="transaction-search"
            type="search"
            placeholder="Search transactions"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setVisibleCount(TRANSACTIONS_PER_PAGE);
            }}
          />
        </div>
        <div className="filter-field">
          <label htmlFor="sort-by">Sort by</label>

          <select
            id="sort-by"
            value={sortBy}
            onChange={(event) => {
              setSortBy(event.target.value);
              setVisibleCount(TRANSACTIONS_PER_PAGE);
            }}
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="description">Description</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="sort-direction">Order</label>

          <select
            id="sort-direction"
            value={sortDirection}
            onChange={(event) => {
              setSortDirection(event.target.value);
              setVisibleCount(TRANSACTIONS_PER_PAGE);
            }}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
        {(selectedMonth ||
          selectedType !== "all" ||
          selectedCategory !== "all" ||
          searchTerm) && (
          <button
            type="button"
            onClick={() => {
              // Restore all filters to their default values.
              setSelectedMonth("");
              setSelectedType("all");
              setSelectedCategory("all");
              setSearchTerm("");
              setVisibleCount(TRANSACTIONS_PER_PAGE);
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      <section className="summary">
        <SummaryCard title="Balance" amount={balance} />
        <SummaryCard title="Income" amount={income} />
        <SummaryCard title="Expenses" amount={expenses} />
      </section>

      <section className="form-section">
        <h2>{editingTransaction ? "Edit Transaction" : "Add Transaction"}</h2>
        <TransactionForm
          editingTransaction={editingTransaction}
          onAddTransaction={handleAddTransaction}
          onUpdateTransaction={handleUpdateTransaction}
          onCancelEdit={() => setEditingTransaction(null)}
        />
      </section>

      {/* Financial charts based on the filtered transactions. */}
      <section className="charts-grid">
        <IncomeExpenseChart income={income} expenses={expenses} />
        <CategoryChart data={categoryData} />
      </section>

      {/* Transaction list heading and export action. */}
      <section className="transactions-section">
        <div className="transactions-header">
          <h2>Recent Transactions</h2>

          <button
            type="button"
            disabled={filteredTransactions.length === 0}
            onClick={() => exportTransactionsToCsv(filteredTransactions)}
          >
            Export CSV
          </button>
        </div>

        {/* Display only the currently visible transactions. */}
        <TransactionList
          transactions={visibleTransactions}
          onDeleteTransaction={handleDeleteTransaction}
          onEditTransaction={handleEditTransaction}
        />

        {/* Show more transactions when additional results exist. */}
        {hasMoreTransactions && (
          <button
            type="button"
            className="show-more-button"
            onClick={() => {
              // Reveal the next group of transactions.
              setVisibleCount(
                (currentCount) => currentCount + TRANSACTIONS_PER_PAGE,
              );
            }}
          >
            Show more
          </button>
        )}
      </section>
    </main>
  );
}
export default Dashboard;
