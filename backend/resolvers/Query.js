const {
  requestWithPaperFragment
} = require('../fragments/requestWIthPaperFragment');

const Query = {
  me: (parent, args, ctx) => {
    const { user } = ctx;

    return user;
  },
  papers: (parent, args, ctx) => {
    return ctx.prisma.papers({});
  },
  protectedQuery: (parent, args, ctx) => {
    return 'This is protected data';
  },
  request: (parent, { requestId }, { prisma }) => {
    return prisma
      .request({ id: requestId })
      .$fragment(requestWithPaperFragment);
  }
};

module.exports = {
  Query
};
