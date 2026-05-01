import { useState } from 'react'
import MenuOpciones from '../pages/MenuOpciones.jsx'

function App() {
  const [activeItem, setActiveItem] = useState('dashboard')

  return (
    <MenuOpciones
      activeItem={activeItem}
      onNavigate={setActiveItem}
    />
  )
}

export default App
