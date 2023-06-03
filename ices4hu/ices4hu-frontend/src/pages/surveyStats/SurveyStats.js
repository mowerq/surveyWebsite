import React, { useEffect, useState } from 'react'
import SurveyStatsModal from './SurveyStatsModal'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import api from "../../api/axiosConfig"
import styled from 'styled-components'
import "./SurveyStats.css"

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: ${props => {
    return props.pageTheme === "light-theme" ? "#f4edff" : "#222222";
  }};
`;

const SurveyStats = () => {
    const [openModal, setOpenModal] = useState(false);
    const [websiteTheme, setWebsiteTheme] = useState(localStorage.getItem('theme'));
    const [surveys, setSurveys] = useState([]);
    const [surveyStatistics, setSurveyStatistics] = useState([]);
    
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    
    const handleThemeChange = (newTheme) => {
      localStorage.setItem('theme', newTheme);
      setWebsiteTheme(newTheme);
    }

    const getSurveys = async () => {
        try{
            const response = await api.get(`/survey/survey-stats-surveys/${user.email}`);
            setSurveys(response.data);
            console.log(response.data);
        }catch(e){
            console.log(e);
        }
    }
    useEffect(() => {
        getSurveys();
    }, []);
    return (
        <AppContainer pageTheme={websiteTheme}>
            <Header  onThemeChange={handleThemeChange}/>
            <div className={`survey-stats-container ${websiteTheme}`}>
            {surveys.length < 1 ? 
                <div className={`survey-stats-div ${websiteTheme}`}>
                    <h1>Welcome to the Survey Statistics Webpage! No Surveys For Now</h1>
                </div>
            : <>
                <div className={`survey-stats-div ${websiteTheme}`}>
                    <h1>Welcome to the Survey Statistics Webpage! Here are your surveys:</h1>
                </div>
            <div className="survey-list-container">
                <div>
                <section className={`page-contain ${websiteTheme}`}>
                    {surveys.map((aSurvey, surveyIndex) => {
                    if (aSurvey.createdBy === user.email) {
                        const createdDate = new Date(aSurvey._id.date);
                        const minutes = createdDate.toLocaleTimeString("tr-TR");
                        const formattedDate = `${createdDate.toLocaleDateString()}, ${minutes}`;
                        return(
                          <div key={surveyIndex} className={`data-card ${websiteTheme}`} onClick={async () => {
                            const response = await api.get(`/survey/survey-stats/${aSurvey.surveyID}`);
                            setSurveyStatistics(response.data);
                            setOpenModal(true)}
                            }>
                            <h3>{aSurvey.lectureCode}</h3>
                            <h4>{`${aSurvey.questions.length} Questions`}</h4>
                            <p>{`Created on ${formattedDate}`}</p>
                            <span className="link-text">
                              See survey statistics
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
                </section>
                </div>
            </div>
            </>
            }
            </div>
            {openModal && <SurveyStatsModal closeModal={setOpenModal} pageTheme={websiteTheme} surveyStats={surveyStatistics.questionStatistics}/>}
            <Footer/>
        </AppContainer>
    )
}

export default SurveyStats