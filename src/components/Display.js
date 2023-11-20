import React from 'react'
//import '../assets/display.css'

export default function Display(props) {
  return (
    <div className='display'>
      <div className='equation'>{props.equation}</div>
      <div className='operand'>{props.operand}</div>
    </div>
  )
}
