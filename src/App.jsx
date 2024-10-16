import React from 'react'
import Weather from './components/Weather'
import '@fontsource/poppins/400.css'; // Regular weight
import '@fontsource/poppins/600.css'; // Semi-bold weight (optional)


const App = () => {
  return (
    <div className="min-h-screen font-poppins  grid bg-[#e2d4ff]">
      <Weather />
    </div>
  )
}

export default App
