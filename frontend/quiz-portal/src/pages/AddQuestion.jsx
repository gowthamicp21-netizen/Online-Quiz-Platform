import React, { useState } from "react";
import axios from "axios";
import "../styles/AddQuestion.css";
import  { useEffect } from "react";

function AddQuestion() {

    const [questionText, setQuestionText] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [marks, setMarks] = useState("");
    const[categories,setCategories]=useState([]);
    const[categoryId,setCategoryId]=useState();
    const[questionId,setQuestionId]=useState();

    const [options, setOptions] = useState([
        { option: "", is_correct: false ,question:null },
        { option: "", is_correct: false, question: null},
        { option: "", is_correct: false ,question:null},
        { option: "", is_correct: false ,question: null}
    ]);

    // useEffect(() => {
    // axios
    //     .get("http://localhost:8080/api/admin/categories")
    //     .then(response => {
    //         setCategories(response.data);
    //     })
    //     .catch(error => {
    //         console.error("Error fetching categories:", error);
    //     });
    // }, []);

    useEffect(() => {
    if (questionId) {
        setOptions(prevOptions =>
            prevOptions.map(opt => ({
                ...opt,
                question: {
                    id: Number(questionId)
                }
            }))
        );
    }
    }, [questionId]);

    useEffect(() => {

    axios
        .get("http://localhost:8080/api/admin/categories")
        .then(response => {
            console.log("Categories response:", response.data);
            setCategories(response.data);
        })
        .catch(error => {
            console.error("Error fetching categories:", error);
        });
}, []);

    const handleOptionChange = (index, value) => {

        const updatedOptions = [...options];

        updatedOptions[index].option = value;

        setOptions(updatedOptions);
    };

    const handleCorrectOption = (index) => {

        const updatedOptions = options.map((option, i) => ({
            ...option,
            is_correct: i === index
        }));

        setOptions(updatedOptions);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const questionData = {
            questionText: questionText,
            difficulty: difficulty,
            marks: marks,
           category: {
                id: Number(categoryId)
                }
        };

        console.log(questionData);
        
        try {

            const response = await axios.post(
                "http://localhost:8080/api/admin/questions/addQuestions",
                questionData
            );

            

            alert("Question added successfully!");

            console.log(response.data);
            console.log(options);
            setQuestionId(response.data.id);
            console.log(options);
            const res=await axios.post(
                "http://localhost:8080/api/admin/questions/addOptions",
                options
            );


            console.log(res.data);

        } catch (error) {

            console.error("Error adding question:", error);

        }
    };

    return (
        <div className="add-question-page">

            <div className="add-question-container">

                <h1>Add Question</h1>

                <form onSubmit={handleSubmit}>

                    {/* Question */}

                    <div className="form-group">

                        <label>Question</label>

                        <textarea
                            value={questionText}
                            onChange={(e) =>
                                setQuestionText(e.target.value)
                            }
                            placeholder="Enter question"
                            required
                        />

                    </div>

                    {/* Difficulty */}

                    <div className="form-group">

                        <label>Difficulty</label>

                        <select
                            value={difficulty}
                            onChange={(e) =>
                                setDifficulty(e.target.value)
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
            <div className="form-group">

                <label>Category</label>

                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
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

                    {/* Marks */}

                    <div className="form-group">

                        <label>Marks</label>

                        <input
                            type="number"
                            value={marks}
                            onChange={(e) =>
                                setMarks(e.target.value)
                            }
                            placeholder="Enter marks"
                            required
                        />

                    </div>

                    {/* Options */}

                    <div className="options-section">

                        <h2>Options</h2>

                        {options.map((option, index) => (

                            <div
                                className="option-row"
                                key={index}
                            >

                                <span className="option-label">
                                    {String.fromCharCode(65 + index)}
                                </span>

                                <input
                                    type="text"
                                    value={option.option}
                                    onChange={(e) =>
                                        handleOptionChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    placeholder={`Option ${index + 1}`}
                                    required
                                />

                                <label className="correct-option">

                                    <input
                                        type="radio"
                                        name="correctOption"
                                        checked={option.is_correct}
                                        onChange={() =>
                                            handleCorrectOption(index)
                                        }
                                    />

                                    Correct

                                </label>

                            </div>

                        ))}

                    </div>

                    <button
                        type="submit"
                        className="add-question-button"
                    >
                        Add Question
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddQuestion;