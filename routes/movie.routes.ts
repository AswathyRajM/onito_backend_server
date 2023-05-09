import express from 'express';
// import movieController from '../controllers/movie.contoller.js';

const router = express.Router();
router.get('/test', (req, res) => {
  res.send('Testing..');
});
// router.post('/add', validate(bikeSchema), bikeController.addBikeRecord);
// router.get('/getById/:id', validate(bikeSchemaId), bikeController.findBike);
// router.get('/getAll', bikeController.findAllBike);

export { router };
