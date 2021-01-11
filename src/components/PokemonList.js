import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useDispatch } from 'react-redux'
import {
  setPokemonDetail,
  getData,
  setAllPokemonAction,
} from '../store/actions/rootAction'
import pokemonQuery from '../Query/pokemonQuery'
import { SearchBox, Pagination, PokemonToDisplay } from './ChildPokemonList'
import Handle from './helper/Handle'

const GET_POKEMONS = pokemonQuery
const PokemonList = () => {
  const [allPokemon, setPokemonAll] = useState([])

  const [pokemenToDisplay, setPokemonToDisplay] = useState([])

  const [pagination, setPagination] = useState({
    count: 0,
    totalPage: 0,
    page: 1,
    offset: 0,
    limit: 5,
    alreadyMounted: false,
    firstTimeMounted: true,
  })

  const [searchKey, setSearchKey] = useState('')

  const [searchResult, setSearchResult] = useState([])

  const [fetchStatus, setFetchStatus] = useState(false)

  const dispatch = useDispatch()

  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: {
      limit: 1500,
      offset: 0,
    },
  })

  const defineDataToDisplay = (offsetVal, limitVal, listAllPokemon) => {
    const list = []
    setPokemonToDisplay([])
    for (let i = offsetVal; i < limitVal; i += 1) {
      if (listAllPokemon[i]) {
        list.push(listAllPokemon[i])
      }
      if (i === limitVal - 1) {
        setFetchStatus(true)
        const promise = []
        list.forEach((x) => {
          promise.push(getData(x.url))
        })

        Promise.all(promise)
          .then((res) => {
            setFetchStatus(false)
            setPokemonToDisplay(res)
          })
          .catch(() => {})
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const firstMounted = (paginationObj, pokemonObj) => {
    const { offset, limit } = paginationObj
    const limiter = offset + limit
    const listAllPokemon = pokemonObj.pokemons.results
    if (listAllPokemon.length !== 0) {
      setPagination({
        ...paginationObj,
        firstTimeMounted: false,
        totalPage: Math.ceil(pokemonObj.pokemons.count / paginationObj.limit),
        count: pokemonObj.pokemons.count,
      })

      setPokemonAll(listAllPokemon)

      dispatch(setAllPokemonAction(listAllPokemon))

      defineDataToDisplay(offset, limiter, listAllPokemon)
    }
  }

  useEffect(() => {
    if (data) {
      if (pagination.firstTimeMounted && !pagination.alreadyMounted) {
        firstMounted(pagination, data)
      }
    }
  }, [data, dispatch, firstMounted, pagination])
  if (loading) return <Handle message="Loading the data" />
  if (error) return <Handle message={`Error! ${error.message}`} />

  return (
    <div className="poke-list-wrapper">
      <div className="sticky-top">
        <SearchBox
          pagination={pagination}
          allPokemon={allPokemon}
          searchKey={searchKey}
          setPagination={setPagination}
          defineDataToDisplay={defineDataToDisplay}
          setSearchResult={setSearchResult}
          setSearchKey={setSearchKey}
        />
      </div>
      <PokemonToDisplay
        list={pokemenToDisplay}
        setPokemonDetail={setPokemonDetail}
        fetchStatus={fetchStatus}
      />
      <div className="sticky-bot">
        <Pagination
          pagination={pagination}
          allPokemon={allPokemon}
          searchKey={searchKey}
          searchResult={searchResult}
          setPagination={setPagination}
          defineDataToDisplay={defineDataToDisplay}
        />
      </div>
    </div>
  )
}

export default PokemonList
