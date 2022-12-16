module.exports.beautyError = (error) => {
    let beautyError_ = []

    Object.keys(error.errors).forEach(key => {
        if (key > 0) {
            if (beautyError_[key - 1] != undefined && beautyError_[key - 1]['path'] === error.errors[key].path) {
                beautyError_[key - 1]['message'].push(error.errors[key].message
                )
            } else {
                beautyError_[key] = {
                    path: error.errors[key].path,
                    message: [error.errors[key].message]
                }
            }
        } else {
            beautyError_[key] = {
                path: error.errors[key].path,
                message: [error.errors[key].message]
            }
        }
    });

    return beautyError_.filter((item) => item != null || item != undefined)
}