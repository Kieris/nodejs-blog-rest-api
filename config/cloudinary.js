const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    params: {
        folder: 'node-blog-api/profilePics',
        transformation: [{ width: 200, height: 200, crop: 'limit' }]
    },
    // filename: function (req, file, cb) {
    //     cb(null, file.originalname);
    // }
});

module.exports = storage;