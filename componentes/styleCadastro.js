import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container1: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    container2: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 18,
      marginTop: 25,
      marginBottom: 30,
      backgroundColor: '#fff',
    },
    wrapper2: {
      marginTop: '-5%',
    },
    linha1: {
      width: 20,
      borderWidth: 1,
      borderColor: '#cb7942',
      alignSelf: 'flex-end',
      marginHorizontal: 18,
    },
    linha2: {
      width: 15,
      borderWidth: 1,
      borderColor: '#cb7942',
      alignSelf: 'flex-end',
      marginBottom: 5,
      marginTop: 5,
      marginHorizontal: 18,
    },
    input: {
      height: 50,
      borderWidth: 2,
      borderColor: '#cb7942',
      borderRadius: 10,
      paddingHorizontal: 12,
      color: '#333',
      backgroundColor: '#cb7942',
    },
    error: {
      color: 'red',
      marginTop: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
    button: {
      alignItems: 'center',
      padding: 14,
      width: '50%',
      alignSelf: 'flex-start',
      marginHorizontal: 18,
      marginTop: 20,
      borderRadius: 10,
      backgroundColor: '#cb7942',
      elevation: 2,
    },
    cep: {
      width: 150,
    },
    numero: {
      width: 150,
    },
    textoCadastro: {
      fontWeight: '700',
      color: '#fff',
      fontSize: 16,
    },
    title: {
      color: '#cb7942',
      fontWeight: 'bold',
      fontSize: 32,
      marginHorizontal: 18,
      marginTop: 30,
      zIndex: 2,
    },
    text: {
      fontWeight: 'bold',
      marginBottom: 3,
      fontSize: 18,
      color: '#333',
    },
    textNum: {
      fontWeight: 'bold',
      marginBottom: 3,
      fontSize: 18,
      color: '#333',
    },
    container3: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 18,
    },
    wrapper: {
      flexDirection: 'column',
      marginHorizontal: 18,
      marginTop: '1%',
      marginBottom: '3%',
    },
    wrapper1: {
      marginBottom: '3%',
    },
    checkBox: {
      borderWidth: 2,
      width: 17,
      height: 17,
      borderRadius: 5,
      marginTop: '2%',
      marginRight: '2%',
    },
    topDecorator: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: 20,
      backgroundColor: '#cb7942',
    },
    textInv: {
      height: 5,
    },
    textButton: {
      fontSize: 16,
      marginTop: '1.8%',
      fontWeight: 'bold',
      color: '#333',
    },
    wrapperButton: {
      flexDirection: 'row',
      marginHorizontal: 18,
    },
    olhoSenha: {
      width: 25,
      height: 25,
      position: 'absolute',
      alignSelf: 'center',
      tintColor: '#999',
    },
    wrapperSenha: {
      position: 'relative',
    },
    botaoSenha: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      marginTop: '11.5%',
      marginLeft: '85%',
      zIndex: 1,
    },
  });

  export default styles;