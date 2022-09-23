import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        About React <span> Blog </span>
      </h2>
      <h3>
        Project built using react in front-end and firebase in the back-end :D
      </h3>
    </div>
  );
};

export default About;
