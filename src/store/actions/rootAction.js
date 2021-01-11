const setAllPokemonAction = (data) => ({
  type: 'SET_ALL_POKEMON',
  data,
})

const setMyPokemonAction = (data) => ({
  type: 'SET_MY_POKEMON',
  data,
})

const removeMyPokemonAction = (data) => ({
  type: 'REMOVE_MY_POKEMON',
  data,
})

const setPage = (data) => ({
  type: 'SET_PAGE',
  data,
})

const setPokemonDetail = (data) => ({
  type: 'SET_POKEMON_DETAIL',
  data,
})

const setRandomData = (data) => ({
  type: 'SET_RANDOM_DATA',
  data,
})

const setEnableToCatch = (data) => ({
  type: 'SET_ENABLE_TO_CATCH',
  data,
})

const getData = async (url) => {
  const response = await fetch(url)
  const datas = await response.json()
  return datas
}

export {
  setPage,
  setMyPokemonAction,
  removeMyPokemonAction,
  setAllPokemonAction,
  setPokemonDetail,
  setEnableToCatch,
  getData,
  setRandomData,
}
