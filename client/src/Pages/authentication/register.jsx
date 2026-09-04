import React, { useState } from "react";
import styles from "./register.module.css";
import image from "./pictures/two-factor.png";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try { setLoading(true); setError("");
      await api("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      navigate("/verify-code", {
        state: {
          email: form.email,
        },
      });
    } catch (err) { setError(err.message || "Server bilan bog'lanib bo'lmadi"); } finally { setLoading(false); }
  };

  return (
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
                name="username"
                placeholder="First name"
                value={form.username}
                onChange={handleChange}
              />

              <input
                className={styles.input}
                type="text"
                name="lastName"
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

              {error && <p className={styles.error}>{error}</p>}

              <button type="submit" className={styles.button} disabled={loading}>
                {loading ? "Yuborilmoqda..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
