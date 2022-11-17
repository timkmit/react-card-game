import { useEffect, useState } from 'react';
import './App.css';
import pathIconCard1 from './icon/1.jpg'
import pathIconCard2 from './icon/2.jpg'
import pathIconCard3 from './icon/3.jpg'
import pathIconCard4 from './icon/4.jpg'
import pathIconCard5 from './icon/5.jpg'
import pathIconCard6 from './icon/6.jpg'
import pathIconCard7 from './icon/7.jpg'
import pathIconCard8 from './icon/8.jpg'
import pathIconCard9 from './icon/9.jpg'
import pathIconCardq from './icon/q.jpg'

const initialArrayCards = [
  {id:1, img: pathIconCard1},
  {id:2, img: pathIconCard2},
  {id:3, img: pathIconCard3},
  {id:4, img: pathIconCard4},
  {id:5, img: pathIconCard5},
  {id:6, img: pathIconCard6},
  {id:7, img: pathIconCard7},
  {id:8, img: pathIconCard8},
  {id:9, img: pathIconCard9},
]

const pairOfArraysCards = [...initialArrayCards, ...initialArrayCards]

const App = () => {

const [arrayCards, setArrayCards] = useState([])
const [openCards, setOpenCards] = useState([])
const [matched, setMatched] = useState([])
const [moves, setMoves] = useState([])



const rando  = (array) => {
  let currentIndex  = array.length,
  temporaryValue,
  randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

useEffect(() =>{
  setArrayCards(rando(pairOfArraysCards))
}, [])

const flipCard = (index) => () => {
  setOpenCards(opened =>[...opened, index])
  setMoves(prevMove => prevMove+1)
}
useEffect(() => {
  if(openCards < 2) return
  const firstMatched = arrayCards[openCards[0]]
  const secondMatched  = arrayCards[openCards[1]]

  if(secondMatched && firstMatched.id === secondMatched.id) {
    setMatched([...matched, firstMatched.id])
  }

  if(openCards.length === 2) setTimeout(() => setOpenCards([]), 1000)
})
const handleGameRestart = () => {
  setOpenCards([])
  setMatched([])
  setMoves(0)
  setArrayCards(rando(pairOfArraysCards))
}

return (
    <div className="container">
      
      <p className='number-of-str'>Сделано ходов: {moves}</p>
      
      <div className='cards'>
        {arrayCards.map((item, index) => {
          let isFlipped = false

          if(openCards.includes(index)) isFlipped = true
          if(matched.includes(item.id)) isFlipped = true

          return (
            <div key={index} className={`card ${isFlipped ? 'flipped' : ''}`} onClick={flipCard(index)}>
              <div className='inner'>
                <div className='front'>
                  <img src={item.img} width="100" alt="front-card"/>
                </div>
                <div className='back'>
                  <img src={pathIconCardq} width="100" alt="q card"/>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <button className='button-restart' onClick={handleGameRestart}>Restart</button>
    </div>
  );
}

export default App;
