import React, {useState} from 'react';
import axiosIntance from '../../api/axiosInstance';
import "../Register/Register.css"
// import {useNavigate} from 'react-router-dom';


const Register =() => {
    const [fullName, setFullName] = useState ('');
    const [birthday, setBirthday] = useState ('');
    const [email, setEmail] = useState ('');
    const [username, setUsername] =useState("")
    const [password, setPassword] = useState('');
    const [secondpassword, setSecondPassword] = useState('');
    const [error, setError] = useState (null);
    const [success, setSuccess] = useState(null);


    const validateEmail = (email) =>{
        const emailRegex = /^[^\s@]+@[^\s@]+ \.[^\s@]+$/;
        return emailRegex.test(email)
    }
    const handleRegisterSubmit = async(e) =>{
        e.preventDefault();
        setError(null);
        if(!username){
            setError("ユーザー名を入力してください.")
            return
        }
        if(validateEmail(email)){
            setError("有効なメールアドレスを入力してください.")
            return
        }
        if(password.length < 6 ){
            setError("パスワードは６文字以上でなければなりません.")
            return
        }
        if(password !== secondpassword){
            setError("パスワードと確認パスワードが同じではありません。")
            return
        }
        try{
            const response = await axiosIntance.post ('register/' , {fullName, birthday,email,username, password, secondpassword})
            setSuccess("登録が出来ました。")

        } catch(error){
            console.log("Error:", error);
            if(error.response && error.response.status === 400){
                console.log(error.response.data)
                if(error.response.data.usename){
                    setError("このユーザー名は既に登録されています。")
                }else if(error.response.data.email){
                    setError("このメールアドレスは既に登録されています。")
                }else{
                    setError("登録に失敗しました。もう一度お試しください。")
                }
            }else{
                setError("何かがうまくいかなかった。もう一度お試しください。")
            }
            setSuccess(null)
       }
    }
    return (
        <div className='Register'>
            <div className='logo_img'>
                <img src='./images/logo.svg' alt=''/>
            </div>
            <div className='Register_form'>
                <h2>新規登録</h2>
                <form onSubmit={handleRegisterSubmit}>
                <div className='form_input'><input
                        type='text'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder='お名前を記入してください'
                        required
                    />
                    {/* <label class="user-label">お名前を記入してください</label> */}
                </div>
                    
                    <div className='form_input'><input
                        type='date'
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        placeholder='誕生日'
                        required
                    /></div>
                    <div className='form_input'><input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='メールアドレス'
                        required
                    /></div>
                    <div className='form_input'><input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='ユーザー名'
                        required
                    /></div>
                    <div className='form_input'><input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='パスワード'
                        required
                    /></div>
                    <div className='form_input'><input
                        type='password'
                        value={secondpassword}
                        onChange={(e) => setSecondPassword(e.target.value)}
                        placeholder='確認パスワード'
                        required
                    /></div>
                    
                    <div className='form_input'><button type='submit'>登録</button></div>
                    {error && <p>{error}</p>}
                    {success && <p>{success}</p>}
                </form>
                <div className='form_input'>
                    <p>ユーザーが既に持ている方</p>
                    <button>ログイン</button>
                </div>
                <div>
                    <img src='' alt=''/>
                    <img />
                </div>
            </div>
            
            

        </div>
    )
}

export default Register