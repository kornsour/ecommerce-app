// Need to use hooks to track state
import { useState } from 'react';
import axios from 'axios';
import useRequest from '../../hooks/use-request';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: 'api/users/signup',
        method: 'post',
        body: {
            email, password
        }
    });

    const onSubmit = async event => {
        event.preventDefault();

        doRequest();
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>Email Address</label>
                {/* Abbreviating event argument to "e"  */}
                <input value={email} onChange={e => setEmail(e.target.value)}
                className="form-contorl" />
            </div>
            <div className="form-group">
                <label>Password</label>
                {/* type obfuscates the password */}
                <input value={password} onChange={e => setPassword(e.target.value)}
                type="password" 
                className="form-contorl"
                />
            </div>
            {errors}
            <button className="btn btn-primary">Sign Up</button>
        </form>
    );
};