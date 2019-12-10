import React from 'react'
import loadingGif from '../images/gif/loading-arrow.gif'

function Loading() {
    return (
        <div className="loading">
            <h4>Rooms Loading</h4>
            <img src={loadingGif} alt="loading gif" />
        </div>
    )
}

export default Loading
