import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../authContext";
import { useState } from "react";


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

const AccoutBlock = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const AccoutUsername = styled.h2`
  color: ${ props => (props.isThemeDark ? '#FFFFFF': '#000000') };
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.1px;
`;

const AccoutAvatarImg = styled.img`
  width: 50px;
  height: 50px;
`;

const AccoutRollOutBlock = styled.div`
  width: fit-content;
  height: fit-content;

  cursor: pointer;
`;

const AccoutMenu = styled.div`
  padding: 32px 46px 50px 46px;

  position: absolute;
  top: 60px;
  z-index: 200;

  background-color: #FFFFFF;
  border-radius: 12px
`;

const AccoutMenuButton = styled.div`
	margin: 0 auto;
	padding: 12px 50px 16px 50px;

	width: 180px;
	height: fit-content;

	display: block;
	box-sizing: border-box;

	background-color: #580EA2;
	border-radius: 46px;

	color: #FFFFFF;
	text-align: center;

	cursor: pointer;

	&:hover {
		background-color: #3F007D;
	}

	&:active {
		background-color: #271A58;
	}
`;


export const Header = (props) => {
  const [ isAccoutMenuRolledOut, toggleAccoutMenuVisibility ] = useState(false);

  const authContext = useAuthContext();

  const onRollOutAccoutMenuClick = () => {
    toggleAccoutMenuVisibility(!isAccoutMenuRolledOut);
  }

  const onLogOutButtonClick = () => {
    authContext.signOut();
  }

	return (
		<HeaderDiv>
			<Link to={ '/' }>
				<LogoImg src={ (props.isThemeDark === true) ? 'img/logo_bright.png' : 'img/logo_dark.png' } alt="Logo" />
			</Link>

      {(authContext.userData == null) && (
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <AuthenticationButton>Войти</AuthenticationButton>
          </Link>
        )}

      {(authContext.userData != null) && (
          <AccoutBlock>
            <AccoutAvatarImg src="img/avatarPlaceholder.svg" alt="Avatar"/>
            <AccoutUsername isThemeDark={ props.isThemeDark }>{ authContext.userData.username }</AccoutUsername>
            <AccoutRollOutBlock onClick={ onRollOutAccoutMenuClick }>
              <svg width="14" height="14" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.3552 1.03308L6.67761 6.7107L0.999999 1.03308" stroke={ (props.isThemeDark) ? "#FFFFFF" : "#000000" } stroke-width="2"/>
              </svg>
            </AccoutRollOutBlock>

            {isAccoutMenuRolledOut && (
              <AccoutMenu>
                <Link to="/profile" style={{ textDecoration: 'none' }}>
                  <AccoutMenuButton style={{ marginBottom: "8px"  }}>Профиль</AccoutMenuButton>
                </Link>
                <AccoutMenuButton onClick={ onLogOutButtonClick }>Выйти</AccoutMenuButton>
              </AccoutMenu>)}
          </AccoutBlock>
        )}
			
		</HeaderDiv>
		);
}
