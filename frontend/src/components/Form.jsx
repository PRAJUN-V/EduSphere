import React from 'react'
import { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFREST_TOKEN } from '../constants'

export const Form = ({ route, method }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFREST_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return <form onSubmit={handleSubmit} className='max-w-md mx-auto p-8 bg-white shadow-md rounded-lg'>
        <h1 className='text-2xl font-bold mb-6 text-center'>{name}</h1>

        <input
            className='form-input w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
        />

        <input
            className='form-input w-full mb-6 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
        />

        <button className='form-button w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300' type='submit'>
            {name}
        </button>
    </form>
}
