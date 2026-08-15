import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/QuestionsByCategory.css";

function QuestionsByCategory() {

    const navigate = useNavigate();

    const { categoryId } = useParams();

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/admin/questions/category/${categoryId}`)
            .then(response => {
                setQuestions(response.data);
                console.log(questions);
            })
            .catch(error => {
                console.error("Error fetching questions:", error);
            });
    }, [categoryId]);

    return (
        <div className="questions-page">

            <div className="questions-container">

                <h1 className="page-title">
                    Questions
                </h1>

                <p className="category-text">
                    Category ID: {categoryId}
                </p>

                {questions.length === 0 ? (
                    <div className="no-questions">
                        <p>No questions found for this category.</p>
                    </div>
                ) : (
                    questions.map((question, index) => (

                        <div className="question-card" key={question.id} 
                        onClick={() => navigate(`/updateQuestion/${question.id}`)}
                        >

                            <div className="question-header">
                                <span className="question-number">
                                    Question {index + 1}
                                </span>

                                <span className="marks">
                                    {question.marks} Marks
                                </span>
                            </div>
                            <div>
                                <h2 className="question-text">
                                {question.question_text}
                            </h2>

                            </div>
                            

                            <div className="difficulty">
                                Difficulty: {question.difficulty}
                            </div>

                        </div>
                    ))
                )}

            </div>

        </div>
    );
}

export default QuestionsByCategory;