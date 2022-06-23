import axios from 'axios';

export const getPostsRequests = async () => await axios.get('/posts')

export const createPostsRequests = async (post) => await axios.post('/posts',post)
