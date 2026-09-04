import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./verify-code.module.css";
import { api } from "../../api";
import { useAuth } from "../../auth/AuthContext";

const VerifyCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();

  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      return;
    }

    if (value.length > 6) {
      return;
    }

    setCode(value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code.length !== 6) {
      setError("6 xonali kodni kiriting");
      return;
    }

    if (!email) {
      setError("Email topilmadi");
      return;
    }

    try {
      setLoading(true);

      await api("/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
        }),
      });

      await refreshProfile();
      navigate("/");
    } catch (err) {
      setError(err.message || "Server bilan bog'lanib bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.verifyBox}>
        <div className={styles.content}>
          <h1>Verify your email</h1>

          <p className={styles.description}>
            We sent a verification code to
          </p>

          <p className={styles.email}>
            {email}
          </p>

          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <label htmlFor="code">
              Verification code
            </label>

            <input
              id="code"
              className={styles.input}
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter 6-digit code"
              value={code}
              onChange={handleChange}
              autoFocus
            />

            {error && (
              <p className={styles.error}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className={styles.button}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>

          <button
            type="button"
            className={styles.backButton}
            onClick={() => navigate("/register")}
          >
            Back to register
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
