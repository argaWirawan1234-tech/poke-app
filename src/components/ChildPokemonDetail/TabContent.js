import React from 'react'
import { useSelector } from 'react-redux'
import {
  FaInfoCircle,
  FaStar,
  FaAnchor,
  FaTint,
  FaShieldAlt,
  FaBattleNet,
  FaAtom,
  FaAudible,
} from 'react-icons/fa'
import PropTypes from 'prop-types'
import PokemonType from '../helper/PokemonType'

const TabContent = ({ contentValue }) => {
  const store = useSelector((state) => state.pokemonDetail)
  const baseFontColor = `${store.types[0].type.name}-color`
  const StatsIcon = (stats) => {
    const { name } = stats
    if (name === 'hp') return <FaTint className={baseFontColor} />
    if (name === 'attack') return <FaBattleNet className={baseFontColor} />
    if (name === 'defense') return <FaShieldAlt className={baseFontColor} />
    if (name === 'special-attack') return <FaAtom className={baseFontColor} />
    if (name === 'special-defense')
      return <FaAnchor className={baseFontColor} />
    if (name === 'speed') return <FaAudible className={baseFontColor} />
    return <FaStar className={baseFontColor} />
  }

  if (contentValue === 'about') {
    const aboutContent = [
      { label: 'Height', value: `${store.height / 10} m` },
      { label: 'Weight', value: `${store.weight} kg` },
      {
        label: 'Species',
        value:
          store.species.name.charAt(0).toUpperCase() +
          store.species.name.slice(1),
      },
    ]
    return (
      <div className="detail">
        <p className={baseFontColor}>
          <FaInfoCircle style={{ marginRight: '5px' }} />{' '}
          <b>Basic Information</b>
        </p>
        <table cellSpacing="0" cellPadding="0">
          <tbody>
            {aboutContent.map((x) => (
              <tr key={x.label}>
                <td className="tdAbout">
                  <b>{x.label}</b>
                </td>
                <td className="tdAbout">{x.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className={baseFontColor}>
          <FaAtom style={{ marginRight: '5px' }} /> <b>Types</b>
        </p>
        <PokemonType pokemonType={store.types} />

        <p className={baseFontColor}>
          <FaStar style={{ marginRight: '5px' }} /> <b>Abilities</b>
        </p>
        {store.abilities.map((x) => (
          <span className="type-label" key={`ability-${x.ability.name}`}>
            {x.ability.name}
          </span>
        ))}

        <p className={baseFontColor}>
          <FaAnchor style={{ marginRight: '5px' }} /> <b>Moves</b>
        </p>
        {store.moves.map((x, index) => {
          if (index < 5) {
            return (
              <p key={`move-${x.move.name}`}>
                - {x.move.name.charAt(0).toUpperCase() + x.move.name.slice(1)}
              </p>
            )
          }
          return null
        })}
      </div>
    )
  }

  if (contentValue === 'stats') {
    return (
      <div className="detail grid-container">
        {store.stats.map((x) => (
          <div className="statsItem" key={x.stat.name}>
            <StatsIcon name={x.stat.name} />
            <div className="statsLabel">
              <p>
                <b>
                  {x.stat.name.charAt(0).toUpperCase() + x.stat.name.slice(1)}
                </b>
              </p>
              <span>{x.base_stat}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return <div></div>
}

TabContent.propTypes = {
  contentValue: PropTypes.string,
}

export default TabContent
