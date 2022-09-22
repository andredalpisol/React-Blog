import styles from "./Search.module.css";
import { useFetchDocuments } from "../../hooks/useFetchDocument";
import { useQuery } from "../../hooks/useQuery";
import PostDetail from "../../components/PostDetail";
import { Link } from "react-router-dom";
import { useCallback, useEffect } from "react";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search_container}>
      <h2>Search</h2>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p> No posts were found by your search </p>
            <Link to={"/"} className="btn btn-dark">
              Voltar
            </Link>
          </div>
        )}
        {posts &&
          posts.map((post) => {
            return <PostDetail post={post} key={post.id}></PostDetail>;
          })}
      </div>
    </div>
  );
};

export default Search;
