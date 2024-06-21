function Capitalize(word: string | undefined) {
  if (word) return word.charAt(0).toUpperCase() + word.slice(1);
};

export default Capitalize;