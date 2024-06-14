import Login from '../components/LoggedOut/Login.jsx'
import Register from '../components/LoggedOut/Register.jsx'
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