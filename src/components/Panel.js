import React, { useState } from 'react'
import Display from './Display'
import Button from './Button'
import '../assets/panel.css'

export default function Panel() {
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
    const [firstEntry, setFirstEntry] = useState(false)

    function input(e) {
        if (e.target.innerText === '+' || e.target.innerText === '-' || e.target.innerText === '*' || e.target.innerText === '/') {
            console.log('firstEntry:', firstEntry);
            if (firstEntry) {
                if (operand !== '') {
                    setEquation(equation => [...equation, operand]);
                }
    
                setEquation(equation => [...equation, e.target.innerText]);
                setOperand('');   
                setFirstEntry(false);
            }
          
        }
        else if (e.target.innerText === '='){
            console.log('equals')
            if (equation.length !== 0) {
                let copy = [...equation];
                copy.push(operand)
                console.log('copy:',copy);
                calculate(copy);
            }
        }
        else if (e.target.innerText === 'C') {
            console.log('clear');
            setEquation([]);
            setOperand('');
            setFirstEntry(false);
        }
        else {
            setFirstEntry(true);
            console.log('firstEntry:', firstEntry);
            let number = operand;
            number += e.target.innerText;

            setOperand(number);
        }
        console.log('event:', e.target.innerText);
    }

    //all calculations done here
    function calculate(input) {
        console.log('input:',input)
        //the one element that should be left is the result of the calculation
        while (input.length !== 1) {
            //do all multiplication and division first
            if (input.includes('*') || input.includes('/')) {
                let timesLocation = undefined;
                let divideLocation = undefined;

                if (input.includes('*')) { //if there is a times op, find its index
                    timesLocation = input.indexOf('*', 0);
                }
                else { //no times ops
                    timesLocation = -1
                }

                if (input.includes('/')) { //if there is a division op, find its index
                    divideLocation = input.indexOf('/', 0);
                }
                else { //no divison ops
                    divideLocation = -1
                }

                if (divideLocation === -1) { //no division ops
                    input[timesLocation - 1] = (parseFloat(input[timesLocation - 1]) * parseFloat(input[timesLocation + 1])).toString();
                    input.splice(timesLocation, 2);
                } else if (timesLocation === -1) { //no times ops
                    input[divideLocation - 1] = (parseFloat(input[divideLocation - 1]) / parseFloat(input[divideLocation + 1])).toString();
                    input.splice(divideLocation, 2);
                } else if (timesLocation < divideLocation) { //times comes before divide
                    input[timesLocation - 1] = (parseFloat(input[timesLocation - 1]) * parseFloat(input[timesLocation + 1])).toString();
                    input.splice(timesLocation, 2);
                }
                else if (divideLocation < timesLocation) { //divide comes before times
                    input[divideLocation - 1] = (parseFloat(input[divideLocation - 1]) / parseFloat(input[divideLocation + 1])).toString();
                    input.splice(divideLocation, 2);
                }
            }
            else { //do all add and sub after
                let plusLocation = undefined;
                let minusLocation = undefined;

                if (input.includes('+')) { //if there is a plus op, find its index
                    plusLocation = input.indexOf('+', 0);
                }
                else { //no plus ops
                    plusLocation = -1
                }

                if (input.includes('-')) { //if there is a minus op, find its index
                    minusLocation = input.indexOf('-', 0);
                }
                else { //no minus ops
                    minusLocation = -1
                }

                if (minusLocation === -1) { //no minus ops
                    input[plusLocation - 1] = (parseFloat(input[plusLocation - 1]) + parseFloat(input[plusLocation + 1])).toString();
                    input.splice(plusLocation, 2)
                } else if (plusLocation === -1) { //no plus ops
                    input[minusLocation - 1] = (parseFloat(input[minusLocation - 1]) - parseFloat(input[minusLocation + 1])).toString();
                    input.splice(minusLocation, 2)
                } else if (plusLocation < minusLocation) { //plus comes before minus
                    input[plusLocation - 1] = (parseFloat(input[plusLocation - 1]) + parseFloat(input[plusLocation + 1])).toString();
                    input.splice(plusLocation, 2)
                }
                else if (minusLocation < plusLocation) { //minus comes before plus
                    input[minusLocation - 1] = (parseFloat(input[minusLocation - 1]) - parseFloat(input[minusLocation + 1])).toString();
                    input.splice(minusLocation, 2)
                }
            }
    }

        //display the result
        //setOperand(input);
        setEquation(input);
        setOperand('');
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
