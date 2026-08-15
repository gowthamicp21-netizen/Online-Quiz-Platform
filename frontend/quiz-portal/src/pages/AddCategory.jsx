import React, { useState } from "react";
import axios from "axios";
import '../styles/AddCategory.css';

function AddCategory() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const categoryData = {
            name: name,
            description: description
        };

        try {
            const response = await axios.post(
                "http://localhost:8080/api/admin/categories",
                categoryData
            );

            console.log("Category added:", response.data);

            alert("Category added successfully!");

            setName("");
            setDescription("");
        } catch (error) {
            console.error("Error adding category:", error);
            alert("Failed to add category");
        }
    };

    return (
        <div className="category-container">
            <h2>Add Category</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Category Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter category name"
                        required
                    />
                </div>

                <div>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter category description"
                        rows="4"
                        required
                    />
                </div>

                <button type="submit">
                    Add Category
                </button>

            </form>
        </div>
    );
}

export default AddCategory;