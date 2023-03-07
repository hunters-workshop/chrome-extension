import { ChromeMessage, Sender } from '../types';

const messagesFromReactAppListener = (message: ChromeMessage, sender: any, response: any) => {
	console.log('[content.js]. Message received', {
		message,
		sender,
	});

	if (sender.id === chrome.runtime.id && message.from === Sender.React && message.message === 'Hello from React') {
		response('Hello from content.js');
	}

	function getExpiredFollowers() {
		console.log('made it in')
		const expiredFollowers = document.getElementsByClassName('m-rounded m-flex m-space-between m-lg g-btn');
		console.log(Array.from(expiredFollowers), 'array');
		console.log(expiredFollowers, 'exf')
		return Array.from(expiredFollowers);
	}



	if (sender.id === chrome.runtime.id && message.from === Sender.React && message.message === 'delete logo') {
		const followers = getExpiredFollowers();
		//@ts-ignore
		followers.forEach(follower => follower.click())
	}
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
