import { formatCurrency } from "../../utils/formatCurrency";

function SummaryCard({ title, amount }) {
  return (
    <article className="summary-card">
      <h2>{title}</h2>
      <p>{formatCurrency(amount)}</p>
    </article>
  );
}

export default SummaryCard;
