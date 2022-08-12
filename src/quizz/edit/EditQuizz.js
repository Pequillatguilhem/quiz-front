import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export function EditQuizz() {
    const [series, setSeries] = useState([])
    const [selectedSerieId, setSelectedSerieId] = useState(1)
    const [questions, setQuestions] = useState([])
    const [newSerie, setNewSerie] = useState('')

    const [newQuestion, setNewQuestion] = useState('')
    const [newResponse, setNewResponse] = useState('')


    function updateNewSerie(v) {
        setNewSerie(v.target.value)
    }

    function fetchAddQuestion() {
        const toSend = {
            name: newQuestion,
            response: newResponse,
            serieId: parseInt(selectedSerieId)
        }
        fetch('http://'+process.env.REACT_APP_IP_ADDRESS+':8079/question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toSend)
        }).then(q => q.text()).then(() => fetchQuestion(selectedSerieId))
    }

    function fetchAddSerie() {
        const toSend = {
            name: newSerie
        }
        fetch('http://'+process.env.REACT_APP_IP_ADDRESS+':8079/serie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toSend)
        }).then(q => q.text()).then(() => fetchSeries())
    }

    function fetchDeleteSerie(id) {
        fetch('http://'+process.env.REACT_APP_IP_ADDRESS+':8079/serie/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(q => q.text()).then(() => fetchSeries())
    }

    function fetchSeries() {
        fetch('http://'+process.env.REACT_APP_IP_ADDRESS+':8079/series', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(a => a.json())
            .then(j => setSeries(j))
    }
    function fetchQuestion(idSerie) {
        fetch('http://'+process.env.REACT_APP_IP_ADDRESS+':8079/questions/' + idSerie, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(a => a.json())
            .then(j => setQuestions(j))
    }
    function fetchDeleteQuestion(id) {
        fetch('http://'+process.env.REACT_APP_IP_ADDRESS+':8079/question/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(a => a.text())
            .then(() => fetchQuestion(selectedSerieId))
    }



    useEffect(() => {
        fetchSeries()
        fetchQuestion(selectedSerieId)
    }, [])

    function updateSerie(v) {
        setSelectedSerieId(v.target.value)
        fetchQuestion(v.target.value)
    }

    function showReview() {
        return (questions.map((question, i) => {
            return (<tr key={i}>
                <td>{question.name}</td>
                <td>{question.response}</td>
                <td>
                    <button onClick={() => fetchDeleteQuestion(question.id)}>Delete</button>
                </td>
            </tr>);
        }));
    }

    return (
        <div>
            <div className='question-card'>
                <label>New Serie</label>
                <input onChange={updateNewSerie} type='text'/>
                <button onClick={fetchAddSerie}>Submit</button>


                <select onChange={updateSerie}>
                    <option value={-1}>-</option>
                    {series.map((s, i) => {
                        return (<option key={i} value={s.id}>{s.name}</option>)
                    })}
                </select>
                <button onClick={() => fetchDeleteSerie(selectedSerieId)}>Delete Serie</button>

                <label>Question</label>
                <input onChange={(v) => setNewQuestion(v.target.value)} type='text'/>
                <label>Response</label>
                <input onChange={(v) => setNewResponse(v.target.value)} type='text'/>
                <button onClick={fetchAddQuestion}>Submit</button>
                <table>
                    <tbody>
                    {showReview()}
                    </tbody>
                </table>

            </div>
            <div className='question-card'>
                <Link to='/'>Back</Link>
            </div>
        </div>)
}