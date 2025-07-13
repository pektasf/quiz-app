import { useState, useCallback } from "react";
import FIRSTQUIZ from '../firstQuiz.js';
import SECONDQUIZ from '../secondQuiz.js';
import THIRDQUIZ from '../thirdQuiz.js';
import quizComplete from '../assets/quiz-complete.png';
import Question from "./Question.jsx";

const quizzes = [FIRSTQUIZ, SECONDQUIZ, THIRDQUIZ];

export default function Quiz() {
    const [answerState, setAnswerState] = useState('');
    const [activeQuizIndex, setActiveQuizIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const activeQuiz = quizzes[activeQuizIndex] || [];
    const activeQuestionIndex = userAnswer.length;

    const quizIsComplete = activeQuestionIndex === activeQuiz.length;

    const handleSelectedAnswer = useCallback((chosenAnswer) => {
        setSelectedAnswer(chosenAnswer);
        setAnswerState('answered');

        setTimeout(() => {
            if (chosenAnswer === activeQuiz[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }

            setTimeout(() => {
                setUserAnswer((prevAnswers) => [...prevAnswers, chosenAnswer]);
                setSelectedAnswer(null);
                setAnswerState('');
            }, 1000);
        }, 1000);
    }, [activeQuestionIndex, activeQuiz]);

    const handleSkipAnswer = useCallback(() => handleSelectedAnswer(null), []);

    function handleResetQuiz() {
        setUserAnswer([]);
        setSelectedAnswer(null);
        setAnswerState('');
    }

    function handleResetAllQuiz() {
        setActiveQuizIndex(0);
        setUserAnswer([]);
        setSelectedAnswer(null);
        setAnswerState('');
    }

    function handleNextQuiz() {
        setActiveQuizIndex(prevIndex => prevIndex + 1);
        setUserAnswer([]);
        setSelectedAnswer(null);
        setAnswerState('');
    }

    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizComplete} alt="Complete Icon" />
                <h3>Quiz Completed!</h3>
                <button onClick={handleResetQuiz}>Reset Quiz</button>
                {
                    activeQuizIndex < quizzes.length - 1 && (
                        <button onClick={handleNextQuiz}>Next Quiz</button>
                    )
                }
                {
                    activeQuizIndex > 0 && (
                        <button onClick={handleResetAllQuiz}>Reset All Quiz</button>
                    )
                }
            </div>
        );
    }

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                questionText={activeQuiz[activeQuestionIndex].text}
                answers={activeQuiz[activeQuestionIndex].answers}
                answerState={answerState}
                selectedanswer={selectedAnswer}
                onSelectAnswer={handleSelectedAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    );
}