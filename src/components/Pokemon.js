import React from 'react'
import PropTypes from 'prop-types'
import PokemonType from './helper/PokemonType'
import imagePokemon from '../helper/imagePokemon'

const Pokemon = (props) => {
  const { pokemon } = props
  const image = imagePokemon(pokemon)

  return (
    <div>
      <div
        className={`cp item ${
          pokemon.types[0].type.name ? `${pokemon.types[0].type.name}` : ''
        }`}
      >
        <h3 className="m-0">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h3>

        <div className="type-label-wrapper">
          <PokemonType pokemonType={pokemon.types} />
        </div>

        <img className="image-item" src={image} alt={pokemon.name}></img>
      </div>
    </div>
  )
}

Pokemon.propTypes = {
  pokemon: PropTypes.object,
}

export default Pokemon
