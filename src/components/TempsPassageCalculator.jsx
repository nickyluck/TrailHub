import React, { useState, useMemo } from 'react'
import { calculerTempsPassage, genererTableauTempsPassage, formatTemps } from '../utils/calculations'
import './Card.css'

function TempsPassageCalculator() {
  const [distance, setDistance] = useState(42.195) // Marathon par défaut
  const [allureMin, setAllureMin] = useState(5)
  const [allureSec, setAllureSec] = useState(0)
  const [intervalle, setIntervalle] = useState(5) // Intervalle par défaut : 5km

  const temps = calculerTempsPassage(distance, allureMin, allureSec)
  
  const tableauTempsPassage = useMemo(() => {
    if (distance <= 0 || intervalle <= 0) return []
    return genererTableauTempsPassage(distance, intervalle, allureMin, allureSec)
  }, [distance, intervalle, allureMin, allureSec])

  return (
    <div className="card">
      <h2>⏱️ Calcul des Temps de Passage</h2>
      
      <div className="calculator-section">
        <div className="input-group">
          <label>Distance (km)</label>
          <div className="distance-input-container">
            <input
              type="number"
              min="0"
              step="0.1"
              value={distance}
              onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
              className="number-input large"
            />
            <div className="distance-buttons">
              <button
                type="button"
                onClick={() => setDistance(21.0975)}
                className="distance-btn"
                title="Semi-marathon (21.0975 km)"
              >
                Semi
              </button>
              <button
                type="button"
                onClick={() => setDistance(42.195)}
                className="distance-btn"
                title="Marathon (42.195 km)"
              >
                Marathon
              </button>
            </div>
          </div>
        </div>

        <div className="input-group">
          <label>Allure (min/km)</label>
          <div className="allure-inputs">
            <input
              type="number"
              min="0"
              max="59"
              value={allureMin}
              onChange={(e) => setAllureMin(parseInt(e.target.value) || 0)}
              className="number-input"
            />
            <span>:</span>
            <input
              type="number"
              min="0"
              max="59"
              value={allureSec}
              onChange={(e) => setAllureSec(parseInt(e.target.value) || 0)}
              className="number-input"
            />
          </div>
        </div>

        <div className="input-group">
          <label>Intervalle pour le tableau (km)</label>
          <input
            type="number"
            min="0.1"
            step="0.1"
            value={intervalle}
            onChange={(e) => setIntervalle(parseFloat(e.target.value) || 1)}
            className="number-input large"
          />
          <div className="input-hint">
            Ex: 5 pour afficher les temps tous les 5km
          </div>
        </div>

        <div className="result-box">
          <div className="result-label">Temps total</div>
          <div className="result-value">
            {formatTemps(temps.heures, temps.minutes, temps.secondes)}
          </div>
        </div>

        {tableauTempsPassage.length > 0 && (
          <div className="tableau-section">
            <h3>Temps de passage</h3>
            <div className="tableau-container">
              <table className="temps-table">
                <thead>
                  <tr>
                    <th>Distance (km)</th>
                    <th>Temps de passage</th>
                  </tr>
                </thead>
                <tbody>
                  {tableauTempsPassage.map((item, index) => (
                    <tr key={index} className={item.distance === distance ? 'highlight-row' : ''}>
                      <td>{item.distance.toFixed(1)}</td>
                      <td>{formatTemps(item.temps.heures, item.temps.minutes, item.temps.secondes)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TempsPassageCalculator

