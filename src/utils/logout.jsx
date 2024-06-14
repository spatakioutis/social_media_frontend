import { TokenContext } from '../contexts/TokenContext.jsx'
import { currUserContext } from '../contexts/CurrUserContext.jsx'

const logOut = () => {
    const {removeToken} = useContext(TokenContext)
    const {removeCurrUser} = useContext(currUserContext)

    removeCurrUser()
    removeToken()
    navigate('/login')
}

export {logOut}