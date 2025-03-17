import styles from "./Signup.module.css";

export default function Signup() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Join StreamSync Today</div>
      <div className={styles.fields}>
        <label>Username</label>
        <input type="text" className={styles.input} />
      </div>
      <div className={styles.fields}>
        <label>Password</label>
        <input type="text" className={styles.input} />
      </div>
      <button className={styles.signupBtn}>Sign Up</button>
      <p>By clicking Sign Up, you are agreeing to StreamSync’s Terms of Service and are acknowledging our Privacy Notice applies.</p>
        <button className={styles.loginBtn}>Have an account? Log in</button>
    </div>
  );
}
