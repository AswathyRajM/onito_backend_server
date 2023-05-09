import express from 'express';
// import movieController from '../controllers/movie.contoller.js';

const router = express.Router();
router.post('/test', (req, res) => {
  res.send('Its a test API for portraying route name for bulk add');
});
// router.post('/add', validate(bikeSchema), bikeController.addBikeRecord);
// router.get('/getById/:id', validate(bikeSchemaId), bikeController.findBike);
// router.get('/getAll', bikeController.findAllBike);

export { router };
