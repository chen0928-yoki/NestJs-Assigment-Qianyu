// pages/index.js
"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

const Cocktail = () => {
  const [cocktail, setCocktail] = useState(null);
  const storedSearchTerm = localStorage.getItem('weatherDescription');

  useEffect(() => {
    const fetchRandomCocktail = async () => {
      try {
        const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        setCocktail(response.data.drinks[0]);
      } catch (error) {
        console.error('Error fetching random cocktail:', error);
      }
    };

    fetchRandomCocktail();

    // Cleanup function
    return () => {
      // Cleanup logic if needed
    };
  }, []); // Empty dependency array ensures useEffect only runs once on component mount

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Welcome to My Cocktail Bar</h1>
      <h2 className="text-2xl mb-2">{storedSearchTerm} Cocktail Combination</h2>
      {cocktail && (
        <div className="flex flex-col items-center">
          <h3 className="text-xl mb-2">{cocktail.strDrink}</h3>
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="max-w-md mb-2" />
          <p className="text-center">{cocktail.strInstructions}</p>
          {/* You can display more details of the cocktail here */}
        </div>
      )}
    </div>

  );
};

export default Cocktail;
