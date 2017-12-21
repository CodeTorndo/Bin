import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import UpgradeToRealCard from '../UpgradeToRealCard';

describe('<UpgradeToRealCard />', () => {
  const PROPS = {
    residenceList: [{
      phone_idd: '260',
      text: 'Zambia',
      value: 'zm'
    },
      {
        phone_idd: '263',
        text: 'Zimbabwe',
        value: 'zw'
      }
    ],
    boot: {
      language: 'PL',
    },
    states: [
      {
        text: 'Sachsen',
        value: 'SN'
      },
      {
        text: 'Sachsen-Anhalt',
        value: 'ST'
      },
      {
        text: 'Schleswig-Holstein',
        value: 'SH'
      },
      {
        text: 'Thüringen',
        value: 'TH'
      }
    ],
    loginid: 'VRTC1234',
  };

  it('Component should be rendered', () => {
    const wrapper = mountWithIntl(<UpgradeToRealCard {...PROPS} />);

    expect(wrapper.type()).toBeDefined();
  });

  it('First Name should exist', () => {
    const wrapper = mountWithIntl(<UpgradeToRealCard {...PROPS} />);
    const firstName = wrapper.find('#first_name').hostNodes();

    expect(firstName.length).toEqual(1);
  });

  it('First Name should exist', () => {
    const wrapper = mountWithIntl(<UpgradeToRealCard {...PROPS} />);
    const firstName = wrapper.find('#first_name').hostNodes();

    expect(firstName.length).toEqual(1);
  });

  it('First name should be valid when input is valid', () => {
    const wrapper = mountWithIntl(<UpgradeToRealCard {...PROPS} />);
    const firstName = wrapper.find('#first_name').hostNodes();
    firstName.instance().value = 'abcdefg';
    wrapper.update();
    firstName.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.first_name).toBeUndefined();
  });

  it('First name should have error when input is not valid', () => {
    const wrapper = mountWithIntl(<UpgradeToRealCard {...PROPS} />);
    const firstName = wrapper.find('#first_name').hostNodes();
    firstName.instance().value = 'abcd#$';
    wrapper.update();
    firstName.simulate('change');
    const errors = wrapper.state('errors');

    expect(errors.first_name[0]).toEqual('Only letters, space, hyphen, period, and apostrophe are allowed.');
  });

  it('phoneCode should be phone_idd for the country code in residenceList', () => {
    const country_code = 'zm';
    const wrapper = mountWithIntl(<UpgradeToRealCard {...PROPS} country_code={country_code} />);
    const phoneCode = wrapper.state('phoneCode');

    expect(phoneCode).toEqual('+260');
  });

  it('phoneCode should be empty when country is not passed in props', () => {
    const wrapper = mountWithIntl(<UpgradeToRealCard {...PROPS} />);
    const phoneCode = wrapper.state('phoneCode');

    expect(phoneCode).toEqual('');
  });
});
