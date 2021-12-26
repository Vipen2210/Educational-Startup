
import React,{useState,useEffect} from "react"
import { Route} from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { isCurrentUserAdmin } from "../widgets/IsCurrentUserAdmin";
import LoadingData from "../widgets/LoadingData.jsx";

export default function AdminRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()
  const [isAdmin,setIsAdmin] = useState(false);

  useEffect(() => {
    const func=async()=>{
      console.log("Before");
      await  isCurrentUserAdmin({setIsAdmin,currentUser});
    }
    func();
  }, [currentUser])


  return (
    <Route
      {...rest}
      render={props => {
        return (currentUser && isAdmin) ? <Component {...props} />:<LoadingData></LoadingData>;
      }}
    ></Route>
  )
}
