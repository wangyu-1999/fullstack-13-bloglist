import Blog from './Blog.js';
import ReadingList from './ReadingList.js';
import User from './User.js';

User.hasMany(Blog, { as: 'blogs' });
Blog.belongsTo(User, { as: 'user' });
User.belongsToMany(Blog, { through: ReadingList, as: 'readings' });
Blog.belongsToMany(User, { through: ReadingList, as: 'readers' });

export { User, Blog, ReadingList };
