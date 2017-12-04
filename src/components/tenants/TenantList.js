import React, { Component } from 'react';
import { Text, View, Animated, ScrollView } from 'react-native';

import Animation from 'lottie-react-native';

import PropTypes from 'prop-types'
import Tenant from "./Tenant";

export default class TenantList extends Component {

  static propTypes = {

      onTenantClick: PropTypes.func.isRequired
  };

  constructor(props) {

      super(props);
      this.state = {
          progress: new Animated.Value(0.5),
          fabIsVisible: true,
      };

      //console.log(this.props);
  }

  renderTenant = (tenant, i) => {


      const { onTenantClick } = this.props;

      //console.log('Tenant inside renderInvoice : ', tenant);

      return (

          <Tenant key={i} tenant={tenant} onTenantClick={onTenantClick}/>
      )
  };

  render() {

    const { tenants, fetching, fetched } = this.props;

    //console.log('Props are : ', this.props);

    if (fetching) {

        return (
            <Animation
                style={{flex: 1}}
                source={require('../../animations/circle_grow.json')}
                progress={this.state.progress}
            />)
    }

    if (fetched && !tenants) {

      return (

        <View>
            <Text style={{ marginTop: 64 }}>No tenants found</Text>
        </View>)
    }

    return (

        <ScrollView>
            {tenants.map(this.renderTenant)}
        </ScrollView>
    );
  };
}

