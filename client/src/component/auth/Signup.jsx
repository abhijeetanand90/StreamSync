import { useState } from "react";
import DateOfBirthDropdowns from "./DateOfBirthDropdowns";
import styles from "./Signup.module.css";

export default function Signup() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    dateOfBirth: {
      month: "",
      day: "",
      year: "",
    },
  });

  const [Errors, setErrors] = useState({
    password: [],
    email: [],
    username: [],
  });

  function isEmailValid(email) {
    const errors = [];

    if (!email.trim()) {
      errors.push("Email cannot be empty");
    } else {
      const emailParts = email.split("@");

      if (emailParts.length !== 2)
        errors.push("Enter your email provider's domain");

      const account = emailParts[0];
      const domain = emailParts[1];

      if (account.length > 64) errors.push("Not a valid email id");
      if (!domain || domain.length > 255)
        errors.push("Not a valid domain name");

      if (domain) {
        const domainParts = domain.split(".");
        if (domainParts.some((part) => part.length > 63))
          errors.push("Domain parts cannot exceed 63 characters.");
      }

      const usernameRegex = /^[a-zA-Z0-9._%+-]+$/;
      if (!usernameRegex.test(account)) {
        errors.push("Username (before @) contains invalid characters");
      }
      const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!domainRegex.test(domain)) {
        errors.push(
          "Domain name is not valid (must contain a dot and only valid characters)"
        );
      }
    }

    return errors;
    // return validEmailRegex.test(email);   only returns either true or false not exactly the issue
  }

  function validatePassword(password) {
    const errors = [];

    // Check for uppercase
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    // Check for number
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }

    // Check for special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }
    if (password.length < 8) {
      errors.push("Password should be minimum 8 characters");
    }
    if (password.length > 24) {
      errors.push("Password can be maximum 24 characters");
    }

    //  setErrors({email:" ", password:" "});
    return errors;
  }

  function validateUsername(username) {
    const errors = [];

    if (!username.trim()) {
      errors.push("Username Cannot be empty");
    } else {
      if (username.length < 6) {
        errors.push("Username cannot be less than 6 characters");
      }
      if (!/^[a-zA-Z0-9._]+$/.test(username)) {
        errors.push(
          "Username can only contain letters, numbers, underscores, and dots."
        );
      }
    }

    return errors;
  }

  function handleChange(e) {
    const { value, name } = e.target;

    setUser({ ...user, [name]: value });
  }

  function handleValidation(e) {
    const { value, name } = e.target;
    if (name == "password") {
      const passwordErrors = validatePassword(value);
      setErrors({ ...Errors, password: passwordErrors });
    }

    if (name == "username") {
      const usernameErrors = validateUsername(value);
      setErrors({ ...Errors, username: usernameErrors });
    }

    if (name == "email") {
      const res = isEmailValid(value);

      setErrors({ ...Errors, email: res });
    }
  }

  function handleDateOfBirthChange(newDateOfBirth) {
    setUser((prev) => ({
      ...prev,
      dateOfBirth: newDateOfBirth,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      Errors.username.length == 0 &&
      Errors.email.length == 0 &&
      Errors.password.length == 0
    ) {
      // Check if date of birth is complete
      const { month, day, year } = user.dateOfBirth;
      if (!month || !day || !year) {
        console.log("Please select your date of birth");
        return;
      }
      console.log("submitted", user);
    }
  }

  console.log(Errors);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Join StreamSync Today</div>
      <form action="" onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            className={styles.input}
            onChange={handleChange}
            onBlur={handleValidation}
            value={user.username}
            maxLength="12"
            minLength="6"
            required
          />
          <div>
            {Errors.username &&
              Errors.username.map((x, index) => <div key={index}>{x}</div>)}
          </div>
        </div>
        <div className={styles.fields}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            className={styles.input}
            onChange={handleChange}
            onBlur={handleValidation}
            value={user.password}
            maxLength="24"
            minLength="8"
            autocomplete="current-password"
            required
          />
          <div className={styles.error}>
            {Errors.password &&
              Errors.password.map((x, index) => <div key={index}>{x}</div>)}
          </div>
        </div>
        <div className={styles.fields}>
          <div className={styles.Dob}>
            <label htmlFor="">Date of Birth</label>
            <div>
              <DateOfBirthDropdowns
                value={user.dateOfBirth}
                onChange={handleDateOfBirthChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.fields}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            className={styles.input}
            onChange={handleChange}
            onBlur={handleValidation}
            value={user.email}
            required
          />
          <div>
            {Errors.email &&
              Errors.email.map((x, index) => <div key={index}>{x}</div>)}
          </div>
        </div>
        <button className={styles.signupBtn}>Sign Up</button>
        <p
          style={{
            fontSize: "12px",
            color: "#ADADB8",
          }}
        >
          By clicking Sign Up, you are agreeing to StreamSync's Terms of Service
          and are acknowledging our Privacy Notice applies.
        </p>
        <button className={styles.loginBtn}>Have an account? Log in</button>
      </form>
    </div>
  );
}
