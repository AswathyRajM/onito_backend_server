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
    // Movie.findAll({
    //   group: ['genres'],
    // attributes: [
    //   'primaryTitle',
    //   'genres',
    //   // [Sequelize.fn('sum', Sequelize.col('ratings.numVotes')), 'TOTAL'],
    //   // [Sequelize.col('ratings.numVotes'), 'numVotes'],
    // ],
    // include: {
    //   model: Rating,
    //   as: 'ratings',
    //   attributes: ['tconst'],
    // },
    //   raw: true,
    // })
    // Movie.findAll({
    //   group: ['movies.genres'],
    //   attributes: [
    //     'genres',
    //     // [Sequelize.fn('count', Sequelize.col('genres')), 'cnt'],
    //     // [Sequelize.fn('sum', Sequelize.col('ratings.numVotes')), 'TOTAL'],
    //     // [Sequelize.col('ratings.numVotes'), 'numVotes'],
    //   ],
    //   include: {
    //     model: Rating,
    //     as: 'ratings',
    //     attributes: [],
    //   },
    //   raw: true,
    // })

    Rating.findAll({
      group: ['movies.genres'],
      // attributes: [
      //   'numVotes',
      //   // [Sequelize.fn('sum', Sequelize.col('numVotes')), 'TOTAL'],
      //   [Sequelize.fn('GROUP_CONCAT', Sequelize.col('movies.genres')), 'TOTAL'],
      //   [Sequelize.col('movies.genres'), 'genres'],
      //   // [Sequelize.col('movies.primaryTitle'), 'primaryTitle'],
      // ],
      attributes: [
        [
          Sequelize.fn(
            'JSON_ARRAYAGG',
            Sequelize.literal(
              'JSON_OBJECT("tconst", movies.tconst, "primaryTitle",movies.primaryTitle,"genres", movies.genres)'
            )
          ),
          'movie',
        ],
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
