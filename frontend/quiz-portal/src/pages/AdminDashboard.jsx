import React, { useState } from "react";
import "../styles/AdminDashboard.css";
import CategoryManagement from "./CategoryManagement";
import QuestionsByCategory from "./QuestionsByCategory";
import QuestionManagement from "./QuestionManagement";
import QuizManagement from "./QuizManagement";
import ViewResultManagement from "./ViewResultManagement";

function AdminDashboard() {

    const [activePage, setActivePage] = useState("dashboard");
    

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    const renderContent = () => {

        switch (activePage) {

            case "categories":
                return (
                    <div className="content-page">
                       <CategoryManagement></CategoryManagement>
                    </div>
                );


            case "questions":
                return (
                    <div className="content-page">
                        <QuestionManagement></QuestionManagement>
                    </div>
                );


            case "quizzes":
                return (
                    <div className="content-page">
                       <QuizManagement></QuizManagement>
                    </div>
                );


            case "results":
                return (
                    <div className="content-page">
                       <ViewResultManagement></ViewResultManagement>
                    </div>
                );


           
            default:
                return (
                    <DashboardHome
                        setActivePage={setActivePage}
                    />
                );
        }
    };


    return (

        <div className="admin-dashboard">

           

            <aside className="admin-sidebar">

                <div className="admin-logo">

                    <h2>Quizzy</h2>

                    <p>Admin Panel</p>

                </div>


                <nav className="sidebar-menu">

                    <button
                        className={
                            activePage === "dashboard"
                                ? "sidebar-item active"
                                : "sidebar-item"
                        }
                        onClick={() =>
                            setActivePage("dashboard")
                        }
                    >
                        🏠 Dashboard
                    </button>


                    <button
                        className={
                            activePage === "categories"
                                ? "sidebar-item active"
                                : "sidebar-item"
                        }
                        onClick={() =>
                            setActivePage("categories")
                        }
                    >
                        📂 Categories
                    </button>


                    <button
                        className={
                            activePage === "questions"
                                ? "sidebar-item active"
                                : "sidebar-item"
                        }
                        onClick={() =>
                            setActivePage("questions")
                        }
                    >
                        ❓ Questions
                    </button>


                    <button
                        className={
                            activePage === "quizzes"
                                ? "sidebar-item active"
                                : "sidebar-item"
                        }
                        onClick={() =>
                            setActivePage("quizzes")
                        }
                    >
                        📝 Quizzes
                    </button>


                    <button
                        className={
                            activePage === "results"
                                ? "sidebar-item active"
                                : "sidebar-item"
                        }
                        onClick={() =>
                            setActivePage("results")
                        }
                    >
                        📊 Results
                    </button>

                </nav>


                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    🚪 Logout
                </button>

            </aside>


           

            <main className="admin-content">

                {renderContent()}

            </main>

        </div>
    );
}




function DashboardHome({ setActivePage }) {

    return (

        <div className="dashboard-home">

            <div className="dashboard-header">

                <div>

                    <h1>
                        Admin Dashboard
                    </h1>

                    <p>
                        Manage your online quiz platform
                    </p>

                </div>

            </div>


            <div className="dashboard-cards">

                <div
                    className="dashboard-card"
                    onClick={() =>
                        setActivePage("categories")
                    }
                >

                    <div className="card-icon">
                        📂
                    </div>

                    <div>

                        <h3>
                            Categories
                        </h3>

                        <p>
                            Manage Categories
                        </p>

                    </div>

                </div>


                <div
                    className="dashboard-card"
                    onClick={() =>
                        setActivePage("questions")
                    }
                >

                    <div className="card-icon">
                        ❓
                    </div>

                    <div>

                        <h3>
                            Questions
                        </h3>

                        <p>
                            Manage Questions
                        </p>

                    </div>

                </div>


                <div
                    className="dashboard-card"
                    onClick={() =>
                        setActivePage("quizzes")
                    }
                >

                    <div className="card-icon">
                        📝
                    </div>

                    <div>

                        <h3>
                            Quizzes
                        </h3>

                        <p>
                            Manage Quizzes
                        </p>

                    </div>

                </div>


                <div
                    className="dashboard-card"
                    onClick={() =>
                        setActivePage("results")
                    }
                >

                    <div className="card-icon">
                        📊
                    </div>

                    <div>

                        <h3>
                            Results
                        </h3>

                        <p>
                            View Results
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;