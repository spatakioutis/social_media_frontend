import HomePage from './HomePage.jsx'
import UserProfilePage from './UserProfilePage.jsx'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'

const LoggedIn = () => {
    return (
        <Router>
            <div className="LoggedIn--page">
                <Routes>          
                    <Route
                        path="/"
                        element={<Navigate to="/home" replace />}
                    />
                    <Route 
                        path="/home" 
                        element={<HomePage />} 
                    />
                    <Route 
                        path="/profile"
                        element={<UserProfilePage />} 
                    />
                </Routes>
            </div>
        </Router>
    );
  }

export default LoggedIn