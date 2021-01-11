import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import PokemonList from './PokemonList'
import PokemonDetail from './PokemonDetail'
import MyPokemonList from './MyPokemonList'
import CatchPokemon from './CatchPokemon'
import Header from './Header'
import Footer from './Footer'
import '../styles/pokemon.css'
import '../styles/pokemonColor.css'
import '../styles/pokemonBackgroundColor.css'

const App = () => {
  const routes = [
    { path: '/', name: 'Home', Component: PokemonList },
    {
      path: '/pokemon-detail',
      name: 'Pokemon Detail',
      Component: PokemonDetail,
    },
    { path: '/my-pokemon-list', name: 'My Pokemon', Component: MyPokemonList },
    { path: '/catch-pokemon', name: 'Catch Pokemon', Component: CatchPokemon },
  ]
  return (
    <Router>
      <div className="flex-column main-wrapper">
        <Header />
        {routes.map(({ path, Component }) => (
          <Route key={path} exact path={path}>
            <Component />
          </Route>
        ))}
        <Footer />
      </div>
    </Router>
  )
}

export default App
