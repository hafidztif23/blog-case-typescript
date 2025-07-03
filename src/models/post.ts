import { DataTypes } from 'sequelize';
import sequelize from './index';
import User from './user';

const Post = sequelize.define('Post', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: DataTypes.TEXT,
  authorId: DataTypes.INTEGER
});

Post.belongsTo(User, { foreignKey: 'authorId' });

export default Post;