# 🏃 TrailHub

Application React pour réaliser facilement différents calculs concernant la course à pied et le trail.

## Fonctionnalités

### 🔄 Conversion Allure / Vitesse
- Convertir une allure (min/km) en vitesse (km/h) et réciproquement
- Conversion en temps réel lors de la saisie

### ⏱️ Calcul des Temps de Passage
- Calculer le temps de passage pour une distance et une allure données
- Option pour prendre en compte le dénivelé positif
- Formule basée sur la règle de Naismith modifiée (compensation d'environ 1 minute par 10m de dénivelé)

## Installation

```bash
npm install
```

### ⚠️ Important : Projet dans Dropbox

Si ce projet est synchronisé avec Dropbox, **excluez le dossier `node_modules` de la synchronisation** pour éviter les erreurs `EBUSY` :

1. Ouvrez l'application Dropbox
2. Allez dans **Paramètres** → **Synchronisation** → **Sélectivité**
3. Cliquez sur **Choisir les dossiers** pour ce projet
4. **Décochez** le dossier `node_modules`

**Pourquoi ?** Dropbox verrouille les fichiers pendant la synchronisation, ce qui cause des erreurs lors de l'installation des dépendances et du fonctionnement de Vite.

## Développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## Build

```bash
npm run build
```

## Technologies

- React 18
- Vite
- CSS3 (design moderne avec dégradés)

