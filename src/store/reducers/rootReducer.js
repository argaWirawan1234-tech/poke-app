const initialState = {
  allPokemonStore: [],
  myPokemonStore: [],
  randomData: [],
  page: 'Home',
  pokemonDetail: undefined,
  enableToCatch: true,
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_MY_POKEMON':
      return {
        ...state,
        myPokemonStore: [...state.myPokemonStore, action.data],
      }
    case 'REMOVE_MY_POKEMON':
      return {
        ...state,
        myPokemonStore: state.myPokemonStore.filter(
          (item) => item.uniqeId !== action.data,
        ),
      }
    case 'SET_ALL_POKEMON':
      return {
        ...state,
        allPokemonStore: action.data,
      }
    case 'SET_PAGE':
      return {
        ...state,
        page: action.data,
      }
    case 'SET_POKEMON_DETAIL':
      return {
        ...state,
        pokemonDetail: action.data,
      }
    case 'SET_RANDOM_DATA':
      return {
        ...state,
        randomData: action.data,
      }
    case 'SET_ENABLE_TO_CATCH':
      return {
        ...state,
        enableToCatch: action.data,
      }
    default:
      return state
  }
}
export default rootReducer
