const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
          if (context.user){
            return await User.findOne({ _id: context.user.id}).select('-__v -password');  
          }
           return new AuthenticationError('error logging in') 
        }
    },

    Mutation: {
        addUser: async (parent, args ) => {
            const user = await User.create(args);
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
          saveBook: async (parent, {bookData }, context) => {
            if (context.user) {
      
             return  await User.findOneAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: bookData } }
              );
      
              
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {    
              return await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: bookId } }
              );
      
            }
            throw new AuthenticationError('You need to be logged in!');
          }
    }


};

module.exports = resolvers;