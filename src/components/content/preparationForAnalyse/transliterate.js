/* eslint-disable no-dupe-keys */
export const transliterate = (stemms) => {
  const converter = {
    sch: 'щ',
    yo: 'ё',
    zh: 'ж',
    ch: 'ч',
    sh: 'ш',
    yu: 'ю',
    ya: 'я',
    ia: 'я',
    a: 'а',
    b: 'б',
    v: 'в',
    g: 'г',
    d: 'д',
    e: 'е',
    z: 'з',
    i: 'и',
    y: 'й',
    k: 'к',
    l: 'л',
    m: 'м',
    n: 'н',
    o: 'о',
    p: 'п',
    r: 'р',
    s: 'с',
    t: 'т',
    u: 'у',
    f: 'ф',
    h: 'х',
    c: 'ц',
    y: 'и',
  }

  let transliteratedTexts = []
  stemms.map((word) => {
    for (const [key, value] of Object.entries(converter)) {
      word = word.replaceAll(key, value)
    }
    transliteratedTexts.push(word)
  })

  return transliteratedTexts
}
