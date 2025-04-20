CREATE DATABASE IF NOT EXISTS DB_Haustier;
USE DB_Haustier;

-- Usuários: pode ser tutor ou org
CREATE TABLE IF NOT EXISTS usuarios (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    tipo            ENUM('tutor', 'org') NOT NULL,		-- Escolhido no Front-end
    
    nome            VARCHAR(100) NOT NULL,
    sobrenome       VARCHAR(100) NOT NULL,
    email           VARCHAR(100) UNIQUE NOT NULL,
    telefone        VARCHAR(20),
    senha           VARCHAR(255) NOT NULL,

    cpf             VARCHAR(14),            			-- Apenas para tutor
    cnpj            VARCHAR(18),            			-- Apenas para ORG

    nome_org        VARCHAR(255),          				-- Nome fantasia (para ORG)
    data_nascimento DATE,                   			-- Apenas para tutor

    latitude        DECIMAL(10,8),
    longitude       DECIMAL(11,8),

    criado_em   	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Animais
CREATE TABLE IF NOT EXISTS animais (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    
    nome            VARCHAR(50) NOT NULL,
    especie         ENUM('Cachorro', 'Gato', 'Outro') NOT NULL,				-- Limitada pelo front end
    porte           ENUM('Pequeno', 'Médio', 'Grande'),
    raca            VARCHAR(50),											-- Limitada pelo front end
    idade           INT,
    sexo            ENUM('M', 'F') NOT NULL,
    descricao       TEXT,
    personalidade   VARCHAR(255),											-- Limitada pelo front end
    foto_url        VARCHAR(255),
    status          ENUM('Disponível', 'Adotado') DEFAULT 'Disponível',
    
    usuario_id      INT NOT NULL,											-- FK do cadastrante
    
    criado_em   	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE	
);

-- Adoções
CREATE TABLE IF NOT EXISTS adocoes (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    
    status          ENUM('Pendente', 'Aprovada', 'Rejeitada') DEFAULT 'Pendente',
    
    animal_id       INT NOT NULL,
    tutor_id        INT NOT NULL, 											-- FK para usuário com tipo = tutor
    
    criado_em   	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (animal_id) REFERENCES animais(id) ON DELETE CASCADE,
    FOREIGN KEY (tutor_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Favoritos
CREATE TABLE IF NOT EXISTS favoritos (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    
    usuario_id      INT NOT NULL,											-- FK para usuário com tipo = tutor
    animal_id       INT NOT NULL,
    
    criado_em   	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (animal_id) REFERENCES animais(id) ON DELETE CASCADE,
    UNIQUE KEY (usuario_id, animal_id) 										-- Um tutor só pode favoritar uma vez
);
