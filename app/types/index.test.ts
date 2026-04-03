import { describe, it, expect } from 'vitest';
import { Product, Size, CustomizationOption, CustomizationState } from './index';

describe('Product interface', () => {
  it('validates correct product structure', () => {
    const product: Product = {
      id: '1',
      name: 'Test Cupcake',
      category: 'cupcake',
      description: 'Delicious',
      basePrice: 450,
      image: '/image.jpg',
      isCustomizable: true,
    };
    expect(product.id).toBe('1');
    expect(product.category).toBe('cupcake');
  });

  it('accepts optional sizes array', () => {
    const product: Product = {
      id: '1',
      name: 'Cake',
      category: 'cake',
      description: 'Test',
      basePrice: 4500,
      image: '/image.jpg',
      isCustomizable: false,
      sizes: [{ name: '6"', price: 4500, servings: 8 }],
    };
    expect(product.sizes).toHaveLength(1);
  });

  it('accepts optional flavors array', () => {
    const product: Product = {
      id: '1',
      name: 'Cookie',
      category: 'cookie',
      description: 'Test',
      basePrice: 250,
      image: '/image.jpg',
      isCustomizable: false,
      flavors: ['Chocolate Chip', 'Oatmeal'],
    };
    expect(product.flavors).toContain('Chocolate Chip');
  });
});

describe('Size interface', () => {
  it('validates size structure', () => {
    const size: Size = { name: '6"', price: 4500, servings: 8 };
    expect(size.name).toBe('6"');
    expect(size.price).toBe(4500);
    expect(size.servings).toBe(8);
  });
});

describe('CustomizationOption interface', () => {
  it('validates customization options structure', () => {
    const options: CustomizationOption = {
      base: ['Cupcake', '6" Cake'],
      flavor: ['Vanilla', 'Chocolate'],
      frosting: ['Buttercream', 'Ganache'],
      toppings: ['Sprinkles', 'Fruit'],
      colors: ['Pink', 'Blue'],
    };
    expect(options.base).toHaveLength(2);
    expect(options.frosting).toContain('Buttercream');
  });
});

describe('CustomizationState interface', () => {
  it('validates initial state', () => {
    const state: CustomizationState = {
      base: null,
      flavor: null,
      frosting: null,
      toppings: [],
      color: null,
    };
    expect(state.toppings).toHaveLength(0);
    expect(state.base).toBeNull();
  });

  it('validates populated state', () => {
    const state: CustomizationState = {
      base: 'Cupcake',
      flavor: 'Vanilla',
      frosting: 'Buttercream',
      toppings: ['Sprinkles', 'Chocolate Chips'],
      color: 'Pink',
    };
    expect(state.toppings).toHaveLength(2);
  });
});
