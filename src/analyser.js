const { add,
  isMatchingIn,
  tokenize,
  getAnalyserData
} = require('./helpers.js');

const sentimentOf = (token, sentiments, moodKeywords) => {
  for (const mood in moodKeywords) {
    sentiments[mood] += isMatchingIn(moodKeywords[mood], token);
  }
  return sentiments;
};

const analyseMood = (sentence, analyserData) => {
  const { sentiments, moodKeywords } = analyserData;
  return tokenize(sentence).reduce((sentiments, token) => {
    return sentimentOf(token, sentiments, moodKeywords);
  }, sentiments);
};

const isUnableToAnalyse = (sentiments) => {
  return add(Object.values(sentiments)) <= 0;
};

const keyOfGreatest = obj => {
  return Object.keys(obj).reduce((greatestKey, key) => {
    if (obj[key] > obj[greatestKey]) {
      return key;
    }
    return greatestKey;
  });
};

const formate = sentiment => {
  return 'It\'s ' + sentiment[0].toUpperCase() + sentiment.slice(1);
};

const finalise = sentiments => {
  const maxValueSentiment = keyOfGreatest(sentiments);
  return formate(maxValueSentiment);
};

const DATAFILE = './data/analyserData.json';

const main = function (sentence) {
  let analyserData = {};
  try {
    analyserData = getAnalyserData(DATAFILE);
  } catch (error) {
    return 'ERROR';
  }
  const analysedSentiments = analyseMood(sentence, analyserData);
  if (isUnableToAnalyse(analysedSentiments)) {
    return 'NOFOUND';
  }
  return finalise(analysedSentiments);
};

const [, , sentence] = process.argv;
console.log(main(sentence));
