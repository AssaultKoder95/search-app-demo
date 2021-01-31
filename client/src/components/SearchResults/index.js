import React from 'react'
import './style.css'

const ListItem = (props) => <li>{props.name} - <i>{props.coordinates}</i></li>
const List = ({ itemList }) => <ul>{itemList.map((item, idx) => <ListItem {...item} key={idx} />) }</ul>

const SearchResults = ({ data, isLoading }) => <div className="Search-Results">
    { isLoading ? <p>Fetching results ...</p> : ( data && data.length ? <List itemList={data} /> : null) }
</div>

export default SearchResults