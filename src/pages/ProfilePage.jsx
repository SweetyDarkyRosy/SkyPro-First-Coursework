import React, { useEffect, useRef, useState } from "react";
import { Header } from "../components/Header";
import styled from "styled-components";
import { CourseButtonPurchased } from "../components/CourseButtonPurchased";
import { Link } from "react-router-dom";
import { useAuthContext } from "../authContext";
import { getCourseList, getUserData, updatePassword, updateUsername } from "../api";


const ProfilePageSection = styled.section`
	&:not(:last-child) {
		margin-bottom: 75px;
	}
`

const ProfilePageSectionName = styled.h2`
	margin-bottom: 40px;

	color: #000000;
	font-weight: 400;
	font-size: 48px;
	line-height: 56px;
`

const ProfileInfo = styled.p`
	color: #000000;
	font-weight: 400;
	font-size: 24px;
	line-height: 32px;
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

const LocalButtonCommonStyle = {
	marginTop: "22px",

	width: "278px"
};


const CourseList = styled.div`
	margin-bottom: 34px;

	width: 100%;

	box-sizing: border-box;

	display: inline-grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 36px;
`

const DialogBase = styled.div`
	width: 100vw;
	height: 100vh;

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

const LogoImg = styled.img`
	margin-bottom: 38px;

	width: 220px;
	height: fit-content;
`;

const ModalBoxH3 = styled.h3`
	width: 100%;

	margin-bottom: 20px;

	color: #000000;
	font-weight: 400;
	font-size: 18px;
	line-height: 24px;
	letter-spacing: -0.05px;
	text-align: left;
`


