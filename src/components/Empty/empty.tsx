// src/components/Empty.tsx

import React, { useState } from "react";
import { ExpenseModal } from "../ExpenseModel/expenseform.model"; // Import the new ExpenseModal
import './empty.css';

export const Empty = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    const triggerModal = () => {
        setIsModalOpen(true); // Open the modal when the button is clicked
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div className="align-center-of-the-page">
            <h1 className="text-success">Start your Journey with us now</h1>
            <img src='https://res.cloudinary.com/dkredoejm/image/upload/c_thumb,w_200,g_face/v1728984364/emptyexpencepage_fi9yzl.png' alt='empty' className='emptyImage'/>
            <p>There are no existing expenses</p>
            <button className="btn btn-primary" onClick={triggerModal}>
                Add your Expense
            </button>

            {/* Use the ExpenseModal component */}
            <ExpenseModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};
