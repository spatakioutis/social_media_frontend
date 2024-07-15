import { React, useState, useEffect, useCallback } from "react"
import "../../styles/header/SearchBar.css"
import { useAxios } from "../../hooks/AxiosInterceptor"
import DropdownSearch from "./DropdownSearch"
import {debounce} from 'lodash'

const SearchBar = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const axiosInstance = useAxios()
    const [usersFound, setUsersFound] = useState([])
    const [dropdownSearchActive, setDropdownSearchActive] = useState(false)

    const fetchUsers = async (query) => {
        if (!query) {
            setUsersFound([])
            setDropdownSearchActive(false)
            return
        }
        try {
            const result = await axiosInstance.get(`http://localhost:5000/profile/search?searchQuery=${query}`)
            setUsersFound(result.data.users)
            setDropdownSearchActive(true)
        } catch (error) {
            console.log(error.message)
            setUsersFound([])
            setDropdownSearchActive(false)
        }
    }

    const debouncedFetchUsers = useCallback(debounce((query) => {
        fetchUsers(query)
    }, 600), [])

    const handleChange = async (e) => {
        setSearchQuery(e.target.value)
        debouncedFetchUsers(searchQuery)
    }

    useEffect(() => {
        return () => debouncedFetchUsers.cancel();
    }, [debouncedFetchUsers])

    return (
        <div className="search--bar">
            <div className="search">
                <input
                    id="searchInput"
                    name="searchQuery"
                    placeholder="Search username or #hashtag"
                    type="text"
                    autoComplete="off"
                    value={searchQuery}
                    onChange={handleChange}
                />
            </div>
            
            {dropdownSearchActive && 
                <DropdownSearch 
                    users={usersFound}
                    setDropdownActive={setDropdownSearchActive}
                />
            }
        </div>
    )
}

export default SearchBar