test('Validar as principais operações do JEST', () => {
  let number = null;
  expect(number).toBeNull();
  number = 10;
  expect(number).not.toBeNull();
  expect(number).toBe(10);
  expect(number).toEqual(10);
  expect(number).toBeGreaterThan(9);
  expect(number).toBeLessThan(11);
});

test('Validar operações com objetos', () => {
  const obj = { name: 'Carlos Daniel', mail: 'carlosdaniel@email.com' };
  expect(obj).toHaveProperty('name');
  expect(obj).toHaveProperty('name', 'Carlos Daniel');
  expect(obj.name).toBe('Carlos Daniel');

  const obj2 = { name: 'Carlos Daniel', mail: 'carlosdaniel@email.com' };
  expect(obj).toEqual(obj2);
  expect(obj).toBe(obj);
});
