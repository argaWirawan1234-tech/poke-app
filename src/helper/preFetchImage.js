/* eslint-disable consistent-return */
import imagePokemon from './imagePokemon'
const preFetchImage = (arr) =>
  new Promise((resolve) => {
    let loadedImage = 0
    const loadImage = (url) => {
      const image = new Image()
      image.src = url
      image.onload = () => {
        if (loadedImage === arr.length - 1) {
          return resolve(true)
        }
        loadedImage += 1
        console.log(loadImage(imagePokemon(arr[loadedImage])))
        loadImage(imagePokemon(arr[loadedImage]))
      }
    }

    loadImage(imagePokemon(arr[loadedImage]))
  })

export default preFetchImage
