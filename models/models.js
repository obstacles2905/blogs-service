const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require("dotenv");
dotenv.config();

const client = {}

const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',

    });

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    blogsAmount: {
        type: DataTypes.INTEGER,
        allowNull: true,
        default: 0
    }
}, {
    schema: 'public'
});

const Article = sequelize.define('articles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

const Comment = sequelize.define('comments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

User.hasMany(Article);
Article.belongsTo(User);

Article.hasMany(Comment);
Comment.belongsTo(Article);

User.hasMany(Comment);
Comment.belongsTo(User);

if (!process.env.POSTGRES_SYNC_TABLES) {
    sequelize.sync({ force: true }).then(() => {
        console.log('Tables synchronized');
    });
}

module.exports = { User, Article, Comment, client };
