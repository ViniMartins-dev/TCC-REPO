import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 40, // para evitar status bar
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuButton: {
    fontSize: 24,
    color: '#cb7942',
    marginLeft: 10,
  },

  searchContainer: {
    flex: 1,
    position: 'relative',
    marginRight: 10,
  },
  
  
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 80,
    paddingVertical: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#000",
    width: '100%', // importante se estiver usando flex
  },
  
  
  searchIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -9 }], // centraliza verticalmente o ícone
  },
  

  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 10,
  },
  
  
  menuDropdown: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    zIndex: 999, // importante para garantir que fique acima de outros elementos
    padding: 10,
  },
  
  menuItem: {
    fontSize: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    color: '#cb7942',
  },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    marginTop: 10,
    borderWidth: 0,
    borderColor: "#ccc",
  },

  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // ou use margin nos filhos
  },
  
  filterTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 6,
    borderWidth: 2,  // Borda ao redor do filtro
    borderColor: "#000",  // Cor da borda preta
    padding: 15,  // Espaçamento interno
    borderRadius: 0,  // Bordas arredondadas
  
  },
  
  tagButton: {
    backgroundColor: "#eaeaea",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,  // Borda ao redor de cada palavra
    borderColor: "#000",  // Cor da borda preta
  },
  
  tagText: {
    fontSize: 14,
  },
  
  filterContainer: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
  },
  filterSectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  filterGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 10,
  },
  filterButtonTag: {
    borderColor: "#aaa",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  selectedTag: {
    backgroundColor: "#d88",
  },
  clearButton: {
    alignSelf: "flex-end",
    padding: 6,
    marginTop: 8,
  },
  clearText: {
    color: "#c00",
    fontWeight: "bold",
  },
  animalList: {
    paddingTop: 12,
    gap: 80,
    alignItems: "center",
    fontWeight: "bold",
  },
  animalCard: {
    backgroundColor: "#fff",
    borderRadius: 0,
    width: 280,
    elevation: 3,
    alignItems: "center",
    paddingBottom: 30,
    fontWeight: "bold",
    width: 280,
    height: 350,
  },
  animalImage: {
    width: 280,
    height: 280,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingTop: 12,
  },
  cardContent: {
    marginTop: 8,
    alignItems: "center",
    fontWeight: "bold",
  },
  animalName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  animalBreed: {
    fontSize: 14,
    color: "#777",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 1,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 0,
    padding: 16,
    fontWeight: "bold",
    fontWeight: "bold",
  },
  modalImage: {
    width: "100%",
    height: 300,
    borderRadius: 8,
  },
  modalContent: {
    marginTop: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "bold",
  },
  adoptButton: {
    backgroundColor: "#c67c3d",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 12,
  },
  adoptButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#444",
  },


  //FAVORITOS
  bannerContainer: {
    position: 'relative',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  bannerText: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  
  favoriteCard: {
    backgroundColor: '#fff',
    margin: 40,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    padding: 37,
    alignItems: 'center',
  },
  favoriteImage: {
    width: 300,
    height: 250,
    borderRadius: 10,
  },
  favoriteInfo: {
    marginTop: 10,
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 10,
    marginRight: 58,
  },
  favoriteName: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  favoriteDetail: {
    fontSize: 13,
    color: '#444',
  },
  heartIcon: {
    fontSize: 26,
    color: 'red',
    marginRight: 8,
    marginBottom: 27,
  },
  
  modalImageContainer: {
    position: 'relative',
  },
  modalHeartIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1,
  },
  
  carouselItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 200,
    marginRight: 16, // espaço entre as imagens
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  
  carouselImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  
  carouselTextContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  
  carouselTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  
  carouselText: {
    fontSize: 14,
    color: "#fff",
  },
  
  topBarRight: {
    flexDirection: 'row',  // Alinha os itens horizontalmente
    alignItems: 'center',  // Alinha verticalmente os itens no centro
    flex: 1,  // Faz com que a barra de pesquisa ocupe o máximo de espaço possível
  },
  
  searchBar: {
    flex: 1,  // A barra de pesquisa ocupa o máximo de espaço possível
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 10,
    marginRight: 10,  // Espaço entre a barra de pesquisa e o ícone do menu
  },
  
  menuButtonContainer: {
    paddingLeft: 10, // Ajuste para o ícone do menu
  },

  // Estilos para a seção de favoritos
  favoritesSection: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    color: '#333',
  },
  favoritesScroll: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  favoriteItem: {
    width: 120,
    height: 150,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  favoriteItemImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  favoriteHeartIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 15,
    padding: 5,
  },
  favoriteItemName: {
    padding: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noFavoritesText: {
    padding: 15,
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
  cardHeartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },

  // Estilos para a tela de carregamento e mensagens
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  noAnimalsText: {
    padding: 20,
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  adoteButton: {
  backgroundColor: '#cb7842', // cor laranja ou ajuste conforme tema
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 8,
  marginTop: 10,
  alignItems: 'center',
},

adoteButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},


});
