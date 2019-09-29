const {
  requestWithPaperFragment,
} = require('../fragments/requestWithPaperFragment');

const Query = {
  me: (parent, args, ctx) => {
    const { user } = ctx;

    return user;
  },
  papers: (parent, args, ctx) => ctx.prisma.papers({}),
  request: async (parent, { requestId }, ctx) => {
    const { user, prisma } = ctx;

    const requests = await prisma
      .requests({ where: { id: requestId, user: { id: user.id } } })
      .$fragment(requestWithPaperFragment);

    return requests[0] || null;
  },
  requests: async (parent, args, ctx) => {
    const { user, prisma } = ctx;

    const confirmedRequests = await prisma
      .requests({
        where: { paymentRef_not: null, user: { id: user.id } },
      })
      .$fragment(requestWithPaperFragment);

    return confirmedRequests;
  },
};

module.exports = {
  Query,
};
