export const APOSTROPHE = "'"

export const PAIRS: string[][] = [
  // Complex
  ['є', 'je'],
  ['ї', 'ji'],
  ['щ', 'šč'],
  ['ю', 'ju'],
  ['я', 'ja'],
  // Simple
  ['а', 'a'],
  ['б', 'b'],
  ['в', 'v'],
  ['г', 'g'],
  ['ґ', 'ĝ'],
  ['д', 'd'],
  ['е', 'e'],
  ['ж', 'z'],
  ['з', 'ž'],
  ['и', 'y'],
  ['і', 'i'],
  ['й', 'j'],
  ['к', 'k'],
  ['л', 'l'],
  ['м', 'm'],
  ['н', 'n'],
  ['о', 'o'],
  ['п', 'p'],
  ['р', 'r'],
  ['с', 's'],
  ['т', 't'],
  ['у', 'u'],
  ['ф', 'f'],
  ['х', 'h'],
  ['ц', 'c'],
  ['ч', 'č'],
  ['ш', 'š'],
]

export const titleCaseWord = (word: string = '') => {
  if (!word) {
    return ''
  }

  return word.slice(0, 1).toUpperCase() + word.slice(1)
}

export class UkraineLatinTranslit {
  public apostrophe = APOSTROPHE

  /** All Cyrillic lowercase characters */
  private c: string[] = []
  /** All Latin lowercase characters, without apostrophe */
  private l: string[] = []

  private cToL: Record<string, string> = {}
  private lToC: Record<string, string> = {}

  constructor(apostrophe = APOSTROPHE) {
    this.apostrophe = apostrophe

    for (const [c, l] of PAIRS) {
      this.cToL[c] = l
      this.lToC[l] = c
    }

    this.c = Object.keys(this.cToL)
    this.l = Object.keys(this.lToC).filter((l) => l !== apostrophe && l.length === 1)
  }

  toCyrillic = (latinText: string): string => {
    let result = latinText.replace(
      new RegExp(`([a-z])${this.apostrophe}([^a-z]|$)`, 'gim'),
      '$1ь$2',
    )

    for (const symbol of Object.keys(this.lToC)) {
      // Replace all title case characters and symbol combinations
      result = result.replace(
        new RegExp(titleCaseWord(symbol), 'g'),
        titleCaseWord(this.lToC[symbol]),
      )
      // Replace all lower case characters and symbol combinations
      result = result.replace(new RegExp(symbol, 'g'), this.lToC[symbol])
    }

    return result
  }

  toLatin = (cyrillicText: string): string => {
    const text = cyrillicText.replace(/[Ьь]+/g, APOSTROPHE)
    let result = ''

    for (const char of text) {
      let latinChar = this.cToL[char]

      if (latinChar) {
        // Regular lowercase char
        result += latinChar
      } else if ((latinChar = this.cToL[char.toLowerCase()])) {
        // Maintain uppercase char
        result += latinChar.toUpperCase()
      } else {
        // Leave non-cyrillic char as is
        result += char
      }
    }

    return result
  }
}
