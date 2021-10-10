import React from 'react';
import renderer from 'react-test-renderer';
import Editevents from './Editevents';

it('Editevents', () => {
    const tree=renderer.create(<Editevents />).toJSON();
    expect(tree).toMatchSnapshot();
})