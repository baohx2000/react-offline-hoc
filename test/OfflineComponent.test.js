/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { mount } from 'enzyme';
import OfflineComponent from '../src/OfflineComponent';

class Status extends Component {
  method = () => 'method';

  render() {
    return (
      <OfflineComponent>
        {(isOnline) => (
          <div>
            {isOnline ? 'Online' : 'Offline'}
            {this.props.text ? this.props.text : null}
          </div>
        )}
      </OfflineComponent>
    );
  }
}

describe('Offline Status Component', () => {
  test('Adds online and offline event listeners', () => {
    const mockAddEventListener = jest.fn();
    const mockRemoveEventListener = jest.fn();
    global.addEventListener = mockAddEventListener;
    global.removeEventListener = mockRemoveEventListener;

    const offline = mount(
      <Status />,
    );

    const [
      scrollRegistration,
      [onlineRegistrationEvt],
      [offlineRegistrationEvt],
    ] = mockAddEventListener.mock.calls;
    expect(scrollRegistration).toBeDefined();
    expect(onlineRegistrationEvt).toBe('online');
    expect(offlineRegistrationEvt).toBe('offline');

    offline.unmount();

    const [
      [onlineDeregistrationEvt],
      [offlineDeregistrationEvt],
    ] = mockRemoveEventListener.mock.calls;
    expect(onlineDeregistrationEvt).toBe('online');
    expect(offlineDeregistrationEvt).toBe('offline');
  });

  test('Changes isOnline prop based on network connectivity state', () => {
    const mockAddEventListener = jest.fn();
    global.addEventListener = mockAddEventListener;

    const offline = mount(
      <Status />,
    );

    const [
      [onlineRegistrationEvt, setOnline],
      [offlineRegistrationEvt, setOffline],
    ] = mockAddEventListener.mock.calls;

    expect(onlineRegistrationEvt).toBeDefined();
    expect(offlineRegistrationEvt).toBeDefined();

    expect(offline.find('div').text()).toContain('Online');
    setOffline();
    expect(offline.find('div').text()).toContain('Offline');
    setOnline();
    expect(offline.find('div').text()).toContain('Online');
  });

  test('Proxies all props', () => {
    const offline = mount(
      <Status text="some text" />,
    );

    expect(offline.find('div').text()).toContain('some text');
  });
});
