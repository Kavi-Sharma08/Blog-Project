import { useEffect , useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header , Footer , SignUp  } from "./components";
import { Outlet } from "react-router-dom";
const App = () => {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{

    (async()=>{
      try {
        const user = await authService.getCurrentUser();
        
        if(user){
          dispatch(login(user))
          
        }
        else{
          dispatch(logout())
        }
      } catch (error) {
        console.log(error.message)
      }
      finally{
        setloading(false)
      }
    })()

  },[])

  if(loading){
    return <div className="text-2xl">Loading...</div>
  }
  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet/>

        </main>
        
        
      </div>
    </div>
  )
}

export default App