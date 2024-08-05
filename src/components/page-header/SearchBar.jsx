import { React, useState, useEffect, useCallback } from "react"
import "../../styles/header/SearchBar.css"
import { useAxios } from "../../hooks/AxiosInterceptor"
import DropdownSearch from "./DropdownSearch"
import {debounce} from 'lodash'

const SearchBar = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const axiosInstance = useAxios()
    const [usersFound, setUsersFound] = useState([])
    const [hashtagsFound, setHashtagsFound] = useState([])
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
            setHashtagsFound([])
            setDropdownSearchActive(true)
        } catch (error) {
            console.log(error.message)
            setUsersFound([])
            setDropdownSearchActive(false)
        }
    }

    const fetchHashtags = async (query) => {
        if (!query) {
            setHashtagsFound([])
            setDropdownSearchActive(false)
            return
        }
        try {
            query = query.slice(1)
            const result = await axiosInstance.get(`http://localhost:5000/hashtags/search?searchQuery=${query}`)
            setHashtagsFound(result.data.hashtags)
            setUsersFound([])
            setDropdownSearchActive(true)
        } catch (error) {
            console.log(error.message)
            setHashtagsFound([])
            setDropdownSearchActive(false)
        }
    }

    useEffect(() => {
        if (searchQuery.trim()) {
            const timer = setTimeout(() => {
                if (searchQuery.startsWith('#'))
                    fetchHashtags(searchQuery)
                else
                    fetchUsers(searchQuery)
            }, 1000)

            return () => clearTimeout(timer)
        }
        else {
            setUsersFound([])
            setHashtagsFound([])
            setDropdownSearchActive(false)
        }
    }, [searchQuery])

    const handleChange = async (e) => {
        setSearchQuery(e.target.value)

    }

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
                    hashtags={hashtagsFound}
                    users={usersFound}
                    setDropdownActive={setDropdownSearchActive}
                />
            }
        </div>
    )
}

export default SearchBar