import React from 'react';
import renderer from 'react-test-renderer';
import Register from './Register';

it('Register', () => {
    const tree=renderer.create(<Register />).toJSON();
    expect(tree).toMatchSnapshot();
})