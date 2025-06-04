-- Ambiente do banco
CREATE DATABASE IF NOT EXISTS DB_Haustier;
USE DB_Haustier;

-- Usuários: pode ser tutor ou protetor
CREATE TABLE IF NOT EXISTS usuarios (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    tipo            ENUM('tutor', 'protetor') NOT NULL,     -- Escolhido no Front-end
    
    nome            VARCHAR(100),
    sobrenome       VARCHAR(100),
    email           VARCHAR(100) UNIQUE NOT NULL,
    telefone        VARCHAR(20)  NOT NULL,
    senha           VARCHAR(255) NOT NULL,

    cpf             VARCHAR(14),            			    -- Apenas para tutor
    cnpj            VARCHAR(18),            			    -- Apenas para protetor

    nome_fantasia   VARCHAR(255),          				    -- Nome fantasia (para protetor)
    data_nascimento DATE,                   			    -- Apenas para tutor

    latitude        DECIMAL(10,8),
    longitude       DECIMAL(11,8),

    criado_em   	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Atualiza automaticamente

    -- Garantir que apenas tutor tenha CPF e apenas protetor tenha CNPJ
    CONSTRAINT chk_cpf_cnpj CHECK (
        (tipo = 'tutor' AND cpf IS NOT NULL AND cnpj IS NULL) OR
        (tipo = 'protetor' AND cnpj IS NOT NULL AND cpf IS NULL)
    )
);

-- Criando índice para o campo email
CREATE UNIQUE INDEX idx_email ON usuarios(email);

-- Animais
CREATE TABLE IF NOT EXISTS animais (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    
    nome            VARCHAR(50) NOT NULL,
    especie         ENUM('cachorro', 'gato', 'outro') NOT NULL,				-- Limitada pelo front end
    porte           ENUM('pequeno', 'medio', 'grande'),
    raca            VARCHAR(50),											-- Limitada pelo front end
    idade           INT,
    sexo            ENUM('M', 'F') NOT NULL,
    descricao       TEXT,
    personalidade   VARCHAR(255),											            -- Limitada pelo front end
    bin_foto        LONGBLOB,   												-- Imagem do animal (binário)
    status          ENUM('disponivel', 'adotado') DEFAULT 'disponivel',
    
    usuario_id      INT NOT NULL,											            -- FK do cadastrante
    
    criado_em   	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,    -- Atualiza automaticamente

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE	
);

-- Adoções
CREATE TABLE IF NOT EXISTS adocoes (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    
    status          ENUM('pendente', 'aprovada', 'rejeitada', 'entregue') DEFAULT 'pendente',
    
    animal_id       INT NOT NULL,
    tutor_id        INT NOT NULL, 											            -- FK para usuário com tipo = tutor
    
    criado_em   	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,    -- Atualiza automaticamente

    FOREIGN KEY (animal_id) REFERENCES animais(id) ON DELETE CASCADE,
    FOREIGN KEY (tutor_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Favoritos
CREATE TABLE IF NOT EXISTS favoritos (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    
    usuario_id      INT NOT NULL,											            -- FK para usuário com tipo = tutor
    animal_id       INT NOT NULL,
    
    criado_em   	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em 	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,    -- Atualiza automaticamente

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (animal_id) REFERENCES animais(id) ON DELETE CASCADE,
    UNIQUE KEY (usuario_id, animal_id) 										            -- Um tutor só pode favoritar uma vez
);

-- Trigger para remover favoritos após adoção
DELIMITER //

CREATE TRIGGER tr_remove_favoritos_apos_adocao
AFTER UPDATE ON adocoes
FOR EACH ROW
BEGIN
    IF NEW.status = 'aprovada' THEN
        DELETE FROM favoritos WHERE animal_id = NEW.animal_id;
    END IF;
END //

DELIMITER ;

-- Trigger para atualizar status do animal após adoção
DELIMITER //

CREATE TRIGGER tr_update_status_animal_apos_adocao
AFTER UPDATE ON adocoes
FOR EACH ROW
BEGIN
    IF NEW.status = 'aprovada' THEN
        UPDATE animais SET status = 'adotado' WHERE id = NEW.animal_id;
    END IF;
END //

DELIMITER ;
