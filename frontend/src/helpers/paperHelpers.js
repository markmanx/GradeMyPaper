import { papers } from '../data/papers';

export const getPaperById = id => {
  const paper = papers.filter(p => p.id === id);

  return paper.length ? paper[0] : null;
};
