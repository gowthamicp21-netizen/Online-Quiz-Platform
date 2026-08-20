import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axiosConfig";
import "../styles/QuizDiscovery.css";

function QuizDiscovery() {

    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState([]);
    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [duration, setDuration] = useState("");
    const [sort, setSort] = useState("");

    const [loading, setLoading] = useState(false);

    
    useEffect(() => {
        fetchCategories();
    }, []);

   
    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchCategories = async () => {

        try {

            const response = await api.get(
                "/api/student/quizzes/categories"
            );

            setCategories(response.data);

        } catch (error) {

            console.error(
                "Error fetching categories:",
                error
            );

        }
    };

    const fetchQuizzes = async () => {

        try {

            setLoading(true);

            const params = {};

            if (search.trim() !== "") {
                params.search = search;
            }

            if (categoryId !== "") {
                params.categoryId = categoryId;
            }

            if (difficulty !== "") {
                params.difficulty = difficulty;
            }

            if (duration !== "") {
                params.duration = duration;
            }

            if (sort !== "") {
                params.sort = sort;
            }

            console.log("Search params:", params);

            const response = await api.get(
                "/api/student/quizzes/discover",
                {
                    params: params
                }
            );

            setQuizzes(response.data);

        } catch (error) {

            console.error(
                "Error fetching quizzes:",
                error
            );

            setQuizzes([]);

        } finally {

            setLoading(false);

        }
    };

    const handleSearch = (e) => {

        e.preventDefault();

        fetchQuizzes();
    };

    const handleFilterChange = () => {

       
        setTimeout(() => {
            fetchQuizzes();
        }, 0);
    };

    const clearFilters = () => {

        setSearch("");
        setCategoryId("");
        setDifficulty("");
        setDuration("");
        setSort("");

        
        setTimeout(() => {
            fetchQuizzes();
        }, 0);
    };

    const handleStartQuiz = (quizId) => {

        navigate(`/quiz/${quizId}`);

    };

    return (

        <div className="quiz-discovery-page">

            <div className="quiz-discovery-container">

                <h1>Discover Quizzes</h1>

                <p className="discovery-subtitle">
                    Find quizzes and test your knowledge
                </p>


              

                <form
                    className="search-section"
                    onSubmit={handleSearch}
                >

                    <input
                        type="text"
                        placeholder="Search quiz by title..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    <button type="submit">
                        🔍 Search
                    </button>

                </form>


               

                <div className="filters-section">

                   

                    <div className="filter-group">

                        <label>Category</label>

                        <select
                            value={categoryId}
                            onChange={(e) => {
                                setCategoryId(e.target.value);
                                handleFilterChange();
                            }}
                        >

                            <option value="">
                                All Categories
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


                  

                    <div className="filter-group">

                        <label>Difficulty</label>

                        <select
                            value={difficulty}
                            onChange={(e) => {
                                setDifficulty(e.target.value);
                                handleFilterChange();
                            }}
                        >

                            <option value="">
                                All Difficulties
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


                   

                    <div className="filter-group">

                        <label>Duration</label>

                        <select
                            value={duration}
                            onChange={(e) => {
                                setDuration(e.target.value);
                                handleFilterChange();
                            }}
                        >

                            <option value="">
                                Any Duration
                            </option>

                            <option value="10">
                                Under 10 minutes
                            </option>

                            <option value="20">
                                10 - 20 minutes
                            </option>

                            <option value="30">
                                20 - 30 minutes
                            </option>

                            <option value="60">
                                30+ minutes
                            </option>

                        </select>

                    </div>


                    

                    <div className="filter-group">

                        <label>Sort By</label>

                        <select
                            value={sort}
                            onChange={(e) => {
                                setSort(e.target.value);
                                handleFilterChange();
                            }}
                        >

                            <option value="">
                                Default
                            </option>

                            <option value="recent">
                                Recently Added
                            </option>

                            <option value="popular">
                                Popularity
                            </option>

                        </select>

                    </div>


                 

                    <button
                        className="clear-button"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>

                </div>


              

                <div className="quiz-results">

                    <h2>
                        Available Quizzes
                    </h2>


                    {loading && (
                        <p className="loading">
                            Loading quizzes...
                        </p>
                    )}


                    {!loading &&
                        quizzes.length === 0 && (

                            <p className="no-results">
                                No quizzes found.
                            </p>

                        )}


                    <div className="quiz-grid">

                        {!loading &&
                            quizzes.map((quiz) => (

                                <div
                                    className="quiz-card"
                                    key={quiz.id}
                                >

                                    <div className="quiz-card-header">

                                        <h3>
                                            {quiz.title}
                                        </h3>

                                    </div>


                                    <div className="quiz-card-body">

                                        <p>
                                            <strong>
                                                Category:
                                            </strong>{" "}
                                            {quiz.category?.name ||
                                                "N/A"}
                                        </p>

                                        <p>
                                            <strong>
                                                Difficulty:
                                            </strong>{" "}
                                            {quiz.difficulty}
                                        </p>

                                        <p>
                                            <strong>
                                                Duration:
                                            </strong>{" "}
                                            {quiz.duration} minutes
                                        </p>

                                        <p>
                                            <strong>
                                                Attempts:
                                            </strong>{" "}
                                            {quiz.attemptCount || 0}
                                        </p>

                                    </div>


                                    <button
                                        className="start-quiz-button"
                                        onClick={() =>
                                            handleStartQuiz(
                                                quiz.id
                                            )
                                        }
                                    >
                                        Start Quiz
                                    </button>

                                </div>

                            ))}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default QuizDiscovery;