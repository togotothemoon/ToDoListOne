import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
    const posts = await Post.find()
    res.send(posts)
}

export const createPosts = async (req, res) => {
    const { title, description } = req.body

    const newPost = new Post({title,description})

    await newPost.save()
    
    return res.json(newPost)
}

export const updatePosts = async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new:true })
    console.log(post)
    return res.send('received')

}

export const deletePosts = async (req, res) => {
    const postDelete = await Post.findByIdAndDelete(req.params.id)

    if(!postDelete) return res.sendStatus(404)

    return res.sendStatus(204) 
}

export const getPost = (req, res) => async (req, res) => {
    const postId = await Post.findById(req.params.id)

    if(!postId) return res.sendStatus(404)

}
