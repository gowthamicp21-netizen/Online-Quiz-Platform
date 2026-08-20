import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/axiosConfig";
import "../styles/UpdateQuiz.css";

function UpdateQuiz() {

    const { quizId } = useParams();
    const navigate = useNavigate();

    // ==============================
    // Quiz State
    // ==============================

    const [quizName, setQuizName] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");


    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);


    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

  
    useEffect(() => {

        if (quizId) {
            fetchData();
        }

    }, [quizId]);


    const fetchData = async () => {

        try {

            setLoading(true);
            setError("");

         

            const quizResponse = await api.get(
                `/api/admin/quizzes/quiz/${quizId}`
            );

            const quiz = quizResponse.data;

            console.log("Quiz:", quiz);

            // Quiz Name
            setQuizName(
                quiz.title ||
                ""
            );

            // Description
            setDescription(
                quiz.description || ""
            );

            // Category
            if (quiz.category) {

                setCategoryId(
                    String(quiz.category.id)
                );

            } else if (quiz.categoryId) {

                setCategoryId(
                    String(quiz.categoryId)
                );

            } else {

                setCategoryId("");

            }


         

            const categoryResponse =
                await api.get(
                    "/api/admin/categories"
                );

            console.log(
                "Categories:",
                categoryResponse.data
            );

            setCategories(
                categoryResponse.data
            );


           
            const questionResponse =
                await api.get(
                    `/api/admin/quizzes/${quizId}/questions`
                );

            console.log(
                "Questions:",
                questionResponse.data
            );

            setQuestions(
                questionResponse.data || []
            );

        } catch (error) {

            console.error(
                "Error loading quiz:",
                error.response?.data || error
            );

            setError(
                error.response?.data ||
                "Failed to load quiz."
            );

        } finally {

            setLoading(false);

        }

    };


    const removeQuestion = (questionId) => {

        const confirmRemove = window.confirm(
            "Are you sure you want to remove this question from the quiz?"
        );

        if (!confirmRemove) {
            return;
        }

        setQuestions(prevQuestions =>
            prevQuestions.filter(
                question => question.id !== questionId
            )
        );

    };


    

    const refreshQuestions = async () => {

        try {

            const response = await api.get(
                `/api/admin/quizzes/${quizId}/questions`
            );

            setQuestions(
                response.data || []
            );

        } catch (error) {

            console.error(
                "Error refreshing questions:",
                error
            );

        }

    };


   

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        if (!quizName.trim()) {

            alert("Please enter quiz name.");

            return;

        }


        if (!description.trim()) {

            alert("Please enter description.");

            return;

        }


        if (!categoryId) {

            alert("Please select category.");

            return;

        }


      

        const questionIds = questions.map(
            question => question.id
        );


      

        const requestData = {

            title: quizName.trim(),

            description: description.trim(),

            category: {
                id: Number(categoryId)
            },

            questionIds: questionIds

        };


        console.log(
            "Updating quiz:",
            requestData
        );


        try {

            setSaving(true);


            // =====================================
            // Update Quiz
            // =====================================

            const response = await api.put(
                `/api/admin/quizzes/${quizId}`,
                requestData
            );


            console.log(
                "Update response:",
                response.data
            );


            alert(
                "Quiz updated successfully!"
            );


            // Go back
            navigate(-1);


        } catch (error) {

            console.error(
                "Update error:",
                error.response?.data || error
            );


            setError(
                error.response?.data ||
                "Failed to update quiz."
            );

        } finally {

            setSaving(false);

        }

    };


    // ==============================
    // Loading Screen
    // ==============================

    if (loading) {

        return (

            <div className="update-quiz-loading">

                <h2>
                    Loading quiz...
                </h2>

            </div>

        );

    }


    // ==============================
    // JSX
    // ==============================

    return (

        <div className="update-quiz-page">

            <div className="update-quiz-card">


                {/* =====================================
                    Header
                ====================================== */}

                <div className="update-quiz-header">

                    <div>

                        <h1 className="update-quiz-title">
                            Update Quiz
                        </h1>

                        <p>
                            Update quiz details and manage questions
                        </p>

                    </div>

                </div>


                {/* =====================================
                    Error
                ====================================== */}

                {error && (

                    <div className="update-quiz-error">

                        {error}

                    </div>

                )}


                {/* =====================================
                    Form
                ====================================== */}

                <form
                    onSubmit={handleSubmit}
                    className="update-quiz-form"
                >


                    {/* =================================
                        Quiz Name
                    ================================= */}

                    <div className="quiz-field">

                        <label>
                            Quiz Name
                        </label>

                        <input
                            type="text"
                            value={quizName}
                            onChange={(e) =>
                                setQuizName(
                                    e.target.value
                                )
                            }
                            placeholder="Enter quiz name"
                            disabled={saving}
                            required
                        />

                    </div>


                    {/* =================================
                        Description
                    ================================= */}

                    <div className="quiz-field">

                        <label>
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            placeholder="Enter quiz description"
                            rows={5}
                            disabled={saving}
                            required
                        />

                    </div>


                    {/* =================================
                        Category
                    ================================= */}

                    <div className="quiz-field">

                        <label>
                            Category
                        </label>

                        <select
                            value={categoryId}
                            onChange={(e) =>
                                setCategoryId(
                                    e.target.value
                                )
                            }
                            disabled={saving}
                            required
                        >

                            <option value="">
                                Select Category
                            </option>


                            {categories.map(
                                (category) => (

                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* =================================
                        Questions Section
                    ================================= */}

                    <div className="quiz-questions-section">

                        <div className="questions-header">

                            <div>

                                <h2>
                                    Questions
                                </h2>

                                <p>
                                    Questions currently added to this quiz
                                </p>

                            </div>


                            <span className="question-count">

                                {questions.length}

                                {" "}

                                {questions.length === 1
                                    ? "Question"
                                    : "Questions"
                                }

                            </span>

                        </div>


                        {/* =================================
                            No Questions
                        ================================= */}

                        {questions.length === 0 ? (

                            <div className="no-questions">

                                <h3>
                                    No questions added
                                </h3>

                                <p>
                                    This quiz currently has no questions.
                                </p>

                            </div>

                        ) : (

                            /* =================================
                               Questions List
                            ================================= */

                            <div className="questions-list">

                                {questions.map(
                                    (question, index) => (

                                        <div
                                            className="quiz-question-card"
                                            key={question.id}
                                        >


                                            {/* Question Number */}

                                            <div className="question-number">

                                                {index + 1}

                                            </div>


                                            {/* Question Content */}

                                            <div className="question-content">

                                                <p className="question-text">

                                                    {question.questionText ||
                                                        question.question_text ||
                                                        "Question text not available"
                                                    }

                                                </p>


                                                <div className="question-info">

                                                    <span>

                                                        <strong>
                                                            Difficulty:
                                                        </strong>

                                                        {" "}

                                                        {question.difficulty ||
                                                            "N/A"
                                                        }

                                                    </span>


                                                    <span>

                                                        <strong>
                                                            Marks:
                                                        </strong>

                                                        {" "}

                                                        {question.marks ??
                                                            "N/A"
                                                        }

                                                    </span>


                                                    <span>

                                                        <strong>
                                                            ID:
                                                        </strong>

                                                        {" "}

                                                        {question.id}

                                                    </span>

                                                </div>

                                            </div>


                                            {/* Remove Button */}

                                            <button
                                                type="button"
                                                className="remove-question-button"
                                                onClick={() =>
                                                    removeQuestion(
                                                        question.id
                                                    )
                                                }
                                                disabled={saving}
                                            >

                                                Remove

                                            </button>

                                        </div>

                                    )
                                )}

                            </div>

                        )}

                    </div>


                    {/* =====================================
                        Summary
                    ====================================== */}

                    <div className="quiz-update-summary">

                        <div>

                            <strong>
                                Quiz ID:
                            </strong>

                            {" "}

                            {quizId}

                        </div>


                        <div>

                            <strong>
                                Total Questions:
                            </strong>

                            {" "}

                            {questions.length}

                        </div>

                    </div>


                  

                    <div className="update-quiz-buttons">


                        {/* Cancel */}

                        <button
                            type="button"
                            className="cancel-quiz-button"
                            onClick={() =>
                                navigate(-1)
                            }
                            disabled={saving}
                        >

                            Cancel

                        </button>


                        {/* Update */}

                        <button
                            type="submit"
                            className="save-quiz-button"
                            disabled={saving}
                        >

                            {saving
                                ? "Updating..."
                                : "Update Quiz"
                            }

                        </button>

                    </div>


                </form>

            </div>

        </div>

    );

}

export default UpdateQuiz;