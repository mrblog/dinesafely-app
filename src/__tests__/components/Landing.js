import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson  } from 'enzyme-to-json';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "localhost:3000/"
    })
}));

import Landing from '../../components/Landing/Landing'

it('renders correctly when there are no parameters', () => {
    Enzyme.configure({ adapter: new Adapter() });

    const wrapper = shallow(<Landing />)

    const tree = renderer.create(shallow(<Landing />)).toJSON();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
});