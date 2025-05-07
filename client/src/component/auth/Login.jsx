import styles from "./Login.module.css";
import { useState } from "react";
import { useLoginMutation } from "../../redux/features/authApiSlice";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../redux/features/auth";
import { useDispatch } from "react-redux";

export default function Login() {
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();
  const [user, setUser] = useState({
    password: "",
    username: "",
  });

  const dispatch = useDispatch();

  function handleChange(e) {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await login(user).unwrap();

      // Handle successful login
      console.log("Login successful:", result);

      console.log("Access Token:", result.accessToken);
      console.log("Refresh Token:", document.cookie);
      dispatch(setCredentials({ accessToken: result, user: user.username }));
      navigate("/"); // Redirect to home page
    } catch (err) {
      console.error("Login failed:", err);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Log in to StreamSync</div>
      <form onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            className={styles.input}
            onChange={handleChange}
            value={user.username}
            required
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
            required
          />
        </div>
        {error && (
          <div className={styles.error}>
            {error.data?.message || "Login failed"}
          </div>
        )}
        <button type="submit" className={styles.loginBtn} disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>
      <button className={styles.signupBtn} onClick={() => navigate("/signup")}>
        Don't have an account? Sign Up
      </button>
    </div>
  );
}
