import {useState} from "react";


export function Question(params) {
    const entitled = params.entitled
    const setAnswer = params.setAnswer
    const answer = params.answer
    const submitResponse = params.submitResponse
    const message = params.message
    const series = params.series
    const updateSerie = params.updateSerie
    const getTitle = params.getTitle

    function updateTried(v) {
        setAnswer(v.target.value)
    }

    return (<div className='question-card'>
        <select onChange={updateSerie}>
            <option value={-1}>-</option>
            {series.map((serie, i) => {
                return (
                    <option key={i} value={serie.id}>{serie.name}</option>
                )
            })}
        </select>

        <h3 className='question'>{getTitle()}</h3>
        {entitled}
        <div>
            <button className='response-button' onClick={submitResponse}>Show</button>
        </div>
        <div className='message'>{message}</div>
    </div>);
}