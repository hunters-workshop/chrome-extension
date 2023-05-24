import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react'
import styles from "./styles.module.css";

export const Signup = () => {
  const auth = getAuth();
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleChangeEmail = (event: any) => {
    setEmail(event.currentTarget.value);
  };
  const handleChangePassword = (event: any) => {
    setPassword(event.currentTarget.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("user created");
        console.log(userCredential);
      })
      .catch((error) => {
        alert(error.message);
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form_collection}>
          <label className={styles.form_label}>Email</label>
          <input
            type="email"
            name="email"
            onChange={(event) => handleChangeEmail(event)}
            className={styles.form_input}
          />
        </div>

        <div className={styles.form_collection}>
          <label className={styles.form_label}>Password</label>
          <input
            type="password"
            name="password"
            onChange={(event) => handleChangePassword(event)}
            className={styles.form_input}
          />
        </div>
        <button className={styles.form_submit}>Create Account</button>
      </form>

      <br></br>
    </div>
  )
}

