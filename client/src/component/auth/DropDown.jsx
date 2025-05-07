import styles from './DropDown.module.css'
import { IoLogOutOutline } from "react-icons/io5"
import { useLogoutMutation } from '../../redux/features/authApiSlice'
import { useNavigate } from 'react-router';



export default function DropDown() {

    // const options = ['Logout'];
    const navigate=useNavigate()
    const[logout, { isLoading, error }]=useLogoutMutation;

    function handleOptionClick(){

        try {
            logout();
            navigate("/login")

        } catch (err) {
            console.error("Logout failed:", err);
        }
       
    }

  return (
    <div className={styles.main}>
          <ul>
            <li onClick={handleOptionClick} className={styles.DropDown}><i><IoLogOutOutline size={22}/></i><p>Logout</p></li>
          </ul>

    </div>
  )
}
