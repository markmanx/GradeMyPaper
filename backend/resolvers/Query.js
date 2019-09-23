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
  request: (parent, { requestId }, { prisma }) => {
    return prisma
      .request({ id: requestId })
      .$fragment(requestWithPaperFragment);
  },
  requests: async (parent, args, { prisma }) => {
    const confirmedRequests = await prisma
      .requests({
        where: { paymentRef_not: null }
      })
      .$fragment(requestWithPaperFragment);

    return confirmedRequests;
  }
};

module.exports = {
  Query
};
