import React, { useEffect, useState } from "react";
import api from "../services/axiosConfig";
import "../styles/CategoryManagement.css";
import { useNavigate} from "react-router-dom";

function CategoryManagement() {

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete= async (id)=>{
        try{
            
            const response=await api.delete(
               `/api/admin/categories/${id}`
            )
            console.log("Deleted");
        }
        catch(error){
             console.error(
                "Error deleting categories:",
                error
            );

            setError("Failed to delete categories.");
        }
    } 

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await api.get(
                "/api/admin/categories"
            );
            console.log("Categories:", response.data);
            setCategories(response.data);
        } catch (error) {
            console.error(
                "Error fetching categories:",
                error
            );
            setError("Failed to load categories.");
        } finally {
            setLoading(false);
        }
    };

    
    return (

        <div className="category-management">

            <div className="category-header">

                <div>
                    <h1>Categories</h1>

                    <p>
                        Manage quiz categories
                    </p>
                </div>

                <button onClick={()=>{navigate("/addCategory")}}
                    className="add-category-button"
                >
                    + Add Category
                </button>

            </div>


            {loading && (
                <p className="loading">
                    Loading categories...
                </p>
            )}


            {error && (
                <p className="error">
                    {error}
                </p>
            )}


            {!loading && !error && categories.length === 0 && (

                <div className="empty-category">

                    <h3>
                        No categories found
                    </h3>

                    <p>
                        Add your first category.
                    </p>

                </div>

            )}


            {!loading && categories.length > 0 && (

                <div className="category-table-container">

                    <table className="category-table">

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>

                        </thead>


                        <tbody>

                            {categories.map((category) => (

                                <tr key={category.id}>

                                    <td>
                                        {category.id}
                                    </td>

                                    <td className="category-name">
                                        {category.name}
                                    </td>

                                    <td>
                                        {category.description}
                                    </td>

                                    <td>

                                        <button
                                            className="edit-button"
                                            onClick={() =>{
                                                navigate(`/updateCategory/${category.id}`)
                                            }
                                                
                                            }
                                        >
                                            Edit
                                        </button>


                                        <button
                                            className="delete-button"
                                            onClick={() =>{
                                                handleDelete(category.id);
                                            }
                                            }
                                        >
                                            Delete
                                        </button>

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

export default CategoryManagement;