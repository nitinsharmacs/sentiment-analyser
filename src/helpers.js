const fs = require('fs');

const add = numbers => numbers.reduce((sum, number) => sum + number);

const isMatchingIn = (list, element) => {
  return list.some(item => element.match(item));
};

const getAnalyserData = filePath => {
  return JSON.parse(fs.readFileSync(filePath));
};

const storeAnalyserData = (filePath, content) => {
  fs.writeFileSync(filePath, JSON.stringify(content), 'utf8');
};

const isValidToken = token => {
  const validTokenLength = 3;
  return token.length >= validTokenLength && !token.includes('\'');
};

const tokenize = text => {
  const tokens = text.split(' ');
  return tokens.filter(isValidToken);
};

exports.isMatchingIn = isMatchingIn;
exports.add = add;
exports.tokenize = tokenize;
exports.getAnalyserData = getAnalyserData;
exports.storeAnalyserData = storeAnalyserData;
