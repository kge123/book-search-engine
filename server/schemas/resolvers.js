const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      user: async (parent, { username }) => {
        return User.findOne({ username }).populate('savedBooks');
      }
    },

    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
          },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
          saveBook: async (parent, { bookId }, context) => {
            if (context.user) {
              const book = await Book.create({
                description,
                title: context.user.bookId,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: bookId } }
              );
      
              return book;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {
              const book = await Book.findOneAndDelete({
                _id: thoughtId,
                thoughtAuthor: context.user.username,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: bookId } }
              );
      
              return book;
            }
            throw new AuthenticationError('You need to be logged in!');
          }
    }


};