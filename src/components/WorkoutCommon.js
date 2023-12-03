import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { useNavigate } from "react-router-dom";
import { getCourseCommonInfo, getUserData, subscribeOnCourse } from "../api";
import { useAuthContext } from "../authContext";



const StandardParagraph = styled.p`
	color: #000000;
	font-weight: 400;
	font-size: 24px;
	line-height: 32px;
`


const WorkoutPageSection = styled.section`
	margin-bottom: 75px;
`

const WorkoutPageSectionName = styled.h1`
	margin-bottom: 22px;

	color: #000000;
	font-weight: 400;
	font-size: 40px;
	line-height: 48px;
`


const CourseHeader = styled.div`
	margin-top: 40px;

	width: 100%;
	height: 310px;

	box-sizing: content-box;
	position: relative;

	background-color: #F5F5F5;
	border-radius: 30px;
`

const CourseLabel = styled.h2`
	position: absolute;
	top: 30px;
	left: 30px;

	color: #000000;
	font-weight: 400;
	font-size: 64px;
	line-height: 72px;
	letter-spacing: -0.8px;
`


const WorkoutPageFooter = styled.footer`
	padding: 46px 52px 48px 52px;

	width: 100%;

	position: relative;

	display: flex;
	flex-direction: column;
	align-items: flex-start;

	background-color: #F9EBFF;
	border-radius: 30px;
`

const WorkoutPageFooterParagraph = styled.h1`
	margin-bottom: 34px;

	width: 70%;

	color: #000000;
	font-weight: 400;
	font-size: 32px;
	line-height: 40px;
`

const WorkoutPageFooterPhoneImg = styled.img`
	width: 240px;
	height: fit-content;

	position: absolute;
	right: 0px;
`


const DirectionListDiv = styled.div`
	margin-right: 168px;

	max-width: 300px;
	height: 100px;

	column-width: 168px;
`

const DirectionListUl = styled.ul`
	list-style-position: inside;
`

const DirectionListLi = styled.li`
	padding: 0 15px;

	break-inside: avoid-column;

	color: #000000;
	font-weight: 400;
	font-size: 24px;
	line-height: 32px;
`

const RecommendationList = styled.div`
	width: 100%;

	box-sizing: border-box;

	display: inline-grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 86px;
`

const RecommendationDiv = styled.div`
	display: flex;
	justify-content: center;
	gap: 24px;
`

const RecommendationDivCircle = styled.div`
	min-width: 67px;
	width: 67px;
	min-height: 67px;
	height: 67px;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: #C7E957;
	border-radius: 1200px;
`

const RecommendationDivNumber = styled.h2`
	color: #000000;
	font-weight: 400;
	font-size: 32px;
	line-height: 40px;
	text-align: center;
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


export const WorkoutCommon = ({ courseId }) => {
	const [ workoutDetails, setWorkoutDetails ] = useState(null);
	const navigate = useNavigate();
	const authContext = useAuthContext();


	const onSubscribeButtonClick = () => {
		if (authContext.userData == null)
		{
			navigate("/login", { replace: true });
		}
		else
		{
			subscribeOnCourse({ userKey: authContext.userData.userKey, courseId: courseId }).then((result) => {
					if (result === true)
					{
						getUserData({ userKey: authContext.userData.userKey }).then((userData) => {
								if (userData != null)
								{
									authContext.signIn({ userData: userData });
								}
							});
					}
				});
		}
	}


	useEffect(() => {
		getCourseCommonInfo({ courseId: courseId }).then((data) => {
				setWorkoutDetails(data);
			});
	}, []);


	return (
		<React.Fragment>
			<WorkoutPageSection>
			{
				(workoutDetails == null) ?
				<Skeleton variant="rectangular" width={ "100%" } height={ "310px" } /> :
				<CourseHeader>
					<CourseLabel>{ workoutDetails.name }</CourseLabel>
				</CourseHeader>
			}
			</WorkoutPageSection>
			<WorkoutPageSection>
				<WorkoutPageSectionName>Подойдет для вас, если:</WorkoutPageSectionName>
				{
					(workoutDetails == null) ?
					<Skeleton variant="rectangular" width={ "100%" } height={ "310px" } /> :
					(
						<RecommendationList>
							{
								workoutDetails.targetAudienceType.map((type, index) => {
										return (
											<RecommendationDiv>
												<RecommendationDivCircle>
													<RecommendationDivNumber>{ index + 1 }</RecommendationDivNumber>
												</RecommendationDivCircle>
												<StandardParagraph>{ type }</StandardParagraph>
											</RecommendationDiv>)
									})
							}
						</RecommendationList>
					)
				}
			</WorkoutPageSection>
			<WorkoutPageSection>
				<WorkoutPageSectionName>Направления:</WorkoutPageSectionName>
				{
					(workoutDetails == null) ?
					<Skeleton variant="rectangular" width={ "100%" } height={ "310px" } /> :
					(
						<DirectionListDiv>
							<DirectionListUl>
							{
								workoutDetails.directions.map((direction) => {
										return <DirectionListLi>{ direction }</DirectionListLi>
									})
							}
							</DirectionListUl>
						</DirectionListDiv>
					)
				}
			</WorkoutPageSection>
			<WorkoutPageSection>
			{
				(workoutDetails == null) ?
				<Skeleton variant="rectangular" width={ "100%" } height={ "310px" } /> :
				<StandardParagraph>{ workoutDetails.description }</StandardParagraph>
			}
			</WorkoutPageSection>
			<WorkoutPageFooter>
				<WorkoutPageFooterPhoneImg src='/img/phone.svg'/>
				<WorkoutPageFooterParagraph>Оставьте заявку на пробное занятие, мы свяжемся с вами, поможем с выбором направления и тренера, с которым тренировки принесут здоровье и радость!</WorkoutPageFooterParagraph>
				<VioletButton onClick={ onSubscribeButtonClick }>Записаться на тренировку</VioletButton>
			</WorkoutPageFooter>
		</React.Fragment>)
};
