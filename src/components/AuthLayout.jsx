import React from 'react'
import { useEffect , useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Protected = ({children ,  authentication = true}) => {
    const [Loader, setLoader] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelector((state)=>state.auth.status);

    useEffect(()=>{
        if(authentication && authStatus!==authentication){
            navigate("/login")
        }
        else if(!authentication && authStatus!==authentication){
            navigate("/")
        }
        setLoader(false)
    },[authStatus , authentication , navigate])
  return (
    Loader ? <h1>Loading...</h1> : <>{children}</>
  )
}

export default Protected