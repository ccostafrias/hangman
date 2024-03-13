import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'
import './services/i18next'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Suspense fallback="Loading...">
        <App/>
    </Suspense>
)