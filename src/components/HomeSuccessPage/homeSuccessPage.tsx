import React, { useEffect, useState } from "react";
import './homeSuccessPage.css';
import { useSelector, useDispatch } from "react-redux";
import { ExpenseModal } from "../ExpenseModel/expenseform.model";
import { deleteExpense, fetchExpenses, getExpenseById } from "../../Store/expenses.slice";

import { EditExpenseModal } from "../ExpenseModel/editExpenseModel";
import { triggerEditModel, closeEditModel } from "../../Store/expenses.slice";

export const HomeSuccessPage = () => {
    const { expenses, selectedExpense, editModel } = useSelector((state: any) => state.expenses); // Access selectedExpense from Redux store
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [expenseToEdit, setExpenseToEdit] = useState<any>(null); // New state for storing the expense to edit

    useEffect(() => {
        console.log(expenses);
        if (selectedExpense && selectedExpense !== expenseToEdit) {
            setExpenseToEdit(selectedExpense); // Set selected expense when retrieved
        }
    }, [selectedExpense]); // Dependency on selectedExpense

    const triggerModal = () => {
        setIsModalOpen(true); // Open the modal when the button is clicked
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    const triggerEditModalHandler = () => {
        dispatch(triggerEditModel()); // Trigger the modal
    };

    const closeEditModalHandler = () => {
        dispatch(closeEditModel()); // Clear the edit state after closing
    };

    const deleteExpenseFromExpenses = async (id: string) => {
        try {
            const resultAction = await dispatch<any>(deleteExpense(id));
            if (deleteExpense.fulfilled.match(resultAction)) {
                await dispatch<any>(fetchExpenses());
            }
        } catch (error) {
            console.log(error);
        }
    };

    const editExpenseFromExpenses = async (id: string) => {
        try {
            await dispatch<any>(getExpenseById(id)); // Fetch the expense by ID
            triggerEditModalHandler(); // Trigger the modal after fetching the expense
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <nav className="navbar bg-light shadow p-3 d-flex gap-2">
                <div className="d-flex gap-1">
                    <h5><b>Files</b></h5>
                    <h5><b className="px-4">Expense Details</b></h5> {/* Tab name has to be changed */}
                </div>
                <div>
                    <button className="btn btn-primary" onClick={triggerModal}>
                        Add your Expense
                    </button>
                </div>
            </nav>

            {expenses.map((item: any) => (
                <div key={item.id} className="m-5 p-4 rounded shadow">
                    <div>
                        <h1>{item.name}</h1>
                        <div className="m-3">
                            <p><b>Category: </b>{item.category}</p>
                            <p><b>Date: </b>{item.date}</p>
                            <p><b>Amount: </b>{item.amount}</p>
                        </div>
                    </div>
                    <div className="d-flex gap-2">
                        <button className="btn btn-danger" onClick={() => deleteExpenseFromExpenses(item.id)}>Delete</button>
                        <button className="btn btn-warning" onClick={() => editExpenseFromExpenses(item.id)}>Edit</button>
                    </div>
                    <EditExpenseModal
                        isOpen={editModel}
                        onClose={closeEditModalHandler}
                        id={item.id} // Pass the selected expense to the modal
                    />
                </div>
            ))}

            {/* Use the ExpenseModal component */}
            <ExpenseModal isOpen={isModalOpen} onClose={closeModal} />

            {/* Use the EditExpenseModal component and pass the selected expense */}

        </div>
    );
};
