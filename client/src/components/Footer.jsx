import React from 'react'
import Fstyle from './footer.module.css'

const Footer = () => {
  const footerStyle = {
    textAlign: 'center',
    fontSize: 'smaller',
    marginTop: '20px'
  }
  return (
    <div style={footerStyle}>
      <p style={{ color: 'black', margin: 0 }}>
        © 2026 DevBookShop. All rights reserved.
      </p>
      <p style={{ color: 'blue', margin: '5px 0 0 0' }}>
        Build With React
      </p>
    </div>
  )
}

export default Footer