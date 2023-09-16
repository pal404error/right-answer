import React from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";
import fastfood2 from "../images/fastfood2.jpg";
import "../styles/HomeStyles.css";

const Home = () => {
  return (
    <Layout>
      <div className="home" style={{ backgroundImage: `url(${fastfood2})` }}>
        <div className="headerContainer">
          <h1>Right Answer</h1>
        
          <Link to="/menu">
            <button>ORDER NOW</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
