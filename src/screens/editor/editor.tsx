import React, { useState, useEffect } from 'react'
import './editor.css'
import Selection from './selection'

const ScreenEditor = (props) => {
  const [ currentView, setCurrentView ] = useState(null)

  useEffect(() => {
    setCurrentView((
      <Selection
        setCurrentView={setCurrentView}
        switchScreen={props.switchScreen}
      />
    ))
  }, [props.switchScreen])

  return (
    <section className='editor-section'>
      {currentView}
    </section>
  )
}

export default ScreenEditor