import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import * as colors from '../theme_variables';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  @media (max-width: 500px) {
    padding: 0rem 0.2rem;
  }
`;

const BackButton = styled.button`
  display: inline;
  max-width: 10rem;
  padding: 1rem 2rem;
  background-color: ${colors.Secondary1};
  color: ${colors.Primary1};
  font-size: 1.5rem;
  border: 2px solid ${colors.Primary1};
  border-radius: 10px;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: ${colors.Primary1};
    color: ${colors.Secondary1};
    border: 2px solid transparent;
  }
  @media (max-width: 500px) {
    padding: 0.4rem 0.5rem;
    width: 30%;
    max-width: 100rem;
  }
`;
const RecipeInfo = styled.div`
  padding: 2rem;
  display: block;
  margin-top: 2rem;
  margin: 1rem auto;
  width: 100%;
  max-width: 1000px;
  background-color: ${colors.Primary2};
  border-radius: 10px;
  @media (max-width: 500px) {
    padding: 0rem;
  }
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
const Row2 = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  @media (max-width: 500px) {
    flex-direction: column-reverse;
  }
`;
const Image = styled.div`
  background: url(${(props) => props.url}) center center/cover;
  border-radius: 10px 0 0 10px;
  width: 50%;
  @media (max-width: 500px) {
    width: 100%;
    height: 20rem;
    border-radius: 10px 10px 0 0;
  }
`;
const Text = styled.div`
  padding: 0rem 2rem;
  width: 50%;
  text-align: start;
  .tags {
    display: flex;
    flex-wrap: wrap;
    margin: 0.5rem 0;
    span {
      padding: 0.5rem 1rem;
      background-color: ${colors.Primary1};
      color: ${colors.Primary2};
      border-radius: 10px;
      margin: 0.2rem 0.2rem;
      text-transform: capitalize;
    }
  }

  .time,
  .calories {
    font-size: 1.5rem;
    font-weight: 300;
    border-bottom: 1px solid ${colors.Primary1};
    padding: 0.2rem 0;
    @media (max-width: 500px) {
      margin: 0 2rem;
    }
  }
  .labels {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    span {
      font-weight: 300;
      padding: 0.5rem 1rem;
      background-color: ${colors.Primary1};
      color: ${colors.Primary2};
      border-radius: 10px;
    }
  }
  @media (max-width: 500px) {
    padding: 1rem;
    text-align: center;
    width: 100%;
    height: 50%;
    .labels {
      span {
        font-size: 0.7rem;
        padding: 0.25rem 0.5rem;
        font-weight: 800;
      }
    }
  }
`;
const Ingredients = styled.div`
  margin-top: 2rem;
  width: 100%;
  h1 {
    display: inline-block;
    text-align: start;
    margin-bottom: 2rem;
  }
  .ingredient {
    background-color: ${colors.Secondary2};
    display: flex;
    width: 100%;
    max-width: 100%;
    margin-bottom: 2rem;
    padding: 1rem;

    border-radius: 10px;
    border-bottom: 2px solid ${colors.Primary1};
    img {
      border-radius: 10px 0 0 10px;
    }
    div {
      text-transform: capitalize;
      margin-left: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      p {
        display: block;
        text-align: center;
        font-size: 1.3rem;
        span {
          font-weight: bolder;
          text-transform: capitalize;
        }
      }
    }
  }
  @media (max-width: 500px) {
    margin-top: 1rem;
    h1 {
      text-align: center;
      margin-bottom: 1rem;
    }
    .ingredient {
      margin-bottom: 1rem;
      img {
        width: 40%;
      }
      div {
        margin-left: 0.3rem;
        width: 60%;
        h2 {
          font-size: 1.1rem;
        }
        p {
          font-size: 1rem;
        }
      }
    }
  }
`;
const Spinner = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .loader,
  .loader:before,
  .loader:after {
    border-radius: 50%;
  }
  .loader {
    color: ${colors.Primary1};
    font-size: 11px;
    text-indent: -99999em;
    margin: 55px auto;
    position: relative;
    width: 10em;
    height: 10em;
    box-shadow: inset 0 0 0 1em;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .loader:before,
  .loader:after {
    position: absolute;
    content: '';
  }
  .loader:before {
    width: 5.2em;
    height: 10.2em;
    background: ${colors.Primary2};
    border-radius: 10.2em 0 0 10.2em;
    top: -0.1em;
    left: -0.1em;
    -webkit-transform-origin: 5.1em 5.1em;
    transform-origin: 5.1em 5.1em;
    -webkit-animation: load2 2s infinite ease 1.5s;
    animation: load2 2s infinite ease 1.5s;
  }
  .loader:after {
    width: 5.2em;
    height: 10.2em;
    background: ${colors.Primary2};
    border-radius: 0 10.2em 10.2em 0;
    top: -0.1em;
    left: 4.9em;
    -webkit-transform-origin: 0.1em 5.1em;
    transform-origin: 0.1em 5.1em;
    -webkit-animation: load2 2s infinite ease;
    animation: load2 2s infinite ease;
  }
  @-webkit-keyframes load2 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load2 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
const LearnMore = styled.a`
  display: inline;
  max-width: 20rem;
  padding: 1rem 2rem;
  background-color: ${colors.Primary2};
  color: ${colors.Primary1};
  font-size: 1.5rem;
  text-decoration: none;
  border: 2px solid ${colors.Primary1};
  border-radius: 10px;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  margin-bottom: 2rem;
  &:hover {
    background-color: ${colors.Primary1};
    color: ${colors.Primary2};
    border: 2px solid transparent;
  }
  @media (max-width: 500px) {
    margin: 0rem 3rem;
    margin-bottom: 1rem;
  }
`;

const RecipeDetails = ({ apiUrl, back }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get(apiUrl).then((res) => setData(res.data.recipe));
  }, [apiUrl]);
  return (
    <Wrapper>
      <BackButton data-aos='fade-up' onClick={back}>
        Back
      </BackButton>
      {data !== null ? (
        <RecipeInfo>
          <Row>
            <Image url={data.image} alt='image' />
            <Text>
              <h1>{data.label}</h1>
              <p className='tags'>
                <span>{data.cuisineType}</span>
                <span>{data.mealType}</span>
                <span>{data.dishType}</span>
              </p>
              <p className='calories'>
                <span>Calories: </span>
                {Math.floor(data.calories)}
                <span> kcal</span>
              </p>
              <p className='time'>
                <span>Time to cook: </span>
                {Math.floor(data.totalTime)}
                <span> min</span>
              </p>
              <p className='labels'>
                {data.healthLabels.map((label) => {
                  return <span>{label}</span>;
                })}
              </p>
            </Text>
          </Row>
          <Row>
            <Ingredients>
              <Row2>
                <h1>Ingredients:</h1>
                <LearnMore href={data.url}>Learn More</LearnMore>
              </Row2>
              {data.ingredients.map((item) => {
                return (
                  <div className='ingredient' data-aos='fade-up'>
                    <img src={item.image} alt='img' />
                    <div>
                      <h2>{item.text}</h2>
                      <p>
                        Weight: <span>{Math.floor(item.weight)}g</span>
                      </p>
                      <p>
                        Category: <span>{item.foodCategory}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </Ingredients>
          </Row>
        </RecipeInfo>
      ) : (
        <Spinner>
          <div className='loader'></div>
        </Spinner>
      )}
    </Wrapper>
  );
};

export default RecipeDetails;
