import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import Icon from 'react-native-vector-icons/FontAwesome';  // Importe o ícone de coração
import logo from '../assets/Logo-laranja.png';  // ajuste o caminho conforme sua estrutura
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [search, setSearch] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);  // Estado para favoritos
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Dados de exemplo como fallback caso a API falhe
  const exampleAnimals = [
    {
      id: 1,
      name: "Bolt",
      image: require("../assets/gato.jpg"),
      age: "3",
      type: "Cachorro",
      breed: "Labrador",
      sex: "M",
      personality: "Energético e carinhoso",
      description: "Cachorro brincalhão e amigável, adora correr.",
    },
    {
      id: 2,
      name: "Mia",
      image: require("../assets/gato2.jpg"),
      age: "2",
      type: "Gato",
      breed: "Siamês",
      sex: "F",
      personality: "Calma e observadora",
      description: "Gata que adora um colo e ambientes tranquilos.",
    },
  ];

  // Carregar credenciais e dados ao iniciar
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const userToken = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('id');
        
        console.log('===== INICIANDO CARREGAMENTO DE DADOS =====');
        console.log('Token obtido do AsyncStorage?', !!userToken);
        console.log('ID do usuário obtido do AsyncStorage?', !!userId);
        
        if (userToken && userId) {
          console.log('Token:', userToken.substring(0, 20) + '...');
          console.log('ID do usuário:', userId);
          
          setToken(userToken);
          setUserId(userId);
          
          // Carregar favoritos e animais
          await carregarFavoritos(userToken, userId);
          await carregarAnimais(userToken, userId);
        } else {
          console.warn('Usuário não logado');
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setLoading(false);
        setApiError('Erro ao carregar dados iniciais');
      }
    };

    carregarDados();
  }, []);

  // Função para carregar favoritos do usuário
  const carregarFavoritos = async (userToken, userId) => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:3000/api/favoritos/listar/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      
      console.log('Favoritos carregados com sucesso:', response.data.length);
      setFavorites(response.data);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
  };

  // Função para carregar animais do banco de dados usando a rota específica
  const carregarAnimais = async (userToken, userId) => {
    try {
      setLoading(true);
      console.log('\n===== CARREGANDO ANIMAIS DA API =====');
      console.log('URL da requisição:', `http://10.0.2.2:3000/api/animal/cadastrados/${userId}`);
      
      // Usar rota fornecida pelo usuário
      const response = await axios.get(
        `http://10.0.2.2:3000/api/animal/cadastrados/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          }
        }
      );
      
      console.log('Status da resposta:', response.status);
      console.log('Resposta completa:', JSON.stringify(response.data));
      
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        console.log('Animais encontrados na API:', response.data.length);
        
        // Mapear os dados do backend para o formato esperado pelo componente
        const animaisMapeados = response.data.map(animal => {
          console.log('Mapeando animal:', JSON.stringify(animal));
          
          return {
            id: animal.id || animal.animal_id,
            name: animal.nome || '',
            age: animal.idade || '',
            type: animal.tipo || '',
            breed: animal.raca || '',
            sex: animal.sexo || '',
            personality: animal.personalidade || '',
            description: animal.descricao || '',
            image: { uri: animal.imagem_url || 'https://via.placeholder.com/300' }
          };
        });
        
        console.log(`${animaisMapeados.length} animais mapeados com sucesso`);
        console.log('Primeiro animal mapeado:', JSON.stringify(animaisMapeados[0]));
        
        setAnimals(animaisMapeados);
        console.log('Estado "animals" atualizado com dados da API');
      } else {
        console.log('Nenhum animal encontrado na API ou formato inválido.');
        console.log('Tipo de response.data:', typeof response.data);
        console.log('É array?', Array.isArray(response.data));
        
        // Tentativa alternativa: verificar se é um objeto com uma propriedade contendo os animais
        if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
          const possibleArrayProps = Object.keys(response.data).filter(key => 
            Array.isArray(response.data[key]) && response.data[key].length > 0
          );
          
          if (possibleArrayProps.length > 0) {
            console.log('Encontrada array em propriedade:', possibleArrayProps[0]);
            const animaisDoObjeto = response.data[possibleArrayProps[0]];
            
            const animaisMapeados = animaisDoObjeto.map(animal => ({
              id: animal.id || animal.animal_id,
              name: animal.nome || '',
              age: animal.idade || '',
              type: animal.tipo || '',
              breed: animal.raca || '',
              sex: animal.sexo || '',
              personality: animal.personalidade || '',
              description: animal.descricao || '',
              image: { uri: animal.imagem_url || 'https://via.placeholder.com/300' }
            }));
            
            setAnimals(animaisMapeados);
            console.log('Estado "animals" atualizado com dados extraídos da propriedade do objeto');
            return;
          }
        }
        
        // Se não conseguir encontrar dados válidos, usar dados de exemplo
        console.log('Usando dados de exemplo como fallback');
        setAnimals(exampleAnimals);
        setApiError('API não retornou animais no formato esperado');
      }
    } catch (error) {
      console.error('Erro ao carregar animais da API:', error);
      if (error.response) {
        console.log('Status do erro:', error.response.status);
        console.log('Dados do erro:', JSON.stringify(error.response.data));
      } else {
        console.log('Erro sem resposta do servidor:', error.message);
      }
      
      console.log('Usando dados de exemplo como fallback devido a erro');
      setAnimals(exampleAnimals);
      setApiError(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Verificar se um animal está nos favoritos
  const isFavorite = (animalId) => {
    return favorites.some(fav => 
      fav.id === animalId || 
      fav.animal_id === animalId ||
      (fav.animal && fav.animal.id === animalId)
    );
  };

  const filteredAnimals = animals.filter(
    (a) =>
      search === "" ||
      (a.name && a.name.toLowerCase().includes(search.toLowerCase())) ||
      (a.breed && a.breed.toLowerCase().includes(search.toLowerCase())) ||
      (a.personality && a.personality.toLowerCase().includes(search.toLowerCase()))
  );

  const clearFilters = () => {
    setSearch("");
  };

  const handleFilterClick = () => {
    setFilterVisible(!filterVisible);
  };

  const menuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  // Função para recarregar os dados
  const recarregarDados = async () => {
    if (token && userId) {
      setLoading(true);
      setApiError(null);
      try {
        await carregarAnimais(token, userId);
      } catch (error) {
        console.error('Erro ao recarregar dados:', error);
        setApiError('Falha ao recarregar dados');
      }
    } else {
      Alert.alert('Erro', 'Informações de login não disponíveis. Por favor, faça login novamente.');
      navigation.navigate('Login');
    }
  };

  // Função para favoritar/desfavoritar animal
  const toggleFavorite = async (animal) => {
    try {
      if (isFavorite(animal.id)) {
        // Encontrar o ID do favorito para remover
        const favoritoParaRemover = favorites.find(fav => 
          fav.id === animal.id || 
          fav.animal_id === animal.id ||
          (fav.animal && fav.animal.id === animal.id)
        );
        
        const animalId = animal.id;
        
        // Desfavoritar - usar a URL fornecida pelo usuário
        await axios.delete(
          `http://10.0.2.2:3000/api/favoritos/${animalId}/${userId}`,
          {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        // Atualiza estado local removendo dos favoritos
        setFavorites(favorites.filter(fav => 
          fav.id !== animal.id && 
          fav.animal_id !== animal.id &&
          (!fav.animal || fav.animal.id !== animal.id)
        ));
      } else {
        // Preparar dados do animal para favoritar
        const animalData = {
          usuario_id: userId,
          animal_id: animal.id,
          nome: animal.name,
          idade: animal.age,
          raca: animal.breed,
          tipo: animal.type,
          descricao: animal.description,
          imagem_url: animal.image?.uri || "https://via.placeholder.com/300"
        };
        
        // Favoritar
        const response = await axios.post(
          'http://10.0.2.2:3000/api/favoritos',
          animalData,
          {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        // Atualiza estado local adicionando aos favoritos
        setFavorites([...favorites, { ...animalData, id: response.data.id || Date.now() }]);
      }
    } catch (error) {
      console.error('Erro ao atualizar favoritos:', error);
      Alert.alert('Erro', 'Não foi possível atualizar os favoritos.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Topo */}
      <View style={styles.topBar}>
  
  {/* Alinhar Barra de Pesquisa e Ícone de Menu */}
  <View style={styles.topBarRight}>
  <Image source={logo} style={styles.logo} />
  <View style={styles.searchContainer}>
  <TextInput
    style={styles.searchBar}
    placeholder="Buscar por nome ou raça..."
    value={search}
    onChangeText={setSearch}
    placeholderTextColor="#888"
  />
  <Icon name="search" size={18} color="#888" style={styles.searchIcon} />
</View>
    
    {/* Ícone do Menu */}
    <TouchableOpacity onPress={menuToggle} style={styles.menuButtonContainer}>
      <Text style={styles.menuButton}>☰</Text>
    </TouchableOpacity>
  </View>
  
  {/* Menu Dropdown */}
  {menuVisible && (
    <View style={styles.menuDropdown}>
      <TouchableOpacity onPress={() => {
        navigation.navigate("Home");
        setMenuVisible(false);
      }}>
        <Text style={styles.menuItem}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigation.navigate("Favoritos");
        setMenuVisible(false);
      }}>
        <Text style={styles.menuItem}>Favoritos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigation.navigate("Perfil");
        setMenuVisible(false);
      }}>

<TouchableOpacity onPress={() => {
        navigation.navigate("Login");
        setMenuVisible(false);
      }}>
        <Text style={styles.menuItem}>Login</Text>
      </TouchableOpacity>
        
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setMenuVisible(false)}>
        <Text style={styles.menuItem}>Fechar</Text>
      </TouchableOpacity>
    </View>
  )}
</View>

      {/* Filtros rápidos */}
      <View style={styles.filterTags}>
        {["carinhoso", "observadora", "Energético"].map((tag, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tagButton}
            onPress={() => setSearch(tag)}
          >
            <Text style={styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.tagButton} onPress={handleFilterClick}>
          <Text style={styles.tagText}>Filtros</Text>
        </TouchableOpacity>
      </View>

      {/* Menu de Filtros Expansível */}
      {filterVisible && (
        <View style={styles.filterContainer}>
          <ScrollView style={{ maxHeight: 300 }}>
            <Text style={styles.filterSectionTitle}>▼ Cachorro</Text>
            <View style={styles.filterGroup}>
              {[
                "Labrador",
                "Golden Retriever",
                "Poodle",
                "Bulldog Francês",
                "Husky Siberiano",
              ].map((breed, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSearch(breed)}
                  style={[
                    styles.filterButtonTag,
                    search === breed && styles.selectedTag,
                  ]}
                >
                  <Text>{breed}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.filterSectionTitle}>▼ Gatos</Text>
            <View style={styles.filterGroup}>
              {[
                "Persa",
                "Siamês",
                "Maine Coon",
                "Ragdoll",
                "British Shorthair",
              ].map((breed, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSearch(breed)}
                  style={[
                    styles.filterButtonTag,
                    search === breed && styles.selectedTag,
                  ]}
                >
                  <Text>{breed}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
              <Text style={styles.clearText}>Limpar Filtros</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* Lista de animais */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B00" />
          <Text style={styles.loadingText}>Carregando animais...</Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          {apiError && (
            <TouchableOpacity style={styles.errorContainer} onPress={recarregarDados}>
              <Text style={styles.errorText}>
                {apiError}. Toque para tentar novamente.
              </Text>
            </TouchableOpacity>
          )}
          
          <ScrollView contentContainerStyle={styles.animalList}>
            {filteredAnimals.length > 0 ? (
              filteredAnimals.map((animal) => (
                <TouchableOpacity
                  key={animal.id}
                  style={styles.favoriteCard}
                  onPress={() => setSelectedAnimal(animal)}
                >
                  <Image 
                    source={typeof animal.image === 'number' ? animal.image : { uri: animal.image.uri }}
                    style={styles.favoriteImage} 
                  />
                  <View style={styles.cardContent}>
                    <Text style={styles.animalName}>Nome: {animal.name}</Text>
                    <Text style={styles.animalBreed}>Idade: {animal.age}</Text>
                    <Text style={styles.animalBreed}>Raça: {animal.breed}</Text>
                    {/* Debug info */}
                    <Text style={{fontSize: 10, color: 'gray'}}>ID: {animal.id}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noAnimalsText}>Nenhum animal encontrado com os filtros aplicados.</Text>
            )}
            
            {/* Mostrar a fonte dos dados (API ou Exemplo) */}
            <Text style={{textAlign: 'center', fontSize: 10, color: 'gray', marginTop: 10}}>
              {apiError ? 'Usando dados de exemplo (fallback)' : 'Dados carregados da API'}
            </Text>
          </ScrollView>
        </View>
      )}

      {/* Modal polaroid */}
      {selectedAnimal && (
        <Modal
        animationType="slide"
        transparent
        visible={!!selectedAnimal}
        onRequestClose={() => setSelectedAnimal(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            <View style={styles.modalImageContainer}>
              <Image 
                source={typeof selectedAnimal.image === 'number' ? selectedAnimal.image : { uri: selectedAnimal.image.uri }} 
                style={styles.modalImage} 
              />
              <TouchableOpacity 
                style={styles.modalHeartIcon}
                onPress={() => toggleFavorite(selectedAnimal)}
              >
                <Icon 
                  name="heart" 
                  size={24} 
                  color={isFavorite(selectedAnimal.id) ? "#FF0000" : "#CCCCCC"} 
                  solid={isFavorite(selectedAnimal.id)}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Nome: {selectedAnimal.name}</Text>
              <Text style={styles.modalText}>Idade: {selectedAnimal.age}</Text>
              <Text style={styles.modalText}>Raça: {selectedAnimal.breed}</Text>
              <Text style={styles.modalText}>Tipo: {selectedAnimal.type}</Text>
              {selectedAnimal.personality && (
                <Text style={styles.modalText}>
                  <Text style={{ fontWeight: "bold" }}>Personalidade:</Text> {selectedAnimal.personality}
                </Text>
              )}
              {selectedAnimal.description && (
                <Text style={styles.modalText}>
                  <Text style={{ fontWeight: "bold" }}>Descrição:</Text> {selectedAnimal.description}
                </Text>
              )}
              <TouchableOpacity
                onPress={() => setSelectedAnimal(null)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      )}
    </View>
  );
};

export default Home;