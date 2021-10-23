import logo from './logo.svg';
import './App.css';
import Socket from './Socket'
import axios from 'axios'
import React, {useEffect, useState} from 'react'



function App() {
  const [data, setdata] = useState({})
  const handleApiCall = async () => {
    try {
      const {data} = await axios.get('http://localhost:3000/v1/')
      return setdata(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    handleApiCall()
  }, [])
  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <div className="App">
       <Socket />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
