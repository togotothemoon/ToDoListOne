import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: "togotothemoon",
    api_key: "545963737995777",
    api_secret: "ApxedjJp7GAPi6wLWumLDMDWW5E"
})

export const uploadImage = async filePath => {
    return await cloudinary.v2.uploader.upload(filePath, {
        folder: 'posts'
    })
}

export const deleteImage = async id => {
    return await cloudinary.uploader.destroy(id)
}