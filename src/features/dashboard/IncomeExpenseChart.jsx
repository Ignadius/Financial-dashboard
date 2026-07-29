import {
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function IncomeExpenseChart({ income, expenses }) {
  // Recharts expects chart data as an array of objects.
  const chartData = [
    {
      name: "Income",
      amount: income,
      color: "#16a34a",
    },
    {
      name: "Expenses",
      amount: expenses,
      color: "#dc2626",
    },
  ];

  return (
    <section className="chart-card">
      {/* Chart heading */}
      <h2>Income vs Expenses</h2>

      {/* ResponsiveContainer makes the chart adapt to its parent width. */}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            {/* Horizontal grid lines improve readability. */}
            <CartesianGrid
              stroke="var(--border-color)"
              strokeDasharray="3 3"
            />

            {/* Displays the category name below each bar. */}
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--text-secondary)" }}
            />

            {/* Displays the numeric scale. */}
            <YAxis tick={{ fill: "var(--text-secondary)" }} />

            {/* Shows the value when the user hovers over a bar. */}
            <Tooltip
              contentStyle={{
                color: "var(--text-primary)",
                backgroundColor: "var(--surface-background)",
                borderColor: "var(--border-color)",
              }}
            />

            {/* Use green for income and red for expenses. */}
            <Bar dataKey="amount">
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default IncomeExpenseChart;
