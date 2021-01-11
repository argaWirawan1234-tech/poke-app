import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import {
  CatchButton,
  RandomImage,
  Result,
  TimerPreparation,
} from './ChildCatchPokemon'
import Handle from './helper/Handle'
import catchPokemon from '../helper/catchPokemon'
import randomData from '../helper/randomData'
import { setMyPokemonAction, setPage } from '../store/actions/rootAction'

const CatchPokemon = () => {
  const [timerPreparation, setTimerPreparation] = useState(3)
  const [play, setPlay] = useState(false)
  const [nickName, setNickName] = useState('')
  const [save, setSave] = useState(false)
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [catchAgainStatus, setCatchAgainStatus] = useState(false)
  const store = useSelector((state) => ({
    allPokemon: state.allPokemonStore,
    pokemon: state.pokemonDetail,
    randomData: state.randomData,
  }))
  const dispatch = useDispatch()
  const history = useHistory()

  const catchNow = () => {
    setPlay(false)
    const probability = []
    store.randomData.forEach((x, i) => {
      probability.push(x.probability)

      if (i === store.randomData.length - 1) {
        const catchedPokemon = store.randomData[catchPokemon(probability)]
        setSelectedPokemon(catchedPokemon)
      }
    })
  }

  const saveNickName = (e) => {
    const pokemonToSave = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(selectedPokemon)) {
      pokemonToSave[key] = value
    }
    pokemonToSave.nickName = nickName
    pokemonToSave.uniqeId = uuidv4()
    dispatch(setMyPokemonAction(pokemonToSave))
    setSave(true)
    e.preventDefault()
  }

  const catchAgain = () => {
    setCatchAgainStatus(true)
    randomData(dispatch, history, store)
      .then((response) => {
        if (response) {
          setNickName('')
          setSave(false)
          setSelectedPokemon(null)
          setCatchAgainStatus(false)
          setTimerPreparation(3)
        }
      })
      .catch((e) => {
        throw new Error(e)
      })
  }

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (timerPreparation !== -1) {
      const interval = setInterval(() => {
        if (timerPreparation !== 0) {
          setTimerPreparation(timerPreparation - 1)
        } else {
          dispatch(setPage('Catch Pokemon'))
          clearInterval(interval)
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  })
  try {
    return (
      <div>
        <div className="helper-page center-message">
          <TimerPreparation
            timerPreparation={timerPreparation}
            setTimerPreparation={setTimerPreparation}
            setPlay={setPlay}
          />
          <RandomImage play={play} />
        </div>
        <Result
          play={play}
          catchAgainStatus={catchAgainStatus}
          catchAgain={catchAgain}
          saveNickName={saveNickName}
          setNickName={setNickName}
          nickName={nickName}
          save={save}
          selectedPokemon={selectedPokemon}
        />
        <CatchButton play={play} catchNow={catchNow} />
      </div>
    )
  } catch (e) {
    return <Handle message={e.message} />
  }
}
export default CatchPokemon
