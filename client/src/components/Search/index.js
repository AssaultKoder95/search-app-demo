import React, { useState } from 'react'
import Axios from 'axios'
import './style.css'

import SearchBar from '../SearchBar'
import SearchResults from '../SearchResults'
import { debounce } from '../../utils'

const Search = () => {
    const [data, setData] = useState([])
    const [loadingState, setLoadingState] = useState(false)

    const getSearchResults = async (searchTerm) => {
        try {
            setLoadingState(true)
            const { data: { data: results } } = await Axios.get(`/locations?q=${searchTerm}`) 
            setLoadingState(false)
            return results
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    const onChangeHandler = debounce(async (e) => {
        const searchTerm = e.target.value

        if (searchTerm.length < 2) {
            setData([]);
            return
        }

        const searchResults = await getSearchResults(searchTerm)
        setData(searchResults)
    }, 500)

    return <div className="Search-Component">
        <SearchBar onChangeHandler={onChangeHandler} />
        <SearchResults data={data} isLoading={loadingState} />
    </div>
}

export default Search