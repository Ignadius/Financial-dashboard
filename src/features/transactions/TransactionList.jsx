// Import the component responsible for rendering one transaction.
import TransactionRow from "./TransactionRow";

function TransactionList({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
}) {
  // Display an empty state when no transactions match.
  if (transactions.length === 0) {
    return <p className="empty-transactions">No transactions found.</p>;
  }

  return (
    <div className="transaction-list">
      {/* Render one row for every transaction. */}
      {transactions.map((transaction) => (
        <TransactionRow
          key={transaction.id}
          transaction={transaction}
          onDelete={onDeleteTransaction}
          onEdit={onEditTransaction}
        />
      ))}
    </div>
  );
}

export default TransactionList;
