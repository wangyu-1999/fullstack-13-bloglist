import { DataTypes } from 'sequelize';

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('sessions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
};
export const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('sessions');
};
