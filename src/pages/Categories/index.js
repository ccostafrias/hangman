import React from 'react'
import { Link } from 'react-router-dom'
import random from '../../utils/random'
import { useTranslation } from 'react-i18next'

export default function Categories() {
    const categoriesArr = ['Animals', 'Countries', 'Jobs', 'Fruits']
    const categoriesElements = categoriesArr.map((category, i) => (
        <Category
            key={i}
            category={category}
        />
    ))

    const { t } = useTranslation()
    
    return (
        <main className='category-main'>
            <h2 className='category-title'>{t('categories')}</h2>
            <ul className='categories'>{categoriesElements}</ul>
        </main>
    )
}

function Category(props) {
    const { category } = props
    const { t } = useTranslation()
    return (
        <li>
            <Link className='category box' to={`/game?category=${category.toLowerCase()}`}>{t(category.toLowerCase())}</Link>
        </li>
    )
}