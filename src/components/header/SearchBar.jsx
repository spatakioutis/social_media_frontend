import { React, useState } from "react"
import "../../styles/header/SearchBar.css"

const SearchBar = () => {
    return (
        <div className="search--bar">
            <div className="search">
                <input
                    id="searchInput"
                    name="searchQuery"
                    placeholder="Search"
                    type="text"
                />
            </div>
        {/* <List /> */}
        </div>
    )
}

export default SearchBar