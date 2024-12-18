import User from "./userModel.js";
import Book from "./bookModel.js";
import BooksUsers from "./booksUsersModel.js";

// Relacionar los modelos entre sí
BooksUsers.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(BooksUsers, { foreignKey: 'user_id' });


BooksUsers.belongsTo(Book, { foreignKey: 'book_id' });
Book.hasMany(BooksUsers, { foreignKey: 'book_id' });

export {Book, BooksUsers, User}

