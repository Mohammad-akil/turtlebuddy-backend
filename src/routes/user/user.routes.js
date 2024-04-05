import { Router } from 'express';
const router = Router();

// importing controllers
import { getaUser, updateUserProfile, addAgeGroup } from '../../controllers/index.js';
import { checkAuth } from '../../middleware/checkAuth.js';

// defining routes
router.get('/get-profile', checkAuth, getaUser);
router.post('/add-age-group', checkAuth, addAgeGroup);
router.patch('/update-profile', checkAuth, updateUserProfile);

export default router;
