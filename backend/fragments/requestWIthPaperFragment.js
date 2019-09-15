const { paperFragment } = require('./paperFragment');

const requestWithPaperFragment = `
  fragment RequestWithPaper on Request {
    id
    paper {
      ${paperFragment}
    }
  }
`;

module.exports = {
  requestWithPaperFragment
};
