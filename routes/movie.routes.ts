import express from 'express';
import movieController from '../controllers/movie.contoller';

const router = express.Router();

router.get(
  '/longest-duration-movies',
  movieController.getLongestDurationMovies
);
router.post('/new-movie', movieController.addMovie);
router.get('/top-rated-movies', movieController.getTopRatedMovies);

export { router };
