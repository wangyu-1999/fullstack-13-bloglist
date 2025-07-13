import { DataTypes } from 'sequelize';

export const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('users', 'disabled', {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  });
};
export const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('users', 'disabled');
};
