// Correct Horse Battery Staple
// An implementation of the XKCD password algorithm https://xkcd.com/936/
// The idea behind this generator is that randomized passwords are easy to guess
// and difficult to remember, while a password composed of four english words is
// both easy to remember and difficult to guess. This capsule adds the ability
// to generate such passwords to Bixby.

// Main entry point
function generate(numWords) {

  var Password = "";
  // Get our list of words
  var wordfile = require("./lib/wordlist");
  var wordList = [];
  wordfile.forEach(function(newWords){
        wordList = newWords.commonWords;
  })
  // Loop through the number of words the user asked for
  for (var i = 0; i < numWords; i++) {
    var rand = wordList[Math.floor(Math.random() * wordList.length)];
    Password = Password + rand;
  }
  // Capture the length in words of the current password
  var length = numWords;
  // Calculate the approximate entropy of the password
  var entropy = length * 11;
  // Calculate the approximate number of years to guess the password
  // at 1000 guesses/second
  var years = Math.floor(Math.pow(2, entropy) / 31536000000);

  // Password Result
  return {
    Password: Password, // required password
    length: length, // Number of words used
    entropy: entropy, // Approximate bits of entropy of the password
    years: years // Approximate number of years to guess password
  }
}

// Exports
module.exports = {
  function: generate
}