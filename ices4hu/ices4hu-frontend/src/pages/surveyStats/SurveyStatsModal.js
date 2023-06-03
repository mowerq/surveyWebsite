import React, { useState } from 'react'
import "./SurveyStatsModal.css"
import { Chart } from "react-google-charts";
import Swal from 'sweetalert2';

const SurveyStatsModal = ({closeModal, pageTheme, surveyStats}) => {
  
  const [questionIndex, setQuestionIndex] = useState(0);
  if (surveyStats.length < 1) {
    Swal.fire({
      title: "Sorry",
      text: "There is no answer yet!",
      icon: "error"
    })
    return;
  }

  const handleNextQuestion = () => {
    if (questionIndex + 1 < surveyStats.length) {
      setQuestionIndex(questionIndex+1);
    }
  }
  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex-1);
    }
  }
  const options = {
    is3D:true,
    legend: {
      textStyle: {
        color: '#ff0000'
      }
    },
    backgroundColor: pageTheme === 'light-theme' ? '#ffffff' : '#222222',
  };
  return (
    <div onClick={() => {closeModal(false)}} className={`modal-background ${pageTheme}`}>
      <div onClick={(e) => {e.stopPropagation();}} className={`modal-container ${pageTheme}`}>
        <div className='close-button-title-div'>
          <div className={`title ${pageTheme}`}>
            <h4>&emsp;&emsp;&emsp;{`${questionIndex + 1}. Soru: ${surveyStats[questionIndex].questionText}`}</h4>
          </div>
          <button className='close-button' onClick={() => {closeModal(false)}}> X </button>
        </div>
        
        <div className={`body ${pageTheme}`}>
          <button onClick={handlePreviousQuestion} className='left-arrow'>{`<`}</button>
          <div className='question-pie-chart-div'>

          <Chart
              options={options}
              chartType="PieChart"
              data={[["column1", "column2"], ...Object.entries(surveyStats[questionIndex].answers).map(([key, value]) => [key, value])]}
              width={"100%"}
              height={"400px"}
              
            />
          </div>
          <button onClick={handleNextQuestion} className='right-arrow'>{`>`}</button>

        </div>
        <div className={`bottom-div ${pageTheme}`}>
          <button className={`bottom-close-button ${pageTheme}`} onClick={() => {closeModal(false)}}>OK</button>
        </div>
      </div>
    </div>
  )
}

export default SurveyStatsModal