[![UkraineLatin Tests](https://github.com/annexare/UkraineLatin/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/annexare/UkraineLatin/actions/workflows/tests.yml)
[![Monthly Downloads](https://img.shields.io/npm/dm/ukraine-latin.svg)](https://www.npmjs.com/package/ukraine-latin)

# Ukraine + Latin

A new proposal for Ukrainian Latin with transliteration from Cyrillic.

## Usage

Zero-dependency **1.5**kB (**765**B min + gz) NPM package:

```bash
npm install ukraine-latin
```

```ts
import { UkraineLatinTranslit } from 'ukraine-latin'

const translit = new UkraineLatinTranslit()
const cyrillicText = translit.toCyrillic('Test')
const latinText = translit.toLatin('Тест')
```
