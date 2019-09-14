const BOARD = {
  AQA: 'AQA'
};

const QUALIFICATION = {
  ALEVEL: 'ALEVEL',
  ASLEVEL: 'ASLEVEL'
};

const papers = [
  {
    id: 'AQA-74021-QP-JUN18',
    board: BOARD.AQA,
    title: 'A-Level Biology June 2018 | Paper 1',
    qualification: QUALIFICATION.ALEVEL,
    questionsUrl:
      'http://filestore.aqa.org.uk/sample-papers-and-mark-schemes/2018/june/AQA-74021-QP-JUN18.PDF',
    markSchemeUrl:
      'http://filestore.aqa.org.uk/sample-papers-and-mark-schemes/2018/june/AQA-74021-W-MS-JUN18.PDF'
  },
  {
    id: 'AQA-74011-W-MS-JUN18',
    board: BOARD.AQA,
    title: 'AS-Level Biology June 2018 | Paper 1',
    qualification: QUALIFICATION.ASLEVEL,
    questionsUrl:
      'http://filestore.aqa.org.uk/sample-papers-and-mark-schemes/2018/june/AQA-74011-QP-JUN18.PDF',
    markSchemeUrl:
      'http://filestore.aqa.org.uk/sample-papers-and-mark-schemes/2018/june/AQA-74011-W-MS-JUN18.PDF'
  },
  {
    id: 'AQA-74022-QP-JUN18',
    board: BOARD.AQA,
    title: 'A-Level Biology June 2018 | Paper 2',
    qualification: QUALIFICATION.ALEVEL,
    questionsUrl:
      'http://filestore.aqa.org.uk/sample-papers-and-mark-schemes/2018/june/AQA-74022-QP-JUN18.PDF',
    markSchemeUrl:
      'http://filestore.aqa.org.uk/sample-papers-and-mark-schemes/2018/june/AQA-74022-W-MS-JUN18.PDF'
  },
  {
    id: 'AQA-74012-QP-JUN18',
    board: BOARD.AQA,
    title: 'AS-Level Biology June 2018 | Paper 2',
    qualification: QUALIFICATION.ASLEVEL,
    questionsUrl:
      'http://filestore.aqa.org.uk/sample-papers-and-mark-schemes/2018/june/AQA-74012-QP-JUN18.PDF',
    markSchemeUrl:
      'http://filestore.aqa.org.uk/sample-papers-and-mark-schemes/2018/june/AQA-74012-W-MS-JUN18.PDF'
  },
  {
    id: 'AQA-74023-QP-JUN18',
    board: BOARD.AQA,
    title: 'A-Level Biology June 2018 | Paper 3',
    qualification: QUALIFICATION.ALEVEL,
    questionsUrl:
      'http://filestore.aqa.org.uk/sample-papers-and-mark-schemes/2018/june/AQA-74023-QP-JUN18.PDF',
    markSchemeUrl:
      'http://filestore.aqa.org.uk/sample-papers-and-mark-schemes/2018/june/AQA-74023-W-MS-JUN18.PDF'
  }
];

module.exports = {
  BOARD,
  QUALIFICATION,
  papers
};
