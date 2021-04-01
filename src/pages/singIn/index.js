import React, {Component} from 'react'

import PropTypes from 'prop-types'

import { 
  StatusBar,
  AsyncStorage, 
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet,
  Image,
  TextInput
} from 'react-native' 

import { StackActions } from '@react-navigation/native'
import { NavigationActions } from '@react-navigation/stack'

import api from '../../services/api'

import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
} from './styles';

export default class SignIn extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired
  }

  state = {
    email: '',
    password: '',
    error: ''
  }

  handleEmailChange = (email) => {
    this.setState({ email })
  }

  handlePasswordChange = (password) => {
    this.setState({ password })
  }

  handleCreateAccountPress = () => {
    this.props.navigation.navigate(SignUp)
  }

  handleSignInPress = async () => {
    if(this.state.email.lenght === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha o usuário e a senha para continuar!' })
    } else {
      try {
        const response = await api.post('/sessions', {
          email: this.state.email,
          password: this.state.password
        })

        await AsyncStorage.setItem("@AirbfyApp:token", response.data.token)

        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Main'})
          ]
        })
        this.props.navigation.dispatch(resetAction)
      } catch (_err) {
        this.setState({ error: "Ocorreu um erro com o login, cheque suas credenciais e tente novamente."})
      }
    }
  }

  render() {
    return (<SafeAreaView >
        <View style={styles.container}>
          <StatusBar hidden />
          <Image styles={styles.logo} source={require('../../images/airbnb_logo.png')} />
          <TextInput 
            styles={styles.input}
            placeholder="Endereço de e-mail"
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            autoCaptalize="none"
            autoCorrect={false}
          />
        </View>
    </SafeAreaView>)
    {/*return (
                <Input
            placeholder="Endereço de e-mail"
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            autoCaptalize="none"
            autoCorrect={false} 
          />
          <Input
            placeholder="Senha"
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            autoCaptalize="none"
            autoCorrect={false} 
            secureTextEntry
          />
          {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
          <Button onPress={this.handleSignInPress}title="Entrar"> 
            <ButtonText>
              Entrar
            </ButtonText>
          </Button>
          <SignUpLink onPress={this.handleCreateAccountPress}>
            <SignUpLinkText>
              Criar uma conta grátis
            </SignUpLinkText>
          </SignUpLink>
    )*/}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  logo: {
    height: 5,
    width: 5,
    marginBottom: 40,  
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    backgroundColor: "red",
    alignSelf: "stretch",
    marginBottom: 15,
    marginHorizontal: 20,
    fontSize: 16,
  }
})

