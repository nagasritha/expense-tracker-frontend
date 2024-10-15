// src/components/ExpenseModal.tsx

import React, { useState } from "react";
import { Modal } from "../Modal/model";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector,useDispatch } from 'react-redux';
import '../Empty/empty.css'
import ManualExpenseInputForm from "../FormComponent/manualExpenceInputForm";

export const formTypes = {
    initial: "NONE",
    individualDetails: 'UPDATE INDIVIDUALY',
    addFiles: 'ADD FILES'
};

interface ExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    id:string;
}

export const EditExpenseModal: React.FC<ExpenseModalProps> = ({ isOpen, onClose,id }) => {
    const validationSchema = Yup.object({
        name: Yup.string().required('Name field is required'),
        // description: Yup.string().required('Description field is required'),
        category: Yup.string().required('Category is required'),
        amount: Yup.number()
          .required('Amount is required')
          .positive('Amount must be positive'),
        date: Yup.date().required('Date is required'),
      });

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add your Expense">
            
            <ManualExpenseInputForm isUpdate={true} id={id}/>
        </Modal>
    );
};
