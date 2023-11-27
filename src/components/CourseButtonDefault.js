import { Link } from "react-router-dom";
import styled from "styled-components";


const CourseButtonBase = styled.div`
	height: 480px;

	box-sizing: content-box;
	position: relative;

	background-color: #FFFFFF;
	border-radius: 30px;

	cursor: pointer;

	&:hover {
		box-shadow: 0px 0px 10px 10px #CDCDCD1A;
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


export const CourseButtonDefault = ({ courseName }) => {
	return (
		<Link to={ '/workout' }>
			<CourseButtonBase>
				<CourseButtonLabel>{ courseName }</CourseButtonLabel>
			</CourseButtonBase>
		</Link>);
}
