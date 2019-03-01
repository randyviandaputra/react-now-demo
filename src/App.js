import React, { Component } from 'react';
import './App.css';
import { Server, Model, Factory, JSONAPISerializer } from '@miragejs/server';

new Server({
  models: {
    user: Model
  },
  factories: {
    user: Factory.extend({
      name(i) {
        return `User ${i}`;
      }
    })
  },
  serializers: {
    application: JSONAPISerializer
  },
  scenarios: {
    default(server) {
      server.createList('user', 100);
    }
  },
  baseConfig() {
    this.namespace = 'api';
    this.get('/users');
    this.passthrough();
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('/api/users')
      .then(response => response.json())
      .then(json => this.setState({
        users: json.data,
        isLoading: false
      }));
  }

  render() {
    return (
      <div>
        <h1>Hello, Now + React + Mirage!</h1>
        {this.state.isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {this.state.users.map(user =>
              <li key={user.id}>
                {user.attributes.name}
              </li>
            )}
          </ul>
        )}
      </div>
    );
  }
}

export default App;
