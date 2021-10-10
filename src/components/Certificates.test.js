import React from 'react';
import renderer from 'react-test-renderer';
import Certificates from './Certificates';

it('Certificates', () => {
    const tree=renderer.create(<Certificates />).toJSON();
    expect(tree).toMatchSnapshot();
})