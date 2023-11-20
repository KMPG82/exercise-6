import React, { useState } from 'react'
import Display from './Display'
import Button from './Button'
import '../assets/panel.css'

export default function Panel() {

    //let result = '';

    //calculator values
    const values = [
        '7', '8', '9', '+',
        '4', '5', '6', '-',
        '1', '2', '3', '*',
        'C', '0', '=', '/'
    ]

    //initialize buttons and their values
    let buttons = [];
    for (let i = 0; i < 16; i++){
        buttons.push(<Button input={ input } key={i} value={values[i]} />);
    }

    //for changing the display
    const [equation, setEquation] = useState([])
    const [operand, setOperand] = useState('')

    function input(e) {
        if (e.target.innerText === '+' || e.target.innerText === '-' || e.target.innerText === '*' || e.target.innerText === '/') {
            setEquation(equation => [...equation, operand]);
            setEquation(equation => [...equation, e.target.innerText]);
            setOperand('');
        }
        else if (e.target.innerText === '='){
            console.log('equals')
        }
        else if (e.target.innerText === 'C') {
            console.log('clear');
            setEquation([]);
            setOperand('');
        }
        else {
            let number = operand;
            number += e.target.innerText;

            setOperand(number);
            console.log('operand:',operand);
            //setEquation(equation => [...equation, operand]);
        }
        console.log('event:',e.target.innerText)
    }

    console.log(equation);
    console.log(operand);

    return (
        <div className='calculator'>
            <div className='displayContainer'>
                <Display equation={ equation } operand={ operand } />
            </div>
            <div className='buttonContainer'>
              {buttons}
            </div>
        </div>
  )
}