const StandardInput = styled.input`
	margin-bottom: 38px;
	padding: 8px 0;

	width: 278.5px;

	background-color: transparent;
	border: ${ props => (props.isErrorMarked ? '2px solid #9E0000': 'none') };
	border-bottom: ${ props => (props.isErrorMarked ? '': '1px solid #D0CECE') };;

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


const LocalInputCommonStyle = {
	marginBottom: "38px",

	width: "278px"
};


export const ProfilePage = () => {
	const [ courseList, setCourseList ] = useState(null);
	const authContext = useAuthContext();


	const [ isLoginEditDialogVisible, toggleLoginEditDialogVisibility ] = useState(false);
	const [ isPasswordEditDialogVisible, togglePasswordEditDialogVisibility ] = useState(false);

	const [ isLoginInputErrorMarked, setUsernameInputErrorMarkedState ] = useState(false);
	const newLoginInputRef = useRef(null);

	const [ isPasswordInputErrorMarked, setPasswordInputErrorMarkedState ] = useState(false);
	const [ isSecondPasswordInputErrorMarked, setSecondPasswordInputErrorMarkedState ] = useState(false);
	const newPasswordInputRef = useRef(null);
	const secondPasswordInputRef = useRef(null);


	const onEditLoginClick = (event) => {
		toggleLoginEditDialogVisibility(true);
	}

	const onNewUsernameInputInput = () => {
		setUsernameInputErrorMarkedState(false);
	}

	const onSaveLoginChangesClick = (event) => {
		if (newLoginInputRef.current.value.length === 0)
		{
			setUsernameInputErrorMarkedState(true);
			return;
		}

		updateUsername({ userKey: authContext.userData.userKey, newUsername: newLoginInputRef.current.value }).then((result) => {
				if (result === true)
				{
					getUserData({ userKey: authContext.userData.userKey }).then((userData) => {
							if (userData != null)
							{
								authContext.signIn({ userData: userData });

								toggleLoginEditDialogVisibility(false);
							}
						});
				}
			});
	}

	const onEditPasswordClick = (event) => {
		togglePasswordEditDialogVisibility(true);
	}

	const onNewPasswordInputInput = () => {
		setPasswordInputErrorMarkedState(false);
	}

	const onSecondPasswordInputInput = () => {
		setSecondPasswordInputErrorMarkedState(false);
	}

	const onSavePasswordChangesClick = (event) => {
		if (newPasswordInputRef.current.value.length === 0)
		{
			setPasswordInputErrorMarkedState(true);
			return;
		}

		if (secondPasswordInputRef.current.value.length === 0)
		{
			setSecondPasswordInputErrorMarkedState(true);
			return;
		}

		if (newPasswordInputRef.current.value !== secondPasswordInputRef.current.value)
		{
			setPasswordInputErrorMarkedState(true);
			setSecondPasswordInputErrorMarkedState(true);

			return;
		}

		updatePassword({ userKey: authContext.userData.userKey, newPassword: newPasswordInputRef.current.value }).then((result) => {
				if (result === true)
				{
					getUserData({ userKey: authContext.userData.userKey }).then((userData) => {
							if (userData != null)
							{
								authContext.signIn({ userData: userData });

								togglePasswordEditDialogVisibility(false);
							}
						});
				}
			});
	}

	const onModalBoxClick = (event) => {
		event.stopPropagation();
	}

	const onDialogBackgroundClick = (event) => {
		setUsernameInputErrorMarkedState(false);
		toggleLoginEditDialogVisibility(false);

		setPasswordInputErrorMarkedState(false);
		setSecondPasswordInputErrorMarkedState(false);
		togglePasswordEditDialogVisibility(false);
	}


	useEffect(() => {
		document.body.style.backgroundColor = "#FAFAFA";

		getCourseList().then((courseList) => {
				if (courseList != null)
				{
					let finalCourseList = [];

					for (let courseKey in courseList)
					{
						if (authContext.userData.courses.includes(courseList[courseKey]['id']) === true)
						{
							let courseStruct = {
								id: courseList[courseKey]['id'],
								name: courseList[courseKey]['name']
							};

							finalCourseList.push(courseStruct);
						}
					}

					setCourseList(finalCourseList);
				}
			});
	}, []);

	return (
		<React.Fragment>
			<Header isThemeDark={ false } />

			<ProfilePageSection>
				<ProfilePageSectionName>Мой профиль</ProfilePageSectionName>

				<ProfileInfo style={ { marginBottom: "20px" } }>Логин: { authContext.userData.username }</ProfileInfo>
				<ProfileInfo style={ { marginBottom: "40px" } }>Пароль: { authContext.userData.password }</ProfileInfo>

				<VioletButton style={ { marginBottom: "14px" } } onClick={ onEditLoginClick }>Редактировать логин</VioletButton>
				<VioletButton onClick={ onEditPasswordClick }>Редактировать пароль</VioletButton>
			</ProfilePageSection>
			<ProfilePageSection>
				<ProfilePageSectionName>Мои курсы</ProfilePageSectionName>
				{(courseList != null) && (
					<CourseList>
					{
						courseList.map((course) => {
								return <CourseButtonPurchased courseName={ course.name } courseId={ course.id }></CourseButtonPurchased>
							})
					}
					</CourseList>)
				}
			</ProfilePageSection>

			{
				isLoginEditDialogVisible && (
					<DialogBase onClick={ onDialogBackgroundClick }>
						<ModalBox onClick={ onModalBoxClick }>
							<Link to="/">
								<LogoImg src='img/logo_dark.png' alt="Logo" />
							</Link>
							<ModalBoxH3>Новый логин:</ModalBoxH3>
							<StandardInput placeholder="Логин" style={ LocalInputCommonStyle } ref={ newLoginInputRef } onInput={ onNewUsernameInputInput }
								isErrorMarked={ isLoginInputErrorMarked }></StandardInput>
							<VioletButton style={ LocalButtonCommonStyle } onClick={ onSaveLoginChangesClick }>Сохранить</VioletButton>
						</ModalBox>
					</DialogBase>
				)
			}

			{
				isPasswordEditDialogVisible && (
					<DialogBase onClick={ onDialogBackgroundClick }>
						<ModalBox onClick={ onModalBoxClick }>
							<Link to="/">
								<LogoImg src='img/logo_dark.png' alt="Logo" />
							</Link>
							<ModalBoxH3>Новый пароль:</ModalBoxH3>
							<StandardInput placeholder="Пароль" type="password" style={ LocalInputCommonStyle } ref={ newPasswordInputRef }
								onInput={ onNewPasswordInputInput } isErrorMarked={ isPasswordInputErrorMarked }></StandardInput>
							<StandardInput placeholder="Повторите пароль" type="password" style={ LocalInputCommonStyle } ref={ secondPasswordInputRef }
								onInput={ onSecondPasswordInputInput } isErrorMarked={ isSecondPasswordInputErrorMarked }></StandardInput>
							<VioletButton style={ LocalButtonCommonStyle } onClick={ onSavePasswordChangesClick }>Сохранить</VioletButton>
						</ModalBox>
					</DialogBase>
				)
			}

		</React.Fragment>);
}
