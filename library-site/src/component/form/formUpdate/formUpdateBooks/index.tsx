/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */

import React, { FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import FormUpdate from '..';
import { Author, Book, CreateBook, Genre } from '@/models';
import { getAuthors } from '@/requests/authors';
import { updateBook } from '@/requests/books';
import { getGenres } from '@/requests/genres';

type Props = {
  setIsModifying: (value: boolean) => void;
  book: Book;
};

export default function FormUpdateBooks({
  setIsModifying,
  book,
}: Props): React.ReactElement {
  const queryClient = useQueryClient();

  const updateBookMutation = useMutation({
    mutationFn: (updatedBook: CreateBook) =>
      updateBook(updatedBook, book.id as string),
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      queryClient.invalidateQueries(['book', book.id as string]);
    },
  });

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formValues = Object.fromEntries(formData.entries()) as {
      [key: string]: string;
    };
    const { authorId, name, writtenOn } = formValues;
    const genres = formValues.genresId.split(',');

    const updatedBook: CreateBook = {
      authorId,
      genres,
      name,
      writtenOn,
    };
    updateBookMutation.mutate(updatedBook as CreateBook);
  };

  const {
    data: authors,
    isLoading: isAuthorsLoading,
    isError: isAuthorsError,
  } = useQuery<Author[]>({
    queryKey: ['authors'],
    queryFn: () => getAuthors(),
  });

  const {
    data: genres,
    isLoading,
    isError,
  } = useQuery<Genre[]>({
    queryKey: ['genres'],
    queryFn: () => getGenres(),
  });

  if (
    isAuthorsError ||
    isAuthorsLoading ||
    !authors ||
    isLoading ||
    isError ||
    !genres
  ) {
    return <span>Loading...</span>;
  }

  const genreOptions = genres.map((genre: Genre) => ({
    label: genre.name,
    value: genre.id,
  }));

  return (
    <FormUpdate
      onSubmit={handleSubmitForm}
      onCancel={(): void => setIsModifying(false)}
      data={[
        {
          label: 'Titre',
          name: 'name',
          type: 'text',
          defaultValue: book.name,
        },
        {
          label: 'Auteur',
          name: 'authorId',
          type: 'select',
          defaultValue: book.author.id,
          options: authors.map((author) => ({
            value: author.id,
            label: `${author.firstName} ${author.lastName}`,
          })),
        },
        {
          label: 'Date',
          name: 'writtenOn',
          type: 'number',
          defaultValue: book.writtenOn,
        },
        {
          label: 'Genres',
          name: 'genresId',
          type: 'select',
          multiple: true,
          defaultValues: book.genres.map((genre) => genre.id),
          options: genreOptions,
        },
      ]}
    />
  );
}
