import React from 'react'

const Handle = (props) => {
  // eslint-disable-next-line react/prop-types
  const { message } = props
  return (
    <div className="helper-page center-message">
      <p>{message}</p>
    </div>
  )
}

export default Handle
