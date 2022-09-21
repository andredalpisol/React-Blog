import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading, logIn } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    const user = {
      email,
      password,
    };

    const res = await logIn(user).then(() => {
      console.log("user logged" + user);
    });
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  return (
    <div className={styles.login}>
      <h1> Sign in!</h1>
      <p>Log in and share your moments!</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <span> Email:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="What is your email address?"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label htmlFor="password">
          <span> Password:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Write your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        {!loading && <button className="btn"> Log in!</button>}
        {loading && (
          <button className="btn" disabled>
            Wait...
          </button>
        )}
        {error && <p className="error">{error} </p>}
      </form>
    </div>
  );
};

export default Login;
