/* eslint-disable no-param-reassign */
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Handle from '../helper/Handle'
import Pokemon from '../Pokemon'

const PokemonToDisplay = ({ list, setPokemonDetail, fetchStatus }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const goToPokemonDetail = (detail) => {
    dispatch(setPokemonDetail(detail))
    history.push(`/pokemon-detail`)
  }

  try {
    if (fetchStatus) return <Handle message="Getting Pokemon ..." />

    return (
      <div className="p-t-25 p-b-80">
        <TransitionGroup>
          {list.map((item, index) => (
            <CSSTransition
              key={String(index)}
              timeout={500}
              classNames="pokemonitem"
            >
              <div
                role="button"
                aria-hidden="true"
                onClick={() => goToPokemonDetail(item, index)}
              >
                <Pokemon pokemon={item} />
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    )
  } catch {
    return <Handle message="Error Occured" />
  }
}

PokemonToDisplay.propTypes = {
  list: PropTypes.array,
  setPokemonDetail: PropTypes.func,
  fetchStatus: PropTypes.bool,
}

export default PokemonToDisplay
