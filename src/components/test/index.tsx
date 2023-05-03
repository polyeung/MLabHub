import React, { useEffect, useState } from 'react';
interface UserData {
	username: string;
}
export default function test() { 
    const [data, setUserData] = useState<UserData>({ username: 'not set' });
    useEffect(() => {
		fetch('http://localhost:8000/api/account/', {credentials: 'include'}).then(res => {
			if (res.ok) {
				res.json().then(data => setUserData(data));
			} 
		});
	}, []);
    return (<div>test page <div>Log in as </div> <b>{ data.username }</b></div>);
};