export default function catchPokemon(chances) {
  let sum = 0
  chances.forEach((chance) => {
    sum += chance
  })
  const rand = Math.random()
  let chance = 0
  for (let i = 0; i < chances.length; i += 1) {
    chance += chances[i] / sum
    if (rand < chance) {
      return i
    }
  }

  return -1
}
