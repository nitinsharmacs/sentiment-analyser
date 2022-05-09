const add = numbers => numbers.reduce((sum, number) => sum + number);

const isMatchingIn = (list, element) => {
  return list.some(item => element.match(item));
};

const tokenize = text => text.split(' ');

exports.isMatchingIn = isMatchingIn;
exports.add = add;
exports.tokenize = tokenize;
