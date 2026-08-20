
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/axiosConfig";
import "../styles/UpdateCategory.css";

function UpdateCategory() {

    const { categoryId } = useParams();
    const navigate = useNavigate();

    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCategory();
    }, [categoryId]);

    const fetchCategory = async () => {

        try {

            setLoading(true);

            const response = await api.get(
                `/api/admin/categories/${categoryId}`
            );

            setCategoryName(response.data.name);
            setDescription(response.data.description);

        } catch (error) {

            console.error(
                "Error fetching category:",
                error.response?.data || error
            );

            setError("Failed to load category.");

        } finally {

            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            await api.put(
                `/api/admin/categories/${categoryId}`,
                {
                    name: categoryName,
                    description: description
                }
            );

            alert("Category updated successfully!");

            navigate("/adminDashboard");

        } catch (error) {

            console.error(
                "Error updating category:",
                error.response?.data || error
            );

            setError("Failed to update category.");
        }
    };

    if (loading) {
    return (
        <p className="update-category-loading">
            Loading category...
        </p>
    );
}
    return (

        <div className="update-category-container">

            <h1>Update Category</h1>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            <form onSubmit={handleUpdate}>

                <div className="form-group">

                    <label>
                        Category Name
                    </label>

                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) =>
                            setCategoryName(e.target.value)
                        }
                        required
                    />

                </div>

                <div className="form-group">

                    <label>
                        Description
                    </label>

                    <textarea
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        required
                    />

                </div>

                <div className="button-group">

                    <button
                        type="submit"
                        className="update-button"
                    >
                        Update Category
                    </button>

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => navigate("/adminDashboard")}
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    );
}

export default UpdateCategory;