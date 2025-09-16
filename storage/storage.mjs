import dotenv from 'dotenv'
dotenv.config()


// Require the cloudinary library from  ' cloudinary' .v2

import cd from 'cloudinary'
const cloudinary = cd.v2


const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
    
  secure: true
});

// Log the configuration
console.log(cloudinary);

const imageUpload = async(fileName) => {
    await cloudinary.uploader.upload, { acces_mode: 'public'}
}