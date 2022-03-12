import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import * as colors from '../theme_variables';
import logo from '../assets/logo.png';

const Nav = styled.div`
  z-index: 100;
  max-height: 5rem;
  background-color: ${colors.Primary2};
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding: 1rem 3rem;
  h1 {
    color: ${colors.Primary1};
  }
  ul {
    height: 100%;
    display: flex;
    li {
      padding: 0.5rem 1rem;
      height: 100%;
      list-style: none;
      border-radius: 15px;
      margin: 0 0.5rem;
      background-color: ${colors.Primary2};
      border: 2px solid ${colors.Primary1};
      transition: all 200ms ease-in-out;
      &:hover {
        background-color: ${colors.Primary1};
        border: 2px solid transparent;
        a {
          color: ${colors.Primary2};
        }
      }
      a {
        font-size: 1.2rem;
        font-weight: 400;
        text-decoration: none;
        color: ${colors.Primary1};
      }
    }
  }
  @media (max-width: 500px) {
    flex-direction: column;
    max-height: 7rem;
    justify-content: center;
    ul {
      li {
        margin-top: 0.2rem;
        padding: 0.25rem 0.5rem;
      }
    }
  }
`;
const Image = styled.img`
  display: inline-block;
  height: 3rem;
  @media (max-width: 500px) {
    height: 2rem;
    margin-bottom: 1rem;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Image src={logo}></Image>
      <ul>
        <li>
          <NavLink activeClassName='active' to='/' exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName='active' to='/about'>
            About
          </NavLink>
        </li>
      </ul>
    </Nav>
  );
};

export default Navbar;
