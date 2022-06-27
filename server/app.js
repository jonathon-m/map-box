const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

const port = 3001

function randomInBounds(x1, x2) {
  const distance = Math.abs(x1 - x2)
  const random = Math.random()
  const dx = distance * random
  return x1 > x2 ? x2 + dx : x1 + dx
}

function randomCoordInBox(neLat, neLon, swLat, swLon) {
  return {
    lat: randomInBounds(neLat, swLat),
    lon: randomInBounds(neLon, swLon),
  }
}

app.get('/', (req, res) => {
  const { n, neLat, neLon, swLat, swLon } = req.query
  const randomPoints = []
  for (let i = 0; i < parseInt(n); i++) {
    randomPoints.push(
      randomCoordInBox(
        parseFloat(neLat),
        parseFloat(neLon),
        parseFloat(swLat),
        parseFloat(swLon),
      ),
    )
  }
  res.json(randomPoints)
})

app.listen(port, () => {
  console.log(`Point generator is listening on port ${port}`)
})
