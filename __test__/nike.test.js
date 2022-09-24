
const { client } = require('../src/client');

test('should fetch nike projects', async () => {
    let products = await client.fetchProducts()

    expect(products).toHaveLength(54);
    expect(products).toEqual(expect.arrayContaining([expect.objectContaining({
        id: '0149247U',
        name: 'Tênis Jordan Series ES Masculino'
    })]));
})