const createPapers = (papers, prisma) => {
  return Promise.all(
    papers.map(paper => {
      const paperId = paper.id;
      delete paper.id;
      return prisma.createPaper({ ...paper, paperId });
    })
  );
};

module.exports = {
  createPapers
};
