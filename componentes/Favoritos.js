// Importa dependências do React e React Native
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

// Importa estilos personalizados
import styles from "./styles";

// Importa imagem da logo
import logo from "../assets/Logo-laranja.png";

// Importa axios para fazer requisições HTTP
import axios from "axios";

// Importa AsyncStorage para armazenar dados localmente (como token e id do usuário)
import AsyncStorage from "@react-native-async-storage/async-storage";

// Componente principal da tela de Favoritos
const Favoritos = ({ navigation }) => {
  // Estados do componente
  const [favoritos, setFavoritos] = useState([]); // Lista de animais favoritados
  const [menuVisible, setMenuVisible] = useState(false); // Controle de visibilidade do menu
  const [loading, setLoading] = useState(true); // Estado de carregamento

  // useEffect é executado ao montar o componente
  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        // Recupera o token e id do usuário salvos no AsyncStorage
        const token = await AsyncStorage.getItem("token");
        const id = await AsyncStorage.getItem("id");

        // Se não tiver token ou id, exibe alerta e redireciona para login
        if (!token || !id) {
          console.warn("Token ou ID ausente. Faça login novamente.");
          Alert.alert("Erro", "Você precisa estar logado para ver seus favoritos.");
          navigation.navigate("Login");
          return;
        }

        // Log dos dados recuperados
        console.log("Token:", token.substring(0, 20) + "...");
        console.log("ID usado na requisição:", id);

        // Faz requisição para obter os favoritos do usuário
        const favoritosResponse = await axios.get(
          `http://10.0.2.2:3000/favoritos/listar/${id}`,
          {
            headers: {
              bearer: token,
            },
          }
        );

        console.log("Resposta da API de favoritos:", favoritosResponse.data);

        // Para cada favorito, busca os dados completos do animal
        const favoritosPromises = favoritosResponse.data.map(async (favorito) => {
          try {
            const animalResponse = await axios.get(
              `http://10.0.2.2:3000/animal/show/${favorito.animal_id}`,
              {
                headers: {
                  bearer: token,
                },
              }
            );
            
            const animal = animalResponse.data;
            console.log('Dados do animal:', animal);
            
            // Retorna objeto formatado com os dados do animal
            return {
              id: favorito.id,
              animal_id: animal.id,
              nome: animal.nome,
              raca: animal.raca,
              idade: animal.idade,
              especie: animal.especie,
              descricao: animal.descricao,
              personalidade: animal.personalidade,
              imagem_url: animal.fotoBase64 || 'https://via.placeholder.com/300' // fallback se não tiver imagem
            };
          } catch (error) {
            console.error('Erro ao buscar dados do animal:', error);
            return null; // Se falhar, retorna null
          }
        });

        // Aguarda todas as requisições e filtra os nulos
        const favoritosMapeados = (await Promise.all(favoritosPromises)).filter(f => f !== null);

        // Exibe no console os resultados
        console.log("Favoritos mapeados:", favoritosMapeados.length);
        if (favoritosMapeados.length > 0) {
          console.log("Exemplo do primeiro favorito:", favoritosMapeados[0]);
        }

        // Atualiza o estado com os favoritos
        setFavoritos(favoritosMapeados);
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
        if (error.response) {
          console.log("Status:", error.response.status);
          console.log("Dados:", error.response.data);
          if (error.response.status === 401) {
            Alert.alert("Sessão expirada", "Por favor, faça login novamente.");
            navigation.navigate("Login");
            return;
          }
        }
        Alert.alert("Erro", "Não foi possível carregar os favoritos.");
      } finally {
        setLoading(false); // Desativa o estado de carregamento
      }
    };

    fetchFavoritos(); // Chama a função ao montar o componente
  }, []);

  // Função para remover um animal dos favoritos
  const removerFavorito = async (animalId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("id");

      if (!token || !userId) {
        Alert.alert("Erro", "Você precisa estar logado para remover favoritos.");
        return;
      }

      // Requisição para remover favorito no backend
      await axios.delete(
        `http://10.0.2.2:3000/favoritos/${animalId}/${userId}`,
        {
          headers: {
            bearer: token,
          },
        }
      );

      // Atualiza o estado local removendo o favorito
      setFavoritos(favoritos.filter(fav => fav.animal_id !== animalId));
      Alert.alert("Sucesso", "Animal removido dos favoritos!");
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      if (error.response?.status === 401) {
        Alert.alert("Sessão expirada", "Por favor, faça login novamente.");
        navigation.navigate("Login");
        return;
      }
      Alert.alert("Erro", "Não foi possível remover o favorito.");
    }
  };

  // Renderização da tela
  return (
    <View style={styles.container}>
      {/* Fundo desfocado se o menu estiver visível */}
      {menuVisible && <View style={styles.blurBackground} />}

      {/* Barra superior com logo e botão de menu */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image source={logo} style={styles.logo} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Text style={styles.menuButton}>☰</Text>
        </TouchableOpacity>

        {/* Menu suspenso visível ao clicar no botão */}
        {menuVisible && (
          <View style={styles.menuDropdown}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
                setMenuVisible(false);
              }}
            >
              <Text style={styles.menuItem}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Favoritos");
                setMenuVisible(false);
              }}
            >
              <Text style={styles.menuItem}>Favoritos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Perfil");
                setMenuVisible(false);
              }}
            >
              <Text style={styles.menuItem}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMenuVisible(false)}>
              <Text style={styles.menuItem}>Fechar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Banner da página */}
      <View style={styles.bannerContainer}>
        <Image source={require("../assets/gato.jpg")} style={styles.bannerImage} />
        <Text style={styles.bannerText}>Lista de favoritos</Text>
      </View>

      {/* Lista de favoritos ou carregando */}
      {loading ? (
        // Indicador de carregamento
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B00" />
          <Text style={styles.loadingText}>Carregando favoritos...</Text>
        </View>
      ) : (
        // ScrollView com os favoritos
        <ScrollView contentContainerStyle={styles.favoritesList}>
          {favoritos.length === 0 ? (
            <Text style={styles.emptyText}>Você ainda não favoritou nenhum animal.</Text>
          ) : (
            favoritos.map((animal) => (
              <TouchableOpacity key={animal.id} style={styles.favoriteCard}>
                <Image
                  source={{ uri: animal.imagem_url }}
                  style={styles.favoriteImage}
                  resizeMode="cover"
                />
                <TouchableOpacity 
                  style={styles.modalHeartIcon}
                  onPress={() => removerFavorito(animal.animal_id)}
                >
                  <Text style={styles.heartIcon}>❤️</Text>
                </TouchableOpacity>
                <View style={styles.favoriteInfo}>
                  <Text style={styles.favoriteName}>Nome: {animal.nome}</Text>
                  <Text style={styles.favoriteDetail}>Espécie: {animal.especie}</Text>
                  <Text style={styles.favoriteDetail}>Raça: {animal.raca}</Text>
                  <Text style={styles.favoriteDetail}>Idade: {animal.idade}</Text>
                  {animal.personalidade && (
                    <Text style={styles.favoriteDetail}>Personalidade: {animal.personalidade}</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
};

// Exporta o componente para ser usado em outras telas
export default Favoritos;
