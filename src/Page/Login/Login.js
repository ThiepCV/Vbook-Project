import React, {useState} from 'react';
// import {useNavigate} from 'react-router-dom';
import axiosIntance from '../../api/axiosInstance';

const Login =() => {
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState (null);
    // const navigate = useNavigate();

    const handleLoginSubmit = async(e) =>{
        e.preventDefault();
        try{
            const response = await axiosIntance.post ('login/' , {email, password})
            localStorage.setItem('refresh', response.data.refresh);
            localStorage.setItem('access', response.data.access);
            console.log("res",response.data)
            alert("thanh cong")
        } catch(error){
            console.log("Error:", error);
            if(error.response && error.response.status === 400){
                setError('メールアドレス、またパスワードが間違っています')
            }else{
                setError("ユーザーが存在していない、新規登録してね！")
            }
       }
    }
    return (
        <div>
            <div>
                <img src='./images/logo.svg' alt=''/>
            </div>
            <div>
                <form onSubmit={handleLoginSubmit}>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='メールアドレス'
                        required
                    />
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='パスワード'
                        required
                    />
                    <p>パスワードが忘れてしましたの方</p>
                    <button type='submit'>Login</button>
                    {error && <p>{error}</p>}
                </form>
            </div>
            <div>
                <img src='' alt=''/>
                <p>login with google</p>
            </div>
            <div>
                <button>新規登録</button>
            </div>
            <div>
                <img src='' alt=''/>
                <img />
            </div>

        </div>
    )
}

export default Login