import { Author } from 'library-api/src/entities/Author';
import { Book } from 'library-api/src/entities/Book';
import { BookGenre } from 'library-api/src/entities/BookGenre';
import { Genre } from 'library-api/src/entities/Genre';
import { User } from 'library-api/src/entities/User';
import { UserBook } from 'library-api/src/entities/UserBooks';

export * from './Author';
// eslint-disable-next-line import/no-cycle
export * from './Book';
export * from './BookGenre';
export * from './Genre';
export * from './User';
export * from './UserBooks';

export const entities = [Author, Book, BookGenre, Genre, User, UserBook];
