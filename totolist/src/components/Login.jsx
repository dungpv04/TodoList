import React, { useState } from 'react';
import axios from 'axios';
import SemesterInfo from './SemesterInfo';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [personId, setPersonId] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestBody = {
            client_id: "education_client",
            grant_type: "password",
            username: username,
            password: password,
            client_secret: "password"
        };

        try {
            const response = await axios.post('https://sinhvien1.tlu.edu.vn/education/oauth/token', requestBody);
            const token = response.data.access_token;
            setAccessToken(token);

            // Use the token to authorize the next request
            const userResponse = await axios.get('https://sinhvien1.tlu.edu.vn/education/api/users/getCurrentUser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const personId = userResponse.data.person.id;
            setPersonId(personId);
            setIsLoggedIn(true);

            console.log("Access Token:", token);
            console.log("Person ID:", personId);
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please check your username and password.");
        }
    };

    if (isLoggedIn) {
        return <SemesterInfo accessToken={accessToken} />;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                <button type="submit" style={{ padding: '10px', fontSize: '16px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>Login</button>
            </form>
        </div>
    );
}

export default Login;