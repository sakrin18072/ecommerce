import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthorizationContext'
import toast from 'react-hot-toast'
import SearchInput from '../SearchInput'
import { useCart } from '../../Contexts/CartContext'
const Header = () => {
    const [cart,setCart] = useCart();
    const [auth, setAuth] = useAuth()
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ''
        })
        localStorage.removeItem('auth')
        toast.success("Logout successful")
    }
    return (
        <>
            <nav className="navbar navbar-dark navbar-expand-lg">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand text-light">Sakrin's</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className='nav-item '>
                                <SearchInput/>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link nav-link-1" aria-current="page">Home</NavLink>
                            </li>
                            
                            {
                                !auth.user ?
                                    (
                                        <>
                                            <li className="nav-item">
                                                <NavLink to="/register" className="nav-link nav-link-1">Register</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/login" className="nav-link nav-link-1">Login</NavLink>
                                            </li>
                                        </>
                                    ) :
                                    (
                                        <>
                                            <div className="dropdown">
                                                <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {auth?.user.name}
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin':'user'}`} className="dropdown-item ">Dashboard</NavLink></li>
                                                    <li>
                                                        <NavLink onClick={handleLogout} to="/login" className="dropdown-item ">Logout</NavLink>
                                                    </li>
                                                </ul>
                                            </div>


                                        </>
                                    )
                            }
                            <li className="nav-item">
                                <NavLink to="/cart" className="nav-link nav-link-1">Cart ({cart?.length})</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


        </>
    )
}

export default Header