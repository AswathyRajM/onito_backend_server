import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export interface RatingAttributes {
  tconst: string;
  averageRating: number;
  numVotes: number;
}
export default class Rating
  extends Model<RatingAttributes>
  implements RatingAttributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  tconst!: string;
  averageRating!: number;
  numVotes!: number;
}

Rating.init(
  {
    tconst: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },
    averageRating: {
      type: DataTypes.FLOAT,
    },
    numVotes: {
      type: DataTypes.NUMBER,
    },
  },
  {
    sequelize,
    modelName: 'ratings',
    paranoid: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);
