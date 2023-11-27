import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const HeaderDiv = styled.header`
	margin-bottom: 35px;

	display: flex;
	flex-direction: row;
	justify-content: space-between;
`

const LogoImg = styled.img`
  width: 220px;
  height: fit-content;
`;

const AuthenticationButton = styled.div`
  padding: 6px 16px 6px 16px;

  width: fit-content;
  height: fit-content;

  display: block;
  box-sizing: content-box;

  background-color: #140D40;
  border-radius: 46px;

  color: #FFFFFF;
  text-align: center;

  cursor: pointer;

  &:hover {
    background-color: #2D1F79;
  }

  &:active {
    background-color: #3B29A1;
  }
`;


export const Header = (props) => {
	return (
		<HeaderDiv>
			<Link to={ '/' }>
				<LogoImg src={ (props.isThemeDark === true) ? 'img/logo_bright.png' : 'img/logo_dark.png' } alt="Logo" />
			</Link>
			<Link to="/login" style={{ textDecoration: 'none' }}>
			  <AuthenticationButton>Войти</AuthenticationButton>
      </Link>
		</HeaderDiv>
		);
}
