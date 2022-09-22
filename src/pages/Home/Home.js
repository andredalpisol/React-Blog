import styles from "./Home.module.css";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocument";
import PostDetail from "../../components/PostDetail";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };
  return (
    <div className={styles.home}>
      <h1> See our latest posts</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Search by tags"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          value={query}
        ></input>
        <button className="btn btn-dark"> Search </button>
      </form>
      <div>
        {posts &&
          posts.map((post) => {
            return <PostDetail key={post.id} post={post}></PostDetail>;
          })}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p> No posts were found</p>
            <Link className="btn" to={"/posts/create"}>
              Create the first post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
