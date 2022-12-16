const model = require('../models')

const userAttributes = ['name', 'email']
const productAttributesWithout = ['createdAt', 'updatedAt']

module.exports.profile = async (req, res) => {

    try {
        const user_id = req.login_id

        const user = await model.User.findOne({
            where: {
                id: user_id
            },
            attributes: userAttributes,
            include: [{
                model: model.Product,
                attributes: { exclude: productAttributesWithout }
            }]
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