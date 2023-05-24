import express from 'express';
import { getStates, getLGAsByState, addState } from '../controllers/stateController';


const router = express.Router();

router.get('/', getStates);
router.get('/:stateId/lgas', getLGAsByState);
router.post('/', addState);

export default router;
