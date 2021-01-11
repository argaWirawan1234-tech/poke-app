import React from 'react'

const PokemonType = (type) => {
  const { pokemonType } = type
  return pokemonType.map((x) => (
    <span className="type-label" key={`type-${x.type.name}`}>
      {x.type.name}
    </span>
  ))
}

export default PokemonType
