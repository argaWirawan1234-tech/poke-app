import React from 'react'
import PropTypes from 'prop-types'

const TimerPreparation = ({
  timerPreparation,
  setTimerPreparation,
  setPlay,
}) => {
  if (timerPreparation === 0) {
    // eslint-disable-next-line func-names
    setTimeout(function () {
      setTimerPreparation(-1)
      setPlay(true)
    }, 1000)
    return <h2 className="timerPreparationGo">Go</h2>
  }
  if (timerPreparation === -1) {
    return null
  }
  return <p className="timer">{timerPreparation}</p>
}

TimerPreparation.propTypes = {
  timerPreparation: PropTypes.number,
  setTimerPreparation: PropTypes.func,
  setPlay: PropTypes.func,
}

export default TimerPreparation
