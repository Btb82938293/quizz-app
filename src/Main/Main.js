import './Main.css';
import React, {useState, useEffect} from "react";
import {nanoid} from "nanoid";
import Question from "../Question/Question"

export default function Main() {
    const [quizData, setQuizData] = useState([])
    const [message, setMessage] = useState("")
    const [isChecked, setIsChecked] = useState(false)
    const [isStarted, setIsStarted] = useState(false)
    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=6&type=multiple")
        .then(res => res.json())
        .then(data => setQuizData(data.results.map(q => ({
            ...q,
            answers: [...q.incorrect_answers, q.correct_answer].sort().map(answer => ({
                answer,
                id: nanoid(),
                isCorrect: answer === q.correct_answer,
                isSelected: false
            })),
            id: nanoid(),
            question: {question: q.question, id: nanoid()}
        }))))
        .catch(er => console.log(er))
    },[])
    const selectAnswer = (idQ, idA) => {
        setQuizData(prevQuizData => prevQuizData.map(q => ({
            ...q,
            answers: q.answers.map(ans => ans.id === idA ? {...ans, isSelected : !ans.isSelected}
               : {...ans, isSelected: q.question.id === idQ ? false : ans.isSelected })
        })))
    }
    const questions = quizData.map(el => <Question
        isChecked={isChecked}
        selectAnswer={selectAnswer}
        answers={el.answers} 
        question={el.question.question.replace(/[^a-zA-Z ]/g, "")}
        key={el.question.id}
        id={el.question.id}
        />)

    const checkAns = () => {
        const correctAns = quizData.map(q => q.correct_answer)
        const selectedAns = quizData.map(q => {
            return q.answers.filter(ans => ans.isSelected).map(ans => ans.answer)
        }).flat()
        if (correctAns.length === selectedAns.length) {
            setIsChecked(true)
            const resultAr = []
        selectedAns.forEach(el => {
            if (correctAns.includes(el)) {
                resultAr.push(el)
            }
        })
        const correctAnsNumber = resultAr.length
        setMessage(correctAnsNumber <= 5 ? `You've got only ${correctAnsNumber} correct answer${correctAnsNumber !== 1 && "s"}, would you like to try again?`
        : `Wow! You've got ${correctAnsNumber} correct answers, CONGRATS! Wanna try again?` )
        } else {
            setMessage("Please answer all the questions")
        }
    }

    const restart = () => {
        setIsChecked(false)
        setMessage("")
        setQuizData(prevQuizData => prevQuizData.map(q => ({
            ...q,
            answers: q.answers.map(a => ({
                ...a,
                isSelected: false
            }))
        })))
    }
    
    return (
        <div className="main">
            <h1>Quizz App</h1>
            {isStarted 
            ? <div className="container">
                <div className="questions">
                    {questions}
                </div>
                {!isChecked ? <button onClick={checkAns} className="checkBtn">CHECK ANSWERS</button> :
                <button onClick={restart} className="checkBtn">TRY AGAIN?</button>}
                <p>{message}</p>
            </div> 
            : <div>
                <p>"Do you wanna play a Quizz game?"</p>
                <button onClick={() => setIsStarted(true)}>START</button>
                </div>}
        </div>
    )
}