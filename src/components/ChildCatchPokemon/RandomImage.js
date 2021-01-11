import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import NotAvailable from '../../static/image/not-available.png'
const RandomImage = ({ play }) => {
  const randomData = useSelector((state) => state.randomData)
  const [image, setImage] = useState(NotAvailable)
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (play && randomData.length !== 0) {
      const imageInterval = setInterval(() => {
        const index = Math.floor(Math.random() * 11)
        if (index) {
          const imagePoke =
            randomData[index].sprites.other.dream_world.front_default

          if (imagePoke) {
            setImage(imagePoke)
          } else {
            const frontDef = randomData[index].sprites.front_default
            if (frontDef) {
              setImage(frontDef)
            } else {
              setImage(NotAvailable)
            }
          }
        }
      }, 100)
      return () => clearInterval(imageInterval)
    }
  })
  if (!play) {
    return null
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <img
        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
        src={image}
        alt={image}
      ></img>
      <p></p>
    </div>
  )
}

RandomImage.propTypes = {
  play: PropTypes.bool,
}

export default RandomImage
