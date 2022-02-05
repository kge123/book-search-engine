const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User{
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book{
        bookId: ID
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input BookInput{
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Query{
        me:User
    }

    type Mutation{
        addUser(username :String!, email: String!, password: String!): Auth
        login(email:String!, password: String!): Auth
        saveBook(bookdata: BookInput! ): User
        deleteBook( bookId: ID! ): User
    }

`;

module.exports = typeDefs;
