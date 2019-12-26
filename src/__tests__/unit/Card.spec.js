import Card from '../../components/Card';
import React from 'react';
import { configure, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('displays text', () => {
  const wrapper = render(<Card post={{ text: 'eita' }} />);
  expect(wrapper.find('[data-automation=text]').text()).toEqual('eita');
});

describe('no edit mode', () => {
  it('should show icons edit and delete', () => {
    const wrapper = mount(<Card post={{ text: 'eita' }} />);
    expect(wrapper.exists('[data-automation="editButton"]')).toBeTruthy();
    expect(wrapper.exists('[data-automation="deleteButton"]')).toBeTruthy();
  });
});

describe('edit mode', () => {
  it('is disabled by default', () => {
    const wrapper = mount(<Card post={{ text: 'eita' }} />);
    expect(wrapper.exists('[data-automation="textField"]')).toBeFalsy();
  });

  it('should not show icons edit and delete', () => {
    const wrapper = mount(<Card post={{ text: 'eita' }} />);
    wrapper
      .find('[data-automation="editButton"]')
      .first()
      .simulate('click');
    expect(wrapper.exists('[data-automation="editButton"]')).toBeFalsy();
    expect(wrapper.exists('[data-automation="deleteButton"]')).toBeFalsy();
  });

  it('is enabled when edit button is clicked', () => {
    const wrapper = mount(<Card post={{ text: 'eita' }} />);
    wrapper
      .find('[data-automation="editButton"]')
      .first()
      .simulate('click');
    expect(wrapper.exists('[data-automation="textField"]')).toBeTruthy();
  });

  it('calls onChange with new text when saved', () => {
    const originalPost = { text: 'eita', _id: 1 };
    const handleChange = jest.fn();
    const wrapper = mount(<Card post={originalPost} onChange={handleChange} />);
    wrapper
      .find('[data-automation="editButton"]')
      .first()
      .simulate('click');
    const textField = wrapper
      .find('[data-automation="textField"] textarea')
      .at(2);
    textField.simulate('change', { target: { value: 'new text' } });
    wrapper
      .find('[data-automation="saveButton"]')
      .first()
      .simulate('click');
    expect(handleChange).toBeCalledWith({ ...originalPost, ...{ text: 'new text' } });
  });

  it('turn edit mode off when saved', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<Card post={{ text: 'eita' }} onChange={handleChange} />);
    wrapper
      .find('[data-automation="editButton"]')
      .first()
      .simulate('click');

    wrapper
      .find('[data-automation="saveButton"]')
      .first()
      .simulate('click');
    expect(wrapper.exists('[data-automation="textField"]')).toBeFalsy();
  });

  it('turn edit mode off when canceled', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<Card post={{ text: 'eita' }} onChange={handleChange} />);
    wrapper
      .find('[data-automation="editButton"]')
      .first()
      .simulate('click');

    wrapper
      .find('[data-automation="cancel"]')
      .first()
      .simulate('click');
    expect(wrapper.exists('[data-automation="textField"]')).toBeFalsy();
  });
});
