const { paperFragment } = require('./paperFragment');
const { feedbackFragment } = require('./feedbackFragment');

const requestWithPaperFragment = `
  fragment RequestWithPaper on Request {
    id
    pageUploads {
      id
    }
    paymentRef
    feedback {
      ${feedbackFragment}
    }
    paper {
      ${paperFragment}
    }
  }
`;

module.exports = {
  requestWithPaperFragment
};
