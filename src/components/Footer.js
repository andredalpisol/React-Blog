import styles from "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__addr">
        <h1 className="footer__logo">React Blog</h1>

        <h2>Contact</h2>

        <address>@andredalpisol</address>
      </div>

      <ul className="footer__nav">
        <li className="nav__item">
          <h2 className="nav__title">Media</h2>

          <ul className="nav__ul">
            <li>
              <a href="#">Online</a>
            </li>

            <li>
              <a href="#">Print</a>
            </li>

            <li>
              <a href="#">Alternative Ads</a>
            </li>
          </ul>
        </li>

        <li className="nav__item">
          <h2 className="nav__title">Legal</h2>

          <ul className="nav__ul">
            <li>
              <a href="#">Privacy Policy</a>
            </li>

            <li>
              <a href="#">Terms of Use</a>
            </li>

            <li>
              <a href="#">Sitemap</a>
            </li>
          </ul>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
