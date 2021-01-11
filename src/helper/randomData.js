/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { setRandomData, getData } from '../store/actions/rootAction'
import preFetchImage from './preFetchImage'
const randomData = (dispatch, history, store) => {
  const targetProbability = 0.5 * 11 // 50% from 11 random data
  const otherProbability = (11 - targetProbability) / 10
  const allPokemonFiltered = store.allPokemon.filter(
    (x) => x.name !== store.pokemon.name,
  )
  const randomDataList = []
  let x = 0
  return new Promise((resolve, reject) => {
    while (x < 10) {
      const listOfRandomIndex = []
      const randomIndex = Math.floor(Math.random() * allPokemonFiltered.length)
      const checkAvailableIndex = listOfRandomIndex.find(
        (el) => el === randomIndex,
      )

      if (checkAvailableIndex === undefined) {
        listOfRandomIndex.push(randomIndex)
        randomDataList.push(allPokemonFiltered[randomIndex])
        x += 1
      }

      if (x === 10) {
        const promise = []
        randomDataList.forEach((y) => {
          promise.push(getData(y.url))
        })
        Promise.all(promise)
          .then(async (res) => {
            res.forEach((z) => {
              z.target = false
              z.probability = otherProbability
            })

            store.pokemon.probability = targetProbability
            store.pokemon.target = true
            res.push(store.pokemon)
            dispatch(setRandomData(res))
            await preFetchImage(res).then((respond) => {
              if (respond) {
                resolve(respond)
              }
              reject(new Error('Error Occured'))
            })
          })
          .catch(() => {})
      }
    }
  })
}

export default randomData
