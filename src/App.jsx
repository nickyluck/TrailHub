import React from 'react'
import AllureVitesseConverter from './components/AllureVitesseConverter'
import TempsPassageCalculator from './components/TempsPassageCalculator'
import './App.css'

function App() {
  console.log('App component rendering...')
  
  try {
    return (
      <div className="app">
        <header className="app-header">
          <h1>🏃 TrailHub</h1>
          <p>Calculs pour la course à pied</p>
        </header>
        
        <main className="app-main">
          <AllureVitesseConverter />
          <TempsPassageCalculator />
        </main>
      </div>
    )
  } catch (error) {
    console.error('Error in App:', error)
    return (
      <div style={{ padding: '20px', color: 'red', background: 'white' }}>
        <h2>Erreur dans l'application</h2>
        <pre>{error.toString()}</pre>
      </div>
    )
  }
}

export default App

