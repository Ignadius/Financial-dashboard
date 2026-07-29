import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./transactions.css";

import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../../data/categories";

function TransactionForm({
  editingTransaction,
  onAddTransaction,
  onUpdateTransaction,
  onCancelEdit,
}) {
  // Create the form helpers.
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  // Watch the current type and category values.
  const selectedType = watch("type");
  const selectedCategory = watch("category");

  // Select categories matching the current transaction type.
  const availableCategories =
    selectedType === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  // Check whether the form is editing an existing transaction.
  const isEditing = Boolean(editingTransaction);

  // Load transaction values when editing.
  useEffect(() => {
    if (editingTransaction) {
      reset(editingTransaction);
      return;
    }

    // Restore the default values for a new transaction.
    reset({
      description: "",
      amount: "",
      type: "expense",
      category: "",
      date: "",
    });
  }, [editingTransaction, reset]);

  // Clear the category when it does not belong to the selected type.
  useEffect(() => {
    const categoryIsValid =
      !selectedCategory || availableCategories.includes(selectedCategory);

    if (!categoryIsValid) {
      // Remove the previous category because it is no longer valid.
      setValue("category", "");
    }
  }, [availableCategories, selectedCategory, setValue]);

  // Create or update a transaction after validation.
  function submitTransaction(formData) {
    const transactionData = {
      // Keep the existing ID when editing, otherwise create a new one.
      id: editingTransaction?.id ?? crypto.randomUUID(),

      // Clean and normalize the submitted values.
      description: formData.description.trim(),
      amount: Number(formData.amount),
      type: formData.type,
      category: formData.category.trim(),
      date: formData.date,
    };

    if (isEditing) {
      // Replace the existing transaction.
      onUpdateTransaction(transactionData);
    } else {
      // Add a new transaction.
      onAddTransaction(transactionData);
    }

    // Clear the form after submission.
    reset({
      description: "",
      amount: "",
      type: "expense",
      category: "",
      date: "",
    });
  }

  return (
    <form
      className="transaction-form"
      onSubmit={handleSubmit(submitTransaction)}
    >
      {/* Transaction description */}
      <div className="form-field">
        <label htmlFor="description">Description</label>

        <input
          id="description"
          type="text"
          maxLength={64}
          {...register("description", {
            required: "Description is required",
            maxLength: {
              value: 64,
              message: "Description must be 64 characters or fewer",
            },
          })}
        />

        {errors.description && (
          <p className="form-error">{errors.description.message}</p>
        )}
      </div>

      {/* Transaction amount */}
      <div className="form-field">
        <label htmlFor="amount">Amount</label>

        <input
          id="amount"
          type="number"
          step="0.01"
          {...register("amount", {
            required: "Amount is required",
            min: {
              value: 0.01,
              message: "Amount must be greater than zero",
            },
          })}
        />

        {errors.amount && <p className="form-error">{errors.amount.message}</p>}
      </div>

      {/* Transaction type */}
      <div className="form-field">
        <label htmlFor="type">Type</label>

        <select id="type" {...register("type")}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      {/* Transaction category */}
      <div className="form-field">
        <label htmlFor="category">Category</label>

        <select
          id="category"
          {...register("category", {
            required: "Category is required",
          })}
        >
          {/* Require the user to select a category. */}
          <option value="">Select category</option>

          {/* Render categories matching the selected transaction type. */}
          {availableCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Display category validation feedback. */}
        {errors.category && (
          <p className="form-error">{errors.category.message}</p>
        )}
      </div>
      {/* Transaction date */}
      <div className="form-field">
        <label htmlFor="date">Date</label>

        <input
          id="date"
          type="date"
          {...register("date", {
            required: "Date is required",
          })}
        />

        {errors.date && <p className="form-error">{errors.date.message}</p>}
      </div>

      {/* Form actions */}
      <div className="form-actions">
        <button type="submit">
          {isEditing ? "Save changes" : "Add transaction"}
        </button>

        {/* Only show cancel while editing. */}
        {isEditing && (
          <button
            type="button"
            className="cancel-edit-button"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TransactionForm;
