CREATE DATABASE dbanimais;
use dbanimais;

CREATE TABLE cadastrantes (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    nome            VARCHAR(100) NOT NULL,
    sobrenome		VARCHAR(100) NOT NULL,
    email           VARCHAR(100) UNIQUE NOT NULL,
    telefone        VARCHAR(20),
    localizacao     POINT NOT NULL,
    senha           VARCHAR(255) NOT NULL,
    organizacao     VARCHAR(255),

    data_cadastro   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    SPATIAL INDEX (localizacao)
);

CREATE TABLE tutores (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    nome            VARCHAR(100) NOT NULL,
    sobrenome		VARCHAR(100) NOT NULL,
    email           VARCHAR(100) UNIQUE NOT NULL,
    telefone        VARCHAR(20),
    localizacao     POINT NOT NULL,
    senha           VARCHAR(255) NOT NULL,

    data_cadastro   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    SPATIAL INDEX (localizacao)
);

CREATE TABLE animais (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    nome            VARCHAR(50),
    especie         ENUM('Cachorro', 'Gato', 'Outro') NOT NULL,
    raca            VARCHAR(50),
    idade           INT,
    sexo            ENUM('M', 'F') NOT NULL,
    descricao       TEXT,
    fotoURL			VARCHAR(255),
    personalidade   VARCHAR(50),

    cadastrante_id  INT NOT NULL,
    localizacao     POINT NOT NULL,
    status          ENUM('Disponível', 'Adotado') DEFAULT 'Disponível',

    FOREIGN KEY (cadastrante_id) REFERENCES cadastrantes(id) ON DELETE CASCADE,
    SPATIAL INDEX (localizacao)
);

CREATE TABLE adocoes (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    animal_id       INT NOT NULL,
    tutor_id        INT NOT NULL,
    data_adocao     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (animal_id) REFERENCES animais(id) ON DELETE CASCADE,
    FOREIGN KEY (tutor_id) REFERENCES tutores(id) ON DELETE CASCADE
);
