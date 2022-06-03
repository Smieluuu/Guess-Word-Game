const check = (req) => {
  const word = req.body.word;
  const password = "TEMAT";

  const success = word === password ? true : false;

  var correctLetter = [];
  var closeLetter = [];

  for (var i = 0; i < word.length; i++) {
    if (password.includes(word[i])) {
      if (password[i] === word[i]) {
        correctLetter.push(i);
      } else {
        closeLetter.push(i);
      }
    }
  }
  return { success, closeLetter, correctLetter };
};

module.exports = {
  check: check,
};
