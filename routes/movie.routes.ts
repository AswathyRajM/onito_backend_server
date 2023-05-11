import express from 'express';
import movieController from '../controllers/movie.contoller';

const router = express.Router();

router.get(
  '/longest-duration-movies',
  movieController.getLongestDurationMovies
);
router.post('/new-movie', movieController.addMovie);
router.get('/top-rated-movies', movieController.getTopRatedMovies);
router.get(
  '/genre-movies-with-subtotals',
  movieController.genreMoviesWithSubtotals
);
router.post('/update-runtime-minutes', movieController.updateRuntimeMinutes);

export { router };
