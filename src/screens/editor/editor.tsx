import React, { useState, useEffect } from 'react'
import './editor.css'
import Selection from './selection'

const ScreenEditor = () => {
  const [ currentView, setCurrentView ] = useState(null)

  useEffect(() => {
    // @ts-ignore
    setCurrentView(<Selection setCurrentView={setCurrentView} />)
  }, [])

  return (
    <section className='editor-section'>
      {currentView}
    </section>
  )
}

export default ScreenEditor