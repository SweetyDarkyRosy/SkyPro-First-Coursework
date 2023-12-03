import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { getCoursePrivateInfo, getUserData, setExerciseProgress } from "../api";
import { useAuthContext } from "../authContext";
import Skeleton from "react-loading-skeleton";


const ProgressBarPrimaryColourArr = [ "#565EEF", "#FF6D00", "#9A48F1" ];
const ProgressBarSecondaryColourArr = [ "#EDECFF", "#FFF2E0", "#F9EBFF" ];


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
	position: fixed;
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
	position: relative;

	display: flex;
	flex-direction: column;
	align-items: center;

	border: solid 1px ${ props => ((props.isComplete) ? "#06B16E" : "#000000" ) };
	border-radius: 26px;
	list-style: none;

	cursor: pointer;

	&:hover {
		background-color: ${ props => ((props.isComplete) ? "#DAF289" : "#3F007D1A" ) };
	}

	&:active {
		background-color: ${ props => ((props.isComplete) ? "#EBFFAB" : "#271A581A" ) };
	}
`;

const WorkoutButtonTitle = styled.h3`
	width: calc(100% - 36px);

	color: ${ props => ((props.isComplete) ? "#06B16E" : "#000000" ) };
	font-weight: 400;
	font-size: 20px;
	line-height: 23px;
	letter-spacing: -0.05px;
	text-align: center;
`

const WorkoutButtonSubtitle = styled.h4`
	color: ${ props => ((props.isComplete) ? "#06B16E" : "#000000" ) };
	font-weight: 400;
	font-size: 16px;
	line-height: 18px;
	letter-spacing: 0.1%;
	text-align: center;
`

const WorkoutButtonCompleteImg = styled.img`
	width: 24px;
	height: 24px;

	position: absolute;
	top: 8px;
	right: 8px;
`

const ExerciseSection = styled.section`
	margin-top: 75px;

	width: 100%;

	display: flex;
	flex-direction: row;
	
`

const ExerciseInfoDiv = styled.section`
	width: 50%;

	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`

const ExerciseList = styled.ul`
	margin-bottom: 40px;
	padding: 0 20px;

	width: 100%;

	box-sizing: border-box;
`;

const ExerciseListEl = styled.li`
	width: 100%;

	font-weight: 400;
	font-size: 24px;
	line-height: 32px;
`;

const ProgressBlock = styled.div`
	padding: 36px 54px 32px 54px;

	width: 50%;

	box-sizing: border-box;

	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	background-color: #F2F2F2;
	border-radius: 30px;
`

const ExerciseProgressDiv = styled.div`
	width: 100%;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	gap: 34px;

	&:not(:last-child) {
		margin-bottom: 26px;
	}
`

const ExerciseProgressDivName = styled.p`
	width: 100%;

	font-weight: 400;
	font-size: 24px;
	line-height: 32px;
	text-align: left;
`

const ExerciseProgressBar = styled.div`
	width: 100%;
	height: 36px;

	display: block;

	background-color: ${ props => (ProgressBarSecondaryColourArr[props.colourIndex]) };
	border: solid 2px ${ props => (ProgressBarPrimaryColourArr[props.colourIndex]) };
	border-radius: 22px;
`

const ExerciseProgressBarFiller = styled.div`
	width: ${ props => (props.progressPercentageValue) }%;
	height: 36px;

	display: block;

	background-color: ${ props => (ProgressBarPrimaryColourArr[props.colourIndex]) };
	border-radius: 22px;
`

const ExerciseProgressBarValueText = styled.p`
	width: 100%;

	color: #FFFFFF;
	font-weight: 400;
	font-size: 24px;
	line-height: 32px;
	text-align: center;

	text-shadow: #000000 1px 0 10px;
`

const ProgressDialogExerciseName = styled.p`
	width: 90%;

	font-weight: 400;
	font-size: 18px;
	line-height: 24px;
	letter-spacing: -0.05px;
	text-align: left;
`


const StandardButton = styled.div`
	padding: 12px 24px 16px 24px;

	width: fit-content;
	height: fit-content;

	display: block;
	box-sizing: border-box;

	background-color: #000000;
	border-radius: 46px;

	color: #FFFFFF;
	font-weight: 400;
	font-size: 18px;
	line-height: 24px;
	letter-spacing: -0.05px;
	text-align: center;

	cursor: pointer;

	&:hover {
		background-color: #212121;
	}

	&:active {
		background-color: #4C4C4C;
	}
`;

const VioletButton = styled(StandardButton)`
	background-color: #580EA2;

	color: #FFFFFF;

	&:hover {
		background-color: #3F007D;
	}

	&:active {
		background-color: #271A58;
	}
`;


const ProgressDialogInputBlock = styled.div`
	width: 328px;
	max-height: 80vh;

	display: flex;
	flex-direction: column;
	align-items: center;

	overflow-y: auto;
