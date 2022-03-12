import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Recipe from '../components/Recipe';
import RecipeDetails from '../components/RecipeDetails';
import * as colors from '../theme_variables';

const Wrapper = styled.div`
  background-color: ${colors.Secondary1};
  color: ${colors.Primary1};
  min-height: 100vh;
  padding: 1rem 3rem;
  @media (max-width: 500px) {
    padding: 1rem;
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
const InputBox = styled.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  .filters {
    background-color: ${colors.Secondary1};
    padding: 0rem;
    height: 0;
    border-radius: 10px;
    z-index: 0;
    opacity: 0;
    display: flex;
    flex-direction: row;
    transform: translateY(-100%);
    justify-content: space-evenly;
    flex-wrap: wrap;
    overflow: hidden;
    transition: all 400ms ease-in-out;
    &.active {
      opacity: 1;
      transform: translateY(0%);
      padding: 1rem;
      height: 100%;
    }
    select {
      font-size: 1.2rem;
      background-color: ${colors.Secondary2};
      color: ${colors.Primary1};
      border: 2px solid ${colors.Primary1};
      border-radius: 10px;
      padding: 0.5rem 1rem;
      width: 10rem;
      margin: 0.5rem 0;
      transition: all 200ms ease-in-out;

      cursor: pointer;
      outline: none;
      &:hover {
        border: 2px solid transparent;
        color: ${colors.Secondary1};
        background-color: ${colors.Primary1};
      }
    }
  }
  div {
    z-index: 100;
    display: flex;
    flex-direction: row;

    input {
      width: 100%;
      font-size: 1.2rem;
      border: 2px solid transparent;
      background-color: ${colors.Primary1};
      padding: 1rem 1rem;
      outline: none;
      color: ${colors.Secondary1};
      transition: all 200ms ease-in-out;
      &:focus {
        background-color: ${colors.Secondary1};
        color: ${colors.Primary1};
        border: 2px solid ${colors.Primary1};
        &::placeholder {
          color: ${colors.Primary1};
        }
      }
      &::placeholder {
        color: ${colors.Secondary1};
        opacity: 1;
        font-weight: thin;
      }
    }
  }
  @media (max-width: 500px) {
    width: 100%;
    padding: 0rem;
    .filters {
      flex-direction: column;
      select {
        width: 100%;
      }
    }
  }
`;
const Recipes = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(5, 1fr);
  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const SearchButton = styled.button`
  display: inline-block;
  padding: 1rem;
  border-radius: 0 10px 10px 0;
  font-size: 1.2rem;
  border: 2px solid ${colors.Primary1};
  border-left: none;
  color: ${colors.Primary1};
  background-color: ${colors.Secondary1};
  cursor: pointer;
  transition: all 200ms ease-in-out;
  &:hover {
    color: ${colors.Secondary1};
    background-color: ${colors.Primary1};
    border-color: transparent;
  }
`;
const NotFound = styled.p`
  font-size: 2rem;
`;
const NextPageButton = styled.button`
  display: inline-block;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1.2rem;
  border: 2px solid ${colors.Primary1};
  color: ${colors.Primary1};
  background-color: ${colors.Secondary1};
  cursor: pointer;
  transition: all 200ms ease-in-out;
  display: block;
  margin: 1rem auto;
  width: 100%;
  max-width: 500px;
  &:hover {
    color: ${colors.Secondary1};
    background-color: ${colors.Primary1};
    border-color: transparent;
  }
`;
const ShowFilters = styled.div`
  display: inline-block;
  padding: 1rem;
  border-radius: 10px 0 0 10px;
  border: 2px solid ${colors.Primary1};
  border-right: none;
  background-color: ${colors.Secondary1};
  cursor: pointer;
  transition: all 200ms ease-in-out;
  &.active {
    background-color: ${colors.Primary1};
    color: ${colors.Secondary1};
    border-color: transparent;
  }
`;

