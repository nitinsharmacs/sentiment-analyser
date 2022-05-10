const { tokenize,
  getAnalyserData,
  storeAnalyserData
} = require('./helpers.js');

const newSentiment = (sentiment, keywords, analyserData) => {
  const { sentiments, moodKeywords } = analyserData;
  sentiments[sentiment] = 0;
  moodKeywords[sentiment] = [
    ...moodKeywords[sentiment] ? moodKeywords[sentiment] : [],
    ...keywords
  ];
  return analyserData;
};

const DATAFILE = './data/analyserData.json';

const main = function (sentiment, ...keywords) {
  try {
    const analyserData = getAnalyserData(DATAFILE);
    storeAnalyserData(DATAFILE,
      newSentiment(sentiment, keywords, analyserData)
    );
    return 'SUCCESS';
  } catch (error) {
    return 'ERROR';
  }
};

const [, , sentiment, sentence] = process.argv;
console.log(main(sentiment, sentence));
