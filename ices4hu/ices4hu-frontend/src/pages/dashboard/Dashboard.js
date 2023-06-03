import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header"
import Footer from "../../components/Footer";
import styled from "styled-components";
import './Dashboard.css';
import api from '../../api/axiosConfig';
import Swal from "sweetalert2";
import AddUser from "../../components/helpers/AddUser";
import UserFinder from "../../components/helpers/UserFinder";
import DeleteUser from "../../components/helpers/DeleteUser";
import EnrollStudent from "../../components/helpers/EnrollStudent";
import EnrolledLectures from "../../components/helpers/EnrolledLectures";
import BanUser from "../../components/helpers/BanUser";
import { Paper } from "@material-ui/core";


const AppContainer = styled.div`
  display: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: ${props => {
    return props.pageTheme === "light-theme" ? "#f4edff" : "#222222";
  }};
`;



const Dashboard = () => {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);
  const [creators, setCreators] = useState([]);
  const [studentEmail, setStudentEmail] = useState('');
  const [websiteTheme, setWebsiteTheme] = useState(localStorage.getItem('theme'));
  const handleThemeChange = (newTheme) => {
    localStorage.setItem('theme', newTheme);
    setWebsiteTheme(newTheme);
  }

  const getSurveys = async () => {
    try {
      const response = await api.get("/survey/surveys");
      // response is an array of surveys objects. Each survey object has a surveyID string. 
      // console.log(response.data[0].surveyID);
      
      const completedSurveys = await api.get(`/api/auth/${user.email}/completed-surveys`);
      // completedSurveys.data is an array of string, each string is a surveyId
      const completedSurveyIds = completedSurveys.data;
      //console.log(completedSurveyIds);
      if (user.userType === "student") {
        let surveysThisStudent = [];
        for (let i = 0; i < response.data.length; i++) {
          for (let j = 0; j < user.enrolledLectures.length; j++) {
            if (response.data[i].lectureCode === user.enrolledLectures[j]) {
              if (!completedSurveyIds.includes(response.data[i].surveyID)) {
                surveysThisStudent.push(response.data[i]);
              }
            }
          }
        }
        setSurveys(surveysThisStudent);

      } else {
        setSurveys(response.data);
      }
      
      const creators = [];
      for (let i = 0; i < response.data.length; i++) {
        const responseUser = await api.get(`/api/auth/${response.data[i].createdBy}`);
        creators.push(`${responseUser.data.firstName} ${responseUser.data.lastName}`);
      }
      setCreators(creators);
      return;
    } catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getSurveys();
  }, []);

  //This arrow function takes two arguments and passes them to ASurvey.js file
  //In ASurvey file these arguments are used to create a survey with relevant questions and options.
  const goSurveyPage = (aSurvey, createdBy) => {
    navigate("/survey", {state: {aSurvey: aSurvey, createdBy: createdBy, user: user}});
  };
  const goEditSurveyPage = (aSurvey) => {
    navigate("/edit-survey", {state: {aSurvey: aSurvey, user: user}});
  }
  const goCreateSurveyPage = (emptySurvey) => {
    navigate("/edit-survey", {state: {aSurvey: emptySurvey, user: user}});
  }
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);

  if (user.userType === "student") {
    return (
      <AppContainer pageTheme={websiteTheme}>
        <Header onThemeChange={handleThemeChange}/>
        <div className={`dashBoardContainer ${websiteTheme}`}>
          {surveys.length < 1 ? 
            <div className={`dashBoardDiv ${websiteTheme}`}>
              <h1>Welcome to the Dashboard! No Surveys For Now</h1>
            </div>
           : <>
            <div className={`dashBoardDiv ${websiteTheme}`}>
              <h2>Welcome to the Dashboard! Here are some surveys for you:</h2>
            </div>
          <div className="surveyListContainer">
            <div>
              <section className={`page-contain ${websiteTheme}`}>
                {surveys.map((aSurvey, surveyIndex) => {
                  return(
                    <div key={surveyIndex} className={`data-card ${websiteTheme}`} onClick={() => goSurveyPage(aSurvey, creators[surveyIndex])}>
                      <h3>{aSurvey.lectureCode}</h3>
                      <h4>{creators[surveyIndex]}</h4>
                      <p>{`${aSurvey.questions.length} Questions`}</p>
                      <span className="link-text">
                        Take the survey
                        <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z" fill="#753BBD"/>
                        </svg>
                      </span>
                    </div>
                  )
                })}
              </section>
            </div>
          </div>
          </>
          }
        </div>
        <Footer/>
      </AppContainer>
    );
  } else if (user.userType === "instructor") {
    return (
      <AppContainer pageTheme={websiteTheme}>
        <Header onThemeChange={handleThemeChange}/>
        <div className={`dashBoardContainer ${websiteTheme}`}>
          <div className={`dashBoardDiv ${websiteTheme}`}>
            <h2>Welcome to the Dashboard! You can create and edit your surveys here:</h2>
          </div>
          <div className="surveyListContainer">
            <div>
              <section className={`page-contain ${websiteTheme}`}>
                {surveys.map((aSurvey, surveyIndex) => {
                  if (aSurvey.createdBy === user.email) {
                    const createdDate = new Date(aSurvey._id.date);
                    const minutes = createdDate.toLocaleTimeString("tr-TR");
                    const formattedDate = `${createdDate.toLocaleDateString()}, ${minutes}`;
                    return(
                      <div key={surveyIndex} className={`data-card ${websiteTheme}`} onClick={() => goEditSurveyPage(aSurvey, user)}>
                        <h3>{aSurvey.lectureCode}</h3>
                        <h4>{`${aSurvey.questions.length} Questions`}</h4>
                        <p>{`Created on ${formattedDate}`}</p>
                        <span className="link-text">
                          Edit this Survey
                          <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z" fill="#753BBD"/>
                          </svg>
                        </span>
                      </div>
                    )
                  } else {
                    return "";
                  }
                })}
                <div key="addNewSurveyDiv" className={`data-card ${websiteTheme}`} onClick={() => {
                    Swal.fire({
                      title:"Enter the lecture code",
                      input:"text",
                      preConfirm: (lectureCode) => {
                        if (lectureCode === "") {
                          Swal.showValidationMessage("Please enter the lecture code!");
                        } else {
                          goCreateSurveyPage({"createdBy":user.email,"questions":[],"lectureCode":lectureCode});

                        }
                      }
                      
                    })
                  }}>
                  <h3>Create a new Survey</h3>
                  <span className="link-text">
                    
                    <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z" fill="#753BBD"/>
                    </svg>
                  </span>
                </div>
              </section>
            </div>
          </div>
  
        </div>
        <Footer/>
      </AppContainer>
    );
  }  else {
    return (
      <AppContainer>
        <Header onThemeChange={handleThemeChange}/>
        <h1>Welcome To The Others Dashboard</h1>
        <Footer/>
      </AppContainer>
    )
  }
  
};

export default Dashboard;