import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axiosIntance from '../../api/axiosInstance';
import "../Login/login.css"
import Register from '../Register/Register';
import Home from '../Home/Home';
const Login =() => {
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState (null);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSubmit = async(e) =>{
        e.preventDefault();
        try{
            const response = await axiosIntance.post ('login/' , {email, password})
            localStorage.setItem('refresh', response.data.refresh);
            localStorage.setItem('access', response.data.access);
            localStorage.setItem('UserId', response.data.UserId);
            
            console.log("res",response.data)
            
            const UserId = response.data.UserId
            
           
            setIsLoggedIn(true); 
            navigate('/home')
           

        } catch(error){
            console.log("Error:", error);
            if(error.response && error.response.status === 400){
                setError('メールアドレス、またパスワードが間違っています')
            }else{
                setError("ユーザーが存在していない、新規登録してね！")
            }
       }
       
    }
    useEffect(() => {
        const storedUserId = localStorage.getItem('UserId');
        if (storedUserId) {
          setIsLoggedIn(true);
        }
      }, [isLoggedIn]);
    return (
        <div>
              {isLoggedIn ? (
        <Home /> 
      ) : (
        <div className='login'>
            
        <div className='logo_img'>
            <img src='./images/logo.svg' alt=''/>
        </div>
        <div className='login-form'>
      
            <form onSubmit={handleLoginSubmit}>
                <div className='login_input'><input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='メールアドレス'
                    required
                /></div>
                <div className='login_input'><input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='パスワード'
                    required
                /></div>
                <div className='login_input'>
                    
                    <button type='submit'>Login</button>
                </div>
                {error && <p>{error}</p>}
            </form>
                
            {/* <div className='login_gg'>
                <div className='gg_icon' > 
                <img src='https://account.meta.vn/themes/default/images/gg.png' alt=''/> 
                </div>
            
                <p>login with google</p>
        </div> */}
        <div className='login_input'><p>パスワードが忘れてしましたの方</p></div>

        <div className='login_input'>
        <Link to="/register">
                    <button>
                        新規登録
                    </button>
                </Link>
        </div>
        </div>
        
        <div>
            <img src='' alt=''/>
            <img />
        </div>

    </div>
      )}
        </div>

    )
    
}

export default Login