import React, { useState } from 'react';
import { Button, TextField, FormControl, FormControlLabel, RadioGroup, Radio, Checkbox, Typography } from '@mui/material';

const questions = [
  {
    question: 'שעת התחלה',
    type: 'time',
    options: [],
  },
  {
    question: 'בחר סוג מקום',
    type: 'radio',
    options: ['מסעדה', 'פארק', 'מסלול', 'אטרקציה'],
  },
  {
    question: 'האם ברצונך להוסיף פעילות?',
    type: 'radio',
    options: ['הוספת פעילות', 'סיום'],
  }
];

const QuestionForm = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  // פונקציה למעבר לשאלה הבאה
  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (userInput) {
      // אם התשובה היא "הוספת פעילות" או "סיום" בשאלה האחרונה, נסיים את השאלות
      if (currentQuestionIndex === questions.length - 1 && userInput === 'סיום') {
        setAnswers([...answers, { question: currentQuestion.question, answer: userInput }]);
        setIsFinished(true);
        return;
      }

      // שמירה על התשובה של השאלה הנוכחית
      setAnswers([...answers, { question: currentQuestion.question, answer: userInput }]);

      // reset התשובות
      setUserInput('');

      // אם השאלה האחרונה הייתה "הוספת פעילות" ויש בחירה של "הוספת פעילות", נחזור לשאלה הקודמת (סוג מקום)
      if (currentQuestionIndex === questions.length - 1 && userInput === 'הוספת פעילות') {
        setCurrentQuestionIndex(1); // נחזור לשאלה הקודמת "בחר סוג מקום"
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1); // עובר לשאלה הבאה
      }
    }
  };

  // הצגת השאלה הנוכחית
  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.type === 'time') {
      return (
        <div>
          <div>{currentQuestion.question}</div>
          <TextField
            type="time"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            fullWidth
            inputProps={{
              step: 300, // 5 דקות
            }}
          />
        </div>
      );
    }

    if (currentQuestion.type === 'radio') {
      return (
        <div>
          <div>{currentQuestion.question}</div>
          <FormControl component="fieldset">
            <RadioGroup
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            >
              {currentQuestion.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      {isFinished ? (
        <div>
          <Typography variant="h6">תשובות שנבחרו:</Typography>
          <pre>{JSON.stringify(answers, null, 2)}</pre>
        </div>
      ) : (
        <div>
          <div>{renderQuestion()}</div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={!userInput} // לא לאפשר לעבור אם אין תשובה
          >
            אישור
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionForm;
