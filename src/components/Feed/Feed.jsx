import React, { useEffect, useState } from "react";
import styles from "./Feed.module.scss";
import Post from "../Post/Post";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, usersRes] = await Promise.all([
          axios.get("http://localhost:5000/posts"),
          axios.get("http://localhost:5000/users"),
        ]);
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setPosts(postsRes.data.reverse());
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderSkeleton = () => (
    <div className={styles.feed}>
      {Array(3)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: 20,
              background: "#fff",
              padding: 16,
              borderRadius: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Skeleton circle width={40} height={40} />
              <div style={{ marginLeft: 10 }}>
                <Skeleton width={120} height={14} />
                <Skeleton width={90} height={12} style={{ marginTop: 4 }} />
              </div>
            </div>

            <Skeleton
              height={300}
              style={{ borderRadius: 12, marginBottom: 12 }}
            />

            <div
              style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
            >
              <Skeleton
                width={20}
                height={20}
                style={{ borderRadius: "50%" }}
              />
              <Skeleton
                width={20}
                height={20}
                style={{ borderRadius: "50%", marginLeft: 10, marginRight: 10 }}
              />
              <Skeleton width={80} height={12} style={{ marginLeft: "auto" }} />
            </div>

            <Skeleton count={2} height={14} style={{ marginTop: 10 }} />
          </div>
        ))}
    </div>
  );

  return (
    <div className={styles.feed}>
      {isLoading
        ? renderSkeleton()
        : posts
            .filter(
              (post) =>
                post.image && users.find((user) => user.id === post.authorId)
            )
            .map((post) => {
              const user = users.find((user) => user.id === post.authorId);
              return (
                <React.Fragment key={post.id}>
                  <Post
                    post={post}
                    user={user}
                    onUpdatePost={(updatedPost) => {
                      setPosts(
                        posts.map((p) =>
                          p.id === updatedPost.id ? updatedPost : p
                        )
                      );
                    }}
                  />
                  <hr className={styles.postHR} />
                </React.Fragment>
              );
            })}
    </div>
  );
};

export default Feed;
