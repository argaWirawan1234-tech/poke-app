import React from 'react'
import PropTypes from 'prop-types'
import SaveSection from './SaveSection'
import imagePokemon from '../../helper/imagePokemon'
const Result = ({
  play,
  selectedPokemon,
  save,
  nickName,
  setNickName,
  catchAgain,
  saveNickName,
  catchAgainStatus,
}) => {
  if (!play && selectedPokemon !== null) {
    const image = imagePokemon(selectedPokemon)

    return (
      <div className="result">
        <img src={image} alt={selectedPokemon.name}></img>
        <div className="result-text">
          <p>{selectedPokemon.target ? 'Congratulation' : 'Sorry'}</p>
          <span>
            You Get{' '}
            {selectedPokemon.name.charAt(0).toUpperCase() +
              selectedPokemon.name.slice(1)}
          </span>
          <SaveSection
            save={save}
            nickName={nickName}
            setNickName={setNickName}
            catchAgain={catchAgain}
            saveNickName={saveNickName}
            catchAgainStatus={catchAgainStatus}
          />
        </div>
      </div>
    )
  }
  return null
}

Result.propTypes = {
  play: PropTypes.bool,
  selectedPokemon: PropTypes.object,
  save: PropTypes.bool,
  nickName: PropTypes.string,
  setNickName: PropTypes.func,
  catchAgain: PropTypes.func,
  saveNickName: PropTypes.func,
  catchAgainStatus: PropTypes.bool,
}

export default Result
