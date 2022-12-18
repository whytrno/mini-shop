const model = require('../models')

const userAttributes = ['id', 'name', 'email']
const productAttributesWithout = ['user_id', 'createdAt', 'updatedAt']
const productImageAttributes = ['id', 'path']

module.exports.profile = async (req, res) => {

    try {
        const user_id = req.login_id

        const user = await model.User.findOne({
            where: {
                id: user_id
            },
            attributes: userAttributes,
            include: [
                {
                    model: model.Product,
                    attributes: { exclude: productAttributesWithout },
                    include: [
                        {
                            model: model.ProductImage,
                            attributes: productImageAttributes
                        },
                        {
                            model: model.Category,
                            attributes: ['id', 'name']
                        }
                    ]
                }
            ]
        })

        if (user === null) {
            res.status(404).json({
                message: "Data not found"
            })
        } else {
            res.status(200).json(user)
        }
    } catch (error) {
        res.status(error.code || 500).json(
            error.data || 'internal server error'
        )
    }
}