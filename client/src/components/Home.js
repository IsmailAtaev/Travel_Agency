import React from "react";
import Slider from "./Slider";
import SearchBar from "./search/SearchBar";
import MainPageInfo from "./mainPage/MainPageInfo";

const Home = () => {
  return (
    <div>
      <Slider />
      <SearchBar />
      <MainPageInfo />
    </div>
  );
};

export default Home;
