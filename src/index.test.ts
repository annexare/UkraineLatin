import test from 'node:test'
import assert from 'node:assert/strict'

import { UkraineLatinTranslit, titleCaseWord } from './index'

test('titleCaseWord()', () => {
  assert.strictEqual(titleCaseWord('тест'), 'Тест')
  assert.strictEqual(titleCaseWord('Тест'), 'Тест')
  assert.strictEqual(titleCaseWord('test'), 'Test')
  assert.strictEqual(titleCaseWord('Test'), 'Test')
})

test('Cyrillic to Latin', () => {
  const translit = new UkraineLatinTranslit()
  const result = translit.toLatin('Тест')

  assert.strictEqual(typeof result, 'string')
  assert.strictEqual(result, 'Test')

  assert.strictEqual(
    translit.toLatin("Дев'ятсот чотири шістнадцятих"),
    "Dev'jatsot čotyry šistnadcjatyh",
  )
  assert.strictEqual(translit.toLatin('Борщ'), 'Boršč')
  assert.strictEqual(translit.toLatin('Їжак'), 'Jižak')
  assert.strictEqual(translit.toLatin('Ґудзик ґедзь джміль'), "Ĝudzyk ĝedz' džmil'")
  assert.strictEqual(translit.toLatin('Лінь та лінь. Лінь'), "Lin' ta lin'. Lin'")
})

test('Latin to Cyrillic', () => {
  const translit = new UkraineLatinTranslit()

  const result = translit.toCyrillic('Test')

  assert.strictEqual(typeof result, 'string')
  assert.strictEqual(result, 'Тест')

  assert.strictEqual(
    translit.toCyrillic("Dev'jatsot čotyry šistnadcjatyh"),
    "Дев'ятсот чотири шістнадцятих",
  )
  assert.strictEqual(translit.toCyrillic('Boršč'), 'Борщ')
  assert.strictEqual(translit.toCyrillic('Jižak'), 'Їжак')
  assert.strictEqual(translit.toCyrillic("Ĝudzyk ĝedz' džmil'"), 'Ґудзик ґедзь джміль')
  assert.strictEqual(translit.toCyrillic("Lin' ta lin'. Lin'"), 'Лінь та лінь. Лінь')
})
