import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EmployeeCheckInOut.css"; // Add styling if needed

const EmployeeCheckInOut = () => {
    const [employeeId, setEmployeeId] = useState("");
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // ✅ Check Employee Attendance Status
    useEffect(() => {
        const checkStatus = async () => {
            if (!employeeId) return;

            try {
                const response = await axios.get(`https://backend-2-q0tl.onrender.com/api/attendance/status/${employeeId}`);
                if (response.data.attendance) {
                    setIsCheckedIn(true);  // Employee is checked in
                } else {
                    setIsCheckedIn(false); // Employee is not checked in
                }
            } catch (error) {
                setIsCheckedIn(false); // If no record is found, assume not checked in
            }
        };

        checkStatus();
    }, [employeeId]); // Runs whenever employeeId changes

    // ✅ Handle Check-In
    const handleCheckIn = async () => {
        if (!employeeId) return alert("Please enter your Employee ID");

        setLoading(true);
        try {
            await axios.post("https://backend-2-q0tl.onrender.com/api/attendance/check-in", { employeeId });
            setIsCheckedIn(true);
            alert("Check-in successful!");
        } catch (error) {
            alert(error.response?.data?.error || "Check-in failed");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Handle Check-Out
    const handleCheckOut = async () => {
        if (!employeeId) return alert("Please enter your Employee ID");

        setLoading(true);
        try {
            await axios.post("https://backend-2-q0tl.onrender.com/api/attendance/check-out", { employeeId });
            setIsCheckedIn(false);
            alert("Check-out successful!");
        } catch (error) {
            alert(error.response?.data?.error || "Check-out failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkin-container">
            <h2>Employee Attendance</h2>

            <input
                type="text"
                placeholder="Enter Employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="employee-input"
            />

            <p>Status: <strong>{isCheckedIn ? "Checked-In" : "Checked-Out"}</strong></p>

            <div className="button-group">
                <button 
                    onClick={handleCheckIn} 
                    disabled={isCheckedIn || loading} 
                    className="checkin-btn"
                >
                    {loading ? "Checking In..." : "Check In"}
                </button>
                <button 
                    onClick={handleCheckOut} 
                    disabled={!isCheckedIn || loading} 
                    className="checkout-btn"
                >
                    {loading ? "Checking Out..." : "Check Out"}
                </button>
                <button 
                    onClick={() => navigate("/home")} 
                    className="home-btn"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default EmployeeCheckInOut;
