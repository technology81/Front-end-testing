import React from 'react';
import renderer from 'react-test-renderer';
import PastEvents from './PastEvents';

it('PastEvents', () => {
    const tree=renderer.create(<PastEvents />).toJSON();
    expect(tree).toMatchSnapshot();
})