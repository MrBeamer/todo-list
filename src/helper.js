const capitalize = (word) => {
  const firstLetter = word.toUpperCase().slice(0, 1);
  const restOfWord = word.toLowerCase().slice(1);
  return firstLetter + restOfWord;
};

export { capitalize };
