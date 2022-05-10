ANALYSER=./src/analyser.js
DATAHANLDER=./src/handleData.js

function analyse() {
  local sentence=$1
  node $ANALYSER "$sentence"
}

function new_sentiment() {
  local sentence=$1

  local sentiment
  local keywords
  read -p "Pls share the sentiment for the future : " sentiment
  read -p "Pls enter the keywords for sentiment separated by commas : " keywords
  node $DATAHANLDER "$sentiment" $(echo $keywords | tr ',' ' ')
}

function main() {
  local sentence=$1
  local result=$(analyse "$sentence")
  if [[ $result != 'NOFOUND' ]]; then
    echo "$result"
    return 0
  fi
  echo "Sorry, I'm unable to find the sentiment :("
  local sentiment_add_res=$(new_sentiment "$sentence")
  if [[ $sentiment_add_res != "ERROR" ]]; then
    echo "Thankyou :)"
    return 0
  fi
  echo "Sorry, some error occured. Try again later!"
  return 1
}

main "$1"
exit $!