const Home = () => {
  const [diet, setDiet] = useState('');
  const [health, setHealth] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [mealType, setMealType] = useState('');
  const [dishType, setDishType] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const back = () => {
    setSelectedRecipe(null);
  };
  const nextPageHandler = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    axios.get(data._links.next.href).then((res) => setData(res.data));
  };
  const getDataFromAPI = () => {
    setLoading(true);
    let dietQuery = '';
    if (diet !== '') {
      dietQuery = `&diet=${diet}`;
    }
    let searchQuery = '';
    if (searchInput !== '') {
      searchQuery = `&q=${searchInput}`;
    }
    let healthQuery = '';
    if (health !== '') {
      healthQuery = `&health=${health}`;
      healthQuery = encodeURI(healthQuery);
    }
    let cuisineQuery = '';
    if (cuisineType !== '') {
      cuisineQuery = `&cuisineType=${cuisineType}`;
      cuisineQuery = encodeURI(cuisineQuery);
    }
    let mealQuery = '';
    if (mealType !== '') {
      mealQuery = `&mealType=${mealType}`;
      mealQuery = encodeURI(mealQuery);
    }
    let dishQuery = '';
    if (dishType !== '') {
      dishQuery = `&dishType=${dishType}`;
      dishQuery = encodeURI(dishQuery);
    }
    axios
      .get(
        `https://api.edamam.com/api/recipes/v2?type=public${searchQuery}${dietQuery}${healthQuery}${cuisineQuery}${mealQuery}${dishQuery}&app_id=f8fcabcc&app_key=0da9a134a6f9ec4433fb763b0e306aed`
      )
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  let display = null;
  if (selectedRecipe !== null) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    display = (
      <RecipeDetails back={back} apiUrl={selectedRecipe}></RecipeDetails>
    );
  } else {
    display = (
      <Fragment>
        <InputBox>
          <div>
            <ShowFilters
              className={showFilters ? 'active' : ''}
              onClick={() => setShowFilters(!showFilters)}
            >
              <i className='fas fa-arrow-down'></i>
            </ShowFilters>
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type='text'
              placeholder='Search'
            />
            <SearchButton onClick={getDataFromAPI}>
              <i className='fas fa-search'></i>
            </SearchButton>
          </div>
          <div className={showFilters ? 'filters active' : 'filters'}>
            <select
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              name='diet'
              id='diet'
            >
              <option value=''>Diet</option>
              <option value='balanced'>Balanced</option>
              <option value='high-fiber'>High Fiber</option>
              <option value='high-protein'>High Protein</option>
              <option value='low-carb'>Low Carb</option>
              <option value='low-fat'>Low Fat</option>
              <option value='low-sodium'>Low Sodium</option>
            </select>
            <select
              value={health}
              onChange={(e) => setHealth(e.target.value)}
              name='health'
              id='id'
            >
              <option value=''>Health</option>
              <option value='alcohol-free'>Alcohol Free</option>
              <option value='celery-free'>Celery Free</option>
              <option value='crustacean-free'>Crustacean Free</option>
              <option value='dairy-free'>Dairy Free</option>
              <option value='egg-free'>Egg Free</option>
              <option value='fish-free'>Fish Free</option>
              <option value='fodmap-free'>Fodmap Free</option>
              <option value='gluten-free'>Gluten Free</option>
              <option value='immuno-supportive'>Immuno Supportive</option>
              <option value='keto-friendly'>Keto Friendly</option>
              <option value='kidney-friendly'>Kidney Friendly</option>
              <option value='kosher'>Kosher</option>
              <option value='low-fat-abs'>Low Fat Abs</option>
              <option value='low-potassium'>Low Potassium</option>
              <option value='low-sugar'>Low Sugar</option>
              <option value='lupine-free'>Lupine Free</option>
              <option value='mustard-free'>Mustard Free</option>
              <option value='no-oil-added'>No Oil Added</option>
              <option value='paleo'>Paleo</option>
              <option value='peanut-free'>Peanut Free</option>
              <option value='pescatarian'>Pescatarian</option>
              <option value='pork-free'>Pork Free</option>
              <option value='red-meat-free'>Red Meat Free</option>
              <option value='sesame-free'>Sesame Free</option>
              <option value='shellfish-free'>Shellfish Free</option>
              <option value='soy-free'>Soy Free</option>
              <option value='sugar-conscious'>Sugar Conscious</option>
              <option value='tree-nut-free'>Tree Nut Free</option>
              <option value='vegan'>Vegan</option>
              <option value='vegetarian'>Vegetarian</option>
              <option value='wheat-free'>Wheat Free</option>
            </select>
            <select
              name='cuisineType'
              id='cuisineType'
              value={cuisineType}
              onChange={(e) => setCuisineType(e.target.value)}
            >
              <option value=''>Cuisine Type</option>
              <option value='American'>American</option>
              <option value='Asian'>Asian</option>
              <option value='British'>British</option>
              <option value='Caribbean'>Caribbean</option>
              <option value='Central Europe'>Central Europe</option>
              <option value='Chinese'>Chinese</option>
              <option value='Eastern Europe'>Eastern Europe</option>
              <option value='French'>French</option>
              <option value='Indian'>Indian</option>
              <option value='Italian'>Italian</option>
              <option value='Japanese'>Japanese</option>
              <option value='Kosher'>Kosher</option>
              <option value='Mediterranean'>Mediterranean</option>
              <option value='Mexican'>Mexican</option>
              <option value='Middle Eastern'>Middle Eastern</option>
              <option value='Nordic'>Nordic</option>
              <option value='South American'>South American</option>
              <option value='South East Asian'>South East Asian</option>
            </select>
            <select
              name='mealType'
              id='mealType'
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value=''>Meal Type</option>
              <option value='Breakfast'>Breakfast</option>
              <option value='Dinner'>Dinner</option>
              <option value='Lunch'>Lunch</option>
              <option value='Snack'>Snack</option>
              <option value='Teatime'>Teatime</option>
            </select>
            <select
              name='dishType'
              id='dishType'
              value={dishType}
              onChange={(e) => setDishType(e.target.value)}
            >
              <option value=''>Dish Type</option>
              <option value='Biscuits and cookies'>Biscuits and cookies</option>
              <option value='Bread'>Bread</option>
              <option value='Cereals'>Cereals</option>
              <option value='Condiments and sauces'>
                Condiments and sauces
              </option>
              <option value='Desserts'>Desserts</option>
              <option value='Main course'>Main course</option>
              <option value='Preps'>Preps</option>
              <option value='Preserve'>Preserve</option>
              <option value='Sandwiches'>Sandwiches</option>
              <option value='Side dish'>Side dish</option>
              <option value='Soup'>Soup</option>
              <option value='Starter'>Starter</option>
              <option value='Sweets'>Sweets</option>
            </select>
          </div>
        </InputBox>
        {data && data.count !== 0 ? (
          <Recipes>
            {data.hits.map((recipe) => {
              return (
                <Recipe
                  setSelectedRecipe={setSelectedRecipe}
                  key={recipe.recipe.url}
                  name={recipe.recipe.label}
                  img={recipe.recipe.image}
                  cuisineType={recipe.recipe.cuisineType}
                  dietLabels={recipe.recipe.dietLabels}
                  mealType={recipe.recipe.mealType}
                  dishType={recipe.recipe.dishType}
                  link={recipe._links.self.href}
                />
              );
            })}
          </Recipes>
        ) : (
          <div>
            {data.count !== 0 ? (
              <NotFound>
                Please type something <br /> or select some filters.
              </NotFound>
            ) : (
              <NotFound>
                We have not found what you are looking for. Please try again.
              </NotFound>
            )}
          </div>
        )}
        {data && (
          <NextPageButton onClick={nextPageHandler}>Next page</NextPageButton>
        )}
      </Fragment>
    );
  }
  return (
    <div>
      <Wrapper>
        {loading ? (
          <Spinner>
            <div className='loader'></div>
          </Spinner>
        ) : (
          display
        )}
      </Wrapper>
    </div>
  );
};

export default Home;
