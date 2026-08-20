import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/UpdateQuestion.css";
import api from "../services/axiosConfig";

function UpdateQuestion() {

    const { questionId } = useParams();
    const navigate = useNavigate();

    const [questionText, setQuestionText] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [marks, setMarks] = useState("");

    const [options, setOptions] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchQuestion = async () => {

            try {

                setLoading(true);
                setError("");

                // ==============================
                // Fetch Question
                // ==============================

                const response = await api.get(
                    `/api/admin/questions/${questionId}`
                );

                const question = response.data;

                console.log(
                    "Question from backend:",
                    question
                );

                // Set question details

                setQuestionText(
                    question.questionText || ""
                );

                setDifficulty(
                    question.difficulty || ""
                );

                setMarks(
                    question.marks ?? ""
                );


                // ==============================
                // Fetch Options
                // ==============================

                const optionResponse = await api.get(
                    `/api/admin/questions/options/${questionId}`
                );

                console.log(
                    "Options from backend:",
                    optionResponse.data
                );


                // Set options

                setOptions(
                    (optionResponse.data || []).map(option => ({

                        id: option.id,

                        option: option.option || "",

                        correct: option.correct === true

                    }))
                );

            } catch (error) {

                console.error(
                    "Error fetching question:",
                    error.response?.data || error
                );

                setError(
                    "Unable to load question."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchQuestion();

    }, [questionId]);


    // =====================================
    // Question Change
    // =====================================

    const handleQuestionChange = (e) => {

        setQuestionText(e.target.value);

    };


    // =====================================
    // Difficulty Change
    // =====================================

    const handleDifficultyChange = (e) => {

        setDifficulty(e.target.value);

    };


    // =====================================
    // Marks Change
    // =====================================

    const handleMarksChange = (e) => {

        setMarks(e.target.value);

    };


    // =====================================
    // Option Text Change
    // =====================================

    const handleOptionChange = (index, value) => {

        const updatedOptions = [...options];

        updatedOptions[index] = {

            ...updatedOptions[index],

            option: value

        };

        setOptions(updatedOptions);

    };


    // =====================================
    // Correct Option Change
    // =====================================

    const handleCorrectChange = (index) => {

        const updatedOptions = [...options];

        updatedOptions[index] = {

            ...updatedOptions[index],

            correct: !updatedOptions[index].correct

        };

        setOptions(updatedOptions);

    };


    // =====================================
    // Add Option
    // =====================================

    const addOption = () => {

        setOptions([

            ...options,

            {
                id: null,
                option: "",
                correct: false
            }

        ]);

    };


    // =====================================
    // Remove Option
    // =====================================

    const removeOption = (index) => {

        const updatedOptions = options.filter(
            (_, optionIndex) =>
                optionIndex !== index
        );

        setOptions(updatedOptions);

    };


    // =====================================
    // Submit
    // =====================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        // Validate question

        if (!questionText.trim()) {

            alert("Please enter question.");

            return;

        }


        // Validate difficulty

        if (!difficulty) {

            alert("Please select difficulty.");

            return;

        }


        // Validate marks

        if (!marks || Number(marks) <= 0) {

            alert("Please enter valid marks.");

            return;

        }


        // Validate options

        if (options.length === 0) {

            alert("Please add at least one option.");

            return;

        }


        // Check empty options

        for (let option of options) {

            if (!option.option.trim()) {

                alert("Please enter all options.");

                return;

            }

        }


        // Check correct option

        const correctOptions =
            options.filter(
                option => option.correct
            );


        if (correctOptions.length === 0) {

            alert(
                "Please select at least one correct option."
            );

            return;

        }


        // =====================================
        // Request Body
        // =====================================

        const requestData = {

            question: {

                questionText:
                    questionText.trim(),

                difficulty:
                    difficulty,

                marks:
                    Number(marks)

            },

            options:
                options.map(option => ({

                    id:
                        option.id,

                    option:
                        option.option.trim(),

                    correct:
                        option.correct

                }))

        };


        console.log(
            "Sending update:",
            requestData
        );


        try {

            const response = await api.put(

                `/api/admin/questions/${questionId}`,

                requestData

            );


            console.log(
                "Update response:",
                response.data
            );


            alert(
                "Question updated successfully!"
            );


            navigate(-1);


        } catch (error) {

            console.error(
                "Update error:",
                error.response?.data || error
            );


            setError(
                error.response?.data ||
                "Failed to update question."
            );

        }

    };


    // =====================================
    // Loading
    // =====================================

    if (loading) {

        return (

            <div className="update-question-loading">

                <h2>
                    Loading question...
                </h2>

            </div>

        );

    }


    // =====================================
    // UI
    // =====================================

    return (

        <div className="update-question-page">

            <div className="update-question-card">

                <h2 className="update-question-title">
                    Update Question
                </h2>


                {/* Error */}

                {error && (

                    <p className="error">
                        {error}
                    </p>

                )}


                <form onSubmit={handleSubmit}>


                    {/* =====================
                        Question
                    ===================== */}

                    <div className="question-field">

                        <label>
                            Question
                        </label>

                        <textarea

                            className="question-textarea"

                            value={questionText}

                            onChange={
                                handleQuestionChange
                            }

                            placeholder="Enter question"

                            rows="4"

                            required

                        />

                    </div>


                    {/* =====================
                        Difficulty
                    ===================== */}

                    <div className="difficulty-field">

                        <label>
                            Difficulty
                        </label>

                        <select

                            className="difficulty-select"

                            value={difficulty}

                            onChange={
                                handleDifficultyChange
                            }

                            required

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


                    {/* =====================
                        Marks
                    ===================== */}

                    <div className="marks-field">

                        <label>
                            Marks
                        </label>

                        <input

                            className="marks-input"

                            type="number"

                            value={marks}

                            onChange={
                                handleMarksChange
                            }

                            min="1"

                            required

                        />

                    </div>


                    {/* =====================
                        Options
                    ===================== */}

                    <div className="options-section">

                        <h3>
                            Options
                        </h3>


                        {options.length === 0 && (

                            <p>
                                No options found.
                                Add an option below.
                            </p>

                        )}


                        {options.map(
                            (option, index) => (

                                <div

                                    key={
                                        option.id ??
                                        `new-${index}`
                                    }

                                    className="option-row"

                                >

                                    <span className="option-label">

                                        Option {index + 1}

                                    </span>


                                    <input

                                        className="option-input"

                                        type="text"

                                        value={
                                            option.option
                                        }

                                        onChange={(e) =>
                                            handleOptionChange(
                                                index,
                                                e.target.value
                                            )
                                        }

                                        placeholder={
                                            `Enter option ${index + 1}`
                                        }

                                        required

                                    />


                                    <label className="correct-label">

                                        <input

                                            type="checkbox"

                                            checked={
                                                option.correct
                                            }

                                            onChange={() =>
                                                handleCorrectChange(
                                                    index
                                                )
                                            }

                                        />

                                        Correct

                                    </label>


                                    <button

                                        type="button"

                                        className="remove-option-button"

                                        onClick={() =>
                                            removeOption(
                                                index
                                            )
                                        }

                                    >

                                        Remove

                                    </button>

                                </div>

                            )
                        )}


                        {/* Add Option */}

                        <div className="option-actions">

                            <button

                                type="button"

                                className="add-option-button"

                                onClick={addOption}

                            >

                                + Add Option

                            </button>

                        </div>

                    </div>


                    {/* =====================
                        Buttons
                    ===================== */}

                    <div className="form-buttons">

                        <button

                            type="button"

                            className="cancel-question-button"

                            onClick={() =>
                                navigate(-1)
                            }

                        >

                            Cancel

                        </button>


                        <button

                            type="submit"

                            className="update-question-button"

                        >

                            Update Question

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default UpdateQuestion;