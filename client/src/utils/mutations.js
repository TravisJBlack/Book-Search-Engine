import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
    }
  }
}
`;

export const CREATE_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      email
      username
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
    }
  }
}
`;
export const SAVE_BOOK = gql`
mutation saveBook($bookId: String!, $description: String!, $title: String!, $authors: [String], $image: String, $link: String) {
  saveBook(bookId: $bookId, description: $description, title: $title, authors: $authors, image: $image, link: $link) {
    _id
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`;

export const DELETE_BOOK = gql`
mutation deleteBook($bookId: String!) {
  deleteBook(bookId: $bookId) {
    _id
    email
  }
}
`;
