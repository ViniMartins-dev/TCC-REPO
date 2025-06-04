import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const buscarMinhasAdocoes = async (id, token) => {
  try {
    const response = await fetch(`http://10.0.2.2:3000/adocao/protetor/${id}`, {
      method: 'GET',
      headers: {
        'bearer': token
      }
    });

    if (!response.ok) {
      const text = await response.text();
      console.log('Resposta não OK:', text);
      throw new Error('Erro na requisição');
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Erro na requisição:', error);
    return [];
  }
};

const Perfil = ({ navigation }) => {
  const [usuario, setUsuario] = useState(null);
  const [adocoes, setAdocoes] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const user = await AsyncStorage.getItem('usuario');
        const token = await AsyncStorage.getItem('token');
        if (!user || !token) {
          Alert.alert('Erro', 'Usuário não logado');
          navigation.navigate('Login');
          return;
        }
        const userObj = JSON.parse(user);
        setUsuario(userObj);

        const listaAPI = await buscarMinhasAdocoes(userObj.id, token);

        const solicitacoesLocaisStr = await AsyncStorage.getItem('solicitacoesLocais');
        const solicitacoesLocais = solicitacoesLocaisStr ? JSON.parse(solicitacoesLocaisStr) : [];

        const solicitacoesDoUsuario = solicitacoesLocais.filter(s => s.tutor_id === userObj.id);

        setAdocoes([...listaAPI, ...solicitacoesDoUsuario]);

      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    carregarDados();
  }, []);

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Perfil</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.infoText}>{usuario.email}</Text>

        <Text style={styles.label}>Telefone:</Text>
        <Text style={styles.infoText}>{usuario.telefone}</Text>

        <Text style={styles.label}>CPF:</Text>
        <Text style={styles.infoText}>{usuario.cpf}</Text>
      </View>

      <Text style={[styles.titulo, {marginTop: 20}]}>Minhas Solicitações</Text>

      <FlatList
        data={adocoes}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : `local-${index}`)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nomeAnimal}>Animal: {item.animal?.nome || 'N/A'}</Text>
            <Text>Espécie: {item.animal?.especie || 'N/A'}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{textAlign: 'center', marginTop: 20}}>Nenhuma solicitação encontrada.</Text>}
      />

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#cb7942',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  headerText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 1.5,
    fontFamily: 'System', // pode trocar pela fonte desejada
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontWeight: '700',
    fontSize: 18,
    color: '#6b4c1a', // um tom marrom mais escuro puxado do #cb7942
    marginTop: 14,
    letterSpacing: 0.5,
  },
  infoText: {
    fontSize: 17,
    color: '#4a4a4a',
    marginTop: 4,
    fontStyle: 'italic',
  },
  titulo: {
    fontSize: 22,
    fontWeight: '800',
    marginHorizontal: 20,
    marginBottom: 12,
    color: '#cb7942',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontFamily: 'System',
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 14,
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#aaa',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
  },
  nomeAnimal: {
    fontWeight: '900',
    fontSize: 18,
    marginBottom: 6,
    color: '#5a3e1b',
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: '#cb7942',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 30,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 20,
    letterSpacing: 1.2,
  },
});


export default Perfil;
