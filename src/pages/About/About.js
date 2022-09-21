import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        About React <span> Blog </span>
      </h2>
      <p>
        Project built using react in front-end and firebase in the back-end :D
      </p>

      <h3>
        Check my linkedin:
        <a href="https://linkedin.com/in/andredalpisol/" target="_blank">
          Click here
        </a>
      </h3>
      <h3>
        Check my github :
        <a href="https://github.com/andredalpisol" target="_blank">
          Click here
        </a>
      </h3>
    </div>
  );
};

export default About;
