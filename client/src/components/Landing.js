import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <section id="showcase">
        <div className="container">
          <h1>Affordable Professional Survey Mailer</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            luctus ipsum, rhoncus semper magna. Nulla nec magna sit amet sem
            interdum condimentum.
          </p>
          <a href="/auth/google" className="waves-effect waves-light btn-large">
            Try for Free
          </a>
        </div>
      </section>

      <section id="newsletter">
        <div className="container">
          <h1>Email service that can be trusted by everyone.</h1>
        </div>
      </section>

      <section id="boxes">
        <div className="container">
          <div className="box">
            <img src={require("../img/icon-box-1.png")} alt="test" />
            <h3>Design Survey</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              mi augue, viverra sit amet ultricies
            </p>
          </div>
          <div className="box">
            <img src={require("../img/icon-box-2.png")} alt="Test" />
            <h3>Mail Out</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              mi augue, viverra sit amet ultricies
            </p>
          </div>
          <div className="box">
            <img src={require("../img/icon-box-3.png")} />
            <h3>Analyze Data</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              mi augue, viverra sit amet ultricies
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
