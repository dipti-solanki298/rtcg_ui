import React, { useState } from 'react';
import backgroundImage from '../assets/login_bg.jpeg';
import TextfieldComponent from '../common_components/TextfieldComponent';
import ButtonComponent from '../common_components/ButtonComponent';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', email, password);
    navigate('/home');
  };

return (
        <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="absolute inset-0 bg-white opacity-25"></div>
            <div className="relative z-10 flex items-center justify-center h-full">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
                    <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#2f42a1" }}>iCodoc</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-thin mb-2" htmlFor="email">
                            Email
                        </label>
                        <TextfieldComponent value={email} onChangeFunction={setEmail} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-thin mb-2" htmlFor="password">
                            Password
                        </label>
                        <TextfieldComponent value={password} onChangeFunction={setPassword} type='password'/>
                    </div>
                    <div className="flex items-center justify-between">
                        {/* <button
                            type="submit"
                            className="text-white font-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline" style={{ backgroundColor: '#1fbdc7' }}
                        >
                            Login
                        </button> */}
                        <ButtonComponent buttonText="Login" buttonColor="#1fbdc7" onClickFunction={handleSubmit} textColor="white"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;
