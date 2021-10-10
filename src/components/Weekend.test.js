import React from 'react';
import renderer from 'react-test-renderer';
import Weekend from './Weekend';

it('Weekend', () => {
    const tree=renderer.create(<Weekend />).toJSON();
    expect(tree).toMatchSnapshot();
})