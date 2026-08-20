import React, { useEffect, useState } from "react";
import api from "../services/axiosConfig";
import "../styles/ViewResultManagement.css";

function ViewResultManagement() {

    const [users, setUsers] = useState([]);
    const [results, setResults] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);

    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingResults, setLoadingResults] = useState(false);

    const [error, setError] = useState("");


    // =====================================================
    // Fetch All Users
    // =====================================================

    useEffect(() => {

        fetchUsers();

    }, []);


    const fetchUsers = async () => {

        try {

            setLoadingUsers(true);
            setError("");

            const response = await api.get(
                "/api/admin/users"
            );

            console.log(
                "Users:",
                response.data
            );

            /*
             Example response:

             [
                {
                    user_id: 7,
                    user_name: "Gowthami C P",
                    user_email: "gowthamicp21@gmail.com",
                    user_role: "STUDENT"
                }
             ]
            */

            // Only display students
            const studentUsers =
                (response.data || []).filter(
                    user =>
                        user.user_role === "STUDENT"
                );

            setUsers(studentUsers);

        } catch (error) {

            console.error(
                "Error fetching users:",
                error.response?.data || error
            );

            setError(
                "Failed to load users."
            );

        } finally {

            setLoadingUsers(false);

        }

    };


    // =====================================================
    // Fetch Results For Selected User
    // =====================================================

    const fetchUserResults = async (user) => {

        try {

            console.log(
                "Selected User:",
                user
            );


            // IMPORTANT:
            // Your backend returns user_id
            const userId = user.user_id;


            console.log(
                "Selected User ID:",
                userId
            );


            if (!userId) {

                setError(
                    "User ID is missing."
                );

                return;

            }


            setSelectedUser(user);

            setLoadingResults(true);

            setResults([]);

            setError("");


            /*
                Backend endpoint:

                GET
                /api/admin/quizzes/quizResult/{userId}
            */

            const response = await api.get(
                `/api/admin/quizzes/quizResult/${userId}`
            );


            console.log(
                "Quiz Results:",
                response.data
            );


            setResults(
                response.data || []
            );


        } catch (error) {

            console.error(
                "Error fetching quiz results:",
                error.response?.data || error
            );

            setError(
                error.response?.data ||
                "Failed to load quiz results."
            );

        } finally {

            setLoadingResults(false);

        }

    };


    // =====================================================
    // Back To Users
    // =====================================================

    const handleBack = () => {

        setSelectedUser(null);

        setResults([]);

        setError("");

    };


    // =====================================================
    // Loading Users
    // =====================================================

    if (loadingUsers) {

        return (

            <div className="view-result-loading">

                <div className="loading-spinner"></div>

                <h2>
                    Loading students...
                </h2>

            </div>

        );

    }


    // =====================================================
    // Main UI
    // =====================================================

    return (

        <div className="view-result-management">

            <div className="result-container">


                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <div className="result-header">

                    <div>

                        <h1>
                            Quiz Results
                        </h1>

                        <p>
                            Select a student to view their quiz results
                        </p>

                    </div>

                </div>


                {/* =================================================
                    ERROR MESSAGE
                ================================================= */}

                {error && (

                    <div className="view-result-error-box">

                        {error}

                    </div>

                )}


                {/* =================================================
                    STUDENT LIST
                ================================================= */}

                {!selectedUser && (

                    <div className="users-section">


                        <div className="section-title">

                            <div>

                                <h2>
                                    Students
                                </h2>

                                <p>
                                    View quiz performance of students
                                </p>

                            </div>

                            <span className="user-count">

                                {users.length} Students

                            </span>

                        </div>


                        {users.length === 0 ? (

                            <div className="no-results">

                                <div className="no-results-icon">
                                    👨‍🎓
                                </div>

                                <h2>
                                    No Students Found
                                </h2>

                                <p>
                                    There are no registered students.
                                </p>

                            </div>

                        ) : (

                            <div className="users-table-container">

                                <table className="results-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                #
                                            </th>

                                            <th>
                                                User ID
                                            </th>

                                            <th>
                                                Student Name
                                            </th>

                                            <th>
                                                Email
                                            </th>

                                            <th>
                                                Action
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {users.map(
                                            (user, index) => (

                                                <tr
                                                    key={
                                                        user.user_id
                                                    }
                                                >


                                                    {/* Number */}

                                                    <td>
                                                        {index + 1}
                                                    </td>


                                                    {/* User ID */}

                                                    <td>

                                                        {user.user_id}

                                                    </td>


                                                    {/* User Name */}

                                                    <td className="student-name">

                                                        {user.user_name ||
                                                            "-"
                                                        }

                                                    </td>


                                                    {/* Email */}

                                                    <td>

                                                        {user.user_email ||
                                                            "-"
                                                        }

                                                    </td>


                                                    {/* Action */}

                                                    <td>

                                                        <button
                                                            type="button"
                                                            className="view-result-button"
                                                            onClick={() =>
                                                                fetchUserResults(
                                                                    user
                                                                )
                                                            }
                                                        >

                                                            View Results

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

                )}


                {/* =================================================
                    SELECTED USER RESULTS
                ================================================= */}

                {selectedUser && (

                    <div className="user-results-section">


                        {/* =================================================
                            SELECTED STUDENT HEADER
                        ================================================= */}

                        <div className="selected-user-header">

                            <div>

                                <h2>
                                    Quiz Results
                                </h2>

                                <p>

                                    Student:

                                    <strong>
                                        {" "}
                                        {selectedUser.user_name}
                                    </strong>

                                </p>

                                <p>

                                    Email:

                                    <span>
                                        {" "}
                                        {selectedUser.user_email}
                                    </span>

                                </p>

                            </div>


                            <button
                                type="button"
                                className="back-users-button"
                                onClick={handleBack}
                            >

                                ← Back to Students

                            </button>

                        </div>


                        {/* =================================================
                            LOADING RESULTS
                        ================================================= */}

                        {loadingResults && (

                            <div className="result-loading-small">

                                <div className="loading-spinner"></div>

                                <p>
                                    Loading quiz results...
                                </p>

                            </div>

                        )}


                        {/* =================================================
                            NO RESULTS
                        ================================================= */}

                        {!loadingResults &&
                            results.length === 0 && (
                                
                                <div className="no-results">

                                    <div className="no-results-icon">
                                        📊
                                    </div>

                                    <h2>
                                        No Quiz Results
                                    </h2>

                                    <p>
                                        This student has not attended
                                        any quizzes yet.
                                    </p>

                                </div>

                            )}


                        {/* =================================================
                            RESULTS SUMMARY
                        ================================================= */}

                        {!loadingResults &&
                            results.length > 0 && (

                                <>

                                    <div className="result-summary">


                                        {/* Total Quizzes */}

                                        <div className="summary-card">

                                            <div className="summary-value">

                                                {results.length}

                                            </div>

                                            <div className="summary-label">

                                                Quizzes Attempted

                                            </div>

                                        </div>


                                        {/* Passed */}

                                        <div className="summary-card">

                                            <div className="summary-value">

                                                {
                                                    results.filter(
                                                        result =>
                                                            result.result ===
                                                            "PASS"
                                                    ).length
                                                }

                                            </div>

                                            <div className="summary-label">

                                                Passed

                                            </div>

                                        </div>


                                        {/* Failed */}

                                        <div className="summary-card">

                                            <div className="summary-value">

                                                {
                                                    results.filter(
                                                        result =>
                                                            result.result ===
                                                            "FAIL"
                                                    ).length
                                                }

                                            </div>

                                            <div className="summary-label">

                                                Failed

                                            </div>

                                        </div>


                                        {/* Average */}

                                        <div className="summary-card">

                                            <div className="summary-value">

                                                {Math.round(
                                                    results.reduce(
                                                        (
                                                            total,
                                                            result
                                                        ) =>
                                                            total +
                                                            (
                                                                result.percentage ||
                                                                0
                                                            ),
                                                        0
                                                    ) /
                                                    results.length
                                                )}

                                                %

                                            </div>

                                            <div className="summary-label">

                                                Average Score

                                            </div>

                                        </div>

                                    </div>


                                    {/* =================================================
                                        RESULTS TABLE
                                    ================================================= */}

                                    <div className="results-table-container">

                                        <table className="results-table">

                                            <thead>

                                                <tr>

                                                    <th>
                                                        #
                                                    </th>

                                                    <th>
                                                        Quiz ID
                                                    </th>

                                                    <th>
                                                        Correct
                                                    </th>

                                                    <th>
                                                        Wrong
                                                    </th>

                                                    <th>
                                                        Unanswered
                                                    </th>

                                                    <th>
                                                        Percentage
                                                    </th>

                                                    <th>
                                                        Result
                                                    </th>

                                                </tr>

                                            </thead>


                                            <tbody>

                                                {results.map(
                                                    (
                                                        result,
                                                        index
                                                    ) => (

                                                        <tr
                                                            key={
                                                                result.id
                                                            }
                                                        >


                                                            {/* Number */}

                                                            <td>
                                                                {index + 1}
                                                            </td>


                                                            {/* Quiz ID */}

                                                            <td className="quiz-name">

                                                                Quiz{" "}

                                                                {result.quizId}

                                                            </td>


                                                            {/* Correct */}

                                                            <td>

                                                                <span className="correct-count">

                                                                    {
                                                                        result.correctAnswers ??
                                                                        0
                                                                    }

                                                                </span>

                                                            </td>


                                                            {/* Wrong */}

                                                            <td>

                                                                <span className="wrong-count">

                                                                    {
                                                                        result.wrongAnswers ??
                                                                        0
                                                                    }

                                                                </span>

                                                            </td>


                                                            {/* Unanswered */}

                                                            <td>

                                                                {
                                                                    result.unanswered ??
                                                                    0
                                                                }

                                                            </td>


                                                            {/* Percentage */}

                                                            <td>

                                                                <div className="percentage-container">


                                                                    <div className="percentage-bar">

                                                                        <div
                                                                            className="percentage-fill"
                                                                            style={{
                                                                                width:
                                                                                    `${result.percentage || 0}%`
                                                                            }}
                                                                        >
                                                                        </div>

                                                                    </div>


                                                                    <span>

                                                                        {
                                                                            result.percentage ||
                                                                            0
                                                                        }%

                                                                    </span>


                                                                </div>

                                                            </td>


                                                            {/* Result */}

                                                            <td>

                                                                <span
                                                                    className={
                                                                        result.result ===
                                                                        "PASS"
                                                                            ? "result-pass"
                                                                            : "result-fail"
                                                                    }
                                                                >

                                                                    {
                                                                        result.result ||
                                                                        "-"
                                                                    }

                                                                </span>

                                                            </td>

                                                        </tr>

                                                    )
                                                )}

                                            </tbody>

                                        </table>

                                    </div>

                                </>

                            )}

                    </div>

                )}

            </div>

        </div>

    );

}

export default ViewResultManagement;