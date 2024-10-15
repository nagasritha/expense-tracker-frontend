import { useFormik } from 'formik';
import { useSelector,useDispatch } from 'react-redux';
import * as Yup from 'yup';
import './forms.css'
import { createExpense } from '../../Store/expenses.slice';

const FileExpenceInputForm = () => {
  // Define Yup validation schema
  const validationSchema = Yup.object({
    file: Yup.mixed()
      .required('A CSV file is required')
      .test('fileFormat', 'Only CSV files are allowed', (value) => {
        // Ensure that the file is a File object and check the type
        return value && value instanceof File && value.type === 'text/csv';
      }),
  });

  let dispatch = useDispatch();
  let {message,error} = useSelector((state:any)=>state.expenses);
  console.log(message,error);

  const addExpenses = (values:any) =>{
    console.log(values);
    dispatch<any>(createExpense(values));
  }

  // Use Formik for form handling
  const formik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit:(values)=>addExpenses(values)
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="file" className='label'>Upload CSV file:</label>
        <input
            className='input'
          id="file"
          name="file"
          type="file"
          onChange={(event) => {
            const files = event.currentTarget.files;
            if (files && files.length > 0) {
              formik.setFieldValue('file', files[0]);
            }
          }}
          accept=".csv"
        />
        {formik.errors.file && formik.touched.file ? (
          <div className='text-danger'>{formik.errors.file}</div>
        ) : null}
      </div>

      <button type="submit" className='btn btn-primary' disabled={!formik.isValid || formik.isSubmitting}>
        Submit
      </button>
    </form>
  );
};

export default FileExpenceInputForm;