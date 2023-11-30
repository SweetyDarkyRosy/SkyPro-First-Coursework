import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from '../components/Header'
import { CourseButtonDefault } from '../components/CourseButtonDefault'
import { getCourseList } from "../api";


const MainPageCentered = styled.section`
	position: relative;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
`

const MainPageH1 = styled.h1`
	margin-bottom: 52px;

	max-width: 830px;

	color: #F4F4FF;
	font-weight: 400;
	font-size: 60px;
	line-height: 54.9px;
	letter-spacing: -1.17px;
`

const MainPageH2 = styled.h2`
	margin-bottom: 18px;

	color: #696969;
	font-weight: 400;
	font-size: 20px;
	line-height: 23px;
	letter-spacing: -0.05px;
`

const SomeAdShitBlock = styled.div`
	position: absolute;
	transform: rotate(15deg);
	top: 80px;
	left: 1100px;

	display: flex;
	justify-content: center;
	align-items: center;
`

const SomeAdShitImg = styled.img`
	width: 212.27px;
	height: fit-content;

	position: absolute;
`

const SomeAdShitText = styled.h3`
	width: 149px;

	position: absolute;

	color: #FF8071;
	font-weight: 400;
	font-size: 20px;
	line-height: 18px;
	letter-spacing: -0.15px;
	text-align: center;
`

const CourseList = styled.div`
	margin-bottom: 34px;

	width: 100%;

	box-sizing: border-box;

	display: inline-grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 36px;
`

const GreenButton = styled.div`
	margin: 0 auto;
	padding: 8px 24px 8px 24px;

	width: fit-content;
	height: fit-content;

	display: block;
	box-sizing: content-box;

	background-color: #C7E957;
	border-radius: 46px;

	color: #000000;
	text-align: center;

	cursor: pointer;

	&:hover {
		background-color: #DAF289;
	}

	&:active {
		background-color: #EBFFAB;
	}
`;


export const MainPage = () => {
	const [ courseList, setCourseList ] = useState(null);


	const shiftToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};


	useEffect(() => {
		document.body.style.backgroundColor = "#271A58";

		getCourseList().then((courseList) => {
				if (courseList != null)
				{
					let finalCourseList = [];

					for (let courseKey in courseList)
					{
						let courseStruct = {
							id: courseList[courseKey]['id'],
							name: courseList[courseKey]['name']
						};

						finalCourseList.push(courseStruct);
					}

					setCourseList(finalCourseList);
				}
			});
	}, []);

	return (
		<React.Fragment>
			<Header isThemeDark={ true } />
			<MainPageCentered>
				<MainPageH2>Онлайн-тренировки для занятий дома</MainPageH2>
				<MainPageH1>Начните заниматься спортом и улучшите качество жизни</MainPageH1>
				<SomeAdShitBlock>
					<SomeAdShitImg src='img/union.svg'/>
					<SomeAdShitText>Измени своё тело за полгода</SomeAdShitText>
				</SomeAdShitBlock>
				{(courseList != null) && (
					<React.Fragment>
						<CourseList>
						{
							courseList.map((course) => {
									return <CourseButtonDefault courseName={ course.name } courseId={ course.id }></CourseButtonDefault>
								})
						}
						</CourseList>
						<GreenButton onClick={ shiftToTop }>Наверх ↑</GreenButton>
					</React.Fragment>)
				}
			</MainPageCentered>
		</React.Fragment>);
}
