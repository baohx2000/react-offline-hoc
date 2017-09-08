import { Component } from 'react';

export default class OfflineComponent extends Component {
  state = {
    isOnline: window.navigator.onLine,
  };

  componentDidMount() {
    window.addEventListener('online', this.setOnline);
    window.addEventListener('offline', this.setOffline);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.setOnline);
    window.removeEventListener('offline', this.setOffline);
  }

  setOnline = () => this.setState({ isOnline: true });

  setOffline = () => this.setState({ isOnline: false });

  render() {
    const { isOnline } = this.state;

    return this.props.children(isOnline);
  }
}
