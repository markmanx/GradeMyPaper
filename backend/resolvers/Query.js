const Query = {
  me: (parent, args, ctx) => {
    const { user } = ctx;

    return user;
  },
  protectedQuery: (parent, args, ctx) => {
    return 'This is protected data';
  }
};

module.exports = {
  Query
};
