import React from "react"
import { 
    RouterProvider,
    createHashRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom"

import Home from "../pages/Home"
import Categories from "../pages/Categories"
import Game from "../pages/Game"

const router = createHashRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<Home/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/game" element={<Game />}/>
        <Route path="*" element={<Home/>}/>
    </>
))

export default function RoutesApp() {
    return (
        <RouterProvider 
            router={router}
        />
    )
}