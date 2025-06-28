import authService from "../../appwrite/auth"
import { useDispatch } from 'react-redux'
import {logout} from "../../store/authSlice"
import { useNavigate } from "react-router-dom"
const LogOut = () => {
    const navigate  = useNavigate();

    const dispatch = useDispatch();
    const handleLogOut = async ()=>{
        const userLogout = await authService.logout();
        console.log(userLogout)
        if(userLogout){
            dispatch(logout());
            navigate("/")
            
        }
    }

    
  return (
    <div>
        <button onClick={handleLogOut} type="button" className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>LogOut</button>
    </div>
  )
}

export default LogOut