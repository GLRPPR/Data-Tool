import React from 'react';
import { shallow } from 'enzyme';
import SearchUtility from 'components/SearchUtility.js';

describe('<SearchUtility />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<SearchUtility />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "searchutility-component"', function () {
      expect(component.hasClass('searchutility-component')).to.equal(true);
    });
  });
});
