import {useEffect, useState} from "react";
import {Question} from "../question/Question";
import {Link} from "react-router-dom";

export function Quizz() {

    const [answer, setAnswer] = useState("")
    const [message, setMessage] = useState('')
    const [series, setSeries] = useState([])
    const [questions, setQuestions] = useState([]) // useState(q[Object.keys(q)[0]])
    const [isReview, setIsReview] = useState(false)

    function fetchSeries() {
        fetch('http://' + process.env.REACT_APP_IP_ADDRESS + ':8079/series', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(a => a.json())
            .then(j => setSeries(j))
    }

    function fetchQuestion(idSerie) {
        fetch('http://' + process.env.REACT_APP_IP_ADDRESS + ':8079/questions/' + idSerie, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(a => a.json())
            .then(j => {
                const qs = j.map(q => {
                    return {
                        ...q,
                        isSelected: true
                    }
                })
                setQuestions(qs)
            })
    }

    const [questionIndex, setQuestionIndex] = useState(0)

    useEffect(() => {
        fetchSeries()
    }, [])

    function isCorrect() {
        return answer === questions[questionIndex].response
    }

    function getTitle() {
        return "Question " + (questionIndex + 1) + "/" + getFilteredQuestions().length
    }

    function getFilteredQuestions() {
        return questions.filter(q => q.isSelected)
    }

    function changeIndex() {
        return questionIndex + 1 < getFilteredQuestions().length ? setQuestionIndex(questionIndex + 1) : setQuestionIndex(0)
    }

    function submitResponse() {
        setMessage(getFilteredQuestions()[questionIndex].name + ' : ' + getFilteredQuestions()[questionIndex].response)
        changeIndex()

    }

    function updateSerie(v) {
        fetchQuestion(v.target.value)
        setQuestionIndex(0)
    }

    function updateReview(v) {
        setIsReview(v.target.value)
    }

    function showReview() {
        return (questions.map((question, i) => {
            return (<tr key={i}>
                <td>{question.name}</td>
                <td>{question.response}</td>
                <td><input type='checkbox'
                           onClick={() => setQuestions(questions.map(q => q.id === question.id ? {...q, isSelected: !q.isSelected} : q))}
                           checked={question.isSelected}/></td>
            </tr>);
        }));
    }

    return (<div>
        <Question entitled={getFilteredQuestions()[questionIndex] ? getFilteredQuestions()[questionIndex].name : ''}
                  setAnswer={setAnswer}
                  answer={answer}
                  getTitle={getTitle}
                  series={series}
                  updateSerie={updateSerie}
                  submitResponse={submitResponse}
                  message={message}/>

        <div className='review'>
            <button onClick={() => setIsReview(!isReview)}>
                Review questions
            </button>

            {isReview ?
                <table>
                    <tbody>
                    {showReview()}
                    </tbody>
                </table>
                :
                <div></div>}
        </div>
        <div className='review'>
            <Link to='/edit'>Edit</Link>
        </div>
    </div>)

}