import Blog from './Blog.js';
import ReadingList from './ReadList.js';
import User from './User.js';

User.hasMany(Blog);
Blog.belongsTo(User);
User.belongsToMany(Blog, { through: ReadingList });
Blog.belongsToMany(User, { through: ReadingList });

export { User, Blog };
