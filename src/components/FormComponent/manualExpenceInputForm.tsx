import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { createExpense, fetchExpenses, updateExpense } from '../../Store/expenses.slice';
import './forms.css';
import { PageStatus } from '../../utils/pageStatus';

interface ManualExpenseInputFormProps {
  isUpdate?: boolean; // Prop to determine if the form is for updating
  id?: string;
}


const ManualExpenseInputForm: React.FC<ManualExpenseInputFormProps> = ({ isUpdate,id }) => {
  // Define Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Name field is required'),
    // description: Yup.string().required('Description field is required'),
    category: Yup.string().required('Category is required'),
    amount: Yup.number()
      .required('Amount is required')
      .positive('Amount must be positive'),
    date: Yup.date().required('Date is required'),
  });

  let dispatch = useDispatch();
  let data = useSelector((state: any) => state.expenses);
  console.log(data);
  let pageStatusObject = new PageStatus();
  let messageColor = data.page_status === pageStatusObject.success ? 'text-success' : 'text-danger';

  const addExpenses = async (values: any) => {
    try {
      // Dispatch createExpense and wait for it to complete
      let resultAction
      if (!isUpdate) {
        resultAction = await dispatch<any>(createExpense(values));
      } else {
        resultAction = await dispatch<any>(updateExpense({id,values}));
      }
      // Check if the action was fulfilled (successful)
      if (createExpense.fulfilled.match(resultAction)) {
        // Fetch the updated list of expenses after successful addition
        await dispatch<any>(fetchExpenses());
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };
  let { expense } = useSelector((state: any) => state.expenses);
  console.log(expense);
  // Use Formik for form handling
  const formik = useFormik({
    initialValues: {
      name: expense.name,
      // description: '',
      category: expense.category,
      amount: expense.amount,
      date: expense.date,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      const formattedDate = values.date ? values.date.replace(/-/g, '/') : '';
      let customValues = {
        name: values.name,
        category: values.category,
        amount: values.amount,
        date: formattedDate
      }
      addExpenses(customValues);
      // You can handle form submission here
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="label">
          Title
        </label>
        <input
          className="input"
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name && formik.touched.name ? (
          <div className="text-danger">{typeof formik.errors.name === 'string' ? formik.errors.name : ''}</div>
        ) : null}
      </div>

      {/* Description Field
      <div>
        <label htmlFor="description" className="label">
          Description
        </label>
        <input
          className="input"
          id="description"
          name="description"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        {formik.errors.description && formik.touched.description ? (
          <div className="text-danger">{formik.errors.description}</div>
        ) : null}
      </div> */}

      {/* Category Field */}
      <div>
        <label htmlFor="category" className="label">
          Category
        </label>
        <select
          className="input"
          id="category"
          name="category"
          onChange={formik.handleChange}
          value={formik.values.category}
        >
          <option value="" label="Select category" />
          <option value="Food" label="Food" />
          <option value="Entertainment" label="Entertainment" />
          <option value="Taxes" label="Taxes" />
          <option value="Transport" label="Transport" />
          <option value="Utilities" label="Utilities" />
          <option value="Equipment" label="Equipment" />
          <option value="Maintanance" label="Maintanance" />
          <option value="office Expenses" label="office Expenses" />
          <option value="Events" label="Events" />
          {/* Add more options as needed */}
        </select>
        {formik.errors.category && formik.touched.category ? (
          <div className="text-danger">{typeof formik.errors.category === 'string' ? formik.errors.category : ''}</div>
        ) : null}
      </div>

      {/* Amount Field */}
      <div>
        <label htmlFor="amount" className="label">
          Amount
        </label>
        <input
          className="input"
          id="amount"
          name="amount"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.amount}
        />
        {formik.errors.amount && formik.touched.amount ? (
          <div className="text-danger">{typeof formik.errors.amount === 'number' ? formik.errors.amount : ''}</div>
        ) : null}
      </div>

      {/* Date Field */}
      <div>
        <label htmlFor="date" className="label">
          Date
        </label>
        <input
          className="input"
          id="date"
          name="date"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.date}
        />
        {formik.errors.date && formik.touched.date ? (
          <div className="text-danger">{typeof formik.errors.date === 'string' ? formik.errors.date : ''}</div>
        ) : null}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!formik.isValid || formik.isSubmitting}
      >
        Submit
      </button>
      <p className={messageColor}>{data.message}</p>
    </form>
  );
};

export default ManualExpenseInputForm;
