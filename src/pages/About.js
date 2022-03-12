import React from 'react';
import styled from 'styled-components';
import * as colors from '../theme_variables';

const Wrapper = styled.div`
  display: block;
  text-align: center;
  font-size: 2rem;
  background-color: ${colors.Secondary1};
  color: ${colors.Primary1};
  min-height: 100vh;
  margin: auto;
  padding: 3rem;
  p {
    span {
      font-weight: bold;
    }
    a {
      margin-top: 1rem;
      display: inline-block;
      padding: 1rem 2rem;
      cursor: pointer;
      background-color: ${colors.Secondary2};
      color: ${colors.Primary1};
      text-decoration: none;
      border-radius: 10px;
      font-weight: bold;
      border: 2px solid ${colors.Primary1};
      &:hover {
        background-color: ${colors.Primary1};
        color: ${colors.Secondary1};
      }
    }
  }
  .social {
    display: inline-block;
    background-color: ${colors.Primary2};
    padding: 1rem 2rem;
    border-radius: 10px;
    margin-top: 2rem;
    transition: all 200ms ease-in-out;
    a {
      margin: 0 0.4rem;
      i {
        transition: all 200ms ease-in-out;
        color: ${colors.Primary1};
        &:hover {
          color: ${colors.Secondary1};
        }
      }
    }
  }
`;

const About = () => {
  return (
    <Wrapper>
      <h1>Nam-Nam App. Hope you like it.</h1>
      <br />
      <br />
      <br />
      <p>
        <span>Developer: </span>
        <a
          target='_blank'
          rel='noreferrer'
          href='https://stefan-nasturas.netlify.app/'
        >
          Stefan Nasturas
        </a>
      </p>
      <div className='social'>
        <a
          target='_blank'
          rel='noreferrer'
          href='https://www.instagram.com/_kingof_darkness_/'
        >
          <i className='fab fa-instagram fa-2x'></i>
        </a>
        <a target='_blank' rel='noreferrer' href='https://github.com/kLaz3r'>
          <i className='fab fa-github fa-2x'></i>
        </a>
        <a
          target='_blank'
          rel='noreferrer'
          href='https://discord.com/users/240478370620506112'
        >
          <i className='fab fa-discord fa-2x'></i>
        </a>
        <a
          target='_blank'
          rel='noreferrer'
          href='https://www.reddit.com/user/kLaz3r'
        >
          <i className='fab fa-reddit fa-2x'></i>
        </a>
      </div>
    </Wrapper>
  );
};

export default About;
