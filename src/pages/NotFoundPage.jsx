import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const NotFoundPageBase = styled.div`
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
	padding-bottom: 38px;

	width: 220px;
	height: fit-content;
`;

const ErrorCode = styled.h1`
	margin-bottom: 20px;

	font-weight: 400;
	font-size: 64px;
	line-height: 72px;
	letter-spacing: -0.8px;
`

const ErrorText = styled.p`
	margin-bottom: 32px;

	font-weight: 400;
	font-size: 24px;
	line-height: 32px;
`

const RedirectText = styled(Link)`
	color: #696969;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	text-align: center;
	text-decoration: none;

	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}

	&:active {
		text-decoration: none;
	}
`


export const NotFoundPage = () => {
	useEffect(() => {
		document.body.style.backgroundColor = "#F5F5F5";
	}, []);

	return (
		<NotFoundPageBase>
			<ModalBox>
				<LogoImg src='/img/logo_dark.png' alt="Logo" />
				<ErrorCode>404</ErrorCode>
				<ErrorText>Страница не была найдена</ErrorText>
				<RedirectText to={ '/' }>На главную страницу</RedirectText>
			</ModalBox>
		</NotFoundPageBase>);
}
