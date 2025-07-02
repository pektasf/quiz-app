import { useState, useCallback } from "react"
import QUESTIONS from '../question.js'
import quizComplete from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer.jsx";


export default function Quiz() {

    const [userAnswer, setUserAnswer] = useState([]); // kullanıcının cevaplarını da işlememiz lazım vr dom da
    const activeQuestionIndex = userAnswer.length; // indexe bakarak bir sonraki sorunun sorulacağını anlayabiliriz ve daha az durum yönetimi yapmış oluruz 

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectedAnswer = useCallback(function selectedAnswer(chosenAnswer) {
        setUserAnswer((prevAnswers) => {
            return [...prevAnswers, chosenAnswer];
        });
    }, [])

    const handleSkipAnswer = useCallback(() => handleSelectedAnswer(null), []);

    if (quizIsComplete) {
        return (
                <div id="summary">
                    <img src={quizComplete} alt="Complete Icon" />
                    <h3>Quiz Completed!</h3>
                </div>
        )
    }
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]
    shuffledAnswers.sort(() => Math.random() - 0.5)

    return (
            <div id="quiz">
                <div id="question">
                <QuestionTimer timeout={10000} />
                    <h2>
                        {QUESTIONS[activeQuestionIndex].text}
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