import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken,} from "../../redux/features/auth";
import { useLocation } from "react-router-dom";



export default function PrivateRoute({isAuthenticated}) {
        const token=useSelector(selectCurrentToken)
        const location = useLocation();


        if(!token || !isAuthenticated){
          return <Navigate to ='/login' state={{ from: location }} replace />
        }

    return (
     isAuthenticated ? <Outlet />: <Navigate to="/login" />
    )
  }
