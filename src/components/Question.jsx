import QuestionTimer from "./QuestionTimer"
import Answers from "./Answers"

export default function Question({questionText, answers, onSelectAnswer, selectedanswer, answerState, onSkipAnswer}) {
    return (
        <div id="question">
            <QuestionTimer
                timeout={10000}
                onTimeout={onSkipAnswer}
            />
            <h2>{questionText}</h2>
            <Answers
                answers={answers}
                selectedAnswer={selectedanswer}
                answerState={answerState}
                onSelect={onSelectAnswer}
            />

        </div>
    )
}