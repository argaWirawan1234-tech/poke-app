import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { setPage, setEnableToCatch } from '../store/actions/rootAction'
import mypokeball from '../static/image/mypokeball.png'

const Header = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const store = useSelector((state) => ({
    myPokemon: state.myPokemonStore,
    page: state.page,
  }))

  const goBack = () => {
    history.goBack()
  }

  const PageName = () => {
    if (store.page === 'Pokemon Detail' || store.page === 'Catch Pokemon') {
      return (
        <div id="left" className="navigation cp">
          <FaArrowLeft
            style={{ marginRight: '10px' }}
            onClick={() => goBack()}
          />
          <span className="m-0">{store.page}</span>
        </div>
      )
    }

    return (
      <div id="left" className="navigation">
        <span className="m-0">{store.page}</span>
      </div>
    )
  }

  useEffect(() => {
    history.listen((location) => {
      const page = {}
      page['/'] = 'Home'
      page['/my-pokemon-list'] = 'My Pokemon'
      page['/pokemon-detail'] = 'Pokemon Detail'
      page['/catch-pokemon'] = 'Catch Pokemon'
      dispatch(setPage(page[location.pathname]))

      if (location.pathname === '/my-pokemon-list') {
        dispatch(setEnableToCatch(false))
      } else if (location.pathname === '/') {
        dispatch(setEnableToCatch(true))
      }
    })
  }, [dispatch, history])

  return (
    <div className="header sticky">
      <PageName />
      <div id="right" className="navigation">
        <img alt="poke-ball" src={mypokeball}></img>
        <span className="m-0">{store.myPokemon.length}</span>
      </div>
    </div>
  )
}

export default Header
