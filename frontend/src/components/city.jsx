import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import styled from "styled-components";
import { useRestaurantStore } from "../stores/restaurantStore";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const tablet = `(min-width: 640px)`;
const desktop = `(min-width: 1007px)`;

const PageContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  min-height: 100vh;
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 25px;
  color: #01999a;
  font-family: "JosefinSans";

  @media ${tablet} {
    text-align: center;
    margin-bottom: 35px;
    color: #01999a;
    font-size: 32px;
    font-family: "JosefinSans";
  }

  @media ${desktop} {
    text-align: center;
    margin-bottom: 35px;
    color: #01999a;
    font-size: 32px;
    font-family: "JosefinSans";
  }
`;
const MoodSelectorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  width: 100%;
  /* max-width: 1200px; */
  margin-bottom: 15px;
  font-family: "JosefinSans";

  @media ${tablet} {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 5px;
    width: 100%;
    /* max-width: 1200px; */
    margin-bottom: 35px;
    font-family: "JosefinSans";
  }

  @media ${desktop} {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 100%;
    max-width: 1800px;
    margin-bottom: 40px;
    font-family: "JosefinSans";
  }
`;

const MoodButton = styled.button`
  color: white;
  border: solid white;
  padding: 8px 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-family: "JosefinSans";
  margin: 4px 4px;
  transition-duration: 0.2s;
  background-color: ${(props) => (props.selected ? "#01999A" : "#FCABE3")};

  &:hover {
    background-color: white;
    color: #01999a;
    /* border: solid #01999a; */
  }

  &:active {
    transform: translateY(1px);
  }

  @media ${tablet} {
    color: white;
    border: solid white;
    padding: 12px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 25px;
    margin: 4px 4px;
    transition-duration: 0.2s;
    background-color: ${(props) => (props.selected ? "#01999A" : "#FCABE3")};

    &:hover {
      background-color: white;
      color: #01999a;
      /* border: solid #01999a; */
      /* font-size: 25px; */
    }

    &:active {
      transform: translateY(1px);
    }
  }
  @media ${desktop} {
    color: white;
    border: solid white;
    padding: 12px 12px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 30px;
    margin: 4px 4px;
    transition-duration: 0.2s;
    background-color: ${(props) => (props.selected ? "#01999A" : "#FCABE3")};

    &:hover {
      background-color: white;
      color: #01999a;
      /* border: solid #01999a; */
      /* font-size: 32px; */
    }

    &:active {
      transform: translateY(1px);
    }
  }
`;

const BackButton = styled.button`
  background-color: white;
  color: #01999a;
  border: solid #01999a;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  flex-direction: column;
  font-size: 16px;
  font-family: "JosefinSans";
  margin: 6px 2px;
  transition-duration: 0.4s;

  &:hover {
    background-color: white;
    border: solid #fcabe3;
  }

  &:active {
    transform: translateY(1px);
  }

  @media ${tablet} {
    background-color: white;
    color: #01999a;
    border: solid #01999a;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    flex-direction: column;
    font-size: 22px;
    font-family: "JosefinSans";
    margin: 4px 2px;
    transition-duration: 0.4s;

    &:hover {
      background-color: white;
      border: solid #fcabe3;
      font-size: 24px;
    }

    &:active {
      transform: translateY(1px);
    }
  }

  @media ${desktop} {
    background-color: white;
    color: #01999a;
    border: solid #01999a;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    flex-direction: column;
    font-size: 22px;
    font-family: "JosefinSans";
    margin: 4px 2px;
    transition-duration: 0.4s;

    &:hover {
      background-color: white;
      border: solid #fcabe3;
      font-size: 24px;
    }

    &:active {
      transform: translateY(1px);
    }
  }
`;

const ResultsButton = styled.button`
  background-color: #fcabe3;
  color: white;
  border: solid yellow;
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  margin: 2px 2px;
  transition-duration: 0.4s;
  font-family: "JosefinSans";

  &:hover {
    background-color: white;
    color: yellow;
    border: solid #fcabe3;
    font-size: 20px;
  }

  &:active {
    transform: translateY(1px);
  }

  @media ${tablet} {
    background-color: #fcabe3;
    color: white;
    border: solid yellow;
    padding: 10px 15px;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 25px;
    margin: 2px 2px;
    transition-duration: 0.4s;
    font-family: "JosefinSans";

    &:hover {
      background-color: white;
      color: yellow;
      border: solid #fcabe3;
      font-size: 27px;
    }

    &:active {
      transform: translateY(1px);
    }
  }

  @media ${desktop} {
    background-color: #fcabe3;
    color: white;
    border: solid yellow;
    padding: 10px 15px;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 25px;
    margin: 2px 2px;
    transition-duration: 0.4s;
    font-family: "JosefinSans";

    &:hover {
      background-color: white;
      color: yellow;
      border: solid #fcabe3;
      font-size: 27px;
    }

    &:active {
      transform: translateY(1px);
    }
  }
`;

const CitySelector = () => {
    const {
      cities,
      selectedCities,
      setSelectedCities,
      fetchCities,
      fetchResults,
    } = useRestaurantStore();
  
    const [resultsButtonClicked, setResultsButtonClicked] = useState(false);
  
    useEffect(() => {
      fetchCities(); // Fetch cities when the component mounts
    }, [fetchCities]);
  
    const handleCityClick = (city) => {
      setSelectedCities(city); // Update selected cities array
    };
  
    const handleResultsButtonClick = async () => {
      if (selectedCities.length > 0) {
        setResultsButtonClicked(true);
        await fetchResults(); // Ensure this function is implemented to handle multiple cities
      } else {
        console.log("Please select a city.");
      }
    };
  
    const navigate = useNavigate();
    const handleBackButtonClick = () => {
      navigate("/"); // Adjust the navigation path
    };
  
    return (
        <PageContainer>
          <Navbar />
          <TitleContainer>
            <h2>Please select a city</h2>
          </TitleContainer>
          <MoodSelectorContainer>
            {cities && cities.length > 0 ? (
              cities.map((city) => (
                <MoodButton
                  key={city}
                  onClick={() => handleCityClick(city)}
                  selected={selectedCities.includes(city)}
                >
                  {city}
                  </MoodButton>
          ))
        ) : (
          <p>Loading cities...</p> // or any other placeholder
        )}
      </MoodSelectorContainer>
  
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <BackButton onClick={handleBackButtonClick}>Back</BackButton>
          <Link to="/result">
            <ResultsButton
              onClick={handleResultsButtonClick}
              $clicked={resultsButtonClicked}
            >
              To Results
            </ResultsButton>
          </Link>
        </div>
        <Footer />
      </PageContainer>
    );
  };
  
  export default CitySelector;