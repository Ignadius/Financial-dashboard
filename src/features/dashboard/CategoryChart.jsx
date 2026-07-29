import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { formatCurrency } from "../../utils/formatCurrency";

// Define reusable colours for the category slices.
const CHART_COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#9333ea"];

function CategoryChart({ data }) {
  return (
    <section className="chart-card">
      <h2>Spending by Category</h2>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
            >
              {/* Assign a colour to each slice. */}
              {data.map((category, index) => (
                <Cell
                  key={category.name}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => formatCurrency(value)}
              contentStyle={{
                color: "var(--text-primary)",
                backgroundColor: "var(--surface-background)",
                borderColor: "var(--border-color)",
              }}
            />

            <Legend
              formatter={(value) => (
                <span style={{ color: "var(--text-secondary)" }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default CategoryChart;
