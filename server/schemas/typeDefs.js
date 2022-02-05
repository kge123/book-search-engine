const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User{
        _id: ID
        username: String
        email: String
        bookCount: Number
        savedBooks: [Book]
    }

    type Book{
        bookId: ID
        authors: []
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query{
        me:[User]
    }

    type Mutation{
        addUser(username :String!, email: String!, password: String!): Auth
        login(email:String!, password: String!): Auth
        saveBook( Author:[], description:String, title:String, bookId: ID!, image:String, link:String): User
        deletebook( bookId: ID! ): User
    }

`;

module.exports = typeDefs;
