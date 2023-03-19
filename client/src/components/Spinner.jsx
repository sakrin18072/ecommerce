import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
const Spinner = ({path = "login", loc = "login page"}) => {
    const [timer, setTimer] = useState(3);
    const navigate = useNavigate()
    const location = useLocation()
    const time = setInterval(() => {
        if (timer) {
            setTimer(timer - 1)
        }
        else {
            clearInterval(time)

        }
    }, 1000)
    if (timer === 0) {
        setTimer(5);
        navigate(`/${path}`, {
            state:location.pathname
        });
    }
    return (

        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '97vh' }}>
            <div className="text-center m-3">Redirecting you to {loc} in {timer} seconds&nbsp;</div>
            <div className="spinner-border" role="status" />

        </div>

    )
}

export default Spinner