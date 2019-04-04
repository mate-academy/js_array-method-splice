'use strict';

const applyCustomSplice = require('./arrayMethodSplice');
applyCustomSplice();

test('`splice2` is added to [].__proto__', () => {
  expect([].splice2)
    .toBeInstanceOf(Function);
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
