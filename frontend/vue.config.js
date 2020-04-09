module.exports = {
  pwa: {
    name: 'Huishouden'
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000/',
        ws: true
      }
    }
  }
}
