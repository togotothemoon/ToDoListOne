import { useState, createContext, useContext, useEffect  } from 'react';
import { getPostsRequests, createPostsRequests } from '../api/posts';

const postContext = createContext()

export const usePosts = () => {
    const context = useContext(postContext);
    return context;
}

export const PostProvider= ({ children }) => {

    const [posts, setPosts] = useState([])    

    const getPosts = async () => {
        const res = await getPostsRequests()
        setPosts(res.data)
    }

    const creatPosts = async (post) => {
        const res = await createPostsRequests(post)
        setPosts([...posts, res.data])
    }

    useEffect(() => {
        getPosts()
    }, [])
    

    return <postContext.Provider value={{
        posts,
        getPosts,
        creatPosts
    }}>
        { children }
    </postContext.Provider>

}