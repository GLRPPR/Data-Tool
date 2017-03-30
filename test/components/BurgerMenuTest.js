import React from 'react';
import { shallow } from 'enzyme';
import BurgerMenu from 'components/BurgerMenu.js';

describe('<BurgerMenu />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<BurgerMenu />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "burgermenu-component"', function () {
      expect(component.hasClass('burgermenu-component')).to.equal(true);
    });
  });
});
