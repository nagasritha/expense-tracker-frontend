import React, { useEffect } from "react";
import './homeSuccessPage.css'
import { useSelector } from "react-redux";
import { useState } from "react";
import { ExpenseModal } from "../ExpenseModel/expenseform.model";

export const HomeSuccessPage = () => {
    let { expenses } = useSelector((state: any) => state.expenses);
    console.log(expenses);
    useEffect(()=>{
        console.log(expenses);
    },[expenses])
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    const triggerModal = () => {
        setIsModalOpen(true); // Open the modal when the button is clicked
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div>
            <nav className="navbar bg-light shadow p-3 d-flex gap-2">
                <div className="d-flex gap-1">
                    <h5><b>Files</b></h5>
                    <h5><b className="px-4">Expense Details</b></h5> {/*tab name has to be changed */}
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
                        <button className="btn btn-danger">Delete</button>
                        <button className="btn btn-warning">Edit</button>
                    </div>

                </div>
            ))}

            {/* Use the ExpenseModal component */}
            <ExpenseModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    )

} 