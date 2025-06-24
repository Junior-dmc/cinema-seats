import { Movie, MovieSession, UpcomingMovie } from '../types';

export const currentMovies: Movie[] = [
  {
    id: 1,
    title: 'Pobres Criaturas',
    duration: 141,
    ageRating: 16,
    genres: ['Ficção Científica', 'Romance', 'Comédia'],
    imageUrl: '/images/movies/Pobres Criaturas.jpg',
    description: 'A jovem Bella Baxter é trazida de volta à vida pelo brilhante e pouco ortodoxo cientista Dr. Godwin Baxter. Sob a proteção de Baxter, Bella está ansiosa para aprender. Desejando conhecer mais do mundo, Bella foge com Duncan Wedderburn, um advogado habilidoso e experiente, em uma aventura por vários continentes.'
  },
  {
    id: 2,
    title: 'Bob Marley: One Love',
    duration: 104,
    ageRating: 12,
    genres: ['Drama', 'Música'],
    imageUrl: '/images/movies/Bob Marley One Love.jpg',
    description: 'Bob Marley: One Love celebra a vida e a música de um ícone que inspirou gerações através de sua mensagem de amor e união. Pela primeira vez na tela, descubra a poderosa história de superação de adversidades e a jornada por trás de sua música revolucionária.'
  }
];

export const movieSessions: Record<number, MovieSession[]> = {
  1: [ // Sessões para Pobres Criaturas
    {
      ...currentMovies[0],
      id: 1,
      date: '2024-03-24',
      time: '14:30',
      room: 'Sala 1',
      price: 32.00,
      type: '2D'
    },
    {
      ...currentMovies[0],
      id: 2,
      date: '2024-03-24',
      time: '17:30',
      room: 'Sala 2',
      price: 32.00,
      type: '3D'
    },
    {
      ...currentMovies[0],
      id: 3,
      date: '2024-03-24',
      time: '20:30',
      room: 'Sala IMAX',
      price: 48.00,
      type: 'IMAX'
    }
  ],
  2: [ // Sessões para Bob Marley: One Love
    {
      ...currentMovies[1],
      id: 4,
      date: '2024-03-24',
      time: '15:00',
      room: 'Sala 3',
      price: 32.00,
      type: '2D'
    },
    {
      ...currentMovies[1],
      id: 5,
      date: '2024-03-24',
      time: '18:00',
      room: 'Sala 4',
      price: 32.00,
      type: '2D'
    },
    {
      ...currentMovies[1],
      id: 6,
      date: '2024-03-24',
      time: '21:00',
      room: 'Sala IMAX',
      price: 48.00,
      type: 'IMAX'
    }
  ]
};

export const upcomingMovies: UpcomingMovie[] = [
  {
    id: 3,
    title: 'Duna: Parte 2',
    duration: 166,
    ageRating: 14,
    genres: ['Ficção Científica', 'Aventura', 'Drama'],
    imageUrl: '/images/movies/Duna Parte 2.jpg',
    releaseDate: '2024-03-28',
    description: 'Paul Atreides se une a Chani e aos Fremen em uma guerra de vingança contra os conspiradores que destruíram sua família. Enfrentando uma escolha entre o amor de sua vida e o destino do universo, ele deve evitar um futuro terrível que só ele pode prever.'
  },
  {
    id: 4,
    title: 'Godzilla e Kong: O Novo Império',
    duration: 115,
    ageRating: 12,
    genres: ['Ação', 'Aventura', 'Ficção Científica'],
    imageUrl: '/images/movies/Godzilla e Kong O Novo Império.jfif',
    releaseDate: '2024-04-11',
    description: 'A batalha lendária entre Kong e Godzilla continua! Após sua última colaboração para derrotar Mechagodzilla, os dois titãs precisam se unir novamente para enfrentar uma ameaça oculta que põe em risco tanto suas vidas quanto a da humanidade.'
  },
  {
    id: 5,
    title: 'Guerra Civil',
    duration: 109,
    ageRating: 16,
    genres: ['Ação', 'Drama', 'Suspense'],
    imageUrl: '/images/movies/Guerra Civil.jfif',
    releaseDate: '2024-04-18',
    description: 'Em um futuro próximo, uma equipe de jornalistas viaja pelos Estados Unidos durante uma guerra civil que dividiu o país. Eles enfrentam perigos mortais enquanto tentam documentar o conflito e seus impactos na população.'
  },
  {
    id: 6,
    title: 'Planeta dos Macacos: O Reino',
    duration: 145,
    ageRating: 14,
    genres: ['Ação', 'Aventura', 'Ficção Científica'],
    imageUrl: '/images/movies/Planeta dos Macacos O Reino.jfif',
    releaseDate: '2024-05-09',
    description: 'Muitos anos após o reinado de César, um jovem macaco embarca em uma jornada que o fará questionar tudo o que lhe foi ensinado sobre o passado e fazer escolhas que definirão o futuro tanto dos macacos quanto dos humanos.'
  },
  {
    id: 7,
    title: 'Deadpool & Wolverine',
    duration: 124,
    ageRating: 16,
    genres: ['Ação', 'Comédia', 'Ficção Científica'],
    imageUrl: '/images/movies/Deadpool & Wolverine.jfif',
    releaseDate: '2024-07-25',
    description: 'Wade Wilson, o Deadpool, junta-se à Organização do Tempo Variante (TVA) em uma missão que mudará para sempre a história do MCU. Ao lado do lendário Wolverine, eles embarcam em uma aventura insana através do multiverso, trazendo o humor ácido e a ação explosiva característicos dos personagens.'
  },
  {
    id: 8,
    title: 'Furiosa: Uma Saga Mad Max',
    duration: 150,
    ageRating: 16,
    genres: ['Ação', 'Aventura', 'Ficção Científica'],
    imageUrl: '/images/movies/Furiosa Uma Saga Mad Max.jfif',
    releaseDate: '2024-05-23',
    description: 'A origem de Furiosa, antes dos eventos de Mad Max: Estrada da Fúria. Raptada do Lugar Verde das Muitas Mães, ela cai nas mãos de uma grande Horda de Motociclistas liderada pelo Senhor da Guerra Dementus. Atravessando o Deserto, eles se deparam com a Cidadela comandada por Immortan Joe. Os dois tiranos guerreiam pelo domínio das terras devastadas.'
  }
]; 