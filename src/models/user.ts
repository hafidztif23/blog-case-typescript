import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index';

// 1. Definisikan interface properti User
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

// 2. Jika id akan diisi otomatis (autoIncrement), kita bisa buat Optional:
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// 3. Buat class model User dengan typing
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
  }
);

export default User;