import {Router} from 'express';
const router = Router();

// importing base routes
import userRoutes from './user.routes.js';

// defining routes
router.use('/user', userRoutes);

// exporting router
export default router;
