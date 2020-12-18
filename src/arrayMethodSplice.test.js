'use strict';

const applyCustomSplice = require('./arrayMethodSplice');

applyCustomSplice();

test('splice(NaN, 2)', () => {
  const source = [0, 1, 2, 3, 4];
  const result = source.splice2(NaN, 2);

  expect(source)
    .toEqual([2, 3, 4]);

  expect(result)
    .toEqual([0, 1]);
});

test('splice(-2,NaN)', () => {
  const source = [0, 1, 2, 3, 4];
  const result = source.splice2(-2, NaN);

  expect(source)
    .toEqual([0, 1, 2, 3, 4]);

  expect(result)
    .toEqual([]);
});

test('splice(2,3, NaN))', () => {
  const source = [0, 1, 2, 3, 4];
  const result = source.splice2(2, 3, NaN);

  expect(source)
    .toEqual([0, 1, NaN]);

  expect(result)
    .toEqual([2, 3, 4]);
});

test('splice("w", "a", NaN))', () => {
  const source = [0, 1, 2, 3, 4];
  const result = source.splice2('w', 'a', NaN);

  expect(source)
    .toEqual([NaN, 0, 1, 2, 3, 4]);

  expect(result)
    .toEqual([]);
});

test('splice(null, 2, "a", "b", "c") first parametr', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(null, 2, 'a', 'b', 'c');

  expect(source)
    .toEqual(['a', 'b', 'c', 2, 3]);

  expect(result)
    .toEqual([0, 1]);
});

test('splice(null, null, 1))', () => {
  const source = [0, 1, 2, 3, 4];
  const result = source.splice2(null, null, 1);

  expect(source)
    .toEqual([1, 0, 1, 2, 3, 4]);

  expect(result)
    .toEqual([]);
});

test('splice(1, null, "a", "b", "c") second parametr', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(1, null, 'a', 'b', 'c');

  expect(source)
    .toEqual([0, 'a', 'b', 'c', 1, 2, 3]);

  expect(result)
    .toEqual([]);
});

test('splice(null, 3, [1,2,3]))', () => {
  const source = [0, 1, 2, 3, 4];
  const result = source.splice2(null, 3, [1, 2, 3]);

  expect(source)
    .toEqual([[1, 2, 3], 3, 4]);

  expect(result)
    .toEqual([0, 1, 2]);
});

test('splice(-2) ', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(-2);

  expect(source)
    .toEqual([0, 1]);

  expect(result)
    .toEqual([2, 3]);
});

test('splice(-1, -3, 12) ', () => {
  const source = [0, 1, 2, 3, 4];
  const result = source.splice2(-1, -3, 12);

  expect(source)
    .toEqual([0, 1, 2, 3, 12, 4]);

  expect(result)
    .toEqual([]);
});

test('splice(-2, -2, "a")', () => {
  const source = [0, 1, 2, 3, 4];
  const result = source.splice2(-2, -2, 'a');

  expect(source)
    .toEqual([0, 1, 2, 'a', 3, 4]);

  expect(result)
    .toEqual([]);
});

test('splice(-1, -1, [1,2,3])', () => {
  const source = [0, 1, 2, 3, 4];
  const result = source.splice2(-1, -1, [1, 2, 3]);

  expect(source)
    .toEqual([0, 1, 2, 3, [1, 2, 3], 4]);

  expect(result)
    .toEqual([]);
});

test('splice("w", 3, [1, 2])', () => {
  const source = [0, 1, 2, 3, 4];
  const result = source.splice2('w', 3, [1, 2]);

  expect(source)
    .toEqual([[1, 2], 3, 4]);

  expect(result)
    .toEqual([0, 1, 2]);
});

test('splice2 is added to [].__proto__', () => {
  expect([].splice2)
    .toBeInstanceOf(Function);
});

test(`splice2 doesn't call default splice`, () => {
  expect([].splice2.toString().includes('.splice('))
    .toBe(false);
});

test('splice without arguments', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2();

  expect(source)
    .toEqual([0, 1, 2, 3]);

  expect(result)
    .toEqual([]);
});

test('splice(1)', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(1);

  expect(source)
    .toEqual([0]);

  expect(result)
    .toEqual([1, 2, 3]);
});

test('splice(0, "a")', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(0, 'a');

  expect(source)
    .toEqual([0, 1, 2, 3]);

  expect(result)
    .toEqual([]);
});

test('splice(1, 2)', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(1, 2);

  expect(source)
    .toEqual([0, 3]);

  expect(result)
    .toEqual([1, 2]);
});

test(`splice(1, 2, 'a', 'b', 'c'`, () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(1, 2, 'a', 'b', 'c');

  expect(source)
    .toEqual([0, 'a', 'b', 'c', 3]);

  expect(result)
    .toEqual([1, 2]);
});

test(`splice(1, 0, 'a', 'b', 'c')`, () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(1, 0, 'a', 'b', 'c');

  expect(source)
    .toEqual([0, 'a', 'b', 'c', 1, 2, 3]);

  expect(result)
    .toEqual([]);
});

test('splice(-3, 2)', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(-3, 2);

  expect(source)
    .toEqual([0, 3]);

  expect(result)
    .toEqual([1, 2]);
});

test('splice(100)', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(100);

  expect(source)
    .toEqual([0, 1, 2, 3]);

  expect(result)
    .toEqual([]);
});

test('splice(-1)', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(-1);

  expect(source)
    .toEqual([0, 1, 2]);

  expect(result)
    .toEqual([3]);
});

test('splice(-100)', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(-100);

  expect(source)
    .toEqual([]);

  expect(result)
    .toEqual([0, 1, 2, 3]);
});

test('splice from empty array', () => {
  const source = [];
  const result = source.splice2(0);

  expect(source)
    .toEqual([]);

  expect(result)
    .toEqual([]);
});

test('splice from empty array with new elements', () => {
  const source = [];
  const result = source.splice2(0, 0, 0, 1, 2, 3, 4, 5);

  expect(source)
    .toEqual([0, 1, 2, 3, 4, 5]);

  expect(result)
    .toEqual([]);
});

test('undefined as a first parameter', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(undefined, 3);

  expect(source)
    .toEqual([3]);

  expect(result)
    .toEqual([0, 1, 2]);
});

test('undefined as a new element', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(1, 2, undefined);

  expect(source)
    .toEqual([0, undefined, 3]);

  expect(result)
    .toEqual([1, 2]);
});

test('deleteCount < 0', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(1, -1);

  expect(source)
    .toEqual([0, 1, 2, 3]);

  expect(result)
    .toEqual([]);
});
