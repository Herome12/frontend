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
        profilePicture: null
    });

    // Fetch Employees
    useEffect(() => {
        axios.get("http://localhost:5000/api/employees")
            .then(response => setEmployees(response.data))
            .catch(error => console.error("Error fetching employees:", error));
    }, []);

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    // Handle File Upload
    const handleFileChange = (e) => {
        setFormData({ ...formData, profilePicture: e.target.files[0] });
    };
    const handleCheckIn = async (employeeId) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/attendance/check-in`, {
                employeeId,
            });
            alert(response.data.message);
        } catch (error) {
            console.error("Error checking in:", error.response ? error.response.data : error);
            alert("Failed to check in");
        }
    };

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        
        Object.keys(formData).forEach(key => {
            if (key === "profilePicture" && formData.profilePicture) {
                data.append("profilePicture", formData.profilePicture);
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            console.log("Submitting form data:", formData);
            const response = await axios.post("http://localhost:5000/api/employees/register", data, {
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
                profilePicture: null
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

            {/* Employee Form */}
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

                {/* Bank Account Number */}
                <div className="form-group">
                    <i className="fas fa-university"></i>
                    <input type="text" name="accountNumber" placeholder="Account Number" value={formData.accountNumber} onChange={handleChange} required />
                </div>

                {/* IFSC Code */}
                <div className="form-group">
                    <i className="fas fa-code"></i>
                    <input type="text" name="ifscCode" placeholder="IFSC Code" value={formData.ifscCode} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <i className="fas fa-phone-alt"></i>
                    <input type="text" name="emergencyContact" placeholder="Emergency Contact" value={formData.emergencyContact} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <i className="fas fa-map-marker-alt"></i>
                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <i className="fas fa-camera"></i>
                    <input type="file" name="profilePicture" onChange={handleFileChange} accept="image/*" required />
                </div>

                <button type="submit">Add Employee</button>
            </form>

            <div className="employee-list">
                {employees.map((emp) => (
                    <div key={emp._id} className="employee-card">
                        <h3>{emp.name}</h3>
                        <p>Contact: {emp.contact}</p>
                        <p>Email: {emp.email}</p>

                        {/* Check-In Button */}
                        <button className="checkin-btn" onClick={() => handleCheckIn(emp._id)}>
                            Check-In
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HRDashboard;
