/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { setPage } from '../store/actions/rootAction'
import TabContent from './ChildPokemonDetail/TabContent'
import Handle from './helper/Handle'
import imagePokemon from '../helper/imagePokemon'
import randomData from '../helper/randomData'

const PokemonDetail = () => {
  const dispatch = useDispatch()
  const [content, setContent] = useState('about')
  const [loading, setLoading] = useState(false)
  const store = useSelector((state) => ({
    allPokemon: state.allPokemonStore,
    pokemon: state.pokemonDetail,
    enableToCatch: state.enableToCatch,
  }))
  const history = useHistory()

  const catchPokemon = async () => {
    setLoading(true)
    if (store.allPokemon.length === 0) {
      history.push('/')
      return
    }

    randomData(dispatch, history, store)
      .then((response) => {
        if (response) history.push('/catch-pokemon')
      })
      .catch((e) => <Handle message={e.message} />)
  }

  const CatchButton = ({ loadingVal }) => {
    if (loadingVal) {
      return (
        <span
          className={`cp catch-button ${store.enableToCatch ? '' : 'hide'}`}
        >
          Loading
        </span>
      )
    }

    return (
      <span
        role="button"
        aria-hidden="true"
        onClick={() => catchPokemon()}
        className={`cp catch-button ${store.enableToCatch ? '' : 'hide'}`}
      >
        Catch It
      </span>
    )
  }

  CatchButton.propTypes = {
    loadingVal: PropTypes.bool,
  }

  useEffect(() => {
    dispatch(setPage('Pokemon Detail'))
  }, [dispatch])

  try {
    const baseColor = store.pokemon.types[0].type.name
    const baseFontColor = `${store.pokemon.types[0].type.name}-color`

    const tabClick = (type) => {
      setContent(type)
    }

    const pokeImage = imagePokemon(store.pokemon)
    return (
      <div>
        <div className={`pokemonType ${baseColor}`}>
          <img
            style={{ width: '100px', height: '100px', alignSelf: 'center' }}
            className="image"
            src={pokeImage}
            alt={store.pokemon.name}
          ></img>
          <div className="description">
            <h3>
              {store.pokemon.name.charAt(0).toUpperCase() +
                store.pokemon.name.slice(1)}
            </h3>
            <CatchButton loadingVal={loading} />
          </div>
        </div>
        <div className="detailWrapper">
          <div className="tab">
            <span
              role="button"
              aria-hidden="true"
              onClick={() => tabClick('about')}
              className={`cp ${content === 'about' ? baseFontColor : ''}`}
            >
              About
            </span>
            <span
              role="button"
              aria-hidden="true"
              onClick={() => tabClick('stats')}
              className={`cp ${content === 'stats' ? baseFontColor : ''}`}
            >
              Stats
            </span>
          </div>
          <div className="tab-content">
            <TabContent contentValue={content} />
          </div>
        </div>
      </div>
    )
  } catch {
    return <Handle message="Error Occured" />
  }
}

export default PokemonDetail
