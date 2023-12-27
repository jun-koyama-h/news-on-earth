import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface PostData {
    title: string;
    text: string;
    published_at: string;
}

const Post = () => {
    const [post, setPost] = useState<PostData>({ title: '', text: '', published_at: '' });
    const { id } = useParams();

    useEffect(() => {
        const getPost = async () => {
            const resp = await fetch(`/api/post/${id}`);
            const postResp = await resp.json();
            setPost(postResp);
        };

        getPost();
    }, [id]);

    if (!Object.keys(post).length) return <div />;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.text}</p>
            <p>
                <em>Published {new Date(post.published_at).toLocaleString()}</em>
            </p>
            <p>
                <Link to="/">Go back</Link>
            </p>
        </div>
    );
};

export default Post;