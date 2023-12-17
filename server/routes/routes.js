import express from 'express';
import { uploadImage, downloadImage} from '../controller/image-controller.js';
import { home, registerUser,loginUser,getUser } from '../controller/authController.js';
import upload from '../utils/upload.js';
import {isLoggedIn} from '../middleware.js'

const router = express.Router();

router.post('/upload', upload.single('file'), uploadImage);
router.get('/file/:fileId', downloadImage);
router.post('/register', registerUser);
router.get('/home',home)
router.post('/login', loginUser)
router.get('/getUser',isLoggedIn,getUser)


export default router;