import React from 'react'
import PropTypes from 'prop-types'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Pagination = ({
  pagination,
  allPokemon,
  setPagination,
  defineDataToDisplay,
  searchKey,
  searchResult,
}) => {
  const onRequest = (n) => {
    const newPage = pagination.page + n
    const offsetVal = (newPage - 1) * pagination.limit
    const limiter = offsetVal + pagination.limit
    let listAllPokemon = allPokemon
    if (searchKey !== '') listAllPokemon = searchResult

    if (!(newPage <= 0) && !(newPage > pagination.totalPage)) {
      setPagination({
        ...pagination,
        page: newPage,
        offset: offsetVal,
      })
      defineDataToDisplay(offsetVal, limiter, listAllPokemon)
    }
  }

  return (
    <div className="pagination">
      <span
        className="button cp"
        aria-hidden="true"
        role="button"
        onClick={() => onRequest(-1)}
      >
        <FaChevronLeft />
      </span>
      <div className="page">
        {pagination.page} / {pagination.totalPage}
      </div>
      <span
        className="button cp"
        aria-hidden="true"
        role="button"
        onClick={() => onRequest(1)}
      >
        <FaChevronRight />
      </span>
    </div>
  )
}

Pagination.propTypes = {
  pagination: PropTypes.object,
  allPokemon: PropTypes.array,
  setPagination: PropTypes.func,
  defineDataToDisplay: PropTypes.func,
  searchKey: PropTypes.string,
  searchResult: PropTypes.array,
}

export default Pagination
