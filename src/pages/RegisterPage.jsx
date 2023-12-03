import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { registerNewUser } from "../api";
import { useAuthContext } from "../authContext";


const RegisterPageBase = styled.div`
	height: 100vh;

	display: flex;
	justify-content: center;
	align-items: center;
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

const StandardButton = styled.div`
	margin: 0 auto;
	padding: 12px 50px 16px 50px;

	width: fit-content;
	height: fit-content;

	display: block;
	box-sizing: border-box;

	background-color: #000000;
	border-radius: 46px;

	color: #FFFFFF;
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


export const RegisterPage = () => {
	const navigate = useNavigate();

	const loginInputRef = useRef(null);
	const passwordInputRef = useRef(null);
	const secondPasswordInputRef = useRef(null);

	const [ isLoginInputErrorMarked, setLoginInputErrorMarkedState ] = useState(false);
	const [ isPasswordInputErrorMarked, setPasswordInputErrorMarkedState ] = useState(false);
	const [ isSecondPasswordInputErrorMarked, setSecondPasswordInputErrorMarkedState ] = useState(false);


	const onLoginInputInput = () => {
		setLoginInputErrorMarkedState(false);
	}

	const onPasswordInputInput = () => {
		setPasswordInputErrorMarkedState(false);
	}

	const onSecondPasswordInputInput = () => {
		setSecondPasswordInputErrorMarkedState(false);
	}

	const onRegisterButtonPress = () => {
		if (loginInputRef.current.value.length === 0)
		{
			setLoginInputErrorMarkedState(true);

			return;
		}

		if (passwordInputRef.current.value.length === 0)
		{
			setPasswordInputErrorMarkedState(true);

			return;
		}

		if (secondPasswordInputRef.current.value.length === 0)
		{
			setSecondPasswordInputErrorMarkedState(true);

			return;
		}

		if (passwordInputRef.current.value !== secondPasswordInputRef.current.value)
		{
			setPasswordInputErrorMarkedState(true);
			setSecondPasswordInputErrorMarkedState(true);

			return;
		}

		registerNewUser({ username: loginInputRef.current.value, password: secondPasswordInputRef.current.value }).then((result) => {
				if (result === true)
				{
					navigate("/login", { replace: true });
				}
			});
	};


	useEffect(() => {
		document.body.style.backgroundColor = "#F5F5F5";
	}, []);

	return (
		<RegisterPageBase>
			<ModalBox>
				<Link to="/">
					<LogoImg src='/img/logo_dark.png' alt="Logo" />
				</Link>
				<StandardInput placeholder="Логин" style={ LocalInputCommonStyle } ref={ loginInputRef }
					onInput={ onLoginInputInput } isErrorMarked={ isLoginInputErrorMarked }></StandardInput>
				<StandardInput placeholder="Пароль" type="password" style={ LocalInputCommonStyle } onInput={ onPasswordInputInput }
					ref={ passwordInputRef } isErrorMarked={ isPasswordInputErrorMarked }></StandardInput>
				<StandardInput placeholder="Повторите пароль" type="password" style={ LocalInputCommonStyle } onInput={ onSecondPasswordInputInput }
					ref={ secondPasswordInputRef } isErrorMarked={ isSecondPasswordInputErrorMarked }></StandardInput>
				<VioletButton style={ LocalButtonCommonStyle } onClick={ onRegisterButtonPress }>Зарегистрироваться</VioletButton>
			</ModalBox>
		</RegisterPageBase>);
}