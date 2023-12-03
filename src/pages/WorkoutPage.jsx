import React, { useEffect, useState } from "react";
import { Header } from '../components/Header'
import { useParams } from "react-router-dom";
import { WorkoutCommon } from "../components/WorkoutCommon"
import { WorkoutPrivate } from "../components/WorkoutPrivate"
import { useAuthContext } from "../authContext";
import Skeleton from "react-loading-skeleton";


export const WorkoutPage = () => {
	const [ isCoursePurchased, setIfCoursePurchased ] = useState(null);
	const pageParams = useParams();
	const authContext = useAuthContext();


	const setWorkoutState = () => {
		let isPurchased = false;

		if (authContext.userData != null)
		{
			for (let course in authContext.userData.courses)
			{
				if (Number(course) === Number(pageParams.id))
				{
					isPurchased = true;
				}
			}
		}

		setIfCoursePurchased(isPurchased);
	}


	useEffect(() => {
		document.body.style.backgroundColor = "#FAFAFA";

		setWorkoutState();
	}, []);

	useEffect(() => {
		setWorkoutState();
	}, [authContext.userData]);


	return (
		<React.Fragment>
			<Header isThemeDark={ false } />
			{
				(isCoursePurchased === null) ?
				<Skeleton variant="rectangular" width={ "100%" } height={ "80vh" } /> :
				<React.Fragment>
				{
					(isCoursePurchased === true) ?
					<WorkoutPrivate courseId={ pageParams.id } /> :
					<WorkoutCommon courseId={ pageParams.id } />
				}
				</React.Fragment>
			}
		</React.Fragment>);
}
