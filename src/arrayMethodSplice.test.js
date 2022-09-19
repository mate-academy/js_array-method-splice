'use strict';

const applyCustomSplice = require('./arrayMethodSplice');

applyCustomSplice();

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

// --------------Custom tests---------------
test('custom test < 0', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(1, NaN, 'a');

  expect(source)
    .toEqual([0, 'a', 1, 2, 3]);

  expect(result)
    .toEqual([]);
});

test('custom test < 0', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(1, NaN, NaN);

  expect(source)
    .toEqual([0, NaN, 1, 2, 3]);

  expect(result)
    .toEqual([]);
});

test('custom test < 0', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(NaN, NaN, NaN);

  expect(source)
    .toEqual([NaN, 0, 1, 2, 3]);

  expect(result)
    .toEqual([]);
});

test('custom test < 0', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(-2, 1, 3);

  expect(source)
    .toEqual([0, 1, 3, 3]);

  expect(result)
    .toEqual([2]);
});

test('custom test < 0', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(-900, 1, 3);

  expect(source)
    .toEqual([3, 1, 2, 3]);

  expect(result)
    .toEqual([0]);
});

test('custom test < 0', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(-900, -1, 3);

  expect(source)
    .toEqual([3, 0, 1, 2, 3]);

  expect(result)
    .toEqual([]);
});

test('custom test < 0', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(-1, -1, 3);

  expect(source)
    .toEqual([0, 1, 2, 3, 3]);

  expect(result)
    .toEqual([]);
});

test('custom test < 0', () => {
  const source = [0, 1, 2, 3];
  const result = source.splice2(2, 2, 3);

  expect(source)
    .toEqual([0, 1, 3]);

  expect(result)
    .toEqual([2, 3]);
});

test('custom test < 0', () => {
  const source = ['1', 1, 2, 3, null, undefined,
    false, [1, 2, 3, 4], NaN, {}, 'asd'];
  const result = source.splice2(undefined, undefined, 5, 6);

  expect(source)
    .toEqual([5, 6, '1', 1, 2, 3, null, undefined,
      false, [1, 2, 3, 4], NaN, {}, 'asd']);

  expect(result)
    .toEqual([]);
});

test('custom test < 0', () => {
  const source = ['1', 1, 2, 3, null, undefined,
    false, [1, 2, 3, 4], NaN, {}, 'asd'];
  const result = source.splice2(undefined, -1, 5, 6);

  expect(source)
    .toEqual([5, 6, '1', 1, 2, 3, null, undefined,
      false, [1, 2, 3, 4], NaN, {}, 'asd']);

  expect(result)
    .toEqual([]);
});

test('custom test < 0', () => {
  const source = ['1', 1, 2, 3, null, undefined,
    false, [1, 2, 3, 4], NaN, {}, 'asd'];
  const result = source.splice2(undefined, undefined, undefined);

  expect(source)
    .toEqual([undefined, '1', 1, 2, 3, null, undefined,
      false, [1, 2, 3, 4], NaN, {}, 'asd']);

  expect(result)
    .toEqual([]);
});
