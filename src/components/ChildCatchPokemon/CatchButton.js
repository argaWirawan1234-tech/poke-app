import React from 'react'
import PropTypes from 'prop-types'
const CatchButton = ({ play, catchNow }) => {
  const Content = () => {
    if (play) {
      return (
        <div className="catch-pokemon">
          <button
            className="catch-button-pokemon cp"
            style={{ display: 'block' }}
            type="button"
            onClick={() => catchNow()}
          >
            Chatch Now
          </button>
        </div>
      )
    }

    return null
  }

  return <Content />
}

CatchButton.propTypes = {
  play: PropTypes.bool,
  catchNow: PropTypes.func,
}

export default CatchButton
