import { Router } from 'express';
const router = Router();

// importing base routes
import adminRoutes from './story.routes.js';

// defining routes
router.use('/story', adminRoutes);

// exporting router
export default router;
