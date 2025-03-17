import styles from "./Login.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Log in to StreamSync</div>
      <div className={styles.fields}>
        <label>Username</label>
        <input type="text" className={styles.input}/>
      </div>
      <div className={styles.fields}>
        <label>Password</label>
        <input type="text" className={styles.input}/>
      </div>
      <button className={styles.loginBtn}>Log In</button>
      <button className={styles.signupBtn}>Don't have an account? Sign Up</button>
    </div>
  );
}
