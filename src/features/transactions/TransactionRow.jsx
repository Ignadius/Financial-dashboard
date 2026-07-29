// Import shared formatting utilities.
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

function TransactionRow({ transaction, onDelete, onEdit }) {
  // Determine the sign displayed before the amount.
  const sign = transaction.type === "income" ? "+" : "-";

  return (
    <article className="transaction-row">
      {/* Main transaction information */}
      <div>
        <h3>{transaction.description}</h3>
        <p>{transaction.category}</p>
      </div>

      {/* Keep the raw date for accessibility and format the visible value. */}
      <time dateTime={transaction.date}>{formatDate(transaction.date)}</time>

      {/* Display the formatted transaction amount. */}
      <strong className={`transaction-amount ${transaction.type}`}>
        {sign}
        {formatCurrency(transaction.amount)}
      </strong>

      {/* Transaction actions */}
      <div className="transaction-actions">
        <button type="button" onClick={() => onEdit(transaction)}>
          Edit
        </button>

        <button
          type="button"
          className="delete-transaction-button"
          onClick={() => onDelete(transaction)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default TransactionRow;
