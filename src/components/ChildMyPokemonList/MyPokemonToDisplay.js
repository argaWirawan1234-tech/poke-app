import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import imagePokemon from '../../helper/imagePokemon'
const MyPokemonToDisplay = ({
  store,
  goToPokemonDetail,
  deleteMyPokemon,
  pagination,
}) => {
  const myPokemonAll = useSelector((state) => state.myPokemonStore)
  return (
    <div className="my-poke-list-wrapper p-b-80">
      <p className="m-t-b-10 description">
        {`You now have ${myPokemonAll.length} ${
          myPokemonAll.length === 1 ? 'pokemon' : 'pokemons'
        }`}
      </p>
      <div className="grid-container">
        {store.map((item, index) => {
          const imagePoke = imagePokemon(item)
          return (
            <div
              className={`my-pokemon-item ${item.types[0].type.name}`}
              role="button"
              aria-hidden="true"
              key={String(index)}
              onClick={() => goToPokemonDetail(item)}
            >
              <span
                role="button"
                aria-hidden="true"
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation()
                  deleteMyPokemon(item.uniqeId, pagination)
                }}
              >
                x
              </span>
              <img alt={item.name} src={imagePoke}></img>
              <p style={{ color: 'white' }}>{item.nickName}</p>
              <span style={{ color: 'white' }}>
                <b>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</b>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

MyPokemonToDisplay.propTypes = {
  store: PropTypes.array,
  goToPokemonDetail: PropTypes.func,
  deleteMyPokemon: PropTypes.func,
  pagination: PropTypes.object,
}

export default MyPokemonToDisplay
