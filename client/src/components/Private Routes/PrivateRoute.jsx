import { useAuth } from '../../Contexts/AuthorizationContext'
import {Outlet} from 'react-router-dom'
import Spinner from '../Spinner'
const PrivateRoute = () => {
    const [auth,setAuth] = useAuth()
    return auth?.token ? <Outlet/> : <Spinner/>
}

export default PrivateRoute