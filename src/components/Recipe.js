import React from 'react';
import styled from 'styled-components';
import * as colors from '../theme_variables';

const Card = styled.div`
  background-color: ${colors.Primary2};
  padding: 1rem;
  border-radius: 10px;
  max-height: 40rem;
  height: 40rem;
  display: flex;
  flex-direction: column;
  .img {
    height: 50%;
    border-radius: 10px 10px 0 0;
  }
  .text {
    padding: 1rem 0rem;
    text-align: center;
    height: 50%;
    border-radius: 0 0 10px 10px;

    h1 {
      color: ${colors.Primary1};
    }
    p {
      padding-top: 1rem;
      text-transform: capitalize;
      span {
        font-weight: bold;
        text-transform: capitalize;
      }
    }
  }
`;
const Labels = styled.div`
  display: block;
  padding-top: 1rem;
  span {
    background-color: ${colors.Primary1};
    display: inline-block;
    color: ${colors.Primary2};
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
    border-radius: 10px;
  }
`;
const MoreButton = styled.button`
  display: block;
  padding: 1rem 0;
  background-color: ${colors.Primary2};
  color: ${colors.Primary1};
  font-size: 1.5rem;
  border: 2px solid ${colors.Primary1};
  border-radius: 10px;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: ${colors.Primary1};
    color: ${colors.Primary2};
    border: 2px solid ${colors.Primary1};
  }
`;

const Recipe = ({
  name,
  img,
  cuisineType,
  dietLabels,
  mealType,
  setSelectedRecipe,
  link,
  dishType,
}) => {
  return (
    <Card data-aos='fade-up'>
      <div
        className='img'
        style={{ background: `url(${img}) center center/cover` }}
      ></div>
      <div className='text'>
        <h1>{name}</h1>
        <p>
          <span>Cuisine: </span>
          {cuisineType[0]}
          <br />
          <span>Meal: </span>
          {mealType[0]}
          <br />
          <span>Dish: </span>
          {dishType[0]}
        </p>
        <Labels>
          {dietLabels.map((item) => {
            return <span key={Math.random() * 10000}>{item}</span>;
          })}
        </Labels>
      </div>
      <MoreButton onClick={() => setSelectedRecipe(link)}>Read More</MoreButton>
    </Card>
  );
};

export default Recipe;
