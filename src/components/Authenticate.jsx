import {useState} from "react";

const Authenticate = ({token, setToken}) =>{
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    async function getAuthentication(e){
        e.preventDefault()
       
        try{
            if (token === null){
                throw new Error("please sign up before authenticating")
            }
            const result = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate',
        { 
            method: "GET", 
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}` 
            }
          })

          const data = await result.json();
          console.log(data);
          setMessage(`${data.message} Welcome ${data.data.username}!`);
        } catch(error){
            setError(error.message);
        }
    }
    return (
        <>
        <h2>Authenticate</h2>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
        <button onClick ={getAuthentication}>Authenticate Token</button>
        
        </>
        
    )
}

export default Authenticate;