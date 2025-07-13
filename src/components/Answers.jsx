import { useRef } from 'react';

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {
    const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return (
        <ul id="answers">
            {shuffledAnswers.current.map((answer) => {
                const isSelected = selectedAnswer === answer;
                const isCorrectAnswer = answers[0] === answer; // Doğru cevap her zaman answers[0]
                let cssClass = '';

                if (isSelected) {
                    if (answerState === 'answered') {
                        cssClass = 'selected';
                    } else if (answerState === 'correct') {
                        cssClass = 'correct';
                    } else if (answerState === 'wrong') {
                        cssClass = 'wrong';
                    }
                } else if ((answerState === 'correct' || answerState === 'wrong') && isCorrectAnswer) {
                    cssClass = 'correct'; // Doğru cevaba her zaman correct sınıfı uygula
                }

                return (
                    <li key={answer} className="answer">
                        <button
                            onClick={() => onSelect(answer)}
                            className={cssClass}
                            disabled={
                                (answerState === 'answered' && !isSelected) || // Seçilmemiş butonlar pasif
                                answerState === 'correct' || answerState === 'wrong' // Doğru/yanlış durumunda tüm butonlar pasif
                            }
                        >
                            {answer}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}