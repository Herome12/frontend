import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import HRDashboard from "./HRDashboard";
import CheckInOut from "./CheckInOut";
import EmployeeCheckInOut from "./EmployeeCheckInOut.jsx";
import ApplyLeave from "./component/leave/ApplyLeave";
import HRLeaveManagement from "./component/acceptleave/HRLeaveManagement";
import PayrollStatus from "./component/payroll/PayrollStatus.jsx";
import CalculatePayroll from "./component/payroll/CalculatePayroll.jsx";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hr-dashboard" element={<HRDashboard />} />
                <Route path="/attendence" element={<CheckInOut/>}/>
                <Route path="/employee" element={<EmployeeCheckInOut />} />
                <Route path="/apply-leave" element={<ApplyLeave />} />
                <Route path="/hr-leaves" element={<HRLeaveManagement />} />
                <Route path="/payroll-status" element={<PayrollStatus />} />
                <Route path="/calculate-payroll" element={<CalculatePayroll />} />

            </Routes>
        </Router>
    );
};

export default App;
