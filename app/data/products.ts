export const products = {
  cupcakes: [
    { id: 'cupcake-1', name: 'Vanilla Dream', description: 'Light vanilla sponge with creamy buttercream', basePrice: 450, image: '/images/placeholder.svg', flavors: ['Vanilla', 'Chocolate', 'Strawberry'], isCustomizable: true },
    { id: 'cupcake-2', name: 'Chocolate Heaven', description: 'Rich chocolate sponge with ganache filling', basePrice: 475, image: '/images/placeholder.svg', flavors: ['Chocolate', 'Red Velvet'], isCustomizable: true },
    { id: 'cupcake-3', name: 'Strawberry Bliss', description: 'Fresh strawberry with cream cheese frosting', basePrice: 500, image: '/images/placeholder.svg', flavors: ['Strawberry', 'Raspberry'], isCustomizable: true },
  ],
  cakes: [
    { id: 'cake-1', name: 'Classic Birthday', description: '3-layer vanilla cake with your choice of decorations', basePrice: 5500, image: '/images/placeholder.svg', sizes: [{name: '6"', price: 4500, servings: 12}, {name: '8"', price: 5500, servings: 20}, {name: '10"', price: 6500, servings: 30}], isCustomizable: true },
    { id: 'cake-2', name: 'Wedding Elegance', description: 'Elegant white fondant with floral accents', basePrice: 15000, image: '/images/placeholder.svg', isCustomizable: true },
    { id: 'cake-3', name: 'Anniversary Special', description: 'Two-tone design with gold accents', basePrice: 12000, image: '/images/placeholder.svg', isCustomizable: true },
  ],
  cookies: [
    { id: 'cookie-1', name: 'Chocolate Chip', description: 'Classic chocolate chip with sea salt', basePrice: 350, image: '/images/placeholder.svg', isCustomizable: false },
    { id: 'cookie-2', name: 'Oatmeal Raisin', description: 'Chewy oatmeal with plump raisins', basePrice: 350, image: '/images/placeholder.svg', isCustomizable: false },
    { id: 'cookie-3', name: 'Sugar Cookies', description: 'Buttery with royal icing', basePrice: 400, image: '/images/placeholder.svg', isCustomizable: true },
  ],
  brownies: [
    { id: 'brownie-1', name: 'Fudge Brownie', description: 'Dense, rich chocolate fudge', basePrice: 450, image: '/images/placeholder.svg', isCustomizable: false },
    { id: 'brownie-2', name: 'Walnut Brownie', description: 'Fudge with crunchy walnuts', basePrice: 500, image: '/images/placeholder.svg', isCustomizable: false },
    { id: 'brownie-3', name: 'Blondie', description: 'Buttery vanilla with white chocolate', basePrice: 475, image: '/images/placeholder.svg', isCustomizable: false },
  ],
};
