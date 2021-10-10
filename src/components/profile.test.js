import React from 'react';
import renderer from 'react-test-renderer';
import profile from './profile';

it('profile', () => {
    const tree=renderer.create(<profile />).toJSON();
    expect(tree).toMatchSnapshot();
})