import React from 'react'
import './style.css'

const ListItem = (props) => <li className="Search-Item">{props.name} ( <span className="Search-Coordinates">{props.latitude}{props.longitude}</span> )</li>
const List = ({ itemList }) => <ul>{itemList.map((item, idx) => <ListItem {...item} key={idx} />) }</ul>

const SearchResults = ({ data, isLoading }) => <div className="Search-Results">
    { isLoading ? <p>Fetching results ...</p> : ( data && data.length ? <List itemList={data} /> : null) }
</div>

export default SearchResults