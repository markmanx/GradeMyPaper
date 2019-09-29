const createPapers = (papers, prisma) => Promise.all(
  papers.map((paper) => {
    const p = { ...paper };
    const paperId = p.id;
    delete p.id;
    return prisma.createPaper({ ...p, paperId });
  }),
);

module.exports = {
  createPapers,
};
