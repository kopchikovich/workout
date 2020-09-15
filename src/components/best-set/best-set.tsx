import React from 'react'
import './best-set.css'

type propTypes = {
  set: string | null
}

const BestSet = ({ set }: propTypes) => {
  if (!set) return null
  return (
    <div className='best-set'>
      <span className="best-set__header">
        Лучший подход
      </span>
      <span className="best-set__value">
        {set || 'ещё впереди'}
      </span>
    </div>
  )
}

export default BestSet