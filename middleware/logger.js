module.exports = (req, res, next) => {
    console.log(`Request: ${req.protocol}://${req.get('host')}${req.url}. Method: ${req.method}. Time: ${Date()}`);
    next();
}