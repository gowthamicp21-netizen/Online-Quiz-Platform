import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/axiosConfig";
import "../styles/StartQuiz.css";
import { useNavigate } from 'react-router-dom';

function StartQuiz() {

    
    const navigate = useNavigate();

    const { quizId } = useParams();

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const [quizResult, setQuizResult] = useState(null);

    const [submitting, setSubmitting] = useState(false);

    const [timeLeft, setTimeLeft] = useState(0);

    const [quiz, setQuiz]=useState([]);



    useEffect(() => {

        fetchQuestions();
        fetchTimeDuration();

    }, [quizId]);


    useEffect(() => {

    if (timeLeft <= 0) {
        return;
    }

    const timer = setInterval(() => {

        setTimeLeft(prev => {

            if (prev <= 1) {
                clearInterval(timer);
                return 0;
            }

            return prev - 1;

        });

    }, 1000);

    return () => clearInterval(timer);

        }, [timeLeft]);


    useEffect(() => {

        if (
        timeLeft === 0 &&
        quiz &&
        quiz.questions?.length > 0
        ) {

        handleSubmitQuiz();

        }

        }, [timeLeft]);

    const fetchTimeDuration = async ()=>{
        try{

            const response = await api.get(
                 `/api/student/quizzes/${quizId}`
            );
            const quizData = response.data;

            setQuiz(quizData);

            setTimeLeft(
            Number(quizData.duration) * 60
            );

        }
        catch(error){
              console.error(
                "Error fetching quiz questions:",
                error
            );

        }
    } 


    const fetchQuestions = async () => {

        try {

            const response = await api.get(
                `/api/student/quizzes/questions/${quizId}`
            );

            console.log(
                "Quiz questions:",
                response.data
            );

            setQuestions(response.data);

        } catch (error) {

            console.error(
                "Error fetching quiz questions:",
                error
            );

        }
    };


    // --------------------------------
    // Select Answer
    // --------------------------------

    const handleAnswer = (optionId) => {

        const questionId =
            questions[currentQuestion].id;

        setSelectedAnswers(prev => {

            const existingAnswer = prev.find(
                answer =>
                    answer.questionId === questionId
            );

            // Question already answered
            if (existingAnswer) {

                return prev.map(answer =>
                    answer.questionId === questionId
                        ? {
                            ...answer,
                            optionId: optionId
                        }
                        : answer
                );
            }

            // First answer
            return [
                ...prev,
                {
                    questionId: questionId,
                    optionId: optionId
                }
            ];

        });

    };


   

    const handleNext = () => {

        if (
            currentQuestion <
            questions.length - 1
        ) {

            setCurrentQuestion(
                currentQuestion + 1
            );

        }

    };


   

    const handlePrevious = () => {

        if (currentQuestion > 0) {

            setCurrentQuestion(
                currentQuestion - 1
            );

        }

    };


    

    const getSelectedOption = () => {

        const questionId =
            questions[currentQuestion].id;

        const answer = selectedAnswers.find(
            answer =>
                answer.questionId === questionId
        );

        return answer
            ? answer.optionId
            : null;

    };


    const handleSubmit = async () => {

        if (submitting) {
            return;
        }

        const confirmSubmit =
            window.confirm(
                "Are you sure you want to submit the quiz?"
            );

        if (!confirmSubmit) {
            return;
        }

        try {

            setSubmitting(true);

            console.log(
                "Selected answers:",
                selectedAnswers
            );

            const token = localStorage.getItem("token");

            console.log("TOKEN:", token);

            const response = await api.post(
                `/api/student/quizzes/checkResult/${quizId}`,
                selectedAnswers
            );
            console.log(response.data);
            console.log(
                "Quiz Result:",
                response.data
            );

            setQuizResult(response.data);

        } catch (error) {

            console.error(
                "Error submitting quiz:",
                error
            );

            alert(
                "Error submitting quiz"
            );

        } finally {

            setSubmitting(false);

        }

    };


  

    if (quizResult) {

        return (

            <div className="start-quiz-page">

                <div className="quiz-container">

                    <h1>
                        Quiz Completed!
                    </h1>

                    <div className="quiz-result">

                        <h2>
                            Your Result
                        </h2>

                        <p>
                            Correct Answers:
                            {" "}
                            {quizResult.correctAnswers}
                        </p>

                        <p>
                            Wrong Answers
                            {" "}
                            {quizResult.wrongAnswers}
                        </p>

                        <p>
                            UnAnswered:
                            {" "}
                            {quizResult.unanswered}
                        </p>

                        <p>
                            Percentage:
                            {" "}
                            {quizResult.percentage}
                        </p>

                        <p>
                            Result:
                            {" "}
                            {quizResult.result}%
                        </p> 

                    </div>

                </div>
                <button onClick={() => navigate("/result-board")}> Result Board </button>

            </div>

        );

    }


   

    if (questions.length === 0) {

        return (
            <div>
                Loading quiz...
            </div>
        );

    }


   
    const question =
        questions[currentQuestion];

    const selectedOption =
        getSelectedOption();

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
   

    return (

        <div className="start-quiz-page">

            <div className="quiz-container">

                <h1>
                    Start Quiz
                </h1>

                <div className="quiz-timer">
                    ⏱️ Time Left:{" "}
                 {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
                </div>


                <div className="question-count">

                    Question {currentQuestion + 1}
                    {" "}of{" "}
                    {questions.length}

                </div>


                <h2>
                    {question.questionText}
                </h2>


                <div className="options-container">

                    {question.options?.map(
                        (option) => (

                        <label
                            key={option.id}
                            className={
                                selectedOption === option.id
                                    ? "quiz-option selected"
                                    : "quiz-option"
                            }
                        >

                            <input
                                type="radio"
                                name={`question-${question.id}`}
                                checked={
                                    selectedOption ===
                                    option.id
                                }
                                onChange={() =>
                                    handleAnswer(
                                        option.id
                                    )
                                }
                            />

                            <span>
                                {option.option}
                            </span>

                        </label>

                    ))}

                </div>


                <div className="quiz-navigation">


                    <button
                        onClick={handlePrevious}
                        disabled={
                            currentQuestion === 0
                        }
                    >
                        Previous
                    </button>


                    {currentQuestion <
                    questions.length - 1 ? (

                        <button
                            onClick={handleNext}
                        >
                            Next
                        </button>

                    ) : (

                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                        >
                            {submitting
                                ? "Submitting..."
                                : "Submit Quiz"}
                        </button>

                    )}

                </div>


                <div className="answer-count">

                    Answered:
                    {" "}
                    {selectedAnswers.length}
                    {" / "}
                    {questions.length}

                </div>

            </div>

        </div>

    );

}

export default StartQuiz;