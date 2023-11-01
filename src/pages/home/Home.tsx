import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";

import Header from "../../components/header/Header";

import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";
import { PropertyTypes } from "../../utils/config";

const Home: React.FC = () => {
  const HOTELS_DATA: string = JSON.stringify(PropertyTypes);

  if (!localStorage.getItem("Inventory")) {
    localStorage.setItem("inventory", HOTELS_DATA);
  } else {
  }
  return (
    <div>
      <Navbar />
      <Header type="" />
      <div className="homeContainer">
        <h1 className="homeTitle">Trending Destinations</h1>
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
      </div>
    </div>
  );
};

export default Home;
