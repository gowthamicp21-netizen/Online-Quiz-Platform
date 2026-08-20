import React, { useEffect, useState } from "react";
import api from "../services/axiosConfig";
import "../styles/ResultBoard.css";

function ResultBoard() {

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {

        try {

            const response = await api.get(
                "/api/student/quizzes/my-results"
            );

            console.log("Quiz History:", response.data);

            setResults(response.data);

        } catch (error) {

            console.error(
                "Error fetching quiz history:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


    if (loading) {

        return (
            <div className="result-board">
                <h2>Loading results...</h2>
            </div>
        );
    }


    return (

        <div className="result-board">

            <div className="result-header">

                <h1>Result Board</h1>

                <p>
                    Your Quiz History
                </p>

            </div>


            {results.length === 0 ? (

                <div className="no-results">

                    <h2>
                        No quiz attempts yet
                    </h2>

                    <p>
                        Start a quiz to see your results here.
                    </p>

                </div>

            ) : (

                <div className="result-table-container">

                    <table className="result-table">

                        <thead>

                            <tr>

                                <th>#</th>

                                <th>Quiz ID</th>

                                <th>Score</th>

                                <th>Correct</th>

                                <th>Wrong</th>

                                <th>Unanswered</th>

                                <th>Percentage</th>

                                <th>Result</th>

                            </tr>

                        </thead>


                        <tbody>

                            {results.map(
                                (result, index) => (

                                <tr key={index}>

                                    <td>
                                        {index + 1}
                                    </td>

                                    <td>
                                        {result.quizId}
                                    </td>

                                    <td>
                                        {result.obtainedMarks}
                                    </td>

                                    <td>
                                        {result.correctAnswers}
                                    </td>

                                    <td>
                                        {result.wrongAnswers}
                                    </td>

                                    <td>
                                        {result.unanswered}
                                    </td>

                                    <td>
                                        {result.percentage}%
                                    </td>

                                    <td>

                                        <span
                                            className={
                                                result.result === "Pass"
                                                    ? "pass"
                                                    : "fail"
                                            }
                                        >
                                            {result.result}
                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
}

export default ResultBoard;