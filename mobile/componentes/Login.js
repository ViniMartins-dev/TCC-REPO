import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';

import styles from './styleLogin';
import logo from '../assets/image.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleCadastro = () => {
    navigation.navigate('Cadastro');
  };

const handleLogin = async () => {
  if (!email || !senha) {
    Alert.alert('Atenção', 'Preencha email e senha.');
    return;
  }

  try {
    const response = await fetch('http://10.0.2.2:3000/usuario/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        senha: senha,
      }),
    });

    const data = await response.json();

if (response.ok) {
  console.log('Login bem-sucedido:', data);
  
  // Salvar token e ID no AsyncStorage
  await AsyncStorage.setItem('token', data.token);
  await AsyncStorage.setItem('id', data.payload.id.toString());

  // Salvar todo o payload (usuario) no AsyncStorage
  await AsyncStorage.setItem('usuario', JSON.stringify(data.payload));
  
  console.log('Token, ID e usuário salvos no AsyncStorage');

  navigation.navigate('Home');
}else {
      Alert.alert('Erro', data.erro || 'Erro no login.');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    Alert.alert('Erro', 'Erro na conexão com o servidor.');
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Login</Text>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
            placeholder="Digite sua senha"
            placeholderTextColor="#aaa"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeIconWrapper}
          >
            <Image
              source={{
                uri: 'https://cdn0.iconfinder.com/data/icons/glyphpack/167/visible-512.png',
              }}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleCadastro}>
          <Text style={styles.registerLink}>Cadastrar uma conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
