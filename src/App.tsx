import { useEffect, useState } from 'react';
import logo from './autofan.png';
import { app } from './lib/firebase';

import './App.css';
import { ChromeMessage, Sender } from './types';

const App = () => {
	const [url, setUrl] = useState<string>('');
	const [responseFromContent, setResponseFromContent] = useState<string>('');
	const [expiredFollowers, setExpiredFollowers] = useState<string>('');
	/**
	 * Get current URL
	 */
	useEffect(() => {
		const queryInfo = { active: true, lastFocusedWindow: true };

		chrome.tabs &&
			chrome.tabs.query(queryInfo, (tabs) => {
				const url = tabs[0]?.url;
				setUrl(url!);
			});
	}, []);

	useEffect(() => {
		if (url === 'https://onlyfans.com/my/collections/user-lists/subscriptions/expired') {
			getExpiredFollowerCount();
		}
	}, [url])

	const getExpiredFollowerCount = () => {
		const message: ChromeMessage = {
			from: Sender.React,
			message: 'get expired follower count',
		};

		const queryInfo: chrome.tabs.QueryInfo = {
			active: true,
			currentWindow: true,
		};

		chrome.tabs &&
			chrome.tabs.query(queryInfo, (tabs) => {
				const currentTabId = tabs[0].id;
				chrome.tabs.sendMessage(currentTabId!, message, (response) => {
					console.log('res', response)
					setExpiredFollowers(response);
				});
			});
	};

	const followExpiredFans = () => {
		const message: ChromeMessage = {
			from: Sender.React,
			message: 'auto follow',
		};

		const queryInfo: chrome.tabs.QueryInfo = {
			active: true,
			currentWindow: true,
		};

		chrome.tabs &&
			chrome.tabs.query(queryInfo, (tabs) => {
				const currentTabId = tabs[0].id;
				chrome.tabs.sendMessage(currentTabId!, message, (response) => {
					setResponseFromContent(response);
				});
			});
	};

	return (
		<div className='App' >
			<header className='App-header' style={{ padding: '1em' }} >
				<img src={logo} className='App-logo' alt='logo' />
				<p> url: {url} </p>
				<p> Currently have {expiredFollowers} expired followers</p>
				<button onClick={getExpiredFollowerCount}>get expired count</button>
				<button onClick={followExpiredFans} style={{ marginTop: '1em' }} >Follow all expired fans</button>
			</header>
		</div>
	);
};

export default App;
