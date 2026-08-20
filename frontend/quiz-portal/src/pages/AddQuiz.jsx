import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AddQuiz.css";
import api from "../services/axiosConfig";

function AddQuiz() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [duration, setDuration] = useState("");
    const [passingScore, setPassingScore] = useState("");
    const [maxAttempts, setMaxAttempts] = useState("");
    const [quizStatus, setQuizStatus] = useState("");

    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);

    const [loadingQuestions, setLoadingQuestions] = useState(false);


    // ==========================================
    // Load Categories
    // ==========================================

    useEffect(() => {

        const fetchCategories = async () => {

            try {

                const response = await api.get(
                    "/api/admin/categories"
                );

                setCategories(response.data);

            } catch (error) {

                console.log("Error loading categories:", error);

            }
        };

        fetchCategories();

    }, []);


    // ==========================================
    // Load Questions When Category Changes
    // ==========================================

    useEffect(() => {

        if (!categoryId) {

            setQuestions([]);
            setSelectedQuestions([]);

            return;
        }

        const fetchQuestions = async () => {

            setLoadingQuestions(true);

            try {

                const response = await api.get(
                    `/api/admin/questions/category/${categoryId}`
                );

                console.log("Questions:", response.data);

                setQuestions(response.data);
                setSelectedQuestions([]);

            } catch (error) {

                console.log("Error loading questions:", error);

                setQuestions([]);

            } finally {

                setLoadingQuestions(false);
            }
        };

        fetchQuestions();

    }, [categoryId]);


    // ==========================================
    // Select / Unselect Question
    // ==========================================

    const handleQuestionSelection = (questionId) => {

        setSelectedQuestions((previous) => {

            if (previous.includes(questionId)) {

                return previous.filter(
                    id => id !== questionId
                );
            }

            return [...previous, questionId];

        });

    };


    // ==========================================
    // Submit Quiz
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // Validation

        if (!title.trim()) {

            alert("Please enter quiz title");
            return;
        }

        if (!categoryId) {

            alert("Please select category");
            return;
        }

        if (!difficulty) {

            alert("Please select difficulty");
            return;
        }

        if (!duration) {

            alert("Please enter duration");
            return;
        }

        if (!passingScore) {

            alert("Please enter passing score");
            return;
        }

        if (!maxAttempts) {

            alert("Please enter maximum attempts");
            return;
        }

        if (!quizStatus) {

            alert("Please select quiz status");
            return;
        }

        if (selectedQuestions.length === 0) {

            alert("Please select at least one question");
            return;
        }


        // ==========================================
        // Request Body
        // ==========================================

        const quizData = {

            title: title,

            description: description,

            category: {
                id: Number(categoryId)
            },

            difficulty: difficulty,

            duration: Number(duration),

            passingScore: Number(passingScore),

            maxAttempts: Number(maxAttempts),

            quizStatus: quizStatus,

            questions: selectedQuestions.map(questionId => ({
                id: questionId
            }))
        };


        console.log("Quiz request:", quizData);


        try {

            const response = await api.post(
                "/api/admin/quizzes/createQuiz",
                quizData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Quiz created:", response.data);

            alert("Quiz created successfully!");

            navigate("/quizzes");

        } catch (error) {

            console.log("Error creating quiz:", error);

            if (error.response) {

                console.log(
                    "Backend response:",
                    error.response.data
                );
            }

            alert("Failed to create quiz");
        }
    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="add-quiz-page">

            <div className="add-quiz-container">

                <h2>Create Quiz</h2>


                <form
                    className="add-quiz-form"
                    onSubmit={handleSubmit}
                >

                    {/* ================= TITLE ================= */}

                    <div className="form-group">

                        <label>
                            Quiz Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            placeholder="Enter quiz title"
                        />

                    </div>


                    {/* ================= DESCRIPTION ================= */}

                    <div className="form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            placeholder="Enter quiz description"
                            rows="4"
                        />

                    </div>


                    {/* ================= CATEGORY ================= */}

                    <div className="form-group">

                        <label>
                            Category
                        </label>

                        <select
                            value={categoryId}
                            onChange={(e) =>
                                setCategoryId(e.target.value)
                            }
                        >

                            <option value="">
                                Select Category
                            </option>

                            {categories.map(category => (

                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* ================= DIFFICULTY ================= */}

                    <div className="form-group">

                        <label>
                            Difficulty
                        </label>

                        <select
                            value={difficulty}
                            onChange={(e) =>
                                setDifficulty(e.target.value)
                            }
                        >

                            <option value="">
                                Select Difficulty
                            </option>

                            <option value="EASY">
                                Easy
                            </option>

                            <option value="MEDIUM">
                                Medium
                            </option>

                            <option value="HARD">
                                Hard
                            </option>

                        </select>

                    </div>


                    {/* ================= DURATION ================= */}

                    <div className="form-group">

                        <label>
                            Duration (minutes)
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={duration}
                            onChange={(e) =>
                                setDuration(e.target.value)
                            }
                            placeholder="Example: 30"
                        />

                    </div>


                    {/* ================= PASSING SCORE ================= */}

                    <div className="form-group">

                        <label>
                            Passing Score
                        </label>

                        <input
                            type="number"
                            min="0"
                            value={passingScore}
                            onChange={(e) =>
                                setPassingScore(e.target.value)
                            }
                            placeholder="Example: 60"
                        />

                    </div>


                    {/* ================= MAX ATTEMPTS ================= */}

                    <div className="form-group">

                        <label>
                            Maximum Attempts
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={maxAttempts}
                            onChange={(e) =>
                                setMaxAttempts(e.target.value)
                            }
                            placeholder="Example: 3"
                        />

                    </div>


                    {/* ================= STATUS ================= */}

                    <div className="form-group">

                        <label>
                            Quiz Status
                        </label>

                        <select
                            value={quizStatus}
                            onChange={(e) =>
                                setQuizStatus(e.target.value)
                            }
                        >

                            <option value="">
                                Select Status
                            </option>

                            <option value="DRAFT">
                                Draft
                            </option>

                            <option value="PUBLISHED">
                                Published
                            </option>

                            <option value="UNPUBLISHED">
                                UNPUBLISHED
                            </option>

                        </select>

                    </div>


                    {/* ================= QUESTIONS ================= */}

                    {categoryId && (

                        <div className="questions-section">

                            <h3>
                                Select Questions
                            </h3>


                            {loadingQuestions && (

                                <p>
                                    Loading questions...
                                </p>

                            )}


                            {!loadingQuestions &&
                                questions.length === 0 && (

                                    <p>
                                        No questions available
                                        for this category.
                                    </p>

                                )}


                            <div className="question-list">

                                {questions.map(question => (

                                    <div
                                        className="question-item"
                                        key={question.id}
                                    >

                                        <input
                                            type="checkbox"
                                            checked={selectedQuestions.includes(
                                                question.id
                                            )}
                                            onChange={() =>
                                                handleQuestionSelection(
                                                    question.id
                                                )
                                            }
                                        />


                                        <div className="question-content">

                                            <p>
                                                {question.questionText}
                                            </p>

                                            <span>
                                                {question.difficulty}
                                            </span>

                                        </div>

                                    </div>

                                ))}

                            </div>


                            <p className="selected-count">

                                Selected Questions:
                                {" "}
                                {selectedQuestions.length}

                            </p>

                        </div>

                    )}


                    {/* ================= BUTTONS ================= */}

                    <div className="form-buttons">

                        <button
                            type="submit"
                            className="create-quiz-btn"
                        >
                            Create Quiz
                        </button>


                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() =>
                                navigate("/quizzes")
                            }
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddQuiz;