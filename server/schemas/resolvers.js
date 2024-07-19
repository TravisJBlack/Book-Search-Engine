const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        getSingleUser: async (parent, args) => {
            return User.findOne(args._id)
        }
    },

    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user }
        },
        login: async (parent, { username, email, password }) => {
            const user = ({ $or: [{ username: username }, { email: email }] });

            if (!user) {
                throw AuthenticationError;
            };

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            };

            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, { bookId, description, title, authors, image, link }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookId, description, title, authors, image, link } },
                    { new: true, runValidators: true }
                );

                return updatedUser;
            }
            throw AuthenticationError;
        },
        deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );

                return updatedUser;
            };
            throw AuthenticationError;
        },

    },
};

module.exports = resolvers;