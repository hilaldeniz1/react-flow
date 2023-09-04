export const validate = (data) => {
  // Objeyi diziyi çevirdik
  // arıdından en az bir tane elemanı null veya "" mi kontrol ettik
  // en az birtanesi boş ise false döndürür
  // hepsi doluysa true döndürür
  const isValid = !Object.values(data).some((i) => i === null || i === "");

  return isValid;
};

// elemanı local stroge'a ekler
export const saveToLocale = (key, value) => {
  // stringe çevirme
  const str = JSON.stringify(value);
  // lokal'e kaydetme
  localStorage.setItem(key, str);
};
