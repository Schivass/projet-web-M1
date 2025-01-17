import { Module } from '@nestjs/common';
import { AuthorRepository } from 'library-api/src/repositories/authors/author.repository';
import { BookRepository } from 'library-api/src/repositories/books/book.repository';
import { GenreRepository } from 'library-api/src/repositories/genres/genre.repository';
import { UserRepository } from './users/user.repository';
import { DataSource } from 'typeorm';

const repositories = [
  AuthorRepository,
  BookRepository,
  GenreRepository,
  UserRepository,
];

@Module({
  imports: [DataSource],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
