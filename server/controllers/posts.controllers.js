import Post from "../models/Post.js";
import { uploadImage, deleteImage } from '../libs/cloudinary.js';
import fs from 'fs-extra';

export const getPosts = async (req, res) => {
   try {
        const posts = await Post.find()
        res.send(posts)
   } catch (error) {
       console.log(error)
       return res.status(500).json({message: error.message})
   }
}

export const createPosts = async (req, res) => {
    try {
        const { title, description } = req.body
        let image;

        if (req.files.image) {
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
           image = {
               url: result.secure_url,
               public_id: result.public_id
           }
        }

        const newPost = new Post({title,description,image})

        await newPost.save()
    
        return res.json(newPost)

    } catch (error) {
       return res.status(500).json({message: error.message})
        
    }
}

export const updatePosts = async (req, res) => {
    try {
        const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, { new:true })
    
        return res.send(updatePost)
    } catch (error) {
       return res.status(500).json({message: error.message})
        
    }

}

export const deletePosts = async (req, res) => {
   try {
    const postDelete = await Post.findByIdAndDelete(req.params.id)

    if(!postDelete) return res.sendStatus(404)

   if (postDelete.image.public_id) {
    await deleteImage(postDelete.image.public_id)
   }
    return res.sendStatus(204) 
   } catch (error) {
    return res.status(500).json({message: error.message})
   }
}

export const getPost = (req, res) => async (req, res) => {
   try {
    const postId = await Post.findById(req.params.id)

    if(!postId) return res.sendStatus(404)
    return res.json(postId)
   } catch (error) {
    return res.status(500).json({message: error.message})
       
   }
}
