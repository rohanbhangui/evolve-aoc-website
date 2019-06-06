import React from 'react';

import { PROJECT_NAME } from '../../utility/variables';

import './about.scss';
import About1 from '../../assets/images/about-1.jpg';

class Contact extends React.Component {
  
  componentDidMount() {
    document.title = `${PROJECT_NAME} - About`;
  }

  render() {

    return (
      <div id="About">
        <div className="hero">
          <div className="hero-content">
            <h2>About</h2>
          </div>
        </div>
        <div className="flex-container" id="section-1">
          <div className="flex-item">
            <h4>Who We Are</h4>
          </div>
          <div className="flex-item">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod culpa laudantium hic atque voluptatem laboriosam deserunt, molestiae ex quaerat quibusdam eos mollitia harum ullam aperiam repellendus aliquam porro. Amet, minima.</p>
          </div>
          <div className="flex-item">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod culpa laudantium hic atque voluptatem laboriosam deserunt, molestiae ex quaerat quibusdam eos mollitia harum ullam aperiam repellendus aliquam porro. Amet, minima.</p>
          </div>
        </div>
        <div className="flex-container" id="section-2">
          <div className="flex-item">
            <div className="text-container">
              <h4>Who We Are</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod culpa laudantium hic atque voluptatem laboriosam deserunt, molestiae ex quaerat quibusdam eos mollitia harum ullam aperiam repellendus aliquam porro. Amet, minima.</p>
              <br/>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod culpa laudantium hic atque voluptatem laboriosam deserunt, molestiae ex quaerat quibusdam eos mollitia harum ullam aperiam repellendus aliquam porro. Amet, minima.</p>
            </div>
          </div>
          <div className="flex-item">
            <img src={About1} alt=""/>
          </div>
        </div>
      </div>
    )
  }
}


export default Contact;
