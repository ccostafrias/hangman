import React from 'react'
import { Link } from 'react-router-dom'
import random from '../../utils/random'

export default function Categories() {
    const categoriesArr = ['Animals', 'Countries', 'Jobs', 'Fruits']
    const categoriesElements = categoriesArr.map((category, i) => (
        <Category
            key={i}
            category={category}
        />
    ))

    return (
        <main>
            <h1>Categories</h1>
            <ul>{categoriesElements}</ul>
        </main>
    )
}

function Category(props) {
    const { category } = props
    return (
        <li>
            <Link to={`/game?category=${category.toLowerCase()}&id=${random(99999)}`}>{category}</Link>
        </li>
    )
}