const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const postProtetor = 'http://localhost:3000/usuario/protetor';
const postTutor = 'http://localhost:3000/usuario/tutor';
const postAnimais = 'http://localhost:3000/animal/';

console.log('rodando');

const Protetor = {
    tipo: 'protetor',
    nome_fantasia: 'Amigos dos Bs',
    email: 'protetor@email.com',
    telefone: '(11) 99876-5432',
    senha: 'protetor123',
    cnpj: '97490635000156',
    latitude: '-23.561414',
    longitude: '-46.655881'
};

const Tutor = {
    tipo: 'tutor',
    nome: 'Carla',
    sobrenome: 'Silva',
    email: 'tutor@email.com',
    telefone: '(11) 91234-5678',
    senha: 'tutor123',
    cpf: '34583551037',
    data_nascimento: '1990-05-10',
    latitude: '-23.550520',
    longitude: '-46.633308',
};

const animais = [
    {
        nome: 'Thor',
        especie: 'Cachorro',
        porte: 'Grande',
        raca: 'labrador',
        idade: 3,
        sexo: 'M',
        descricao: 'Cheio de energia, ideal para casas com quintal.',
        personalidade: 'amigável',
        bin_foto: './assets/animal_1.jpg',
        usuario_id: 1,
    },
    {
        nome: 'Mia',
        especie: 'Gato',
        porte: 'Pequeno',
        raca: 'siamês',
        idade: 2,
        sexo: 'F',
        descricao: 'Muito carinhosa e adaptada a apartamentos.',
        personalidade: 'curiosa',
        bin_foto: './assets/animal_2.jpg',
        usuario_id: 1,
    },
    {
        nome: 'Rex',
        especie: 'Cachorro',
        porte: 'Médio',
        raca: 'vira-lata',
        idade: 4,
        sexo: 'M',
        descricao: 'Resgatado recentemente, está em reabilitação.',
        personalidade: 'calmo',
        bin_foto: './assets/animal_3.jpg',
        usuario_id: 1,
    }
];

async function insert() {
    try {

        //inserindo protetor na base
        await fetch(postProtetor, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Protetor)
        });

        //inserindo tutor na base
        await fetch(postTutor, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Tutor)
        });

        //inserindo animais na base
        for (const animal of animais) {
            try {
                const imagemBuffer = fs.readFileSync(animal.bin_foto);
                const form = new FormData();

                form.append('nome', animal.nome);
                form.append('especie', animal.especie);
                form.append('porte', animal.porte);
                form.append('raca', animal.raca);
                form.append('idade', animal.idade.toString());
                form.append('sexo', animal.sexo);
                form.append('descricao', animal.descricao);
                form.append('personalidade', animal.personalidade);
                form.append('usuario_id', animal.usuario_id.toString());

                form.append('bin_foto', imagemBuffer, {
                    filename: path.basename(animal.bin_foto),
                    contentType: 'image/jpeg'
                });

                console.log(`Enviando animal: ${animal.nome}`);

                const response = await axios.post(postAnimais, form, {
                    headers: {
                        ...form.getHeaders(),
                        'bearer': '000'
                    }
                });

            } catch (error) {
                console.log("Erro ao inserir animal:", animal.nome, error);
            }
        }

    } catch (error) {
        console.log(`erro ao fazer inserts iniciais: ${error}`);
    }
}

insert();
