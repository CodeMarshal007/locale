import express from 'express';
import { getRegions, getStatesByRegion, search, addRegion } from '../controllers/regionController';


const router = express.Router();

router.get('/', getRegions);
router.get('/:regionId/states', getStatesByRegion);
router.get('/search', search);
router.post('/', addRegion);

export default router;
