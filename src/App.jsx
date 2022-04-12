import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import Input from './components/Input';

export default function App() {

    const blankForm = { username: '', password: '' }
    const [userR, setUserR] = useState(blankForm);
    const [userL, setUserL] = useState(blankForm);
    const [registerResponse, setRegisterResponse] = useState('');
    const [loginResponse, setLoginResponse] = useState('');

    const register = async (e) => {
        e.preventDefault();

    setRegisterResponse("")
    setLoginResponse("")
    
        fetch('http://localhost:4000/register', {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(userR),
})
.then(response => response.json())
.then(data => {
  setRegisterResponse(data.message);
  setUserR(blankForm)
})
.catch((error) => {
  console.log("Error")
});

    };

    const login = async (e) => {
        e.preventDefault();

        setRegisterResponse("")
        setLoginResponse("")

        fetch('http://localhost:4000/login', {
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(userL),
})
.then(response => response.json())
.then(data => {
if(data.data) {
  setLoginResponse(data.data);
  localStorage.setItem("token", data.data)
  const token = localStorage.getItem('token');
  console.log(token)
}
else{
    setLoginResponse("Invalid Username or Password")
}
  setUserL(blankForm)
})
.catch((error) => {
  console.log("Error")
});
        
    };






    // You can safely ignore everything below this line, it's just boilerplate
    // so you can focus on the exercise requirements

    const handleChangeR = (e) => {
        const { value, name } = e.target;

        setUserR({
            ...userR,
            [name]: value
        });
    }

    const handleChangeL = (e) => {
        const { value, name } = e.target;

        setUserL({
            ...userL,
            [name]: value
        });
    }

    return (
        <div className="App">

            <h1>Register</h1>

            <Form
                handleSubmit={register}
                inputs={[
                    <Input
                        key={1}
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={userR.username}
                        handleChange={handleChangeR}
                    />,
                    <Input
                        key={2}
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={userR.password}
                        handleChange={handleChangeR}
                    />
                ]}
            />

            {registerResponse && <p>{registerResponse}</p>}

            <h1>Login</h1>

            <Form
                handleSubmit={login}
                inputs={[
                    <Input
                        key={1}
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={userL.username}
                        handleChange={handleChangeL}
                    />,
                    <Input
                        key={2}
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={userL.password}
                        handleChange={handleChangeL}
                    />
                ]}
            />

            {loginResponse && <p>{loginResponse}</p>}

        </div>
    );
}
