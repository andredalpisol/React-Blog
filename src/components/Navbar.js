import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logOut } = useAuthentication();
  return (
    <nav className={styles.navbar}>
      <div to="/" end="true" className={styles.brand}>
        React <span> Blog </span>
      </div>
      <ul className={styles.links_list}>
        <li>
          <NavLink to="/" end="true">
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink to="/login" end="true">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" end="true">
                Register
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink to="/posts/create">Create Post</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" end="true">
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/about">About</NavLink>
        </li>

        {user && (
          <li>
            <button onClick={logOut}> Log-Out</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
