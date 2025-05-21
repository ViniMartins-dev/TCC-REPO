import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import styles from "./styleCadastro";
import { TextInputMask } from 'react-native-masked-text';

export default function Cadastro({navigation}) {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [checkBox, setCheckBox] = useState(false);
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState('');
  const [password, setPassword] = useState(true);
  const [focusStates, setFocusStates] = useState({
    nome: false,
    data: false,
    cpf: false,
    email: false,
    telefone: false,
    senha: false,
  });

// Dentro do componente:


  const handleFocus = (field) => {
    setFocusStates((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setFocusStates((prev) => ({ ...prev, [field]: false }));
  };

  const onPresss = (field = () => {
    setCheckBox((prevState) => !prevState);
  });

  const visualizarSenha = () => {
    setPassword((prevState) => !prevState);
  };

const handleCadastro = async () => {
  setErro('');
  try {

    const dadosParaEnviar = {
      nome,
      sobrenome: '', 
      email,
      telefone,
      senha,
      cpf,
      data_nascimento: data.split('/').reverse().join('-'), 
      latitude: null,  
      longitude: null,
    };
const response = await fetch('http://10.0.2.2:3000/usuario/tutor', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(dadosParaEnviar),
});


    if (!response.ok) {
      const erroJson = await response.json();
      throw new Error(erroJson.erro || 'Erro no cadastro');
    }

    const result = await response.json();
    console.log('Cadastro realizado:', result);

    navigation.navigate("Login");
  } catch (error) {
    setErro(error.message);
  }
};


  return (
    <SafeAreaView style={styles.container1}>
      <View style={styles.topDecorator}>
        <Text style={styles.textInv}></Text>
      </View>

      <View style={styles.viewquadrado}>
        <Text style={styles.title}>Inscreva-se</Text>
        <View style={styles.quadrado}></View>
        <View style={styles.wrapper2}>
          <View style={styles.linha1}></View>
          <View style={styles.linha2}></View>
          <View style={styles.linha1}></View>
        </View>
      </View>

      <SafeAreaView style={styles.container2}>
        <View style={styles.wrapper}>
          <Text style={styles.text}>Nome Completo</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: focusStates.nome ? '#ffbb12' : '#d2cec5' },
              { backgroundColor: focusStates.nome ? '#ffffff' : '#f9f8f6' },
            ]}
            onFocus={() => handleFocus('nome')}
            onBlur={() => handleBlur('nome')}
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.text}>Data de nascimento</Text>
          <TextInputMask
            type={'datetime'}
            options={{ format: 'DD/MM/YYYY' }}
            style={[
              styles.input,
              { borderColor: focusStates.data ? '#ffbb12' : '#d2cec5' },
              { backgroundColor: focusStates.data ? '#ffffff' : '#f9f8f6' },
            ]}
            value={data}
            onChangeText={setData}
            onFocus={() => handleFocus('data')}
            onBlur={() => handleBlur('data')}
            placeholder="dd/mm/aaaa"
          />
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.text}>CPF</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: focusStates.cpf ? '#ffbb12' : '#d2cec5' },
              { backgroundColor: focusStates.cpf ? '#ffffff' : '#f9f8f6' },
            ]}
            onFocus={() => handleFocus('cpf')}
            onBlur={() => handleBlur('cpf')}
            value={cpf}
            onChangeText={setCpf}
          />
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: focusStates.email ? '#ffbb12' : '#d2cec5' },
              { backgroundColor: focusStates.email ? '#ffffff' : '#f9f8f6' },
            ]}
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.wrapper}>
          <Text style={styles.text}>Telefone</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: focusStates.telefone ? '#ffbb12' : '#d2cec5' },
              { backgroundColor: focusStates.telefone ? '#ffffff' : '#f9f8f6' },
            ]}
            onFocus={() => handleFocus('telefone')}
            onBlur={() => handleBlur('telefone')}
            value={telefone}
            onChangeText={setTelefone}
          />
        </View>

        <View style={styles.wrapperSenha}>
          <View style={styles.wrapper}>
            <Text style={styles.text}>Senha</Text>
            <TouchableOpacity
              onPress={visualizarSenha}
              style={styles.botaoSenha}>
              <Image
                source={{
                  uri: 'https://cdn0.iconfinder.com/data/icons/glyphpack/167/visible-512.png',
                }}
                style={styles.olhoSenha}
              />
            </TouchableOpacity>
            <TextInput
              style={[
                styles.input,
                { borderColor: focusStates.senha ? '#ffbb12' : '#d2cec5' },
                { backgroundColor: focusStates.senha ? '#ffffff' : '#f9f8f6' },
              ]}
              onFocus={() => handleFocus('senha')}
              onBlur={() => handleBlur('senha')}
              secureTextEntry={password}
              value={senha}
              onChangeText={setSenha}
            />
          </View>
        </View>
<TouchableOpacity style={styles.button} onPress={handleCadastro} title="Voltar">
  <Text style={styles.textoCadastro}> Cadastrar Conta </Text>
</TouchableOpacity>


        <View style={styles.wrapper}>
        {erro ? <Text style={styles.error}>{erro}</Text> : null}
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}