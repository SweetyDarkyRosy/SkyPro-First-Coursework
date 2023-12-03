import { get, push, ref, set, update } from "firebase/database";
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
		console.error(" - ERROR: There are no courses available");

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
			console.error(" - ERROR: There are no common details about the course found");
		}
	}
	else
	{
		console.error(" - ERROR: There are no courses available");
	}

	return null;
}

export async function getCoursePrivateInfo({ courseId }) {
	let coursePrivateDetails = {
		name: "",
		workouts: []
	}

	const courseRef = ref(firebaseDataBase, 'courses/' + courseId);

	const courseSnapshot = await get(courseRef);
	if (courseSnapshot.exists() === true)
	{
		const courseBaseData = courseSnapshot.val();

		coursePrivateDetails.name = courseBaseData.name;

		const coursePrivateDetailsRef = ref(firebaseDataBase, 'coursePrivateDetails/' + courseId);

		const coursePrivateDetailsSnapshot = await get(coursePrivateDetailsRef);
		if (coursePrivateDetailsSnapshot.exists() === true)
		{
			const coursePrivateDetailsData = coursePrivateDetailsSnapshot.val();

			// ----- Collecting of workouts -----

			for (let workout in coursePrivateDetailsData.workouts)
			{
				const workoutInstance = {
					id: Number(workout),
					title: coursePrivateDetailsData.workouts[workout].title,
					subtitle: null,
					videoURL: coursePrivateDetailsData.workouts[workout].videoURL,
					exercises: null
				};

				if (coursePrivateDetailsData.workouts[workout].subtitle !== undefined)
				{
					workoutInstance.subtitle = coursePrivateDetailsData.workouts[workout].subtitle;
				}


				// ----- Collecting of exercises of a workout -----

				if (coursePrivateDetailsData.workouts[workout].exercises !== undefined)
				{
					for (let exercise in coursePrivateDetailsData.workouts[workout].exercises)
					{
						const exerciseInstance = {
							id: Number(exercise),
							name: coursePrivateDetailsData.workouts[workout].exercises[exercise].name,
							count: coursePrivateDetailsData.workouts[workout].exercises[exercise].count
						};

						if (workoutInstance.exercises === null)
						{
							workoutInstance.exercises = [];
						}

						workoutInstance.exercises.push(exerciseInstance);
					}
				}


				coursePrivateDetails.workouts.push(workoutInstance);
			}
			

			return coursePrivateDetails;
		}
		else
		{
			console.error(" - ERROR: There are no common details about the course found");
		}
	}
	else
	{
		console.error(" - ERROR: There are no courses available");
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
				await update(userRef, {
						username: newUsername
					});
				
				return true;
			}
			else
			{
				console.error(" - ERROR: Current user was not found on server");
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
		await update(userRef, {
				password: newPassword
			});
		
		return true;
	}
	else
	{
		console.error(" - ERROR: Current user was not found on server");

		return false;
	}
}

export async function logIn({ username, password }) {
	const usersRef = ref(firebaseDataBase, 'users/');

	const snapshot = await get(usersRef);
	if (snapshot.exists() === true)
	{
		const userList = snapshot.val();
		for (let userKey in userList)
		{
			if (userList[userKey]['username'] === username)
			{
				if (userList[userKey]['password'] === password)
				{
					let userData = {
						userKey: String(userKey),
						username: username,
						password: password,
						courses: {}
					};

					if (userList[userKey]['courses'] !== undefined)
					{
						userData.courses = userList[userKey]['courses'];
					}

					return userData;
				}
				
				break;
			}
		}
		
		console.error(" - ERROR: Invalid username or password");
	}
	else
	{
		console.error(" - ERROR: users/ data cannot be found on server");

		return null;
	}
}

export async function getUserData({ userKey }) {
	const userRef = ref(firebaseDataBase, 'users/' + userKey);

	const userSnapshot = await get(userRef);
	if (userSnapshot.exists() === true)
	{
		const currUserData = userSnapshot.val();

		let userData = {
			userKey: userKey,
			username: currUserData.username,
			password: currUserData.password,
			courses: {}
		};

		if (currUserData.courses !== undefined)
		{
			userData.courses = currUserData.courses;
		}

		return userData;
	}
	else
	{
		console.error(" - ERROR: Current user was not found on server");

		return null;
	}
}

export async function subscribeOnCourse({ userKey, courseId }) {
	const courseRef = ref(firebaseDataBase, 'courses/' + courseId);

	const courseRefSnapshot = await get(courseRef);
	if (courseRefSnapshot.exists() === true)
	{
		const userRef = ref(firebaseDataBase, 'users/' + userKey);

		const userSnapshot = await get(userRef);
		if (userSnapshot.exists() === true)
		{
			const currUserData = userSnapshot.val();

			let courseList = {};
			if (currUserData.courses !== undefined)
			{
				courseList = currUserData.courses;
			}

			courseList[courseId] = { id: Number(courseId) };
		
			await update(userRef, {
					courses: courseList
				});
		
			return true;
		}
		else
		{
			console.error(" - ERROR: Current user was not found on server");
		}
	}
	else
	{
		console.error(" - ERROR: The course is not available on server");
	}

	return false;
}

export async function setExerciseProgress({ userKey, courseId, workoutId, progress, isComplete }) {
	const userRef = ref(firebaseDataBase, 'users/' + userKey);

	const userSnapshot = await get(userRef);
	if (userSnapshot.exists() === true)
	{
		const currUserData = userSnapshot.val();

		let courseList = {};
		if (currUserData.courses !== undefined)
		{
			courseList = currUserData.courses;
		}

		if (courseList[courseId].workouts === undefined)
		{
			courseList[courseId].workouts = [];
		}

		if (courseList[courseId].workouts[workoutId] === undefined)
		{
			courseList[courseId].workouts[workoutId] = { id: Number(workoutId), exercises: [] };
		}

		courseList[courseId].workouts[workoutId].exercises = progress;
		courseList[courseId].workouts[workoutId].isComplete = isComplete;

		await update(userRef, {
				courses: courseList
			});

		return true;
	}
	else
	{
		console.error(" - ERROR: Current user was not found on server");
	}

	return false;
}
