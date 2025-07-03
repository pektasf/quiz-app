import { useState, useCallback } from "react"
import FIRSTQUIZ from '../firstQuiz.js'
import SECONDQUIZ from '../secondQuiz.js'
import THIRDQUIZ from '../thirdQuiz.js'
import quizComplete from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer.jsx";

const quizzes = [FIRSTQUIZ, SECONDQUIZ, THIRDQUIZ]

export default function Quiz() {

    const [activeQuizIndex, setActiveQuizIndex] = useState(0) // hangi sınacın faal olduğunu index ile takip edeceğiz 
    const [userAnswer, setUserAnswer] = useState([]);
    const activeQuiz = quizzes[activeQuizIndex] || []
    const activeQuestionIndex = userAnswer.length;

    const quizIsComplete = activeQuestionIndex === activeQuiz.length;

    const handleSelectedAnswer = useCallback((chosenAnswer) => {
        setUserAnswer((prevAnswers) => [...prevAnswers, chosenAnswer]);
    }, [])

    const handleSkipAnswer = useCallback(() => handleSelectedAnswer(null), []);

    function handleResetQuiz() {
        setUserAnswer([])
    }

    function handleResetAllQuiz(){
        setActiveQuizIndex(0)
        setUserAnswer([])
    }
    function handleNextQuiz() {
        setActiveQuizIndex(prevIndex => prevIndex + 1)
        setUserAnswer([])
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
        )
    }
    const shuffledAnswers = [...activeQuiz[activeQuestionIndex].answers]
    shuffledAnswers.sort(() => Math.random() - 0.5)

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer timeout={10000} />
                <h2>
                    {activeQuiz[activeQuestionIndex].text}
                </h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectedAnswer(answer)}>
                                {answer}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}