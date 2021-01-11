import imagePokemon from '../src/helper/imagePokemon'
const NotAvailable = require('../src/static/image/not-available.png')
test('imagePokemon define retun value of image', () => {
  const data1 = {
    name: 'bulbasaur',
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      other: {
        dream_world: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
        },
      },
    },
  }

  const data2 = {
    name: 'bulbasaur',
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      other: {
        dream_world: {
          front_default: null,
        },
      },
    },
  }

  const data3 = {
    name: 'bulbasaur',
    sprites: {
      front_default: null,
      other: {
        dream_world: {
          front_default: null,
        },
      },
    },
  }

  expect(imagePokemon(data1)).toBe(
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
  )

  expect(imagePokemon(data2)).toBe(
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  )

  expect(imagePokemon(data3)).toBe(NotAvailable)
})
