import React from 'react'

const sideNavBar = ({name,active,handleClick}) => {
    return <button className={`sidebar-item ${active ?"active" :null}`} onClick={handleClick}>{name}</button>
}

export default sideNavBar
