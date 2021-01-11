import React from 'react'
import PropTypes from 'prop-types'

const SaveSection = ({
  save,
  nickName,
  setNickName,
  catchAgain,
  saveNickName,
  catchAgainStatus,
}) => {
  if (save) {
    if (catchAgainStatus) {
      return (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <button className="catch-button-pokemon" type="button">
            Loading ...
          </button>
        </div>
      )
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <p>Save Success</p>
        <button
          className="catch-button-pokemon cp"
          type="button"
          onClick={() => catchAgain()}
        >
          Catch Again
        </button>
      </div>
    )
  }
  return (
    <div style={{ marginTop: '10px' }}>
      <form onSubmit={saveNickName} className="flex-column">
        <input
          className="nickname-box"
          placeholder="Nickname ?"
          type="text"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
        />
        <button type="submit" className="nickname-button">
          Save
        </button>
      </form>
    </div>
  )
}

SaveSection.propTypes = {
  save: PropTypes.bool,
  nickName: PropTypes.string,
  setNickName: PropTypes.func,
  catchAgain: PropTypes.func,
  saveNickName: PropTypes.func,
  catchAgainStatus: PropTypes.bool,
}
export default SaveSection
