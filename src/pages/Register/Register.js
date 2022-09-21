import styles from "./Register.module.css";
import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmPassword) setError("Passwords do not match");

    const res = await createUser(user).then(() => {
      console.log("user created" + user);
    });
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
      <h1> Register to be able to post!</h1>
      <p>Create your user and share your moments</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <span> Name:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Write your username"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
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
        <label htmlFor="confirmPassword">
          <span> Confirm your password:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Rewrite your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </label>
        {!loading && <button className="btn"> Register!</button>}
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

export default Register;
