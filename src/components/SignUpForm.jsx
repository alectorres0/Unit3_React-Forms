import {useState} from "react";



const SignUpForm = ({token, setToken}) =>{
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [error, setError] = useState(null)
const [message, setMessage] = useState(null);

async function handleSubmit(e){
    e.preventDefault();
    try{
        if (password.length < 8){
            throw new Error("password must be greater than 8 characters long")
        }
        const result = await fetch('https://fsa-jwt-practice.herokuapp.com/signup',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await result.json();
        setToken(data.token);
        setMessage(data.message);
    }catch (error){
        setError(error.message);
    }
}
    return (
        <>
        <h2>Sign Up</h2>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
        <form id = "form" onSubmit = {handleSubmit}>
            <label>
                Username:
                <input value = {username} onChange = {(e)=> {setUsername(e.target.value)}}>
                </input>
            </label>
            <label>Password:
                <input id = "pwInput" value = {password} onChange = {(e) => {setPassword(e.target.value)}}>
                </input>
            </label>

        <button>Submit</button>
        </form>
        </>
    )
}

export default SignUpForm;