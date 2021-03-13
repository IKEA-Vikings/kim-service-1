import { shallow, mount, render } from 'enzyme';
import React from 'react';
import About from '../client/components/about.jsx';

describe('About Component', () => {
  it('should display errorMessage if no requests to server', ()=> {
    const wrapper = shallow(<About />);
    expect(wrapper.containsMatchingElement(<div className="errorMessage">This service is currently experiencing technical difficulties. Apologies for the inconvenience.</div>)).toEqual(true);
    wrapper.unmount();
  });

  it ('should display contents of server request if request to server', function() {
    const wrapper = shallow(<About />);
    wrapper.setState({
      brand: "SALBO",
      category: "Frying pan",
      color: "eggshell",
      dataQueried: true,
      moreOptions: false,
      newProduct: false,
      price: 18.5,
      productAvailable: true,
      _id: 78
    });
    expect(wrapper.containsMatchingElement(<div>SALBO</div>)).toEqual(true);
    expect(wrapper.containsMatchingElement(<div>Frying pan, eggshell, <span>{/** query for size */}</span></div>)).toEqual(true);
    expect(wrapper.containsMatchingElement(<div>Available for delivery in select locations</div>)).toEqual(true);
  });

});