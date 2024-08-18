import React from 'react';
import './Create.scss';

const Create = () => {
  return (
    <div className="create-page">
      <header className="create-page-header">
        <div className="create-page-header-content">
          <h1>Turn your unique ideas into limited-edition merchandise that your fans will love — with no upfront costs and turn-key support from Plush.fun </h1>
          <p>
            We handle everything—from designing plushies and running crowdfunding campaigns to manufacturing, shipping, and customer support—so you can stay focused on what you do best: engaging with your fans.
          </p>
          <button className="get-started-button">Get Started Now</button>
        </div>
        <div className="create-page-header-image">
          <img src="/assets/launch-campaign/start-a-campaign-masthead-new.png" alt="Image for Start a  Campaign" />
        </div>
      </header>

      <section className="why-choose-us">
        <h2>Why Choose Plush.fun</h2>
        <div>
          <li>End-to-end support with your approval at every key step</li>
          <li>No upfront costs for you as a creator</li>
          <li>Fast production and shipping cycle</li>
          <li>Strict quality control</li>
          <li>A team experienced in manufacturing and supply chain management</li>
        </div>
      </section>

      <section className="get-started">
        <h2>How to Launch Your Own Campaign</h2>
        <div>
          <p> <strong> 1.	Reach Out:</strong> If you’re a content creator or influencer with an engaged community, contact us [link] to discuss your plushie ideas. If you are in Miami, let’s just grab a coffee. We typically work with influencers who have 50K+ followers, but we’re open to discussing any engaged community.</p>
          <p> <strong> 2. Design & Plan</strong> `We’ll design the plush toy with your input, finalize the details, and set the dates for your crowdfunding campaign.</p>
          <p> <strong> 3. Promote</strong> Your campaign will run for 30 days, during which you’ll promote it through your social media channels.</p>
          <p> <strong> 4.	Production & Shipping:</strong> Once the campaign is successfully funded, we’ll handle manufacturing and shipping worldwide. We’ll also manage all customer support, and transfer the net funds to you after deducting production costs and fees.</p>
        </div>
      </section>

     
    </div>
  );
};

export default Create;
