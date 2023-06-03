import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Survey from './pages/survey/Survey';
import Dashboard from './pages/dashboard/Dashboard';
import EditSurvey from './pages/editSurvey/EditSurvey';
import Wrongurl from './pages/wrongurl/Wrongurl';
import SendFeedback from './pages/sendfeedback/SendFeedback';
import UserProfile from './pages/profile/UserProfile';
import SurveyStats from './pages/surveyStats/SurveyStats';
import GetFeedback from './pages/getfeedback/GetFeedback';

const checkUserLoggedIn = () => {
  const userInfo = localStorage.getItem('user');
  return userInfo !== null;
};

const PrivateRoute = ({ element: Element }) => {
  return checkUserLoggedIn() ? (
    <Element />
  ) : (
    <Navigate to="/" replace={true} />
  );
};

ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
        <Route path="/survey" element={<PrivateRoute element={Survey} />} />
        <Route path="/edit-survey" element={<PrivateRoute element={EditSurvey} />} />
        <Route path="/send-feedback" element={<PrivateRoute element={SendFeedback} />}/>
        <Route path="/profile" element={<PrivateRoute element={UserProfile} />} />
        <Route path="survey-stats" element={<PrivateRoute element={SurveyStats} />} />
        {/* getfeedback page */}
        {<Route path="/get-feedback" element={<PrivateRoute element={GetFeedback} />} />}
        <Route path="/*" element={<Wrongurl />} />
      </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);
