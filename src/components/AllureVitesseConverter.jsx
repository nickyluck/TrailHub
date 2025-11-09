import React, { useState } from 'react'
import { allureToVitesse, vitesseToAllure, formatAllure } from '../utils/calculations'
import './Card.css'

function AllureVitesseConverter() {
  const [allureMin, setAllureMin] = useState(5)
  const [allureSec, setAllureSec] = useState(0)
  const [vitesse, setVitesse] = useState(12)

  const handleAllureChange = (min, sec) => {
    setAllureMin(min)
    setAllureSec(sec)
    const newVitesse = allureToVitesse(min, sec)
    setVitesse(Math.round(newVitesse * 100) / 100)
  }

  const handleVitesseChange = (newVitesse) => {
    setVitesse(newVitesse)
    const allure = vitesseToAllure(newVitesse)
    setAllureMin(allure.minutes)
    setAllureSec(allure.secondes)
  }

  return (
    <div className="card">
      <h2>🔄 Conversion Allure / Vitesse</h2>
      
      <div className="converter-section">
        <div className="input-group">
          <label>Allure (min/km)</label>
          <div className="allure-inputs">
            <input
              type="number"
              min="0"
              max="59"
              value={allureMin}
              onChange={(e) => handleAllureChange(parseInt(e.target.value) || 0, allureSec)}
              className="number-input"
            />
            <span>:</span>
            <input
              type="number"
              min="0"
              max="59"
              value={allureSec}
              onChange={(e) => handleAllureChange(allureMin, parseInt(e.target.value) || 0)}
              className="number-input"
            />
          </div>
          <div className="result-display">
            Allure: <strong>{formatAllure(allureMin, allureSec)}</strong> min/km
          </div>
        </div>

        <div className="separator">⇄</div>

        <div className="input-group">
          <label>Vitesse (km/h)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={vitesse}
            onChange={(e) => handleVitesseChange(parseFloat(e.target.value) || 0)}
            className="number-input large"
          />
          <div className="result-display">
            Vitesse: <strong>{vitesse.toFixed(2)}</strong> km/h
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllureVitesseConverter

