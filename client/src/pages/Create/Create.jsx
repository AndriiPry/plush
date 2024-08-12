import React from 'react';
import './Create.scss';

const Create = () => {
  return (
    <div className="create-page">
      <header className="create-page-header">
        <div className="create-page-header-content">
          <h1>Turn your passion into <span className="highlight">product</span></h1>
          <p>
            Developing a high quality, limited edition product for your fans has never been easier! 
            Plush.fun will work with you to design, sell, promote, and manufacture a custom product created by you, for your fans! 
            And the best part? It's low risk with no costs up front!
          </p>
          <button className="get-started-button">Get Started Now</button>
        </div>
        <div className="create-page-header-image">
          <img src="/assets/launch-campaign/start-a-campaign-masthead-new.png" alt="Start a Campaign" />
        </div>
      </header>

      <section className="past-campaigns">
        <h2>Custom Collectibles for Your Fans</h2>
        <div className="campaigns">
          <div className="campaign">
            <div className="campaign-details">
              <div className="campaign-avatar">
                <img src="/assets/launch-campaign/abitoads-avatar.png" alt="AbiToads" />
              </div>
              <p className="creator-name">AbiToads</p>
              <p className="followers">70k followers</p>
              <p className="sold">1,576 sold</p>
              <a href="/products/fly-agaric-mushling-plush" target="_blank" className="view-product-link">View Product</a>
            </div>
            <div className="campaign-image">
              <img src="/assets/launch-campaign/fly-agaric-mushling.png" alt="Fly Agaric Mushling" />
              <p className="campaign-title">Fly Agaric Mushling</p>
            </div>
          </div>
          {/* Add more campaigns similarly */}
        </div>
      </section>

      <section className="why-choose-us">
        <h2>Why choose us?</h2>
        <div className="benefits">
          <div className="benefit">
            <img src="/assets/launch-campaign/limited-edition.png" alt="Limited Edition Product" />
            <h5>Limited Edition Product</h5>
            <p>Every product we sell is part of a limited run and is tagged to showcase exactly how many were produced, making your product a limited edition collectible.</p>
          </div>
          {/* Add more benefits similarly */}
        </div>
      </section>

      <section className="get-started">
        <h4>Get Started</h4>
        <p>We'll guide you through the entire process</p>
        <div className="steps">
          <div className="step">
            <img src="/assets/launch-campaign/get_started_lightbulb.png" alt="Inspiration" />
            <p>You provide inspiration for your product</p>
          </div>
          {/* Add more steps similarly */}
        </div>
        <button className="get-started-button">Get Started</button>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <img src="/assets/footer-logo.svg" alt="Plush.fun Logo" className="footer-logo" />
          <div className="social-links">
            <a href="https://www.twitter.com/plushfun" target="_blank">
              <img src="/assets/icons/twitter-icon.svg" alt="Twitter" />
            </a>
            {/* Add more social links similarly */}
          </div>
        </div>
        <p>© 2024 Plush.fun Ltd.</p>
      </footer>
    </div>
  );
};

export default Create;
