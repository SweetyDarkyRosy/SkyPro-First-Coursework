import { get, onValue, push, ref, set } from "firebase/database";
import { firebaseDataBase } from "./firebase";


export async function getCourseList() {
	const coursesRef = ref(firebaseDataBase, 'courses/');

	const snapshot = await get(coursesRef);
	if (snapshot.exists() === true)
	{
		const data = snapshot.val();
		return data;
	}
	else
	{
		console.error(" - ERROR: there are no courses available");

		return null;
	}
}

export async function getCourseCommonInfo({ courseId }) {
	let courseCommonInfo = {
		name: "",
		description: "",
		directions: [],
		targetAudienceType: []
	}

	const courseRef = ref(firebaseDataBase, 'courses/' + courseId);

	const courseSnapshot = await get(courseRef);
	if (courseSnapshot.exists() === true)
	{
		const courseBaseData = courseSnapshot.val();

		courseCommonInfo.name = courseBaseData.name;

		const courseCommonDetailsRef = ref(firebaseDataBase, 'courseCommonDetails/' + courseId);

		const courseCommonDetailsSnapshot = await get(courseCommonDetailsRef);
		if (courseCommonDetailsSnapshot.exists() === true)
		{
			const courseCommonDetailsData = courseCommonDetailsSnapshot.val();

			// Sets a description
			courseCommonInfo.description = courseCommonDetailsData.description;


			// ----- Collecting of directions -----

			for (let direction in courseCommonDetailsData.directions)
			{
				courseCommonInfo.directions.push(String(courseCommonDetailsData.directions[direction]));
			}


			// ----- Collecting of target audience types -----

			for (let target in courseCommonDetailsData.target)
			{
				courseCommonInfo.targetAudienceType.push(String(courseCommonDetailsData.target[target]));
			}


			return courseCommonInfo;
		}
		else
		{
			console.error(" - ERROR: there are no common details about the course found");
		}
	}
	else
	{
		console.error(" - ERROR: there are no courses available");
	}

	return null;
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

			await set(ref(firebaseDataBase, ('users/' + newKey)), {
					username: username,
					password: password
				});

			return true;
		}
	}
	else
	{
		console.error(" - ERROR: users/ data cannot be found on server");
	}

	return false;
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
