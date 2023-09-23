import React from 'react';
import AppToolbar from "../components/AppToolbar/AppToolbar";
import AddForm from "../components/AddForm";

const NewProduct = () => {
    return (
        <>
            <AppToolbar/>
            <div className="container">
                <h2 className="add-title">Add new Product!</h2>
                <AddForm/>
            </div>
        </>
    );
};

export default NewProduct;