import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import TrackPage from './TrackPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/track" element={<TrackPage />} />
                <Route path="/" element={<Login />} />  {/* Default route */}
            </Routes>
        </Router>
    );
};

export default App;
