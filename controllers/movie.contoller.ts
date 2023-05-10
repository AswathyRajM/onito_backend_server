import { Request, Response } from 'express';
import { Op, Sequelize } from 'sequelize';
import Movie from '../models/movie';
import Rating from '../models/ratings';
class MovieController {
  static getLongestDurationMovies = async (req: Request, res: Response) => {
    Movie.findAll({
      limit: 10,
      order: [['runtimeMinutes', 'DESC']],
      attributes: [
        'tconst',
        'titletype',
        'primaryTitle',
        'runtimeMinutes',
        'genres',
      ],
    })
      .then((data: any) => {
        if (data) {
          res.send(data);
        }
      })
      .catch((err: any) => {
        res.status(500).send({
          resultCode: 0,
          message: err.message || 'Server Error',
          error_code: '500',
        });
      });
  };

  static addMovie = (req: any, res: any) => {
    const { tconst, titletype, primaryTitle, runtimeMinutes, genres } =
      req.body;
    Movie.create({ tconst, titletype, primaryTitle, runtimeMinutes, genres })
      .then((data: any) => {
        if (data) {
          res.send('success');
        }
      })
      .catch((err: any) => {
        res.status(500).send({
          resultCode: 0,
          message: err.message || 'Server Error',
          error_code: '500',
        });
      });
  };

  static getTopRatedMovies = (req: any, res: any) => {
    const id = req.params.id;
    Rating.findAll({
      where: {
        averageRating: {
          [Op.gt]: 6.0,
        },
      },
      order: [['averageRating', 'DESC']],
      attributes: [
        'tconst',
        'averageRating',
        [Sequelize.col('movie.primaryTitle'), 'primaryTitle'],
        [Sequelize.col('movie.genres'), 'genres'],
      ],
      include: {
        model: Movie,
        as: 'movie',
        attributes: [],
      },
      raw: true,
    })
      .then((data: any) => {
        if (data) {
          res.send(data);
        }
      })
      .catch((err: any) => {
        res.status(500).send({
          resultCode: 0,
          message: err.message || 'Server Error',
          error_code: '500',
        });
      });
  };
}

export default MovieController;
