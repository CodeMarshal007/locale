import express from 'express';

import { getLGAs, addLGA } from '../controllers/lgaController';

const router = express.Router();

router.get('/', getLGAs);
router.post('/',  addLGA);

export default router;
