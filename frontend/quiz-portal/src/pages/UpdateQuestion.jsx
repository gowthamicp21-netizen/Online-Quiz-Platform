import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import '../styles/UpdateQuestion.css';

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

                const response = await axios.get(
                    `http://localhost:8080/api/admin/questions/${questionId}`
                );

                console.log("Question from backend:", response.data);

                const question = response.data;

                setQuestionText(question.questionText || "");
                setDifficulty(question.difficulty || "");
                setMarks(question.marks || "");

                setOptions(
                    (question.options || []).map(option => ({
                        id: option.id,
                        option: option.option || "",
                        correct: option.correct || false
                    }))
                );

                setLoading(false);

            } catch (error) {

                console.log("Error fetching question:", error);

                setError("Unable to load question");
                setLoading(false);
            }
        };

        fetchQuestion();

    }, [questionId]);


    const handleQuestionChange = (e) => {

        setQuestionText(e.target.value);
    };


    
    const handleDifficultyChange = (e) => {

        setDifficulty(e.target.value);
    };


    
    const handleMarksChange = (e) => {

        setMarks(e.target.value);
    };


    
    const handleOptionChange = (index, value) => {

        const updatedOptions = [...options];

        updatedOptions[index] = {
            ...updatedOptions[index],
            option: value
        };

        setOptions(updatedOptions);
    };



    const handleCorrectChange = (index) => {

        const updatedOptions = [...options];

        updatedOptions[index] = {
            ...updatedOptions[index],
            correct: !updatedOptions[index].correct
        };

        setOptions(updatedOptions);
    };


  

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


    
    const removeOption = (index) => {

        const updatedOptions = options.filter(
            (_, optionIndex) => optionIndex !== index
        );

        setOptions(updatedOptions);
    };


 

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Validate question
        if (!questionText.trim()) {

            alert("Please enter question");
            return;
        }

        if (!difficulty) {

            alert("Please select difficulty");
            return;
        }

        if (!marks) {

            alert("Please enter marks");
            return;
        }


      
        for (let option of options) {

            if (!option.option.trim()) {

                alert("Please enter all options");
                return;
            }
        }


        
        const correctOptions = options.filter(
            option => option.correct
        );

        if (correctOptions.length === 0) {

            alert("Please select at least one correct option");
            return;
        }


        const requestData = {

            question: {
                questionText: questionText,
                difficulty: difficulty,
                marks: Number(marks)
            },

            options: options.map(option => ({

                id: option.id,

                option: option.option,

                correct: option.correct
            }))
        };
        console.log(requestData);

        console.log("Sending update:", requestData);


        try {

            const response = await axios.put(
                `http://localhost:8080/api/admin/questions/${questionId}`,
                requestData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Update response:", response.data);

            alert("Question updated successfully!");

        } catch (error) {

            console.log("Update error:", error);

            if (error.response) {

                console.log(
                    "Backend error:",
                    error.response.data
                );
            }

            alert("Failed to update question");
        }
    };


  
    if (loading) {

        return (
            <div>
                <h2>Loading question...</h2>
            </div>
        );
    }

    return (

        <div className="form-group">

            <h2>Update Question</h2>

            <form onSubmit={handleSubmit}>

               
                <div>

                    <label>
                        Question
                    </label>

                    <br />

                    <textarea
                        className="question-textarea"
                        value={questionText}
                        onChange={handleQuestionChange}
                        placeholder="Enter question"
                        rows="4"
                        cols="50"
                    />

                </div>


                <br />


            

                <div>

                    <label>
                        Difficulty
                    </label>

                    <br />

                    <select
                         className="difficulty-select"
                        value={difficulty}
                        onChange={handleDifficultyChange}
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


                <br />


              
                <div>

                    <label>
                        Marks
                    </label>

                    <br />

                    <input
                        className="marks-input"
                        type="number"
                        value={marks}
                        onChange={handleMarksChange}
                        min="1"
                    />

                </div>


                <br />


             <div>
                <h3>Options</h3>


                {options.map((option, index) => (

                    <div
                        key={option.id ?? `new-${index}`}
                        style={{
                            marginBottom: "15px"
                        }}
                    >

                        <label>
                            Option {index + 1}
                        </label>

                        <br />

                        <input
                            type="text"
                            value={option.option}
                            onChange={(e) =>
                                handleOptionChange(
                                    index,
                                    e.target.value
                                )
                            }
                            placeholder={`Enter option ${index + 1}`}
                        />


                        <label
                            style={{
                                marginLeft: "10px"
                            }}
                        >

                            <input
                                type="checkbox"
                                checked={option.correct}
                                onChange={() =>
                                    handleCorrectChange(index)
                                }
                            />

                            Correct

                        </label>


                        <button
                            type="button"
                            onClick={() =>
                                removeOption(index)
                            }
                            style={{
                                marginLeft: "10px"
                            }}
                        >
                            Remove
                        </button>

                    </div>

                ))}

                <div className="form-buttons">
                    <button
                    type="button"
                    onClick={addOption}
                >
                    Add Option
                </button>

                </div>
             

                


             </div>

                

                <br />
                <br />

                <div className="form-buttons">
                    <button type="submit">
                    Update Question
                </button>

                </div>

                

{/* 
                <button
                    type="button"
                    onClick={() => navigate("/questions")}
                    style={{
                        marginLeft: "10px"
                    }}
                >
                    Cancel
                </button> */}

            </form>

        </div>
    );
}

export default UpdateQuestion;