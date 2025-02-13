import './styles.css'
import '../../styles/game.css'
import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from '../../contexts/GameContext';
import { actions } from '../../contexts/GameContext/actions';
import { SearchGrid } from '../SearchGrid';

const words = ["REACT", "JOGO", "CAÇA", "PALAVRA", "MATRIZ"];
const size = 10;

const generateGrid = (size, words) => {
    const grid = Array.from({ length: size }, () => Array(size).fill(""));
  
    const directions = [
      [0, 1], // Direita
      [1, 0], // Para baixo
      [1, 1], // Diagonal para baixo-direita
      [-1, 1], // Diagonal para cima-direita
    ];
  
    const isValidPlacement = (word, row, col, dir) => {
      const [dx, dy] = dir;
      for (let i = 0; i < word.length; i++) {
        const x = row + i * dx;
        const y = col + i * dy;
        if (x < 0 || x >= size || y < 0 || y >= size || grid[x][y]) return false;
      }
      return true;
    };
  
    words.forEach((word) => {
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);
        const dir = directions[Math.floor(Math.random() * directions.length)];
  
        if (isValidPlacement(word, row, col, dir)) {
          for (let i = 0; i < word.length; i++) {
            const x = row + i * dir[0];
            const y = col + i * dir[1];
            grid[x][y] = word[i];
          }
          placed = true;
        }
      }
    });
  
    // Preenche espaços vazios com letras aleatórias
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (!grid[i][j]) grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  
    return grid;
};

export const Search = () => {
    const [grid] = useState(generateGrid(size, words));
    const [selectedLetters, setSelectedLetters] = useState([]);
    const wordDirection = useRef(null)
    const { dispatchState } = useContext(Context)

    useEffect(() => {
      if (words.length === 0) {
        alert("Parabéns! Você ganhou o jogo")

        dispatchState({type: actions.FINISH, payload: "Search"})
        dispatchState({type: actions.QUIT})

      }

    })

    const handleClick = (e, row, col) => {        
        const founded = selectedLetters.find(obj => (obj.row === row) && (obj.col === col))
        
        if (founded) {
            e.target.style.background = 'none'
            selectedLetters.splice(selectedLetters.indexOf(founded), 1)
            return
        }
        
        if (selectedLetters.length < 2) {
          wordDirection.current = null
        }

        if (!checkDirection(row, col)) {
          return
        }

        e.target.style.background = '#D3AD69'

        const newSelection = [...selectedLetters, { row, col, letter: grid[row][col] }];
        setSelectedLetters(newSelection);
    
    };

    const checkDirection = (row, col) => {
      if (selectedLetters.length === 0) return true
      const directions = [
        // Row / col
        [0, 1], // Direita
        [1, 0], // Para baixo
        [1, 1], // Diagonal para baixo-direita
        [-1, 1], // Diagonal para cima-direita
      ]

      const latest = selectedLetters[selectedLetters.length - 1]

      const rowDif = row - latest.row
      const colDif = col - latest.col

      const direction = directions.filter(coord => (coord[0] === rowDif) && (coord[1] === colDif))

      if (!direction) return false
      if (!wordDirection.current) {
        wordDirection.current = direction[0]
      }

      if (Math.abs(rowDif) > 1 || Math.abs(colDif) > 1) return false

      if (JSON.stringify(direction[0]) !== JSON.stringify(wordDirection.current)) return false  // Checar se está na linha correta
      else return true
    }
  
    const checkWord = () => {
        const selectedWord = selectedLetters.map(sel => sel.letter);
        const incorrectArray = []
        const correctArray = []

        
        for (let word of words) {
            if (word.length !== selectedWord.length) continue;

            const wordArray = word.split("")
            wordArray.map((letter) => { 
                if (!selectedWord.includes(letter)) {
                  incorrectArray.push(letter)
                }
                else {
                  correctArray.push(letter)
                }

                return letter
            })
        }

        const didWin = (correctArray.join("") === selectedWord.join("")) ? true : (incorrectArray.length > 0) ? false : (correctArray.length === 0) ? false : true
        const color = didWin ? '#3aa394' : '#C97C7C'

        if (didWin) {
          words.splice(words.indexOf(correctArray.join("")), 1)
        }

        for (let letter of selectedLetters) {
          document.getElementById(`${letter.row}-${letter.col}`).style.background = color
        }

        setSelectedLetters([])
        wordDirection.current = null
        return; 
    };
  
    return (
      <div className='game-container' style={{ marginTop: '-80px' }}>
        <h3>Caça-Palavras</h3>

        <SearchGrid grid={grid} handleClick={handleClick}/>

        <button className='confirm-button' onClick={checkWord}>Confirmar</button>

        <h4>Palavras para encontrar:</h4>
          {words.map((word) => (
            <p key={word} style={{ marginBottom: '3px' }}>{word}</p>
          ))}
      </div>
    );
};

