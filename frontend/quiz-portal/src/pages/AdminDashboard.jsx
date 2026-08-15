import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  { useState, useEffect } from "react";
import '../styles/AdminDashboard.css';

function AdminDashboard() {

    const [categories, setCategories] = useState([]);
    
    const [category_id,setCategoryId]=useState([]);
    const navigate = useNavigate();

     useEffect(() => {
        fetchCategories();
    }, []);


     const fetchCategories = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/admin/categories"
            );

            setCategories(response.data);

        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // const handleGetQuestionByCategory=async ()=>{
    //     try{
    //         const response=await axios.get(
    //             "http://localhost:8080/api/admin/questions/{category_id}"
    //         );
    //         setQuestions(response.data);
    //     }
    //     catch(error){
    //         console.error("Error fetching Questions:", error);
    //     }
    // }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleAddCategory=()=>{
        navigate("/addCategory");
    };
    const handleAddQuestion=()=>{

        navigate("/addQuestion");

    };

    const handleAddQuiz=()=>{
        navigate("/addQuiz")
    }
    return (
        <div className="home-page">

            <header className="dashboard-header">

                <h1>Admin dashboard</h1>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </header>

        <main className="dashboard-content">
                 <button
                    className="logout-button"
                    onClick={handleAddCategory}>
                    Add Category
                </button>
                <br/>
                 <button
                    className="logout-button"
                    onClick={handleAddQuestion}>
                    Add Question
                </button>
                <button 
                    className="logout-button"  // onClick={handleAddQuiz}
                   onClick={handleAddQuiz}>
                    Add Quiz
                </button>
         <div className="category-grid">

        {categories.map((category) => (
        <div
            className="category-card"
            key={category.id}
            onClick={() => navigate(`/category/${category.id}`)}>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
        </div>
    ))}
</div>

            </main>

        </div>
    );
}

export default AdminDashboard;