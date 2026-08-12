import React, { useEffect, useState } from "react";
import styles from "./register.module.css";
import image from "./pictures/two-factor.png";
import { Link } from "react-router-dom";
const Register = () => {

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const SignUp = () => {
    fetch("http://localhost:4001/register")
      .then((res) => res.json())
      .then((data) => setForm(data));
  };
  useEffect(() => {
    SignUp();
  }, []);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.registerBox}>
          <div className={styles.left}>
            <img src={image} alt="Register" />
          </div>

          <div className={styles.right}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h1>Sign up</h1>

              <p className={styles.loginText}>
                Already have an account?
                <Link to="/login"> Sign in</Link>
              </p>

              <div className={styles.inputGroup}>
                <input
                  className={styles.input}
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={handleChange}
                />

                <input
                  className={styles.input}
                  type="text"
                  name="lastname"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={handleChange}
                />

                <input
                  className={styles.input}
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                />

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

                <button type="submit" className={styles.button}>
                  Next step
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
