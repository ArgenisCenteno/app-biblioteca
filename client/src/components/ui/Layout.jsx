import React from 'react'
import Navbar from './Navbar' 
import Menu from './Menu'

const Layout = ( {children}) => {
  return (
    <div className="main">
        <Navbar />
        <div className="menu-container">
          <div className="menuContainer">
            <Menu />
            
          </div>
          <div className="contentContainer">
          <div className="">
              {children}
            </div>
          </div>
        </div>
         
      </div>
  )
}

export default Layout