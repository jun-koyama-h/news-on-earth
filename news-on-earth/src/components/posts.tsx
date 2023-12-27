import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const resp = await fetch('/api/posts');
            const postsResp = await resp.json();
            setPosts(postsResp);
        };

        getPosts();
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>
                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    </h2>
                </div>
            ))}
        </div>
    );
};

export default Posts;