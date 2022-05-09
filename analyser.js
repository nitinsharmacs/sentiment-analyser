const moodKeywords = {
  happy: ['smile', 'smiling', 'happy', 'happiness', 'overwhelm'],
  sad: ['sad', 'cry', 'dull'],
  angry: ['shout', 'fight', 'enraged', 'enrage', 'foam']
};

const tokenize = text => text.split(' ');

const isMatchingIn = (list, element) => {
  return list.some(item => element.match(item));
};

const sentimentOf = (sentiments, token) => {
  for (const mood in moodKeywords) {
    sentiments[mood] += isMatchingIn(moodKeywords[mood], token);
  }
  return sentiments;
};

const analyseMood = (sentence) => {
  return tokenize(sentence).reduce(sentimentOf, { happy: 0, sad: 0, angry: 0 });
};

console.log(analyseMood("He's overwhelmed."));
