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
        <main className='category-main'>
            <h2 className='category-title'>Categories</h2>
            <ul className='categories'>{categoriesElements}</ul>
        </main>
    )
}

function Category(props) {
    const { category } = props
    return (
        <li>
            <Link className='category box' to={`/game?category=${category.toLowerCase()}`}>{category}</Link>
        </li>
    )
}