import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FaSearch } from 'react-icons/fa'

const SearchBox = ({
  pagination,
  allPokemon,
  setPagination,
  defineDataToDisplay,
  setSearchResult,
  searchKey,
  setSearchKey,
}) => {
  const [search, setSearch] = useState('')

  const SearchKeyLabel = (searchKeyProps) => {
    const { searchKeyVal } = searchKeyProps
    if (searchKeyVal !== '') {
      return <p className="result-search">Result For: {searchKey}</p>
    }

    return null
  }

  const onSearch = (e) => {
    const newPage = 1
    const offsetVal = (newPage - 1) * pagination.limit
    const limiter = offsetVal + pagination.limit
    const listAllPokemon = allPokemon.filter(
      (item) => item.name.search(search) !== -1,
    )
    setSearchResult(listAllPokemon)
    const totalPage = Math.ceil(listAllPokemon.length / pagination.limit)

    setPagination({
      ...pagination,
      page: newPage,
      totalPage: totalPage === 0 ? 1 : totalPage,
    })

    defineDataToDisplay(offsetVal, limiter, listAllPokemon)

    setSearchKey(search)
    e.preventDefault()
  }

  return (
    <div>
      <p className="m-t-b-10 description">Search for pokemon by their name</p>
      <form onSubmit={onSearch} className="searchBoxWrapper">
        <input
          className="search-box"
          placeholder="What pokemon are you looking for ?"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
        />
        <button type="submit" className="search-button cp">
          <FaSearch />
        </button>
      </form>
      <SearchKeyLabel searchKeyVal={searchKey} />
    </div>
  )
}

SearchBox.propTypes = {
  pagination: PropTypes.object,
  allPokemon: PropTypes.array,
  setPagination: PropTypes.func,
  defineDataToDisplay: PropTypes.func,
  setSearchResult: PropTypes.func,
  searchKey: PropTypes.string,
  setSearchKey: PropTypes.func,
}
export default SearchBox
