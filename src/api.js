import { get, onValue, push, ref, set } from "firebase/database";
import { firebaseDataBase } from "./firebase";


export function getCourseList() {
	const coursesRef = ref(firebaseDataBase, 'courses/');
	onValue(coursesRef, (snapshot) => {
			const data = snapshot.val();
			console.log(data);
		});
}

export async function registerNewUser({ username, password }) {
	const usersRef = ref(firebaseDataBase, 'users/');

	const snapshot = await get(usersRef);
	if (snapshot.exists() === true)
	{
		const userList = snapshot.val();
		let isUsernameUsed = false;

		for (let userKey in userList)
		{
			if (userList[userKey]['username'] === username)
			{
				console.warn(" - ERROR: This username is already used");
				isUsernameUsed = true;
				break;
			}
		}

		if (isUsernameUsed === false)
		{
			const newKey = push(usersRef).key;

			set(ref(firebaseDataBase, ('users/' + newKey)), {
					username: username,
					password: password
				});
		}
	}
	else
	{
		console.error(" - ERROR: users/ data cannot be found on server");

		return null;
	}
}

export async function updateUsername({ userKey, newUsername }) {
	const usersRef = ref(firebaseDataBase, 'users/');

	const snapshot = await get(usersRef);
	if (snapshot.exists() === true)
	{
		const userList = snapshot.val();
		let isUsernameUsed = false;

		for (let userKey in userList)
		{
			if (userList[userKey]['username'] === newUsername)
			{
				console.warn(" - ERROR: This username is already used");
				isUsernameUsed = true;
				break;
			}
		}

		if (isUsernameUsed === false)
		{
			const userRef = ref(firebaseDataBase, 'users/' + userKey);

			const snapshot = await get(userRef);
			if (snapshot.exists() === true)
			{
				const currUserData = snapshot.val();
			
				await set(userRef, {
						username: newUsername,
						password: currUserData.password
					});
				
				return true;
			}
			else
			{
				console.error(" - ERROR: current user was not found on server");
			}
		}
	}
	else
	{
		console.error(" - ERROR: users/ data cannot be found on server");
	}

	return false;
}

export async function updatePassword({ userKey, newPassword }) {
	const userRef = ref(firebaseDataBase, 'users/' + userKey);

	const snapshot = await get(userRef);
	if (snapshot.exists() === true)
	{
		const currUserData = snapshot.val();
	
		await set(userRef, {
				username: currUserData.username,
				password: newPassword
			});
		
		return true;
	}
	else
	{
		console.error(" - ERROR: current user was not found on server");

		return false;
	}
}

export async function logIn({ username, password }) {
	const usersRef = ref(firebaseDataBase, 'users/');

	const snapshot = await get(usersRef);
	if (snapshot.exists() === true)
	{
		let userKeyObtained = null;

		const userList = snapshot.val();
		for (let userKey in userList)
		{
			if (userList[userKey]['username'] === username)
			{
				if (userList[userKey]['password'] === password)
				{
					userKeyObtained = String(userKey);
				}
				
				break;
			}
		}

		if (userKeyObtained == null)
		{
			console.error(" - ERROR: Invalid username or password");
		}

		return userKeyObtained;
	}
	else
	{
		console.error(" - ERROR: users/ data cannot be found on server");

		return null;
	}
}
