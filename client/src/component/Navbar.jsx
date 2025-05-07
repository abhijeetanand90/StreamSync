import styles from './Navbar.module.css'
import { CiSearch } from "react-icons/ci";
import { MdNotificationsNone } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useState } from 'react';
import DropDown from './auth/DropDown';

export default function Navbar() {

  const[showDialog,setShowDialog]=useState(false);

  function handleClick(){
      setShowDialog(prev=>!prev);
  }


  return (
    <div className={styles.container}>
        <div className={styles.sync}>
       <div className={styles.title}>StreamSync</div>
       <div>
        <ul className={styles.categories}>
            <li>Home</li>
            <li>Browse</li>
            <li>Following</li>
            <li>Categories</li>
        </ul>
       </div>
       </div>

       <div className={styles.options}>
        <input type="text" placeholder='Search streams, channels...' className={styles.searchBox}/>
       
       <CiSearch size={20}/>
       <MdNotificationsNone size={20}/>
       <FaUserCircle size={22} onClick={handleClick} className={styles.avatar}/>
       </div>
{showDialog && <DropDown />}
    </div>
  )
}
