import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters'
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';

import {showNotification as show} from './helpers/helpers';

import './App.css';

const words = ['naruto','aot', 'erased','orange','demonslayer','akame','hxh','hotarobi','yourname','dathnote','boruto'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {

  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setwrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [ ...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setwrongLetters(currentLetters => [ ...wrongLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  //play Again

  function playAgain() {
    setPlayable(true);

    setCorrectLetters([]);
    setwrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  // components

  return (
    <>
      <Header />
      <div className="game-container">
       <Figure wrongLetters={wrongLetters} />
       <WrongLetters wrongLetters={wrongLetters} />
       <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain}/>
      <Notification showNotification={showNotification} />
      
    </>
  );
}

export default App;