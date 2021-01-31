import React from 'react'
import './style.css'

const SearchBar = ({ onChangeHandler }) => <input type="text" onChange={onChangeHandler} className="Search-Bar" placeholder="Start typing ..." />

export default SearchBar