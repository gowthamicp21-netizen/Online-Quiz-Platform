import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Home.css';

function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear login-related data
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Go back to login page
        navigate("/login");
    };

    return (
        <div className="home-page">

            <header className="dashboard-header">

                <h1>Quizzy</h1>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </header>

            <main className="dashboard-content">

                <h2>Welcome to Quizzy!</h2>

                <p>
                    Test your knowledge and improve your skills.
                </p>

            </main>

        </div>
    );
}

export default Home;