`

const ProgressDialogInput = styled.input`
	margin-bottom: 38px;
	padding: 8px 0;

	width: 90%;

	background-color: transparent;
	border: none;
	border-bottom: 1px solid #D0CECE;

	color: #000000;
	font-style: normal;
	font-weight: 400;
	font-size: 18px;
	line-height: 24px;

	&::-webkit-input-placeholder {
		background-color: transparent;
		color: #D0CECE;
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
	}

	&:-ms-input-placeholder {
		background-color: transparent;
		color: #D0CECE;
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
	}

	&:-moz-placeholder {
		background-color: transparent;
		color: #D0CECE;
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
	}
	
	&::placeholder {
		background-color: transparent;
		color: #D0CECE;
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
	}
`;

const ProgressAcceptedText = styled.p`
	margin: 0 40px 12px 40px;

	width: 268px;

	color: #000000;
	font-weight: 400;
	font-size: 40px;
	line-height: 48px;
	text-align: center;
`;

const ProgressAcceptedImg = styled.img`
	width: 200px;
	height: fit-content;

	bottom: 0px;
`


export const WorkoutPrivate = ({ courseId }) => {
	const authContext = useAuthContext();

	const [ courseDetails, setCourseDetails ] = useState(null);
	const [ currWorkoutNumber, setCurrWorkoutNumber ] = useState(null);
	const [ currProgress, setCurrProgress ] = useState([]);
	const [ progessBuffer, setProgessBuffer ] = useState([]);

	const [ isWorkoutMenuDialogVisible, toggleWorkoutMenuDialogVisibility ] = useState(false);
	const [ isProgressDialogVisible, toggleProgressDialogVisibility ] = useState(false);
	const [ isProgressAcceptedNotificationVisible, toggleProgressAcceptedNotificationVisibility ] = useState(false);


	const onDialogBackgroundClick = (event) => {
		toggleWorkoutMenuDialogVisibility(false);

		toggleProgressDialogVisibility(false);
		setProgessBuffer([]);
	}

	const onModalBoxClick = (event) => {
		event.stopPropagation();
	}

	const onWorkoutLabelClick = () => {
		toggleWorkoutMenuDialogVisibility(true);
	}

	const onModalBoxWorkoutButtonClick = (event) => {
		event.stopPropagation();

		const chosenWorkoutIndex = event.currentTarget.getAttribute("workoutIndex");
		setCurrWorkoutNumber(chosenWorkoutIndex);
		setProgessBuffer([]);

		loadCurrProgressData();

		toggleWorkoutMenuDialogVisibility(false);
	}

	const onShowProgessDialogButtonClick = () => {
		toggleProgressDialogVisibility(true);
	}

	const onSendProgessButtonClick = (event) => {
		event.stopPropagation();

		let isComplete = true;
		for (let it = 0; it < courseDetails.workouts[currWorkoutNumber].exercises.length; it++)
		{
			if (progessBuffer[courseDetails.workouts[currWorkoutNumber].exercises[it].id] !==
				courseDetails.workouts[currWorkoutNumber].exercises[it].count)
			{
				isComplete = false;
				break;
			}
		}

		setExerciseProgress({ userKey: authContext.userData.userKey, courseId: courseId, workoutId: courseDetails.workouts[currWorkoutNumber].id,
			progress: progessBuffer, isComplete: isComplete }).then((result) => {
				if (result === true)
				{
					toggleProgressDialogVisibility(false);
					setProgessBuffer([]);

					toggleProgressAcceptedNotificationVisibility(true);
					
					setTimeout(() => { toggleProgressAcceptedNotificationVisibility(false) }, 1500);

					getUserData({ userKey: authContext.userData.userKey }).then((userData) => {
							if (userData != null)
							{
								authContext.signIn({ userData: userData });
							}
						});
				}
			});
	}

	const onExerciseProgressInputKeyDown = (event) => {
		if (isNaN(event.key) === true)
		{
			event.preventDefault();
		}
	}

	const onExerciseProgressInputInput = (event) => {
		if (Number(event.currentTarget.value) > event.currentTarget.getAttribute("countLimit"))
		{
			event.preventDefault();
			event.currentTarget.value = event.currentTarget.getAttribute("countLimit");
		}

		progessBuffer[event.currentTarget.getAttribute("exerciseIndex")] = Number(event.currentTarget.value);
	}


	const loadCurrProgressData = () => {
		if (authContext.userData.courses[courseId].workouts !== undefined)
		{
			if (authContext.userData.courses[courseId].workouts[courseDetails.workouts[currWorkoutNumber].id] !== undefined)
			{
				if (authContext.userData.courses[courseId].workouts[courseDetails.workouts[currWorkoutNumber].id].exercises !== undefined)
				{
					setCurrProgress(authContext.userData.courses[courseId].workouts[courseDetails.workouts[currWorkoutNumber].id].exercises);
					return;
				}
			}
		}
			
		setCurrProgress([]);
	}


	useEffect(() => {
			setCurrWorkoutNumber(0);
		}, []);

	useEffect(() => {
			getCoursePrivateInfo({ courseId: courseId }).then((data) => {
					setCourseDetails(data);
				});
		}, [currWorkoutNumber]);

	useEffect(() => {
			if (courseDetails != null)
			{
				loadCurrProgressData();
			}
		}, [courseDetails]);

	useEffect(() => {
			if (courseDetails != null)
			{
				loadCurrProgressData();
			}
		}, [authContext.userData]);


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
				(courseDetails != null) && (
					(courseDetails.workouts[currWorkoutNumber].exercises !== null) &&
						<ExerciseSection>
							<ExerciseInfoDiv>
								<StandardLabel>Упражнения</StandardLabel>
								<ExerciseList>
								{
									courseDetails.workouts[currWorkoutNumber].exercises.map((exercise) => {
											return <ExerciseListEl>{ exercise.name } ({ exercise.count } повторений)</ExerciseListEl>
										})
								}
								</ExerciseList>
								<VioletButton onClick={ onShowProgessDialogButtonClick }>Заполнить свой прогресс</VioletButton>
							</ExerciseInfoDiv>
							<ProgressBlock>
								<StandardLabel>Мой прогресс по тренировке { courseDetails.workouts[currWorkoutNumber].id }:</StandardLabel>
								{
									courseDetails.workouts[currWorkoutNumber].exercises.map((exercise, index) => {
											return (
												<ExerciseProgressDiv>
													<ExerciseProgressDivName>{ exercise.name }</ExerciseProgressDivName>
													<ExerciseProgressBar colourIndex={ index % 3 }>
													{
														(currProgress[exercise.id] !== undefined) && (
															<ExerciseProgressBarFiller progressPercentageValue={ ((currProgress[exercise.id] / exercise.count ) * 100) } colourIndex={ index % 3 }>
																<ExerciseProgressBarValueText>{ ((currProgress[exercise.id] / exercise.count ) * 100) }%</ExerciseProgressBarValueText>
															</ExerciseProgressBarFiller>)
													}
													</ExerciseProgressBar>
												</ExerciseProgressDiv>)
										})
								}
							</ProgressBlock>
						</ExerciseSection>
				)
			}

			{
				isWorkoutMenuDialogVisible && (
					<DialogBase onClick={ onDialogBackgroundClick }>
						<ModalBox onClick={ onModalBoxClick }>
							<StandardLabel>Выберите тренировку</StandardLabel>
							<ModalBoxList>
							{
								courseDetails.workouts.map((workout, index) => {
										let isComplete = false;

										if (authContext.userData.courses[courseId].workouts !== undefined)
										{
											if (authContext.userData.courses[courseId].workouts[workout.id] !== undefined)
											{
												isComplete = authContext.userData.courses[courseId].workouts[workout.id].isComplete;
											}
										}

										return (
											<ModalBoxListButton onClick={ onModalBoxWorkoutButtonClick } workoutIndex={ index } isComplete={ isComplete }>
												{
													(isComplete) &&
														<WorkoutButtonCompleteImg src='/img/complete.svg'/>
												}
												<WorkoutButtonTitle isComplete={ isComplete }>{ workout.title }</WorkoutButtonTitle>
												{
													(workout.subtitle != null) &&
														<WorkoutButtonSubtitle isComplete={ isComplete }>{ workout.subtitle }</WorkoutButtonSubtitle>
												}
											</ModalBoxListButton>)
									})
							}
							</ModalBoxList>
						</ModalBox>
					</DialogBase>)
			}

			{
				isProgressDialogVisible && (
					<DialogBase onClick={ onDialogBackgroundClick }>
						<ModalBox onClick={ onModalBoxClick }>
							<StandardLabel>Мой прогресс</StandardLabel>
							<ProgressDialogInputBlock>
							{
								courseDetails.workouts[currWorkoutNumber].exercises.map((exercise, index) => {
										return (
											<React.Fragment>
												<ProgressDialogExerciseName>{ exercise.name }</ProgressDialogExerciseName>
												<ProgressDialogInput placeholder="Введите значение" onKeyDown={ onExerciseProgressInputKeyDown }
													onInput={ onExerciseProgressInputInput } exerciseIndex={ exercise.id } countLimit={ exercise.count }/>
											</React.Fragment>)
									})
							}
							</ProgressDialogInputBlock>
							<VioletButton style={ { marginTop: "40px", width: "278px" } } onClick={ onSendProgessButtonClick }>Отправить</VioletButton>
						</ModalBox>
					</DialogBase>
				)
			}
			
			{
				isProgressAcceptedNotificationVisible && (
					<DialogBase onClick={ onDialogBackgroundClick }>
						<ModalBox onClick={ onModalBoxClick }>
								<ProgressAcceptedText>Ваш прогресс засчитан!</ProgressAcceptedText>
								<ProgressAcceptedImg src='/img/progressAccepted.svg'/>
						</ModalBox>
					</DialogBase>)
			}
			
		</React.Fragment>)
}
