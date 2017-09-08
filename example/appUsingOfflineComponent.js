import React from 'react';
import OfflineComponent from 'react-offline-hoc/lib/OfflineComponent';  // eslint-disable-line import/no-unresolved

const OnlineDetectorUsingComponent = () => (
  <OfflineComponent>
    {(isOnline) => (
      <div>
        Connectivity is currently: {isOnline ? 'online' : 'offline'}
      </div>
    )}
  </OfflineComponent>
);

export default OnlineDetectorUsingComponent;
