import React, { useState } from 'react'
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import styled from "styled-components";
import "./SendFeedback.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

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

const SendFeedback = () => {
    const navigate = useNavigate();
    const [websiteTheme, setWebsiteTheme] = useState(localStorage.getItem('theme'));
    const handleThemeChange = (newTheme) => {
        localStorage.setItem('theme', newTheme);
        setWebsiteTheme(newTheme);
      }

    const sendButtonHandler = async () => {
        const subjectInput = document.querySelector('.subject-input');
        const messageTextarea = document.querySelector('.message-textarea');

        if (subjectInput.value.trim() === '' || messageTextarea.value.trim() === '') {
            Swal.fire({
                title: "Error!",
                text: "Please enter your subject and feedback",
                icon: 'error',
                confirmButtonText: 'Okay'
            });
            return;
        }
        api.post("/feedback/submit", {"userEmail":user.email, "subject":subjectInput.value, "feedbackMessage":messageTextarea.value});
        Swal.fire({
            title: "Success!",
            text: "Your feedback has been sent.",
            icon: 'success',
            confirmButtonText: 'Okay'
        });
        navigate("/dashboard");
    }

    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    return (
        <AppContainer pageTheme={websiteTheme}>
            <Header onThemeChange={handleThemeChange}/>
            <div className={`feedback-card ${websiteTheme}`}>
                <div className='card-title'>
                    <FontAwesomeIcon style={websiteTheme === 'light-theme' ? {color:"#ffffff"} : {color:"#dedede"}} icon={faPaperPlane} />
                    <h3>Send Feedback</h3>
                </div>
                <input type="text" placeholder='Subject' className={`subject-input ${websiteTheme}`}></input>
                <textarea placeholder='Your feedback..' className={`message-textarea ${websiteTheme}`}></textarea>
                <div className='send-button-div'>
                    <button onClick={sendButtonHandler} className={`send-button ${websiteTheme}`}>Send</button>
                </div>
            </div>
            <Footer/>
        </AppContainer>
    
  )
}

export default SendFeedback