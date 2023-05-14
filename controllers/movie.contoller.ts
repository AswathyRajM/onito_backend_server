import { Request, Response } from 'express';
import { Op, Sequelize } from 'sequelize';
import Movie from '../models/movie';
import Rating from '../models/ratings';
import sequelize from '../config/database';
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
        [Sequelize.col('movies.primaryTitle'), 'primaryTitle'],
        [Sequelize.col('movies.genres'), 'genres'],
      ],
      include: {
        model: Movie,
        as: 'movies',
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

  static genreMoviesWithSubtotals = (req: any, res: any) => {
    sequelize
      .query(
        "SELECT CASE WHEN GROUPING(m.primaryTitle) = 1 AND GROUPING(m.genres) = 0 THEN null ELSE m.genres END AS `m.genres`,CASE WHEN GROUPING(m.primaryTitle) = 1 AND GROUPING(m.genres) = 0 THEN 'TOTAL' ELSE m.primaryTitle END AS `m.primaryTitle`, SUM(r.numVotes) AS `r.numVotes` FROM movies AS m JOIN ratings AS r ON r.tconst = m.tconst GROUP BY m.genres, m.primaryTitle WITH ROLLUP HAVING GROUPING(m.genres) = 0;"
      )
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

  static updateRuntimeMinutes = async (req: any, res: any) => {
    const updateValues = {
      runtimeMinutes: Sequelize.literal(
        "CASE WHEN genres = 'Documentary' THEN 15 WHEN genres = 'Animation' THEN 30 ELSE 45 END"
      ),
    };
    const whereClause = {};
    Movie.update(updateValues, { where: whereClause })
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
}

export default MovieController;
