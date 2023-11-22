import React from 'react'
//import '../assets/button.css'

export default function Button(props) {
  return (
      <button className='calculatorButton' onClick={props.input}>{props.value}</button>
  )
}
