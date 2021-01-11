/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  setPokemonDetail,
  removeMyPokemonAction,
  setPage,
} from '../store/actions/rootAction'
import { Pagination, SearchBox } from './ChildPokemonList'
import MyPokemonToDisplay from './ChildMyPokemonList/MyPokemonToDisplay'
import Handle from './helper/Handle'
const MyPokemonList = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const myPokemonStore = useSelector((state) => state.myPokemonStore)

  const [pokemenToDisplay, setPokemonToDisplay] = useState([])

  const [searchKey, setSearchKey] = useState('')

  const [searchResult, setSearchResult] = useState([])

  const [pagination, setPagination] = useState({
    count: 0,
    totalPage: 0,
    page: 1,
    offset: 0,
    limit: 6,
    alreadyMounted: false,
    firstTimeMounted: true,
  })

  const goToPokemonDetail = (detail) => {
    dispatch(setPokemonDetail(detail))
    dispatch(setPage('Pokemon Detail'))
    history.push(`/pokemon-detail`)
  }

  const deleteMyPokemon = (uniqeId, paginationObj) => {
    dispatch(removeMyPokemonAction(uniqeId))
    let data = myPokemonStore.filter((item) => item.uniqeId !== uniqeId)
    if (searchKey !== '') {
      data = data.filter((item) => item.name.search(searchKey) !== -1)
    }
    defineDataToDisplay(paginationObj.offset, paginationObj.limit, data)
  }

  const defineDataToDisplay = (offsetVal, limitVal, listAllPokemon) => {
    const list = []
    setPokemonToDisplay([])
    if (listAllPokemon[offsetVal] !== undefined) {
      const limitValNew = offsetVal + limitVal
      for (let i = offsetVal; i < limitValNew; i += 1) {
        if (listAllPokemon[i]) {
          list.push(listAllPokemon[i])
        }
        if (i === limitValNew - 1) {
          setPokemonToDisplay(list)
        }
      }
    } else {
      const newOffset = listAllPokemon.length - limitVal
      if (Math.sign(newOffset) !== -1) {
        const limitValNew = newOffset + limitVal
        for (let i = newOffset; i < limitValNew; i += 1) {
          if (listAllPokemon[i]) {
            list.push(listAllPokemon[i])
          }
          if (i === limitValNew - 1) {
            setPagination({
              page: pagination.page - 1,
              offset: newOffset,
              limit: 6,
              totalPage: Math.ceil(listAllPokemon.length / pagination.limit),
            })
            setPokemonToDisplay(list)
          }
        }
      } else {
        setPokemonToDisplay([])
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Mounted = (paginationObj, pokemonObj) => {
    const { offset, limit } = paginationObj
    const limiter = offset + limit
    const listAllPokemon = pokemonObj
    if (listAllPokemon.length !== 0) {
      setPagination({
        ...paginationObj,
        firstTimeMounted: false,
        totalPage: Math.ceil(pokemonObj.length / paginationObj.limit),
        count: pokemonObj.length,
      })

      defineDataToDisplay(offset, limiter, listAllPokemon)
    }
  }

  useEffect(() => {
    if (myPokemonStore) {
      if (pagination.firstTimeMounted && !pagination.alreadyMounted) {
        Mounted(pagination, myPokemonStore)
      }
    }
  }, [myPokemonStore, Mounted, pagination, dispatch])
  try {
    if (myPokemonStore.length === 0)
      return <Handle message="You dont have any Pokemon" />
    return (
      <div>
        <div className="sticky-top p-lr-20">
          <SearchBox
            pagination={pagination}
            allPokemon={myPokemonStore}
            searchKey={searchKey}
            setPagination={setPagination}
            defineDataToDisplay={defineDataToDisplay}
            setSearchResult={setSearchResult}
            setSearchKey={setSearchKey}
          />
        </div>
        <MyPokemonToDisplay
          goToPokemonDetail={goToPokemonDetail}
          store={pokemenToDisplay}
          deleteMyPokemon={deleteMyPokemon}
          pagination={pagination}
        />
        <div className="sticky-bot">
          <Pagination
            pagination={pagination}
            allPokemon={myPokemonStore}
            searchKey={searchKey}
            searchResult={searchResult}
            setPagination={setPagination}
            defineDataToDisplay={defineDataToDisplay}
          />
        </div>
      </div>
    )
  } catch {
    return <Handle message="Error Occured" />
  }
}

export default MyPokemonList
