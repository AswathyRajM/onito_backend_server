import express from 'express';
import movieController from '../controllers/movie.contoller';

const router = express.Router();

router.get('/longest-duration-movies', movieController.getLongestDurationMovies);
// router.get('/getById/:id', validate(bikeSchemaId), bikeController.findBike);
// router.get('/getAll', bikeController.findAllBike);

export { router };
