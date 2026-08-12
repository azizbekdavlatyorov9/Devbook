import React, { useState } from "react";
import styles from "./login.module.css";
import image from "./pictures/Login.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.left}>
          <img src={image} alt="login" />
        </div>

        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleLogin}>
            <h1>Sign in</h1>

            <p className={styles.text}>
              Don't have an account?
              <Link to="/register"> Sign up</Link>
            </p>

            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            <button className={styles.button} type="submit">
              Next step
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
