import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css"; // Import CSS module

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1>Welcome to Employee Management System</h1>
            <p>Manage employees efficiently with our HR Dashboard.</p>
            
            <button className={styles.button} onClick={() => navigate("/hr-dashboard")}>
                Go to HR Dashboard
            </button>
            <button className={styles.button} onClick={() => navigate("/attendence")}>
                Attendence
            </button>
            <button className={styles.button} onClick={() => navigate("/employee")}>
                Check-in/out
            </button>
            <button className={styles.button} onClick={() => navigate("/apply-leave")}>
                Apply leave
            </button>
            <button className={styles.button} onClick={() => navigate("hr-leaves")}>
                HR-accept leave
            </button>
            <button className={styles.button} onClick={() => navigate("payroll-status")}>
                Payroll-Status
            </button>
            <button className={styles.button} onClick={() => navigate("calculate-payroll")}>
                Calculate Payroll
            </button>
        </div>
    );
};

export default Home;
