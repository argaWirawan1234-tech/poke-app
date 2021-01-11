import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FaHome, FaUser } from 'react-icons/fa'
import { setPage } from '../store/actions/rootAction'
export default function Footer() {
  const page = useSelector((state) => state.page)
  const dispatch = useDispatch()
  const history = useHistory()
  const route = ['/', '/my-pokemon-list']
  const pageVal = {}
  pageVal['/'] = 'Home'
  pageVal['/my-pokemon-list'] = 'My Pokemon'

  const goTo = (routeVal) => {
    dispatch(setPage(pageVal[routeVal]))
    history.push(routeVal)
  }

  const Logo = (routeVal) => {
    const { link } = routeVal
    if (link === '/') return <FaHome />
    if (link === '/my-pokemon-list') return <FaUser />
    return null
  }

  return (
    <div className="footer sticky">
      {route.map((item, index) => (
        <div
          role="button"
          aria-hidden="true"
          key={String(index)}
          onClick={() => goTo(item)}
          className={`cp ${page === pageVal[item] ? 'active-route' : ''}`}
        >
          <Logo link={item} />
        </div>
      ))}
    </div>
  )
}
