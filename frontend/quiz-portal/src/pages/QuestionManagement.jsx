import React, { useEffect, useState } from "react";
import api from "../services/axiosConfig";
import { useNavigate } from "react-router-dom";
import "../styles/QuestionManagement.css";

function QuestionManagement() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {

        try {

            setLoading(true);

            const response = await api.get(
                "/api/admin/categories"
            );

            setCategories(response.data);

        } catch (error) {

            console.error(
                "Error fetching categories:",
                error
            );

            setError("Failed to load categories.");

        } finally {

            setLoading(false);
        }
    };

    const handleCategoryClick = (categoryId) => {

        navigate(`/category/${categoryId}`);

    };

    return (

        <div className="question-management">

            <div className="question-header">

                <div>
                    <h1>Questions</h1>

                    <p>
                        Select a category to manage questions
                    </p>
                </div>

                <button
                    className="add-question-button"
                    onClick={() => navigate("/addQuestion")}
                >
                    + Add Question
                </button>

            </div>

            {loading && (
                <p className="loading">
                    Loading categories...
                </p>
            )}

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            {!loading &&
                !error &&
                categories.length === 0 && (

                    <div className="empty-category">

                        <h3>
                            No categories found
                        </h3>

                        <p>
                            Add a category before adding questions.
                        </p>

                    </div>
                )}

            {!loading &&
                !error &&
                categories.length > 0 && (

                    <div className="category-cards">

                        {categories.map((category) => (

                            <div
                                key={category.id}
                                className="category-card"
                                onClick={() =>
                                    handleCategoryClick(category.id)
                                }
                            >

                                <div className="category-icon">
                                    ?
                                </div>

                                <div className="category-info">

                                    <h2>
                                        {category.name}
                                    </h2>

                                    <p>
                                        {category.description}
                                    </p>

                                </div>

                                <span className="arrow">
                                    →
                                </span>

                            </div>

                        ))}

                    </div>
                )}

        </div>
    );
}

export default QuestionManagement;