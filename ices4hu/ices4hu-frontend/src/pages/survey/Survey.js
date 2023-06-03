import React, { useState } from 'react';
import { BoldLink } from '../../components/accountBox/common';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../../components/Header"
import Footer from "../../components/Footer";
import styled from "styled-components";
import { Button } from '@material-ui/core';
import './Survey.css'
import Swal from 'sweetalert2';
import api from '../../api/axiosConfig';


const AppContainer = styled.div`
  width: 100%;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: inherit;
`;

/*const buttonStyle = {
  fontSize: '1em',
  color: "#2E3C40",
  backgroundColor: "#dedede",
  borderWidth: "0px"
};*/

const Survey = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const {aSurvey, createdBy, user} = state;
  const goDashboard = () => {navigate('/dashboard', {state: {user:user}})};
  const [answers, setAnswers] = useState({});
  const [websiteTheme, setWebsiteTheme] = useState(localStorage.getItem('theme'));
  const handleThemeChange = (newTheme) => {
    localStorage.setItem('theme', newTheme);
    setWebsiteTheme(newTheme);
  }

  const handleAnswer = (questionIndex, optionIndex) => {
    if (optionIndex === "" && answers.hasOwnProperty(questionIndex)) {
      delete answers[questionIndex];
    }else {
      setAnswers({
        ...answers,
        [questionIndex]: optionIndex
      });
    }
    
  };


  const handleSubmit = async () => {
    const numQuestions = aSurvey.questions.length;
    const numAnswers = Object.keys(answers).length;
    if (numAnswers === numQuestions) {
      const myAnswerObject = {
        "surveyId" : aSurvey.surveyID,
        "userEmail" : user.email,
        "answers": Object.values(answers).map(value => value)
      }
      api.post(`/api/auth/${myAnswerObject.userEmail}/complete-survey/${myAnswerObject.surveyId}`);
      api.post("/survey/submit-answer", myAnswerObject);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'You successfuly completed the survey.',
      })
      goDashboard();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You should answer all questions!',
      })
    }
  };

  if (aSurvey) {
    return(
      <AppContainer className={`appContainer ${websiteTheme}`}>
        <div className={`surveyContainer ${websiteTheme}`}>
          <Header onThemeChange={handleThemeChange}/>

            <div className='surveyTitle'>
              <h2 className={`welcomeText ${websiteTheme}`} key="boldLinkSurveyTitle" onClick={goDashboard}> {`Welcome! This survey is created by the instructor ${createdBy} for the lecture ${aSurvey.lectureCode}.`} </h2>

            </div>
            <div className='allQuestionsContainer'>
                {aSurvey.questions.map((aQuestion, questionIndex) => {
                  if (aQuestion.questionType === "text") {
                    return(
  
                      <div key={`questionContainer1-${questionIndex}`} className='container'>
                        <div key="questionText1Key" className={`questionText ${websiteTheme}`}>
                          {`${questionIndex + 1}. ${aQuestion.questionText}`}
                        </div>
                        <div key="textInputContainerKey" className='textInputContainer'>
                          <textarea onChange={(e)=>{ handleAnswer(questionIndex, e.target.value); }} key="textInputKey" placeholder='Enter your answer.' className={`textInput ${websiteTheme}`}></textarea>
                        </div>
  
                      </div>
                    )
                    
                  } else {
                    return (
                      <div key={`questionContainer2-${questionIndex}`} className='container'>
                        <div key={`questionText2Key-${questionIndex}`} className={`questionText ${websiteTheme}`}>
                          {`${questionIndex + 1}. ${aQuestion.questionText}`}
                        </div>
                        <ul key={`allAnswersContainerKey-{${questionIndex}}`} className='allAnswersContainer'>
                          {aQuestion.options.map((anOption, optionIndex) => {
                            return (
                              <div key={`optionContainerKey-${optionIndex}`} className='optionContainer'>
                                <li key={`${optionIndex}-optionTextKey`} className={`optionText ${websiteTheme}`}>
                                  <input
                                    type='radio'
                                    id={`${questionIndex}-${optionIndex}-option`}
                                    name={`selector-${questionIndex}`}
                                    onChange={()=>{ handleAnswer(questionIndex, anOption); }
                                    }
                                  />
                                  <label htmlFor={`${questionIndex}-${optionIndex}-option`}>{anOption}</label>
                                  <div className='check'></div>
                                </li>
                              </div>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  }
                })}
            </div>
            <div className='saveButtonDiv'>
              <Button onClick={handleSubmit} variant='outlined' size='large' className={`save-button ${websiteTheme}`}>Save</Button>
            </div>
            <Footer />
        </div>
      </AppContainer>
    );
  }else{
    return(
      <AppContainer className={`appContainer ${websiteTheme}`}>
        <div className={`surveyContainer ${websiteTheme}`}>
          <Header onThemeChange={handleThemeChange}/>
            <BoldLink onClick={goDashboard}>Survey Could Not Found! Press Here To Turn Back</BoldLink>
          <Footer/>
        </div>
      </AppContainer>
    )
  }
  
};

export default Survey;