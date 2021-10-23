import { io } from 'socket.io-client'
import React, { useEffect, useState } from 'react'

const Socket = () => {
    const [socket, setsocket] = useState({})
    
    useEffect(() => {
        const socketInstance = io('http://localhost:3000', {
            transports: ['websocket', 'polling', 'flashsocket'],
            // auth: { token: "localStorage.getItem('token')" }
        })
        setsocket(socketInstance)
    }, [])

    useEffect(() => {
        if (Object.keys(socket).length !== 0) {
            socket.emit('join', "Hello form react app!!!")
            socket.on('joinNotif', (data) => {
                console.log(data)
            })

        } 
    }, [socket])

    useEffect(() => {
        if (Object.keys(socket).length !== 0) {
            socket.on('messages', function(data) {
                console.log(data);
            });
        }
    }, [socket])
    
    return (<></>)
}


export default Socket