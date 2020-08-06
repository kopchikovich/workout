import React, { useState, useEffect } from 'react'
import './editor.css'
import Selection from './selection'

type propsTypes = {
  switchScreen: any
}

const ScreenEditor = (props: propsTypes) => {
  const [ currentView, setCurrentView ] = useState(null)

  useEffect(() => {
    // @ts-ignore
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