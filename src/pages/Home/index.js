import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main>
        <ul className='menu-options'>
            <li className='title'>
              <Link to="/categories">Play</Link>
            </li>
            {/* <li>
              <Link to="/how-to-play">How to Play</Link>
            </li>
            <li>
              <Link to="/leaderboard">Leaderboard</Link>
            </li> */}
        </ul>
    </main>
  )
}