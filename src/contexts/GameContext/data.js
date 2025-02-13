import { AiOutlineCalendar, AiOutlineSearch } from 'react-icons/ai'
import { FaPuzzlePiece, FaRegQuestionCircle, FaPenAlt } from 'react-icons/fa'
import { Hangman } from '../../components/Hangman'
import { Memory } from '../../components/Memory'
import { Quiz } from '../../components/Quiz'
import { Search } from '../../components/Search'
import { Word } from '../../components/Word'

export const gameData = {
    games: [
        {name: "Hangman", icon: <FaPenAlt />, game: <Hangman />, finished: false},
        {name: "Quiz", icon: <FaRegQuestionCircle />, game: <Quiz />,finished: false},
        {name: "Search", icon: <AiOutlineSearch />, game: <Search />,finished: false },
        {name: "Memory", icon: <FaPuzzlePiece/>, game: <Memory />, finished: false},
        {name: "Word", icon: <AiOutlineCalendar/>, game: <Word />, finished: false},
    ],
    gameSelected: '',
}