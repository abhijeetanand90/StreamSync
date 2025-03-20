import styles from "./Login.module.css";
import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState({
    password: "",
    username: "",
  });

  function handleChange(e) {
    const { value, name } = e.target;

    setUser({ ...user, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted");
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Log in to StreamSync</div>
      {/* <form action="" onSubmit={handleSubmit}> */}
        <div className={styles.fields}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            className={styles.input}
            onChange={handleChange}
            value={user.username}
          />
        </div>
        <div className={styles.fields}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            className={styles.input}
            onChange={handleChange}
            value={user.password}
          />
        </div>
        <button className={styles.loginBtn}>Log In</button>
      {/* </form> */}
      <button className={styles.signupBtn}>
        Don't have an account? Sign Up
      </button>
    </div>
  );
}
