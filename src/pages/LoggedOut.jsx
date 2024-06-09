import Login from '../components/logged-out-forms/Login.jsx'
import Register from '../components/logged-out-forms/Register.jsx'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'

function LoggedOut() {
    return (
        <Router>
            <div className="loggedOut--page">
                <Routes>          
                    <Route
                        path="/"
                        element={<Navigate to="/login" replace />}
                    />
                    <Route 
                        path="/login" 
                        element={<Login />} 
                    />
                    <Route 
                        path="/register" 
                        element={<Register />} 
                    />
                </Routes>
            </div>
        </Router>
    );
  }

export default LoggedOut