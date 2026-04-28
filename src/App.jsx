import { useState } from 'react'
import MenuOpciones from './components/MenuOpciones.jsx'

function App() {
  const [activeItem, setActiveItem] = useState('semestres')

  return (
    <MenuOpciones
      activeItem={activeItem}
      onNavigate={setActiveItem}
    />
  )
}

export default App
