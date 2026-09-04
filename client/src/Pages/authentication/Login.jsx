import React, { useState } from "react";
import styles from "./login.module.css";
import image from "./pictures/Login.png";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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

    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Email va passwordni kiriting");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      /*
        Backend:
        {
          message: "Please check your email for the code"
        }

        bo'lsa OTP sahifasiga o'tamiz.
      */

      navigate("/verify-code", {
        state: {
          email: form.email,
          from: "login",
        },
      });

    } catch (err) {
      setError(err.message || "Server bilan bog'lanib bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>

        {/* LEFT */}
        <div className={styles.left}>
          <img
            src={image}
            alt="Login"
          />
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <form
            className={styles.form}
            onSubmit={handleLogin}
          >

            <h1>Sign in</h1>

            <p className={styles.text}>
              Don't have an account?
              <Link to="/register">
                {" "}Sign up
              </Link>
            </p>

            <div className={styles.inputGroup}>

              {/* EMAIL */}
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />

              {/* PASSWORD */}
              <input
                className={styles.input}
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />

              {/* ERROR */}
              {error && (
                <p className={styles.error}>
                  {error}
                </p>
              )}

              {/* BUTTON */}
              <button
                className={styles.button}
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Next step"}
              </button>

            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;
