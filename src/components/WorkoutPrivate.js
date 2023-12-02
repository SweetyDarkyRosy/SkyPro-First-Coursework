import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { getCoursePrivateInfo } from "../api";
import { useAuthContext } from "../authContext";
import Skeleton from "react-loading-skeleton";


const CourseLabel = styled.h1`
	margin-bottom: 40px;

	color: #000000;
	font-weight: 400;
	font-size: 48px;
	line-height: 56px;
`

const StandardLabel = styled.h2`
	margin-bottom: 40px;

	width: fit-content;

	color: #000000;
	font-weight: 400;
	font-size: 32px;
	line-height: 40px;
`
const WorkoutLabel = styled(StandardLabel)`
	border-bottom: solid 2px transparent;

	cursor: pointer;

	&:hover {
		border-bottom: solid 2px #3F007D;
	}

	&:active {
		border-bottom: solid 2px #271A58;
	}
`


const DialogBase = styled.div`
	width: 100%;
	height: 100%;

	z-index: 100;
	position: absolute;
	top: 0px;
	left: 0px;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: #C4C4C4D1;
`

const ModalBox = styled.div`
	padding: 32px 46px 50px 46px;

	width: fit-content;
	height: fit-content;

	display: flex;
	flex-direction: column;
	align-items: center;

	background-color: #FFFFFF;
	border-radius: 12px
`;

const ModalBoxList = styled.ul`
	width: 100%;
	max-height: 452px;

	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-y: auto;
`;

const ModalBoxListButton = styled.li`
	&:not(:last-child) {
		margin-bottom: 12px;
	}

	padding: 12px 28px 16px 28px;

	width: 90%;
	min-height: 76px;

	box-sizing: border-box;

	border: solid 1px #000000;
	border-radius: 26px;
	list-style: none;

	cursor: pointer;
`;

const WorkoutButtonTitle = styled.h3`
	color: #000000;
	font-weight: 400;
	font-size: 20px;
	line-height: 23px;
	letter-spacing: -0.05px;
	text-align: center;
`

const WorkoutButtonSubtitle = styled.h4`
	color: #000000;
	font-weight: 400;
	font-size: 16px;
	line-height: 18px;
	letter-spacing: 0.1%;
	text-align: center;
`


export const WorkoutPrivate = ({ courseId }) => {
	const [ courseDetails, setCourseDetails ] = useState(null);
	const [ currWorkoutNumber, setCurrWorkoutNumber ] = useState(null);

	const [ isWorkoutMenuDialogVisible, toggleWorkoutMenuDialogVisibility ] = useState(false);


	const onWorkoutLabelClick = () => {
		toggleWorkoutMenuDialogVisibility(true);
	}

	const onModalBoxClick = (event) => {
		event.stopPropagation();
	}

	const onModalBoxWorkoutButtonClick = (event) => {
		event.stopPropagation();

		const chosenWorkoutIndex = event.currentTarget.getAttribute("workoutIndex");
		setCurrWorkoutNumber(chosenWorkoutIndex);

		toggleWorkoutMenuDialogVisibility(false);
	}

	const onDialogBackgroundClick = (event) => {
		toggleWorkoutMenuDialogVisibility(false);
	}


	useEffect(() => {
		getCoursePrivateInfo({ courseId: courseId }).then((data) => {
				setCourseDetails(data);
				setCurrWorkoutNumber(0);
			});
	}, []);


	return (
		<React.Fragment>
			{
				(courseDetails == null) ?
				<Skeleton variant="rectangular" width={ "100%" } height={ "48px" } /> :
				<CourseLabel>{ courseDetails.name }</CourseLabel>
			}
			{
				(courseDetails == null) ?
				<Skeleton variant="rectangular" width={ "100%" } height={ "48px" } /> :
				<WorkoutLabel onClick={ onWorkoutLabelClick }>{ courseDetails.workouts[currWorkoutNumber].title +
					( (courseDetails.workouts[currWorkoutNumber].subtitle === null) ? "" : ( " / " + courseDetails.workouts[currWorkoutNumber].subtitle) ) }</WorkoutLabel>
			}
			{
				(courseDetails == null) ?
				<Skeleton variant="rectangular" width={ "100%" } height={ "400px" } /> :
				<iframe width="100%" height="639px" src={ courseDetails.workouts[currWorkoutNumber].videoURL }
					title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write;
					encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
			}
			{
				isWorkoutMenuDialogVisible && (
					<DialogBase onClick={ onDialogBackgroundClick }>
						<ModalBox onClick={ onModalBoxClick }>
							<StandardLabel>Выберите тренировку</StandardLabel>
							<ModalBoxList>
							{
								courseDetails.workouts.map((workout, index) => {
										return (
											<ModalBoxListButton onClick={ onModalBoxWorkoutButtonClick } workoutIndex={ index }>
												<WorkoutButtonTitle>{ workout.title }</WorkoutButtonTitle>
												{
													(workout.subtitle != null) ?
													<WorkoutButtonSubtitle>{ workout.subtitle }</WorkoutButtonSubtitle> :
													(<React.Fragment/>)
												}
											</ModalBoxListButton>)
									})
							}
							</ModalBoxList>
						</ModalBox>
					</DialogBase>)
			}

			
		</React.Fragment>)
}
