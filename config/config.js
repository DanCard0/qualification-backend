module.exports = {
    port: process.env.PORT || 8080,
    session_secret: 'qual1234ification#',
    token_secret: 'myt0k3ns3cr3t',
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost/qualification'
}