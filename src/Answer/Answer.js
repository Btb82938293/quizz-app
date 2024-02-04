import './Answer.css';

export default function Answer(props) {
    console.log(props.isChecked)
    const stylesBeforeCheck = {
        background: props.isSelected ? "lightgreen" : "white",
        border: props.isSelected ? "none" :  "1px solid black"
    }
    const stylesAfterCheck = {
        background: props.isCorrect && props.isSelected ? "lightgreen" 
        : !props.isCorrect && props.isSelected ? "red" 
        : props.isCorrect && !props.isSelected ? "lightgreen" 
        : "" ,
        border: props.isCorrect && props.isSelected ? "none" 
        : !props.isCorrect && props.isSelected ? "none" 
        : props.isCorrect && !props.isSelected ? "none" 
        : "1px solid black"
    }
    return (
        <p style={!props.isChecked ? stylesBeforeCheck : stylesAfterCheck} onClick={() => props.selectAnswer(props.idQ, props.idA)} className="answer">{props.answer}</p>
    )
}