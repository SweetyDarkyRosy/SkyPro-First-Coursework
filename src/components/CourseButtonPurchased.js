import { Link } from "react-router-dom";
import styled from "styled-components";


const CourseButtonBase = styled.div`
	height: 480px;

	box-sizing: content-box;
	position: relative;

	background-color: #FFFFFF;
	box-shadow: 0px 0px 10px 10px #0000001A;
	border-radius: 30px;

	cursor: pointer;

	&:hover {
		box-shadow: 0px 0px 10px 10px #580EA21A;
	}
`

const CourseButtonLabel = styled.h1`
	position: absolute;
	top: 30px;
	left: 30px;

	color: #000000;
	font-weight: 800;
	font-size: 36px;
	line-height: 39.6px;
	letter-spacing: -0.5px;
`

const CourseButtonPressZone = styled.div`
	padding: 10px 20px 10px 20px;

	width: fit-content;
	height: fit-content;

	position: absolute;
	top: 410px;
	left: 30px;

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
`


export const CourseButtonPurchased = ({ courseName }) => {
	return (
		
		<CourseButtonBase>
			<CourseButtonLabel>{ courseName }</CourseButtonLabel>
			<Link to={ '/workout' }>
				<CourseButtonPressZone>Перейти →</CourseButtonPressZone>
			</Link>
		</CourseButtonBase>);
}
