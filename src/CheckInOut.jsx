import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./HrCss.css";

const CheckInOut = () => {
    const [attendance, setAttendance] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get("https://backend-2-q0tl.onrender.com/api/attendance/all");
                setAttendance(response.data);
            } catch (error) {
                console.error("Error fetching attendance:", error);
            }
        };

        fetchAttendance();
    }, []);

    return (
        <div className="container">
            <h2>Employee Attendance Status</h2>
            <button className="home-button" onClick={() => navigate("/")}>Go to Home</button>
            
            <table className="attendance-table">
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Check-In Time</th>
                        <th>Check-Out Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.length > 0 ? (
                        attendance.map((record) => (
                            <tr key={record._id}>
                                <td>{record.employee?.name || "Unknown"}</td>
                                <td>
                                    {record.checkInTime
                                        ? new Date(record.checkInTime).toLocaleString()
                                        : "Not Checked-In"}
                                </td>
                                <td>
                                    {record.checkOutTime
                                        ? new Date(record.checkOutTime).toLocaleString()
                                        : "Not Checked-Out"}
                                </td>
                                <td className={record.checkOutTime ? "checked-out" : "checked-in"}>
                                    {record.checkOutTime ? "Checked-Out" : "Checked-In"}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No attendance records found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CheckInOut;
