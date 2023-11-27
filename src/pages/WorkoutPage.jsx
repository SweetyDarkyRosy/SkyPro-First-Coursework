import React, { useEffect } from "react";
import styled from "styled-components";
import { Header } from '../components/Header'


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


export const WorkoutPage = () => {
	useEffect(() => {
		document.body.style.backgroundColor = "#FAFAFA";
	}, []);

	return (
		<React.Fragment>
			<Header isThemeDark={ false } />
			<WorkoutPageSection>
				<CourseHeader>
					<CourseLabel>Йога</CourseLabel>
				</CourseHeader>
			</WorkoutPageSection>
			<WorkoutPageSection>
				<WorkoutPageSectionName>Подойдет для вас, если:</WorkoutPageSectionName>
				<RecommendationList>
					<RecommendationDiv>
						<RecommendationDivCircle>
							<RecommendationDivNumber>1</RecommendationDivNumber>
						</RecommendationDivCircle>
						<StandardParagraph>Давно хотели попробовать йогу, но не решались начать.</StandardParagraph>
					</RecommendationDiv>

					<RecommendationDiv>
						<RecommendationDivCircle>
							<RecommendationDivNumber>2</RecommendationDivNumber>
						</RecommendationDivCircle>
						<StandardParagraph>Хотите укрепить позвоночник, избавиться от болей в спине и суставах.</StandardParagraph>
					</RecommendationDiv>
				</RecommendationList>
			</WorkoutPageSection>
			<WorkoutPageSection>
				<WorkoutPageSectionName>Направления:</WorkoutPageSectionName>
				<DirectionListDiv>
					<DirectionListUl>
						<DirectionListLi>Йога для новичков</DirectionListLi>
						<DirectionListLi>Классическая йога</DirectionListLi>
						<DirectionListLi>Йогатерапия</DirectionListLi>
						<DirectionListLi>Кундалини-йога</DirectionListLi>
						<DirectionListLi>Хатха-йога</DirectionListLi>
						<DirectionListLi>Аштанга-йога</DirectionListLi>
					</DirectionListUl>
				</DirectionListDiv>
			</WorkoutPageSection>
			<WorkoutPageSection>
				<StandardParagraph>Благодаря комплексному воздействию упражнений происходит проработка всех групп мышц, тренировка суставов, улучшается циркуляция крови. Кроме того, упражнения дарят отличное настроение, заряжают бодростью и помогают противостоять стрессам.</StandardParagraph>
			</WorkoutPageSection>
			<WorkoutPageFooter>
				<WorkoutPageFooterPhoneImg src='img/phone.svg'/>
				<WorkoutPageFooterParagraph>Оставьте заявку на пробное занятие, мы свяжемся с вами, поможем с выбором направления и тренера, с которым тренировки принесут здоровье и радость!</WorkoutPageFooterParagraph>
				<VioletButton>Записаться на тренировку</VioletButton>
			</WorkoutPageFooter>
		</React.Fragment>);
}