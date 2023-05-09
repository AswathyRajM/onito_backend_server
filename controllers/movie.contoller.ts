import { Request, Response } from 'express';
import Movie from '../models/movie';
class MovieController {
  static getLongestDurationMovies = async (req: Request, res: Response) => {
    Movie.findAll({
      limit: 10,
      order: ['runtimeMinutes', 'DESC'],
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

  static findBike = (req: any, res: any) => {
    const id = req.params.id;
  };

  static findAllBike = (req: any, res: any) => {
    const id = req.params.id;
    // Bike.findAllBikes()
    //   .then((data: any) => {
    //     if (data) {
    //       res.send(data);
    //     } else {
    //       res.status(404).send({
    //         resultCode: 0,
    //         message: 'Bike not found',
    //         error_code: '404',
    //       });
    //     }
    //   })
    //   .catch((err: any) => {
    //     res.status(500).send({
    //       resultCode: 0,
    //       message: err.message || 'Server Error',
    //       error_code: '400',
    //     });
    //   });
  };
}

export default MovieController;
