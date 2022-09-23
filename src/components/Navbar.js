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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
            possimus vero autem tempora repellendus porro impedit debitis
            delectus, molestiae, error eaque, ut beatae earum placeat
            consequatur facere perferendis necessitatibus nemo! Dignissimos,
            nam! Consequatur dignissimos quis atque quasi praesentium velit nisi
            saepe recusandae illum at facilis assumenda voluptate explicabo in
            harum, perferendis animi, est fugit quo corporis, earum commodi
            aperiam placeat. Maxime quas cum consequatur eaque eius voluptas
            natus laudantium eligendi incidunt, cupiditate id vitae nam suscipit
            nobis tempora tenetur, tempore dolor assumenda. Temporibus
            perferendis deserunt perspiciatis tempore repellendus ratione
            consequuntur?
          </>
        )}
        <li>
          <NavLink to="/about">About</NavLink>
        </li>

        {user && (
          <li>
            <button className={styles.button} onClick={logOut}>
              Log-Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
