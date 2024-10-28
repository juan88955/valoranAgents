import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setToastMessage } from '../store/slices/teamSlice'

function Toast() {
    const dispatch = useDispatch()
    const message = useSelector(state => state.team.toastMessage)

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                dispatch(setToastMessage(''))
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [message, dispatch])

    if (!message) return null

    return (
        <div className="fixed bottom-4 right-4 bg-yellow-500 text-black px-6 py-3 rounded-md shadow-lg animate-fade-in-out">
            {message}
        </div>
    )
}

export default Toast