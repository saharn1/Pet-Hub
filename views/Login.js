import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Card, ListItem, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const [formToggle, setFormToggle] = useState(true);
  const {checkToken} = useUser();

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    if (userToken) {
      try {
        const userData = await checkToken(userToken);
        setIsLoggedIn(true);
        setUser(userData);
        navigation.navigate('Home');
      } catch (error) {
        console.log('token check failed', error.message);
      }
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <ScrollView>
      {/* disabled by teacher for android testing */}
      {/* <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        enabled
      > */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.appTitle}>
            <Text h4>MyApp</Text>
          </View>
          <View style={styles.form}>
            <Card>
              {formToggle ? (
                <>
                  <Card.Title h5>Login</Card.Title>
                  <Card.Divider />
                  <LoginForm navigation={navigation} />
                </>
              ) : (
                <>
                  <Card.Title h5>Register</Card.Title>
                  <Card.Divider />
                  <RegisterForm navigation={navigation} />
                </>
              )}
              <ListItem
                onPress={() => {
                  setFormToggle(!formToggle);
                }}
              >
                <ListItem.Content>
                  <Text style={styles.text}>
                    {formToggle
                      ? 'No account? Register here.'
                      : 'Already registered? Login here.'}
                  </Text>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </Card>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {/* </KeyboardAvoidingView> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 12,
    flex: 1,
    justifyContent: 'space-around',
  },
  appTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    flex: 2,
  },
  text: {
    alignSelf: 'center',
    padding: 20,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
