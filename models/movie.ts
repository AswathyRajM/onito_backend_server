import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Rating from './ratings';

export interface MovieAttributes {
  tconst: string;
  titletype: string;
  primaryTitle: string;
  runtimeMinutes: number;
  genres: string;
}
export default class Movie
  extends Model<MovieAttributes>
  implements MovieAttributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  tconst!: string;
  titletype!: string;
  primaryTitle!: string;
  runtimeMinutes!: number;
  genres!: string;
}

Movie.init(
  {
    tconst: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },
    titletype: {
      type: DataTypes.STRING(10),
    },
    primaryTitle: {
      type: DataTypes.STRING(100),
    },
    runtimeMinutes: {
      type: DataTypes.NUMBER,
    },
    genres: {
      type: DataTypes.STRING(20),
    },
  },
  {
    sequelize,
    modelName: 'movies',
    paranoid: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

Movie.hasMany(Rating, { as: 'ratings' });
Rating.belongsTo(Movie, { foreignKey: 'tconst' });
