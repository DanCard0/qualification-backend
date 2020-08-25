module.exports = (image, req, res) => {
    if (req.method === 'GET' && req.path.indexOf('edit') < 0) {
        return true;
    }

    if (image.creator._id.toString() === req.user) {
        return true;
    }

    return false;
}