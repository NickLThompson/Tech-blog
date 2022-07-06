const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

const bcrypt = require('bcrypt');


class User extends Model {

checkPassword(accountPassword) {
    return bcrypt.compareSync(accountPassword, this.password);
}

}

// User
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id",
            }
        },
        email: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                isEmail: true,
                key: "id",
            },
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: [4]
            }
        },
    },
    
    hooks: {
        // set up beforeCreate lifecycle "hook" functionality
        async beforeCreate(newUserData) {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
  
        async beforeUpdate(updatedUserData) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData;
        }
      },
},
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;