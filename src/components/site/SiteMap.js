import React, { Component } from 'react'
import { Dimensions, View, Text, StyleSheet, Animated } from 'react-native'

import Animation from 'lottie-react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {connect} from "react-redux";

import { setSelectedSite } from '../../actions/sites';

//import { SiteMarker } from './SiteMarker'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -30.750422765196692;
const LONGITUDE = 30.412856175554836;
const LATITUDE_DELTA = 0.12;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class SiteMap extends Component {

  constructor(props) {
    super(props);

      this.state = {

        initialPosition: null,
        lastPosition: null,

        coordinate: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
        },

        coordinates: [
        {
          key: 0,
          longitude: 30.395543,
          latitude: -30.731542,
          site: 'ABC',
        },
        {
          key: 1,
          longitude: 30.387564,
          latitude: -30.728943,
          site: 'Siphakamile'
        },
        {
          key: 2,
          longitude: 30.389298,
          latitude: -30.742883,
          site: 'Mganka'
        },
        {
          key: 3,
          longitude: 30.446248,
          latitude: -30.754327,
          site: 'Oslo Beach'
        },
      ],


        amount: 100,
        progress: new Animated.Value(0.5),
      };
  }

  componentWillMount() {}

  componentDidMount() {

      Animated.timing(this.state.progress, {

          toValue: 1,
          duration: 5000,
      }).start();

      navigator.geolocation.getCurrentPosition(

          (position) => {

            this.setState({

              initialPosition: position,
            });
          },
          (error) => alert(error.message),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );

      this.watchID = navigator.geolocation.watchPosition((position) => {

          this.setState({position});
      });
  }

  componentWillUnmount() {

      navigator.geolocation.clearWatch(this.watchID);
  }

  onPressMarker(e, index) {

    console.log(`ABC arker pressed! ${e}, markerIndex: ${index}`);
    this.setState({selectedMarkerIndex: index});

    this.props.dispatch(setSelectedSite(index.site));
    this.props.navigation.navigate('Tenants');
  }

    render() {

        if(this.state.initialPosition) {

          let { longitude, latitude } = this.state.initialPosition.coords;

          console.log('Latitude : ', this.state.initialPosition.coords);

          return (
            <View style={{ flex: 1 }}>
              <View style={styles.container}>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }}>

                  {this.state.coordinates.map((marker, i) => (
                    <MapView.Marker
                        key={marker.key}
                        coordinate={{latitude: marker.latitude,
                        longitude: marker.longitude}}
                        title={marker.site}

                        onPress={e => this.onPressMarker(e, marker)}
                     />
                  ))}

                </MapView>
              </View>
            </View>
          )

        } else {

          return (
            <Animation
                style={{flex: 1}}
                source={require('../../animations/circle_grow.json')}
                progress={this.state.progress}
            />
          )
        }

    }
}

SiteMap.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
    input: {
        padding: 15,
        height: 50,
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default connect()(SiteMap);
