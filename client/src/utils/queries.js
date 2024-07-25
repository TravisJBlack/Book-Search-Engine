import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query getMe {
  getMe {
    _id
    email
    password
    username
    savedBooks {
      title
      link
      image
      description
      bookId
      authors
    }
  }
}
`;



