import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import api from '../../api/axiosConfig';
import './GetFeedback.css';

const AppContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100vh;
    width: 100%;
    background: ${props => {
      return props.pageTheme === "light-theme" ? "#f4edff" : "#222222";
    }};
`;

const FeedbackCard = styled.div`
    margin: 10px;
`;

const AdminFeedbackPage = () => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [websiteTheme, setWebsiteTheme] = useState(localStorage.getItem('theme'));
    const handleThemeChange = (newTheme) => {
        localStorage.setItem('theme', newTheme);
        setWebsiteTheme(newTheme);
    }

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const res = await api.get('/feedback/all');
                setFeedbackList(res.data);
            } catch (error) {
                console.error("Failed to fetch feedback:", error);
            }
        }

        fetchFeedback();
    }, []);

    return (
        <AppContainer pageTheme={websiteTheme}>
            <Header onThemeChange={handleThemeChange} />
            {feedbackList.map((feedback, index) => (
                <FeedbackCard key={index} className={`feedback-card ${websiteTheme}`}>
                    <div className='card-title'>
                        <FontAwesomeIcon style={websiteTheme === 'light-theme' ? { color: "#ffffff" } : { color: "#dedede" }} icon={faComments} />
                        <h3>Feedback {index+1}</h3>
                    </div>
                    <div className='feedback-content'>
                        <p>Feedback Sender: {feedback.userEmail}</p>
                        <p>Subject: {feedback.subject}</p>
                        <p>Feedback: {feedback.feedbackMessage}</p>
                    </div>
                    
                </FeedbackCard>
            ))}
            <Footer/>
        </AppContainer>
    );
}

export default AdminFeedbackPage;
