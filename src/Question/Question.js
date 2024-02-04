import "./Question.css"
import Answer from "../Answer/Answer"

export default function Question(props) {

    const answers = props.answers.map(el => <Answer
        isChecked={props.isChecked}
        isCorrect={el.isCorrect}
        selectAnswer={props.selectAnswer}
        idQ={props.id}
        idA={el.id} 
        key={el.id} 
        answer={el.answer}
        isSelected={el.isSelected} 
        />)
        
    return (
        <div className="question">
           <p className="question__question">{props.question} ?</p>
           <div className="question__answers">
            {answers}
           </div>
            </div>
    )
}