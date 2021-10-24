import { io } from 'socket.io-client'
import React, { useEffect, useState } from 'react'

const Socket = () => {
    const [socket, setsocket] = useState({})
    
    // Initiate Socket Connection
    useEffect(() => {
        const socketInstance = io('http://localhost:3000', {
            transports: ['websocket', 'polling', 'flashsocket'],
            // auth: { token: "localStorage.getItem('token')" }
        })
        setsocket(socketInstance)
    }, [])

    // Revert to polling on connection error or log if connection established
    useEffect(() => {
        if (Object.keys(socket).length !== 0) {
            // Handle Connection Success
            socket.on("connect", (something) => {
                socket.emit('join', "Hello form react app!!!", socket.id)
            });

            // Handle Connection Failure
            socket.on("connect_error", () => {
                // revert to classic upgrade
                socket.io.opts.transports = ['polling', 'websocket', 'flashsocket'];
            });

        } 
    }, [socket])

    // After Connection Events
    useEffect(() => {
        if (Object.keys(socket).length !== 0) {
            
            socket.on("joinNotification", (message, userSocketId) => {
                console.log(message, "MyID", socket.id)
                socket.emit('privateMessage', userSocketId, `Hi this is a private message from ${socket.id}`, {hisId: userSocketId, myId:socket.id})
            });

            socket.on('privateMessage', (fromSocket, msg) => {
                console.log({fromSocket, msg})
            })
        } 
    }, [socket])
    
    return (<></>)
}


export default Socket