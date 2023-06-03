import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styled from 'styled-components';
import './EditSurvey.css';
import api from "../../api/axiosConfig";

const AppContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  margin-top: 60px;
`;

const EditSurvey = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {aSurvey, user} = state;
  const goDashboard = () => {
        navigate("/dashboard", {state: {user: user}})
    }
  const [questions, setQuestions] = useState(aSurvey.questions);
  const [replaceQuestionsIndex, setReplaceQuestionsIndex] = useState(-1);
  const [replaceButtonText, setReplaceButtonText] = useState("Replace");
  const [websiteTheme, setWebsiteTheme] = useState(localStorage.getItem('theme'));
  const handleThemeChange = (newTheme) => {
    localStorage.setItem('theme', newTheme);
    setWebsiteTheme(newTheme);
  }



  const removeQuestion = useCallback((questionIndex) => {
    const newQuestions = [...questions];
    newQuestions.splice(questionIndex, 1);
    setQuestions(newQuestions);
  }, [questions]);

  const handleReplaceButton = useCallback((questionIndex) => {
    if (replaceQuestionsIndex === -1) {
      setReplaceButtonText("With This");
      setReplaceQuestionsIndex(questionIndex);
    }else {
      setReplaceButtonText("Replace");
      setReplaceQuestionsIndex(-1);
      let temp = questions[replaceQuestionsIndex];
      questions[replaceQuestionsIndex] = questions[questionIndex];
      questions[questionIndex] = temp;
    }

  }, [replaceQuestionsIndex, questions]);

  const handleDuplicateButton = useCallback((question, questionIndex) => {
    const newQuestion = { ...question };
    const newQuestions = [...questions];
    newQuestions.splice(questionIndex + 1, 0, newQuestion);
    setQuestions(newQuestions);
  }, [questions]);
  

  const handleNewQuestion = async () => {
    let newQuestion = {questionText: "", questionType:"", options: []}
    let hasEmptyInput = true;
    const steps = ['1', '2', '3']
    const Queue = Swal.mixin({
      progressSteps: steps,
      confirmButtonText: 'Next >',
    })

    const { value: questionType } = await Swal.fire({
      title: 'Select the question type',
      input: 'select',
      inputOptions: {
        "radio": "Radio",
        "text": "Text"
      },
      inputPlaceholder: 'Select a question type',
      showCancelButton: true,
    })

    if (questionType === "radio") {
      let isCancelled =  true;
      newQuestion["questionType"] = "radio";
      await Queue.fire({
        title: `Enter question text`,
        allowOutsideClick: false,
        allowEscapeKey: false,
        input: "textarea",
        inputPlaceholder: "Enter your question here.",
        showCancelButton: true,
        currentProgressStep: 1,
        preConfirm: (message) => {
          if (message === "") {
            Swal.showValidationMessage("Please enter the question!");
          }
        }
      }).then((enteredQuestion) => {
        if (!enteredQuestion.isDismissed) {
          newQuestion["questionText"] = enteredQuestion.value;
          isCancelled = false;
        }
      });
      if(!isCancelled){
        let inputsCount = 1;
        await Queue.fire({
        title: 'Add options to your question',
        html: '<div className="options-buttons-container" id="options-buttons-container"><button id="add-option-btn">Add an Option</button><button id="remove-option-btn">Remove Last Option</button></div><div id="options-container"><input type="text" placeholder="Option 1"></div>',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: "Finish",
        didOpen: () => {
          const addOptionButton = document.querySelector('#add-option-btn');
          const optionsContainer = document.querySelector('#options-container');
          addOptionButton.addEventListener('click', () => {
            Swal.resetValidationMessage();
            inputsCount++;
            const newInput = document.createElement('input');
            newInput.setAttribute('type', 'text');
            newInput.setAttribute('placeholder', `Option ${inputsCount}`);
            optionsContainer.appendChild(newInput);
          });
          const removeOptionButton = document.querySelector("#remove-option-btn");
          removeOptionButton.addEventListener('click', () => {
            if (inputsCount > 1) {
              inputsCount--;
              optionsContainer.removeChild(optionsContainer.lastChild);
            } else {
              Swal.showValidationMessage("You can't remove more options!")
            }
            
          })
        },
        preConfirm: () => {
          const inputs = document.querySelectorAll('#options-container input');
          const values = Array.from(inputs).map(input => input.value.trim());
          hasEmptyInput = values.some(value => value === "");
          if (hasEmptyInput) {
            Swal.showValidationMessage("Options cannot be empty!");
          }else {
            newQuestion["options"] = values;
          }
        }
      });
    }
      
    } else if (questionType === "text"){
      newQuestion["questionType"] = "text";
      steps.pop();
      await Queue.fire({
        title: `Enter question text`,
        showCancelButton:true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        input: "textarea",
        inputPlaceholder: "Enter your question here.",
        currentProgressStep: 1,
        preConfirm: (message) => {
          if (message === "") {
            Swal.showValidationMessage("Please enter the question!");
          }
        }
      }).then((enteredQuestion) => {
        if (!enteredQuestion.isDismissed) {
          newQuestion["questionText"] = enteredQuestion.value;
          hasEmptyInput = false;
        }
        
      });
    }

    if (!hasEmptyInput) {
      setQuestions(questions => [...questions, newQuestion]);
      hasEmptyInput = true;
    }
  }

  const showQuestions = useCallback(() => {
    if (questions.length < 1) {
      return (
        <h1 className={`${websiteTheme}`}>You haven't added any questions yet!</h1>
      )
    }
    return questions.map((question, questionIndex) =>{
      
      if (question.questionType === 'text') {
        return (
          <div key={`questionContainer1-${questionIndex}`} className={`container ${websiteTheme}`}>
            <div className='above-question-buttons-div'>
              <button onClick={() => removeQuestion(questionIndex)} className={`noselect ${websiteTheme}`}><span className='text'>Delete</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg></span></button>
              <button onClick={() => handleReplaceButton(questionIndex)} className={`replace-button ${websiteTheme}`}>{replaceButtonText}</button>
              <button onClick={() => handleDuplicateButton(question, questionIndex)} className={`duplicate-button ${websiteTheme}`}>Duplicate</button>
            </div>
            <div onBlur={(event) => {
              const newQuestions = [...questions];
              newQuestions[questionIndex].questionText = event.target.innerText;
              setQuestions(newQuestions);
            }} 
            suppressContentEditableWarning={true}
            contentEditable={true} key={`questionText1Key-${questionIndex}`} className={`questionText ${websiteTheme}`}>
              {`${question.questionText}`}
            </div>
            <div key={`textInputContainerKey-${questionIndex}`} className="textInputContainer">
              <textarea key={`textInputKey-${questionIndex}`} type="text" className="textInput"></textarea>
            </div>
          </div>
        );
      } else {
        return (
          <div key={`questionContainer2-${questionIndex}`} className={`container ${websiteTheme}`}>
            <div className='above-question-buttons-div'>
              <button onClick={() => removeQuestion(questionIndex)} className={`noselect ${websiteTheme}`}><span className='text'>Delete</span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg></span></button>
              <button onClick={() => handleReplaceButton(questionIndex)} className={`replace-button ${websiteTheme}`}>{replaceButtonText}</button>
              <button onClick={() => handleDuplicateButton(question, questionIndex)} className={`duplicate-button ${websiteTheme}`}>Duplicate</button>
            </div>
            <div onBlur={(event) => {
              const newQuestions = [...questions];
              newQuestions[questionIndex].questionText = event.target.innerText;
              setQuestions(newQuestions);
            }} 
            suppressContentEditableWarning={true}
            contentEditable={true} key={`questionText2Key-${questionIndex}`} className={`questionText ${websiteTheme}`}>
              {`${question.questionText}`}
            </div>
            <ul key={`allAnswersContainerKey-${questionIndex}`} className="allAnswersContainer">
              {question.options.map((anOption, optionIndex) => {
                return (
                  <div key={`optionContainerKey-${optionIndex}`} className="optionContainer">
                    <li key={`${optionIndex}-optionTextKey`} className={`optionText ${websiteTheme}`}>
                      <input type="radio" id={`${questionIndex}-${optionIndex}-option`} name={`selector-${questionIndex}`} />
                      <label onBlur={(event) => {
                        const newQuestions = [...questions];
                        newQuestions[questionIndex].options[optionIndex] = event.target.innerText;
                        setQuestions(newQuestions);
                      }} suppressContentEditableWarning={true}  contentEditable={true} htmlFor={`${questionIndex}-${optionIndex}-option`}>{anOption}</label>
                      <div className="check"></div>
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        );
      }
    });
    
  }, [questions, removeQuestion, handleReplaceButton, replaceButtonText, handleDuplicateButton, websiteTheme]);

  return (
    <AppContainer>
      <Header onThemeChange={handleThemeChange}/>
      <div className={`questionsContainer ${websiteTheme}`}>
        {showQuestions()}
        <div className='save-button-div'>
          <button onClick={() => goDashboard()} className={`back-button ${websiteTheme}`}>CANCEL</button>
          <button onClick={async () => {
            
            let createOrUpdate = aSurvey.questions.length < 1;
            if (questions.length < 1) {
              if (createOrUpdate) {
                goDashboard();
                return;
              } else {
                await api.delete(`/survey/delete-survey/${aSurvey.surveyID}`);
                Swal.fire({
                  title: "Good Job!",
                  text: "You have deleted the survey successfully!",
                  icon: 'success',
                  confirmButtonText: 'Okay'
                });
                goDashboard();
              }
              
            }else{
              aSurvey.questions = questions;
              if (createOrUpdate) {
                await api.post("/survey/new-survey", aSurvey);
                Swal.fire({
                  title: "Good Job!",
                  text: "You have created a new survey successfully!",
                  icon: 'success',
                  confirmButtonText: 'Okay'
                });
                goDashboard();
              } else {
                await api.put(`/survey/edit-survey/${aSurvey.surveyID}`, aSurvey);
                Swal.fire({
                  title: "Good Job!",
                  text: "You have updated the survey successfully!",
                  icon: 'success',
                  confirmButtonText: 'Okay'
                });
                goDashboard();
              }
            }
            
            
          }} className={`save-button ${websiteTheme}`}>SAVE</button>
        </div>
      </div>
      <button onClick={handleNewQuestion} className='new-question-button'>+</button>
      <Footer />
    </AppContainer>
  );
};

export default EditSurvey;