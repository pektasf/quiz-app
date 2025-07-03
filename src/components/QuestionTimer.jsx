import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
    const [remainingTime, setRemainingTime] = useState(timeout)

    useEffect(() => {
       const timeoutId = setTimeout(onTimeout, timeout)
       return () => clearTimeout(timeoutId)
    }, [timeout, onTimeout])

    useEffect(() => {
         const intervalId = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100)
        }, 100)
        return() => clearInterval(intervalId)
    }, [])

    return(
        <>
            <progress id='question-time' max={timeout} value={remainingTime} />
        </>
    )

}