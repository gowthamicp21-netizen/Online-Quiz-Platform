import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axiosConfig";
import "../styles/QuizManagement.css";

function QuizManagement() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const [quizzes, setQuizzes] = useState([]);

    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingQuizzes, setLoadingQuizzes] = useState(false);

    const [error, setError] = useState("");


    // =====================================
    // Fetch Categories
    // =====================================

    useEffect(() => {

        fetchCategories();

    }, []);


    const fetchCategories = async () => {

        try {

            setLoadingCategories(true);
            setError("");

            const response = await api.get(
                "/api/admin/categories"
            );

            console.log(
                "Categories:",
                response.data
            );

            setCategories(response.data);

            // Automatically select first category

            if (response.data.length > 0) {

                setSelectedCategory(
                    response.data[0].id
                );

            }

        } catch (error) {

            console.error(
                "Error fetching categories:",
                error.response?.data || error
            );

            setError(
                "Failed to load categories."
            );

        } finally {

            setLoadingCategories(false);

        }

    };


    // =====================================
    // Fetch Quizzes By Category
    // =====================================

    useEffect(() => {

        if (selectedCategory) {

            fetchQuizzesByCategory(
                selectedCategory
            );

        }

    }, [selectedCategory]);


    const fetchQuizzesByCategory = async (
        categoryId
    ) => {

        try {

            setLoadingQuizzes(true);
            setError("");

            const response = await api.get(
                `/api/admin/quizzes/category/${categoryId}`
            );

            console.log(
                "Quizzes:",
                response.data
            );

            setQuizzes(response.data);

        } catch (error) {

            console.error(
                "Error fetching quizzes:",
                error.response?.data || error
            );

            setQuizzes([]);

            setError(
                "Failed to load quizzes."
            );

        } finally {

            setLoadingQuizzes(false);

        }

    };


    // =====================================
    // Delete Quiz
    // =====================================

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this quiz?"
            );

        if (!confirmDelete) {
            return;
        }


        try {

            await api.delete(
                `/api/admin/quizzes/delete/${id}`
            );

            alert(
                "Quiz deleted successfully!"
            );

           

            setQuizzes(
                quizzes.filter(
                    quiz => quiz.id !== id
                )
            );

        } catch (error) {

            console.error(
                "Error deleting quiz:",
                error.response?.data || error
            );

            setError(
                "Failed to delete quiz."
            );

        }

    };


    return (

        <div className="quiz-management">

            <div className="quiz-header">

                <div>

                    <h1>
                        Quiz Management
                    </h1>

                    <p>
                        Manage quizzes by category
                    </p>

                </div>


                <button

                    className="add-quiz-button"

                    onClick={() =>
                        navigate("/addQuiz")
                    }

                >

                    + Add Quiz

                </button>

            </div>


         

            {error && (

                <p className="error">
                    {error}
                </p>

            )}


           
            <div className="category-section">

                <h3>
                    Categories
                </h3>


                {loadingCategories ? (

                    <p>
                        Loading categories...
                    </p>

                ) : categories.length === 0 ? (

                    <p>
                        No categories found.
                    </p>

                ) : (

                    <div className="category-buttons">

                        {categories.map(
                            category => (

                                <button

                                    key={category.id}

                                    className={
                                        selectedCategory ==
                                        category.id
                                            ? "category-button active"
                                            : "category-button"
                                    }

                                    onClick={() =>
                                        setSelectedCategory(
                                            category.id
                                        )
                                    }

                                >

                                    {category.name}

                                </button>

                            )
                        )}

                    </div>

                )}

            </div>


          
            {selectedCategory && (

                <div className="selected-category">

                    <h2>

                        {categories.find(
                            category =>
                                category.id ==
                                selectedCategory
                        )?.name}

                        {" "}Quizzes

                    </h2>

                </div>

            )}



            {loadingQuizzes && (

                <p className="loading">
                    Loading quizzes...
                </p>

            )}


          

            {!loadingQuizzes &&
                selectedCategory &&
                quizzes.length === 0 && (

                    <div className="empty-quiz">

                        <h3>
                            No quizzes found
                        </h3>

                        <p>
                            This category doesn't
                            have any quizzes yet.
                        </p>

                    </div>

                )}


            {!loadingQuizzes &&
                quizzes.length > 0 && (

                    <div className="quiz-table-container">

                        <table className="quiz-table">

                            <thead>

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        Quiz Name
                                    </th>

                                    <th>
                                        Description
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {quizzes.map(
                                    quiz => (

                                        <tr
                                            key={quiz.id}
                                        >

                                            <td>
                                                {quiz.id}
                                            </td>


                                            <td className="quiz-name">

                                                {quiz.name ||
                                                    quiz.title}

                                            </td>


                                            <td>

                                                {quiz.description ||
                                                    "No description"}

                                            </td>


                                            <td>

                                                <button

                                                    className="edit-quiz-button"

                                                    onClick={() =>
                                                        navigate(
                                                            `/updateQuiz/${quiz.id}`
                                                        )
                                                    }

                                                >

                                                    Edit

                                                </button>


                                                <button

                                                    className="delete-quiz-button"

                                                    onClick={() =>
                                                        handleDelete(
                                                            quiz.id
                                                        )
                                                    }

                                                >

                                                    Delete

                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

        </div>

    );

}

export default QuizManagement;