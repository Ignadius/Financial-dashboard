// Converts transactions into a CSV file and starts the browser download.
export function exportTransactionsToCsv(transactions) {
  // Stop when there is nothing to export.
  if (transactions.length === 0) {
    return;
  }

  // Define the spreadsheet column headings.
  const headers = ["Description", "Amount", "Type", "Category", "Date"];

  // Escape values so commas and quotation marks do not break the CSV.
  function escapeCsvValue(value) {
    const stringValue = String(value).replaceAll('"', '""');

    return `"${stringValue}"`;
  }

  // Convert each transaction into one CSV row.
  const rows = transactions.map((transaction) =>
    [
      transaction.description,
      transaction.amount,
      transaction.type,
      transaction.category,
      transaction.date,
    ]
      .map(escapeCsvValue)
      .join(","),
  );

  // Combine the headers and transaction rows.
  const csvContent = [headers.join(","), ...rows].join("\n");

  // Create a temporary downloadable file in the browser.
  const file = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  // Create a temporary URL pointing to the generated file.
  const fileUrl = URL.createObjectURL(file);

  // Create an invisible link that triggers the download.
  const downloadLink = document.createElement("a");
  downloadLink.href = fileUrl;
  downloadLink.download = "transactions.csv";

  // Trigger the file download.
  downloadLink.click();

  // Release the temporary browser URL.
  URL.revokeObjectURL(fileUrl);
}
