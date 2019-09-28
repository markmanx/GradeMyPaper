const { prisma } = require('../generated');
const { createPapers } = require('./helpers/paperHelpers');
const { papers } = require('./data');

async function seed() {
  await createPapers(papers, prisma);
}

seed();
