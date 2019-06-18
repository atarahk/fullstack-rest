import http from 'http'
import app from '../app'

const port = parseInt(process.env.PORT, 10) || 5000
const server = http.createServer(app)
server.listen(port, (req, res) => {
  console.log(`App is running on: ${port}`)
})
