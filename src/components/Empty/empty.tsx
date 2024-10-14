import React, { useState } from "react";
import { Modal } from "../Modal/model";
import ManualExpenceInputForm from "../FormComponent/manualExpenceInputForm";
import FileExpenceInputForm from "../FormComponent/FileInputExpenceForm";

let formTypes = {
    initial: "NONE",
    individualDetails: 'UPDATE INDIVIDUALY',
    addFiles: 'ADD FILES'
}
export const Empty = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [formType, setFormType] = useState(formTypes.initial);

    const triggerModal = () => {
        setIsModalOpen(true); // Open the modal when the button is clicked
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    let updateFormType = (event: any) => {
        setFormType(event.target.value);
    }

    let displayForms = () => {
        switch (formType) {
            case formTypes.initial:
                return null;
            case formTypes.individualDetails:
                return <ManualExpenceInputForm />
            case formTypes.addFiles:
                return <FileExpenceInputForm />
            default:
                return null;
        }
    }
    console.log(formType);
    return (
        <div className="align-center-of-the-page">
            <h1 className="text-success">Start your Journey with us now</h1>
            <p>There are no existing expenses</p>
            <button className="btn btn-primary" onClick={triggerModal}>
                Add your Expense
            </button>

            {/* Conditionally render the modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Add your Expense">
                <form>
                    <select onChange={updateFormType} defaultValue='' className="rounded">
                        <option value="" disabled>
                            -- Select an option --
                        </option>
                        <option value={formTypes.individualDetails}>Upload Details</option>
                        <option value={formTypes.addFiles}>Upload File</option>
                    </select>
                </form>
                <div className="mt-3">
                    {displayForms()}
                </div>
            </Modal>
        </div>
    );
};
