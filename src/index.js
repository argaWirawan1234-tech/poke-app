import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './styles/index.css'
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store/store'
import App from './components/App'
import reportWebVitals from './reportWebVitals'

const httpLink = createHttpLink({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
