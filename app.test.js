const request = require('supertest')
const app = require('./app')

// describe untuk mengelompokan test
describe('=== PUBLIC ===', () => {
    describe('=> PRODUCT', () => {
        it('GET /products ', () => {
            return request(app)
                .get('/products')
                .expect('Content-Type', /json/)
                .expect(200)
                .then((response) => {
                    expect(response.body).toEqual(
                        expect.arrayContaining([
                            expect.objectContaining({
                                id: expect.any(Number),
                                name: expect.any(String),
                                description: expect.any(String),
                                price: expect.any(Number),
                                stock: expect.any(Number),
                                user_id: expect.any(Number),
                                User: expect.objectContaining({
                                    id: expect.any(Number),
                                    name: expect.any(String),
                                }),
                                ProductImages: expect.arrayContaining([
                                ])
                            })
                        ])
                    )
                })
        }),
            it('GET /products/find', () => {
                return request(app)
                    .get('/products/find?key=te')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .then((response) => {
                        expect(response.body).toEqual(
                            expect.arrayContaining([
                                expect.objectContaining({
                                    id: expect.any(Number),
                                    name: expect.any(String),
                                    description: expect.any(String),
                                    price: expect.any(Number),
                                    stock: expect.any(Number),
                                    user_id: expect.any(Number),
                                    User: expect.objectContaining({
                                        id: expect.any(Number),
                                        name: expect.any(String),
                                    }),
                                    ProductImages: expect.arrayContaining([
                                    ])
                                })
                            ])
                        )
                    })
            }),
            it('GET /products/find --> 404', () => {
                return request(app)
                    .get('/products/find?key=akwdoajnjwh1237891')
                    .expect('Content-Type', /json/)
                    .expect(404)
            })
    })
})