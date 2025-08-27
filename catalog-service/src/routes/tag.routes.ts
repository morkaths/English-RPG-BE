import { Router } from 'express';

const router = Router();

// Tag routes
router.get('/', (req, res) => {
  res.send('List of tags');
});

router.post('/', (req, res) => {
  res.send('Create a new tag');
});

export default router;
