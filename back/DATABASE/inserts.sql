
USE DB_Haustier;
-- Inserts para testes com o Banco de dados;

-- Tutor 
INSERT INTO usuarios (tipo, nome, sobrenome, email, telefone, senha, cpf, data_nascimento, latitude, longitude) VALUES
('tutor', 'João', 'Silva', 'joao@email.com', '11999999999', 'senha123', '123.456.789-00', '1990-05-10', -23.454515, -46.533663),
('tutor', 'Maria', 'Fernandes', 'maria@email.com', '11988888888', 'senha123', '987.654.321-00', '1995-08-22', -23.426800, -46.456100),
('tutor', 'Carlos', 'Oliveira', 'carlos@email.com', '11977777777', 'senha123', '456.789.123-00', '1988-03-14', -23.470000, -46.520000);


-- Organização 
INSERT INTO usuarios (tipo, nome, sobrenome, email, telefone, senha, cnpj, nome_org, latitude, longitude) VALUES
('org', 'Ana', 'Santos', 'ana@ongamigos.com', '1133334444', 'senha123', '12.345.678/0001-90', 'ONG Amigos dos Pets', -23.469400, -46.528600),
('org', 'Bruno', 'Costa', 'bruno@resgatesos.com', '1133335555', 'senha123', '98.765.432/0001-10', 'Resgate SOS', -23.460000, -46.540000);


-- Animais
INSERT INTO animais (nome, especie, porte, raca, idade, sexo, descricao, personalidade, foto_url, usuario_id) VALUES
('Bolt', 'Cachorro', 'Médio', 'Vira-lata', 3, 'M', 'Muito amigável e energético.', 'Brincalhão', '', 4),
('Mimi', 'Gato', 'Pequeno', 'Siamês', 2, 'F', 'Calma, adora colo.', 'Carinhosa', '', 4),
('Rex', 'Cachorro', 'Grande', 'Pastor Alemão', 5, 'M', 'Protetor e treinado.', 'Leal', '', 5),
('Luna', 'Gato', 'Pequeno', 'Persa', 1, 'F', 'Muito sociável.', 'Brincalhona', '', 5),
('Tom', 'Cachorro', 'Pequeno', 'Poodle', 4, 'M', 'Ideal para apartamento.', 'Sociável', '', 4);


-- Relação Favorito
INSERT INTO favoritos (usuario_id, animal_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(2, 4),
(1, 5);

-- Adoções
INSERT INTO adocoes (animal_id, tutor_id, status) VALUES
(1, 1, 'Pendente'),
(2, 2, 'Aprovada'),
(3, 3, 'Rejeitada'),
(4, 2, 'Pendente'),
(5, 1, 'Aprovada');
