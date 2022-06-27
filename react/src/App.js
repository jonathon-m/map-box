import React, { useRef, useEffect, useState } from 'react'
import './App.css'

import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  'pk.eyJ1Ijoiam9uYXRob24tbSIsImEiOiJjbDRxb3Q1bXAwOG4xM2JsNHA2bjR3YWIzIn0.ApdUjn_j2QSMJV_kH2W6uw'

function App() {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)
  const [zoom, setZoom] = useState(9)
  const [bounds, setBounds] = useState()
  const [numPoints, setNumPoints] = useState(1)

  const [markers, setMarkers] = useState([])

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    })
  })

  useEffect(() => {
    if (!map.current) return // wait for map to initialize
    setBounds(map.current.getBounds())
    map.current.on('move', () => {
      setBounds(map.current.getBounds())
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  }, [map])

  const getNewCoords = async () => {
    for (const marker of markers) {
      marker.remove()
    }
    setMarkers([])
    const [neLon, neLat] = bounds.getNorthEast().toArray()
    const [swLon, swLat] = bounds.getSouthWest().toArray()
    const response = await fetch(
      `http://localhost:3001?n=${numPoints}&neLat=${neLat}&neLon=${neLon}&swLat=${swLat}&swLon=${swLon}`,
    )
    const result = await response.json()
    const newMarkers = []
    for (const { lat, lon } of result) {
      const marker = new mapboxgl.Marker()
        .setLngLat([lon, lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}</h3>`))
        .addTo(map.current)
      newMarkers.push(marker)
    }
    setMarkers(newMarkers)
  }

  return (
    <div className="App">
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
      <div className="toolbar">
        <button
          disabled={!map || numPoints === 1}
          className="btn"
          onClick={() => {
            setNumPoints(numPoints - 1)
          }}
        >
          -
        </button>
        <button
          disabled={!map}
          className="btn"
          onClick={() => {
            getNewCoords()
          }}
        >
          Show {numPoints} Random Locations
        </button>
        <button
          disabled={!map}
          className="btn"
          onClick={() => {
            setNumPoints(numPoints + 1)
          }}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default App
