import React, {useEffect, useState} from 'react';
import {IProductMutation} from "../types";
import {useAppDispatch, useAppSelector} from "../app/hook";
import {selectCategories} from "../store/categoriesSlice";
import FileInput from "./FileInput";
import {selectCreateLoading} from "../store/productsSlice";
import BtnSpinner from "./Spinner/BtnSpinner";
import {useNavigate} from "react-router-dom";
import {createProducts} from "../store/productsThunk";
import {fetchCategories} from "../store/categoriesThunk";

const AddForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const categories = useAppSelector(selectCategories);
    const createLoading = useAppSelector(selectCreateLoading);
    const [state, setState] = useState<IProductMutation>({
        title: '',
        category: '',
        price: '',
        description: '',
        image: null
    });

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setState(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;

        if (files) {
            setState(prevState => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!state.description && !state.image && !state.price && !state.title && !state.category) {
            alert('Fill the form!');
            return;
        }
        try {
            await dispatch(createProducts(state)).unwrap();
            navigate('/');
        } catch (e) {
            alert('Something is wrong!');
        } finally {
            setState(() => ({
                title: '',
                category: '',
                price: '',
                description: '',
                image: null
            }));
        }
    };


    return (
        <form className="form" onSubmit={submitFormHandler}>
            <div className="input-wrap">
                <label htmlFor="title" className="form-label">Title:</label>
                <input
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                    value={state.title}
                    onChange={inputChangeHandler}
                />
            </div>
            <div className="input-wrap">
                <label htmlFor="price" className="form-label">Price:</label>
                <input
                    type="text"
                    className="form-control"
                    name="price"
                    id="price"
                    value={state.price}
                    onChange={inputChangeHandler}
                />
            </div>
            <div className="input-wrap">
                <label htmlFor="description" className="form-label">Description:</label>
                <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    value={state.description}
                    onChange={inputChangeHandler}
                />
            </div>
            <div className="input-wrap">
                <label htmlFor="category" className="form-label">Category:</label>
                <select value={state.category}
                        required
                        onChange={inputChangeHandler}
                        name="category"
                        id="category"
                        className="form-control">
                    <option value="" disabled defaultValue="">Select category:</option>
                    {categories.map((item, index) => (
                        <option value={item._id} key={index}>{item.title}</option>
                    ))}
                </select>
            </div>
            <>
                <FileInput onChange={filesInputChangeHandler} name="image" label="Image:" />
            </>
            <div className="input-wrap">
                <button
                    type="submit"
                    className="form-btn"
                    disabled={createLoading}
                >
                    {createLoading && <BtnSpinner/>}
                    Create
                </button>
            </div>
        </form>
    );
};

export default AddForm;