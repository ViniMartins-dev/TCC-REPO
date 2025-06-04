import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
    },
    header: {
      backgroundColor: '#cb7942',
      paddingVertical: 40,
      paddingHorizontal: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      elevation: 5,
    },
    headerText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#fff',
    },
    decorator: {
      width: 80,
      height: 5,
      backgroundColor: '#fff',
      marginTop: 10,
      borderRadius: 3,
    },
    form: {
      padding: 20,
    },
    label: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#333',
      marginTop: 20,
    },
    input: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 12,
      marginTop: 8,
      backgroundColor: '#fff',
      color: '#333',
    },
    passwordWrapper: {
      position: 'relative',
    },
    eyeIconWrapper: {
      position: 'absolute',
      right: 10,
      top: 18,
      padding: 5,
    },
    eyeIcon: {
      width: 24,
      height: 24,
      tintColor: '#999',
    },
    registerLink: {
      color: '#cb7942',
      marginTop: 15,
      textDecorationLine: 'underline',
      fontSize: 16,
    },
    button: {
      backgroundColor: '#cb7942',
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 30,
      elevation: 3,
    },
    buttonText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 20,
    },
    logo: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
      marginLeft: 10,
      position: 'absolute',
      top: 20,
      right: 5,
    },
    
  });

  export default styles;