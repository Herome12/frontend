import React, { useState, useEffect } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./HrCss.css"; 
import { useNavigate } from "react-router-dom";

const HRDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        email: "",
        password: "",
        aadhaar: "",
        pan: "",
        accountNumber: "",
        ifscCode: "",
        emergencyContact: "",
        address: "",
        profilePicture: null,
        role: "employee"  // Default role as employee
    });

    // Fetch Employees
    useEffect(() => {
        axios.get("https://backend-2-q0tl.onrender.com/api/employees", { withCredentials: true })
            .then(response => setEmployees(response.data))
            .catch(error => console.error("Error fetching employees:", error));
    }, [navigate]);

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle File Upload
    const handleFileChange = (e) => {
        setFormData({ ...formData, profilePicture: e.target.files[0] });
    };

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        
        // Ensure proper casing for role
        const formattedRole = formData.role.charAt(0).toUpperCase() + formData.role.slice(1).toLowerCase();
    
        Object.keys(formData).forEach(key => {
            if (key === "profilePicture" && formData.profilePicture) {
                data.append("profilePicture", formData.profilePicture);
            } else if (key === "role") {
                data.append("role", formattedRole);  // Convert role to proper case
            } else {
                data.append(key, formData[key]);
            }
        });
    
        try {
            console.log("Submitting form data:", formData);
            const response = await axios.post("https://backend-2-q0tl.onrender.com/api/employees/register", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
    
            alert("Employee added successfully!");
            setEmployees([...employees, response.data.employee]);
    
            setFormData({
                name: "",
                contact: "",
                email: "",
                password: "",
                aadhaar: "",
                pan: "",
                accountNumber: "",
                ifscCode: "",
                emergencyContact: "",
                address: "",
                profilePicture: null,
                role: "employee"
            });
    
            navigate("/"); 
        } catch (error) {
            console.error("Error adding employee:", error.response ? error.response.data : error);
            alert("Failed to add employee");
        }
    };
    
    return (
        <div className="container">
            <h2>HR Employee Management</h2>

            {/* Employee Form Always Renders */}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <i className="fas fa-user"></i>
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <i className="fas fa-phone"></i>
                    <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <i className="fas fa-envelope"></i>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <i className="fas fa-lock"></i>
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <i className="fas fa-id-card"></i>
                    <input type="text" name="aadhaar" placeholder="Aadhaar" value={formData.aadhaar} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <i className="fas fa-credit-card"></i>
                    <input type="text" name="pan" placeholder="PAN" value={formData.pan} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <i className="fas fa-university"></i>
                    <input type="text" name="accountNumber" placeholder="Account Number" value={formData.accountNumber} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <i className="fas fa-code"></i>
                    <input type="text" name="ifscCode" placeholder="IFSC Code" value={formData.ifscCode} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <i className="fas fa-camera"></i>
                    <input type="file" name="profilePicture" onChange={handleFileChange} accept="image/*" required />
                </div>

                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

export default HRDashboard;
