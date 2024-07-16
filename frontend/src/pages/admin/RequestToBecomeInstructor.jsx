import React from 'react'
import { SideBar } from './common/SideBar'
import Header from '../instructor/common/Header'

export const RequestToBecomeInstructor = () => {
    return (
        <div className="flex">
            <SideBar />
            <div className="flex-grow flex flex-col">
                <Header />
                {/* Other content */}
            </div>
        </div>
    )
}
