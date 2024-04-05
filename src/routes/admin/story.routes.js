import { Router } from 'express';
const router = Router();

// importing controllers
import { addStory, getAllStory, getStoryById, deleteStoryById, deleteImage, updateStoryById, uploadImages } from '../../controllers/index.js'
import { authPermission, checkAuth } from '../../middleware/checkAuth.js';

// defining routes
router.post('/add-story', checkAuth, authPermission('admin'), addStory);
router.get('/get-all-story', getAllStory);
router.get('/get-story/:id', getStoryById);
router.patch('/update-story/:id', updateStoryById);
router.delete('/delete-story/:id', deleteStoryById);
router.post('/img-upload', uploadImages);
router.post('/img-delete',checkAuth, deleteImage);
// exporting router
export default router;
