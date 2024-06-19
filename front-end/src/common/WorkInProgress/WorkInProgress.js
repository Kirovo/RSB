import React from 'react';
import './WorkInProgress.css'

function WorkInProgress() {
    return (
        <div className='in-progress-body'>
            <div className='in-progress-container'>
            <div className='in-progress-text'>Work in progress ...</div>
            <img className='in-progress-image' src='work-in-progress.jpg' alt='work in progress'></img>
            </div>
        </div>

    )
}

export default WorkInProgress;