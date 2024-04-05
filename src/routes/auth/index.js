import { Router } from 'express';
const router = Router();

// importing base routes
import authRoutes from './auth.routes.js';

// defining routes
router.use('/auth', authRoutes);

// exporting router
export default router;
