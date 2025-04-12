import { faker } from '@faker-js/faker';

const alimentos = ['Queijo', 'Presunto', 'Mortadela', 'Hambúrguer', 'Pão'];

const unidades = ['kg', 'g', 'unidade', 'pacote'];

export const products = alimentos.map((nome, index) => ({
  id: faker.string.uuid(),
  nome,
  unidade: faker.helpers.arrayElement(unidades),
  quantidade: faker.number.float({ min: 1, max: 100, fractionDigits: 1 }),
}));

