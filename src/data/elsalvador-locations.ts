/**
 * Geographic data for El Salvador
 * Contains all 14 departments and their respective municipalities
 * Data source: Official administrative divisions of El Salvador
 */

import type { Department, Municipality } from '@/types/location'

/**
 * Complete list of all departments and municipalities in El Salvador
 * Organized hierarchically for easy navigation and selection
 */
export const EL_SALVADOR_DEPARTMENTS: Department[] = [
  {
    id: 'ahuachapan',
    name: 'Ahuachapán',
    municipalities: [
      {
        id: 'ahuachapan-ahuachapan',
        name: 'Ahuachapán',
        departmentId: 'ahuachapan'
      },
      { id: 'ahuachapan-apaneca', name: 'Apaneca', departmentId: 'ahuachapan' },
      {
        id: 'ahuachapan-atiquizaya',
        name: 'Atiquizaya',
        departmentId: 'ahuachapan'
      },
      {
        id: 'ahuachapan-concepcion-de-ataco',
        name: 'Concepción de Ataco',
        departmentId: 'ahuachapan'
      },
      {
        id: 'ahuachapan-el-refugio',
        name: 'El Refugio',
        departmentId: 'ahuachapan'
      },
      {
        id: 'ahuachapan-guaymango',
        name: 'Guaymango',
        departmentId: 'ahuachapan'
      },
      { id: 'ahuachapan-jujutla', name: 'Jujutla', departmentId: 'ahuachapan' },
      {
        id: 'ahuachapan-san-francisco-menendez',
        name: 'San Francisco Menéndez',
        departmentId: 'ahuachapan'
      },
      {
        id: 'ahuachapan-san-lorenzo',
        name: 'San Lorenzo',
        departmentId: 'ahuachapan'
      },
      {
        id: 'ahuachapan-san-pedro-puxtla',
        name: 'San Pedro Puxtla',
        departmentId: 'ahuachapan'
      },
      { id: 'ahuachapan-tacuba', name: 'Tacuba', departmentId: 'ahuachapan' },
      { id: 'ahuachapan-turin', name: 'Turín', departmentId: 'ahuachapan' }
    ]
  },
  {
    id: 'santa-ana',
    name: 'Santa Ana',
    municipalities: [
      {
        id: 'santa-ana-santa-ana',
        name: 'Santa Ana',
        departmentId: 'santa-ana'
      },
      {
        id: 'santa-ana-candelaria-de-la-frontera',
        name: 'Candelaria de la Frontera',
        departmentId: 'santa-ana'
      },
      {
        id: 'santa-ana-chalchuapa',
        name: 'Chalchuapa',
        departmentId: 'santa-ana'
      },
      {
        id: 'santa-ana-coatepeque',
        name: 'Coatepeque',
        departmentId: 'santa-ana'
      },
      { id: 'santa-ana-el-congo', name: 'El Congo', departmentId: 'santa-ana' },
      {
        id: 'santa-ana-el-porvenir',
        name: 'El Porvenir',
        departmentId: 'santa-ana'
      },
      { id: 'santa-ana-masahuat', name: 'Masahuat', departmentId: 'santa-ana' },
      { id: 'santa-ana-metapan', name: 'Metapán', departmentId: 'santa-ana' },
      {
        id: 'santa-ana-san-antonio-pajonal',
        name: 'San Antonio Pajonal',
        departmentId: 'santa-ana'
      },
      {
        id: 'santa-ana-san-sebastian-salitrillo',
        name: 'San Sebastián Salitrillo',
        departmentId: 'santa-ana'
      },
      {
        id: 'santa-ana-santa-rosa-guachipilin',
        name: 'Santa Rosa Guachipilín',
        departmentId: 'santa-ana'
      },
      {
        id: 'santa-ana-santiago-de-la-frontera',
        name: 'Santiago de la Frontera',
        departmentId: 'santa-ana'
      },
      {
        id: 'santa-ana-texistepeque',
        name: 'Texistepeque',
        departmentId: 'santa-ana'
      }
    ]
  },
  {
    id: 'sonsonate',
    name: 'Sonsonate',
    municipalities: [
      {
        id: 'sonsonate-sonsonate',
        name: 'Sonsonate',
        departmentId: 'sonsonate'
      },
      { id: 'sonsonate-acajutla', name: 'Acajutla', departmentId: 'sonsonate' },
      { id: 'sonsonate-armenia', name: 'Armenia', departmentId: 'sonsonate' },
      { id: 'sonsonate-caluco', name: 'Caluco', departmentId: 'sonsonate' },
      {
        id: 'sonsonate-cuisnahuat',
        name: 'Cuisnahuat',
        departmentId: 'sonsonate'
      },
      { id: 'sonsonate-izalco', name: 'Izalco', departmentId: 'sonsonate' },
      { id: 'sonsonate-juayua', name: 'Juayúa', departmentId: 'sonsonate' },
      {
        id: 'sonsonate-nahuizalco',
        name: 'Nahuizalco',
        departmentId: 'sonsonate'
      },
      {
        id: 'sonsonate-nahulingo',
        name: 'Nahulingo',
        departmentId: 'sonsonate'
      },
      {
        id: 'sonsonate-salcoatitan',
        name: 'Salcoatitán',
        departmentId: 'sonsonate'
      },
      {
        id: 'sonsonate-san-antonio-del-monte',
        name: 'San Antonio del Monte',
        departmentId: 'sonsonate'
      },
      {
        id: 'sonsonate-san-julian',
        name: 'San Julián',
        departmentId: 'sonsonate'
      },
      {
        id: 'sonsonate-santa-catarina-masahuat',
        name: 'Santa Catarina Masahuat',
        departmentId: 'sonsonate'
      },
      {
        id: 'sonsonate-santa-isabel-ishuatan',
        name: 'Santa Isabel Ishuatán',
        departmentId: 'sonsonate'
      },
      {
        id: 'sonsonate-santo-domingo-de-guzman',
        name: 'Santo Domingo de Guzmán',
        departmentId: 'sonsonate'
      },
      {
        id: 'sonsonate-sonzacate',
        name: 'Sonzacate',
        departmentId: 'sonsonate'
      }
    ]
  },
  {
    id: 'chalatenango',
    name: 'Chalatenango',
    municipalities: [
      {
        id: 'chalatenango-chalatenango',
        name: 'Chalatenango',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-agua-caliente',
        name: 'Agua Caliente',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-arcatao',
        name: 'Arcatao',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-azacualpa',
        name: 'Azacualpa',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-cancasque',
        name: 'Cancasque',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-comalapa',
        name: 'Comalapa',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-concepcion-quezaltepeque',
        name: 'Concepción Quezaltepeque',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-dulce-nombre-de-maria',
        name: 'Dulce Nombre de María',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-el-carrizal',
        name: 'El Carrizal',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-el-paraiso',
        name: 'El Paraíso',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-la-laguna',
        name: 'La Laguna',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-la-palma',
        name: 'La Palma',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-la-reina',
        name: 'La Reina',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-las-vueltas',
        name: 'Las Vueltas',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-nombre-de-jesus',
        name: 'Nombre de Jesús',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-nueva-concepcion',
        name: 'Nueva Concepción',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-nueva-trinidad',
        name: 'Nueva Trinidad',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-ojos-de-agua',
        name: 'Ojos de Agua',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-potonico',
        name: 'Potonico',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-san-antonio-de-la-cruz',
        name: 'San Antonio de la Cruz',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-san-antonio-los-ranchos',
        name: 'San Antonio Los Ranchos',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-san-fernando',
        name: 'San Fernando',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-san-francisco-lempa',
        name: 'San Francisco Lempa',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-san-francisco-morazan',
        name: 'San Francisco Morazán',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-san-ignacio',
        name: 'San Ignacio',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-san-isidro-labrador',
        name: 'San Isidro Labrador',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-san-luis-del-carmen',
        name: 'San Luis del Carmen',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-san-miguel-de-mercedes',
        name: 'San Miguel de Mercedes',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-san-rafael',
        name: 'San Rafael',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-santa-rita',
        name: 'Santa Rita',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-tejutla',
        name: 'Tejutla',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-la-union',
        name: 'La Unión',
        departmentId: 'chalatenango'
      },
      {
        id: 'chalatenango-san-jose-cancasque',
        name: 'San José Cancasque',
        departmentId: 'chalatenango'
      }
    ]
  },
  {
    id: 'la-libertad',
    name: 'La Libertad',
    municipalities: [
      {
        id: 'la-libertad-santa-tecla',
        name: 'Santa Tecla',
        departmentId: 'la-libertad'
      },
      {
        id: 'la-libertad-antiguo-cuscatlan',
        name: 'Antiguo Cuscatlán',
        departmentId: 'la-libertad'
      },
      {
        id: 'la-libertad-chiltiupan',
        name: 'Chiltiupán',
        departmentId: 'la-libertad'
      },
      {
        id: 'la-libertad-ciudad-arce',
        name: 'Ciudad Arce',
        departmentId: 'la-libertad'
      },
      { id: 'la-libertad-colon', name: 'Colón', departmentId: 'la-libertad' },
      {
        id: 'la-libertad-comasagua',
        name: 'Comasagua',
        departmentId: 'la-libertad'
      },
      {
        id: 'la-libertad-huizucar',
        name: 'Huizúcar',
        departmentId: 'la-libertad'
      },
      {
        id: 'la-libertad-jayaque',
        name: 'Jayaque',
        departmentId: 'la-libertad'
      },
      {
        id: 'la-libertad-jicalapa',
        name: 'Jicalapa',
        departmentId: 'la-libertad'
      },
      {
        id: 'la-libertad-la-libertad',
        name: 'La Libertad',
        departmentId: 'la-libertad'
      },
      {
        id: 'la-libertad-nuevo-cuscatlan',
        name: 'Nuevo Cuscatlán',
        departmentId: 'la-libertad'
      },
      {
        id: 'la-libertad-san-pablo-tacachico',
        name: 'San Pablo Tacachico',
        departmentId: 'la-libertad'
      },
      {
        id: 'la-libertad-quezaltepeque',
        name: 'Quezaltepeque',
        departmentId: 'la-libertad'
      },
      {
        id: 'la-libertad-san-juan-opico',
        name: 'San Juan Opico',
        departmentId: 'la-libertad'
      },
      {
        id: 'la-libertad-san-matias',
        name: 'San Matías',
        departmentId: 'la-libertad'
      },
      {
        id: 'la-libertad-sacacoyo',
        name: 'Sacacoyo',
        departmentId: 'la-libertad'
      },
      {
        id: 'la-libertad-san-jose-villanueva',
        name: 'San José Villanueva',
        departmentId: 'la-libertad'
      },
      {
        id: 'la-libertad-talnique',
        name: 'Talnique',
        departmentId: 'la-libertad'
      },
      {
        id: 'la-libertad-tamanique',
        name: 'Tamanique',
        departmentId: 'la-libertad'
      },
      {
        id: 'la-libertad-teotepeque',
        name: 'Teotepeque',
        departmentId: 'la-libertad'
      },
      {
        id: 'la-libertad-tepecoyo',
        name: 'Tepecoyo',
        departmentId: 'la-libertad'
      },
      {
        id: 'la-libertad-zaragoza',
        name: 'Zaragoza',
        departmentId: 'la-libertad'
      }
    ]
  },
  {
    id: 'san-salvador',
    name: 'San Salvador',
    municipalities: [
      {
        id: 'san-salvador-san-salvador',
        name: 'San Salvador',
        departmentId: 'san-salvador'
      },
      {
        id: 'san-salvador-aguilares',
        name: 'Aguilares',
        departmentId: 'san-salvador'
      },
      { id: 'san-salvador-apopa', name: 'Apopa', departmentId: 'san-salvador' },
      {
        id: 'san-salvador-ayutuxtepeque',
        name: 'Ayutuxtepeque',
        departmentId: 'san-salvador'
      },
      {
        id: 'san-salvador-cuscatancingo',
        name: 'Cuscatancingo',
        departmentId: 'san-salvador'
      },
      {
        id: 'san-salvador-el-paisnal',
        name: 'El Paisnal',
        departmentId: 'san-salvador'
      },
      {
        id: 'san-salvador-guazapa',
        name: 'Guazapa',
        departmentId: 'san-salvador'
      },
      {
        id: 'san-salvador-ilopango',
        name: 'Ilopango',
        departmentId: 'san-salvador'
      },
      {
        id: 'san-salvador-mejicanos',
        name: 'Mejicanos',
        departmentId: 'san-salvador'
      },
      {
        id: 'san-salvador-nejapa',
        name: 'Nejapa',
        departmentId: 'san-salvador'
      },
      {
        id: 'san-salvador-panchimalco',
        name: 'Panchimalco',
        departmentId: 'san-salvador'
      },
      {
        id: 'san-salvador-rosario-de-mora',
        name: 'Rosario de Mora',
        departmentId: 'san-salvador'
      },
      {
        id: 'san-salvador-san-marcos',
        name: 'San Marcos',
        departmentId: 'san-salvador'
      },
      {
        id: 'san-salvador-san-martin',
        name: 'San Martín',
        departmentId: 'san-salvador'
      },
      {
        id: 'san-salvador-santiago-texacuangos',
        name: 'Santiago Texacuangos',
        departmentId: 'san-salvador'
      },
      {
        id: 'san-salvador-santo-tomas',
        name: 'Santo Tomás',
        departmentId: 'san-salvador'
      },
      {
        id: 'san-salvador-soyapango',
        name: 'Soyapango',
        departmentId: 'san-salvador'
      },
      {
        id: 'san-salvador-tonacatepeque',
        name: 'Tonacatepeque',
        departmentId: 'san-salvador'
      },
      {
        id: 'san-salvador-ciudad-delgado',
        name: 'Ciudad Delgado',
        departmentId: 'san-salvador'
      }
    ]
  },
  {
    id: 'cuscatlan',
    name: 'Cuscatlán',
    municipalities: [
      {
        id: 'cuscatlan-cojutepeque',
        name: 'Cojutepeque',
        departmentId: 'cuscatlan'
      },
      {
        id: 'cuscatlan-candelaria',
        name: 'Candelaria',
        departmentId: 'cuscatlan'
      },
      {
        id: 'cuscatlan-el-carmen',
        name: 'El Carmen',
        departmentId: 'cuscatlan'
      },
      {
        id: 'cuscatlan-el-rosario',
        name: 'El Rosario',
        departmentId: 'cuscatlan'
      },
      {
        id: 'cuscatlan-monte-san-juan',
        name: 'Monte San Juan',
        departmentId: 'cuscatlan'
      },
      {
        id: 'cuscatlan-oratorio-de-concepcion',
        name: 'Oratorio de Concepción',
        departmentId: 'cuscatlan'
      },
      {
        id: 'cuscatlan-san-bartolome-perulapi',
        name: 'San Bartolomé Perulapía',
        departmentId: 'cuscatlan'
      },
      {
        id: 'cuscatlan-san-cristobal',
        name: 'San Cristóbal',
        departmentId: 'cuscatlan'
      },
      {
        id: 'cuscatlan-san-jose-guayabal',
        name: 'San José Guayabal',
        departmentId: 'cuscatlan'
      },
      {
        id: 'cuscatlan-san-pedro-perulapan',
        name: 'San Pedro Perulapán',
        departmentId: 'cuscatlan'
      },
      {
        id: 'cuscatlan-san-rafael-cedros',
        name: 'San Rafael Cedros',
        departmentId: 'cuscatlan'
      },
      {
        id: 'cuscatlan-san-ramon',
        name: 'San Ramón',
        departmentId: 'cuscatlan'
      },
      {
        id: 'cuscatlan-santa-cruz-analquito',
        name: 'Santa Cruz Analquito',
        departmentId: 'cuscatlan'
      },
      {
        id: 'cuscatlan-santa-cruz-michapa',
        name: 'Santa Cruz Michapa',
        departmentId: 'cuscatlan'
      },
      {
        id: 'cuscatlan-suchitoto',
        name: 'Suchitoto',
        departmentId: 'cuscatlan'
      },
      {
        id: 'cuscatlan-tenancingo',
        name: 'Tenancingo',
        departmentId: 'cuscatlan'
      }
    ]
  },
  {
    id: 'la-paz',
    name: 'La Paz',
    municipalities: [
      {
        id: 'la-paz-zacatecoluca',
        name: 'Zacatecoluca',
        departmentId: 'la-paz'
      },
      { id: 'la-paz-cuyultitan', name: 'Cuyultitán', departmentId: 'la-paz' },
      { id: 'la-paz-el-rosario', name: 'El Rosario', departmentId: 'la-paz' },
      { id: 'la-paz-jerusalen', name: 'Jerusalén', departmentId: 'la-paz' },
      {
        id: 'la-paz-mercedes-la-ceiba',
        name: 'Mercedes La Ceiba',
        departmentId: 'la-paz'
      },
      { id: 'la-paz-olocuilta', name: 'Olocuilta', departmentId: 'la-paz' },
      {
        id: 'la-paz-paraiso-de-osorio',
        name: 'Paraíso de Osorio',
        departmentId: 'la-paz'
      },
      {
        id: 'la-paz-san-antonio-masahuat',
        name: 'San Antonio Masahuat',
        departmentId: 'la-paz'
      },
      { id: 'la-paz-san-emigdio', name: 'San Emigdio', departmentId: 'la-paz' },
      {
        id: 'la-paz-san-francisco-chinameca',
        name: 'San Francisco Chinameca',
        departmentId: 'la-paz'
      },
      {
        id: 'la-paz-san-juan-nonualco',
        name: 'San Juan Nonualco',
        departmentId: 'la-paz'
      },
      {
        id: 'la-paz-san-juan-talpa',
        name: 'San Juan Talpa',
        departmentId: 'la-paz'
      },
      {
        id: 'la-paz-san-juan-tepezontes',
        name: 'San Juan Tepezontes',
        departmentId: 'la-paz'
      },
      {
        id: 'la-paz-san-luis-la-herradura',
        name: 'San Luis La Herradura',
        departmentId: 'la-paz'
      },
      {
        id: 'la-paz-san-luis-talpa',
        name: 'San Luis Talpa',
        departmentId: 'la-paz'
      },
      {
        id: 'la-paz-san-miguel-tepezontes',
        name: 'San Miguel Tepezontes',
        departmentId: 'la-paz'
      },
      {
        id: 'la-paz-san-pedro-masahuat',
        name: 'San Pedro Masahuat',
        departmentId: 'la-paz'
      },
      {
        id: 'la-paz-san-pedro-nonualco',
        name: 'San Pedro Nonualco',
        departmentId: 'la-paz'
      },
      {
        id: 'la-paz-san-rafael-obrajuelo',
        name: 'San Rafael Obrajuelo',
        departmentId: 'la-paz'
      },
      {
        id: 'la-paz-santa-maria-ostuma',
        name: 'Santa María Ostuma',
        departmentId: 'la-paz'
      },
      {
        id: 'la-paz-santiago-nonualco',
        name: 'Santiago Nonualco',
        departmentId: 'la-paz'
      },
      { id: 'la-paz-tapalhuaca', name: 'Tapalhuaca', departmentId: 'la-paz' }
    ]
  },
  {
    id: 'cabanas',
    name: 'Cabañas',
    municipalities: [
      {
        id: 'cabanas-sensuntepeque',
        name: 'Sensuntepeque',
        departmentId: 'cabanas'
      },
      { id: 'cabanas-cinquera', name: 'Cinquera', departmentId: 'cabanas' },
      { id: 'cabanas-dolores', name: 'Dolores', departmentId: 'cabanas' },
      { id: 'cabanas-guacotecti', name: 'Guacotecti', departmentId: 'cabanas' },
      { id: 'cabanas-ilobasco', name: 'Ilobasco', departmentId: 'cabanas' },
      { id: 'cabanas-jutiapa', name: 'Jutiapa', departmentId: 'cabanas' },
      { id: 'cabanas-san-isidro', name: 'San Isidro', departmentId: 'cabanas' },
      {
        id: 'cabanas-tejutepeque',
        name: 'Tejutepeque',
        departmentId: 'cabanas'
      },
      { id: 'cabanas-victoria', name: 'Victoria', departmentId: 'cabanas' }
    ]
  },
  {
    id: 'san-vicente',
    name: 'San Vicente',
    municipalities: [
      {
        id: 'san-vicente-san-vicente',
        name: 'San Vicente',
        departmentId: 'san-vicente'
      },
      {
        id: 'san-vicente-apastepeque',
        name: 'Apastepeque',
        departmentId: 'san-vicente'
      },
      {
        id: 'san-vicente-guadalupe',
        name: 'Guadalupe',
        departmentId: 'san-vicente'
      },
      {
        id: 'san-vicente-san-cayetano-istepeque',
        name: 'San Cayetano Istepeque',
        departmentId: 'san-vicente'
      },
      {
        id: 'san-vicente-san-esteban-catarina',
        name: 'San Esteban Catarina',
        departmentId: 'san-vicente'
      },
      {
        id: 'san-vicente-san-ildefonso',
        name: 'San Ildefonso',
        departmentId: 'san-vicente'
      },
      {
        id: 'san-vicente-san-lorenzo',
        name: 'San Lorenzo',
        departmentId: 'san-vicente'
      },
      {
        id: 'san-vicente-san-sebastian',
        name: 'San Sebastián',
        departmentId: 'san-vicente'
      },
      {
        id: 'san-vicente-santa-clara',
        name: 'Santa Clara',
        departmentId: 'san-vicente'
      },
      {
        id: 'san-vicente-santo-domingo',
        name: 'Santo Domingo',
        departmentId: 'san-vicente'
      },
      {
        id: 'san-vicente-tecoluca',
        name: 'Tecoluca',
        departmentId: 'san-vicente'
      },
      {
        id: 'san-vicente-tepetitan',
        name: 'Tepetitán',
        departmentId: 'san-vicente'
      },
      {
        id: 'san-vicente-verapaz',
        name: 'Verapaz',
        departmentId: 'san-vicente'
      }
    ]
  },
  {
    id: 'usulutan',
    name: 'Usulután',
    municipalities: [
      { id: 'usulutan-usulutan', name: 'Usulután', departmentId: 'usulutan' },
      { id: 'usulutan-alegria', name: 'Alegría', departmentId: 'usulutan' },
      { id: 'usulutan-berlin', name: 'Berlín', departmentId: 'usulutan' },
      {
        id: 'usulutan-california',
        name: 'California',
        departmentId: 'usulutan'
      },
      {
        id: 'usulutan-concepcion-batres',
        name: 'Concepción Batres',
        departmentId: 'usulutan'
      },
      {
        id: 'usulutan-el-triunfo',
        name: 'El Triunfo',
        departmentId: 'usulutan'
      },
      {
        id: 'usulutan-ereguayquin',
        name: 'Ereguayquín',
        departmentId: 'usulutan'
      },
      {
        id: 'usulutan-estanzuelas',
        name: 'Estanzuelas',
        departmentId: 'usulutan'
      },
      {
        id: 'usulutan-jiquilisco',
        name: 'Jiquilisco',
        departmentId: 'usulutan'
      },
      { id: 'usulutan-jucuapa', name: 'Jucuapa', departmentId: 'usulutan' },
      { id: 'usulutan-jucuaran', name: 'Jucuarán', departmentId: 'usulutan' },
      {
        id: 'usulutan-mercedes-umana',
        name: 'Mercedes Umaña',
        departmentId: 'usulutan'
      },
      {
        id: 'usulutan-nueva-granada',
        name: 'Nueva Granada',
        departmentId: 'usulutan'
      },
      { id: 'usulutan-ozatlan', name: 'Ozatlán', departmentId: 'usulutan' },
      {
        id: 'usulutan-puerto-el-triunfo',
        name: 'Puerto El Triunfo',
        departmentId: 'usulutan'
      },
      {
        id: 'usulutan-san-agustin',
        name: 'San Agustín',
        departmentId: 'usulutan'
      },
      {
        id: 'usulutan-san-buenaventura',
        name: 'San Buenaventura',
        departmentId: 'usulutan'
      },
      {
        id: 'usulutan-san-dionisio',
        name: 'San Dionisio',
        departmentId: 'usulutan'
      },
      {
        id: 'usulutan-san-francisco-javier',
        name: 'San Francisco Javier',
        departmentId: 'usulutan'
      },
      {
        id: 'usulutan-santa-elena',
        name: 'Santa Elena',
        departmentId: 'usulutan'
      },
      {
        id: 'usulutan-santa-maria',
        name: 'Santa María',
        departmentId: 'usulutan'
      },
      {
        id: 'usulutan-santiago-de-maria',
        name: 'Santiago de María',
        departmentId: 'usulutan'
      },
      { id: 'usulutan-tecapan', name: 'Tecapán', departmentId: 'usulutan' }
    ]
  },
  {
    id: 'san-miguel',
    name: 'San Miguel',
    municipalities: [
      {
        id: 'san-miguel-san-miguel',
        name: 'San Miguel',
        departmentId: 'san-miguel'
      },
      {
        id: 'san-miguel-carolina',
        name: 'Carolina',
        departmentId: 'san-miguel'
      },
      {
        id: 'san-miguel-chapeltique',
        name: 'Chapeltique',
        departmentId: 'san-miguel'
      },
      {
        id: 'san-miguel-chinameca',
        name: 'Chinameca',
        departmentId: 'san-miguel'
      },
      {
        id: 'san-miguel-chirilagua',
        name: 'Chirilagua',
        departmentId: 'san-miguel'
      },
      {
        id: 'san-miguel-ciudad-barrios',
        name: 'Ciudad Barrios',
        departmentId: 'san-miguel'
      },
      {
        id: 'san-miguel-comacarán',
        name: 'Comacarán',
        departmentId: 'san-miguel'
      },
      {
        id: 'san-miguel-el-transito',
        name: 'El Tránsito',
        departmentId: 'san-miguel'
      },
      {
        id: 'san-miguel-lolotique',
        name: 'Lolotique',
        departmentId: 'san-miguel'
      },
      {
        id: 'san-miguel-moncagua',
        name: 'Moncagua',
        departmentId: 'san-miguel'
      },
      {
        id: 'san-miguel-nueva-guadalupe',
        name: 'Nueva Guadalupe',
        departmentId: 'san-miguel'
      },
      { id: 'san-miguel-quelepa', name: 'Quelepa', departmentId: 'san-miguel' },
      {
        id: 'san-miguel-san-antonio',
        name: 'San Antonio',
        departmentId: 'san-miguel'
      },
      {
        id: 'san-miguel-san-gerardo',
        name: 'San Gerardo',
        departmentId: 'san-miguel'
      },
      {
        id: 'san-miguel-san-jorge',
        name: 'San Jorge',
        departmentId: 'san-miguel'
      },
      {
        id: 'san-miguel-san-luis-de-la-reina',
        name: 'San Luis de la Reina',
        departmentId: 'san-miguel'
      },
      {
        id: 'san-miguel-san-rafael-oriente',
        name: 'San Rafael Oriente',
        departmentId: 'san-miguel'
      },
      { id: 'san-miguel-sesori', name: 'Sesori', departmentId: 'san-miguel' },
      {
        id: 'san-miguel-uluazapa',
        name: 'Uluazapa',
        departmentId: 'san-miguel'
      },
      {
        id: 'san-miguel-yayantique',
        name: 'Yayantique',
        departmentId: 'san-miguel'
      }
    ]
  },
  {
    id: 'morazan',
    name: 'Morazán',
    municipalities: [
      {
        id: 'morazan-san-francisco-gotera',
        name: 'San Francisco Gotera',
        departmentId: 'morazan'
      },
      { id: 'morazan-arambala', name: 'Arambala', departmentId: 'morazan' },
      { id: 'morazan-cacaopera', name: 'Cacaopera', departmentId: 'morazan' },
      { id: 'morazan-chilanga', name: 'Chilanga', departmentId: 'morazan' },
      { id: 'morazan-corinto', name: 'Corinto', departmentId: 'morazan' },
      {
        id: 'morazan-delicias-de-concepcion',
        name: 'Delicias de Concepción',
        departmentId: 'morazan'
      },
      {
        id: 'morazan-el-divisadero',
        name: 'El Divisadero',
        departmentId: 'morazan'
      },
      { id: 'morazan-el-rosario', name: 'El Rosario', departmentId: 'morazan' },
      { id: 'morazan-gualococti', name: 'Gualococti', departmentId: 'morazan' },
      {
        id: 'morazan-guatajiagua',
        name: 'Guatajiagua',
        departmentId: 'morazan'
      },
      { id: 'morazan-joateca', name: 'Joateca', departmentId: 'morazan' },
      {
        id: 'morazan-jocoaitique',
        name: 'Jocoaitique',
        departmentId: 'morazan'
      },
      { id: 'morazan-jocoro', name: 'Jocoro', departmentId: 'morazan' },
      {
        id: 'morazan-lolotiquillo',
        name: 'Lolotiquillo',
        departmentId: 'morazan'
      },
      { id: 'morazan-meanguera', name: 'Meanguera', departmentId: 'morazan' },
      { id: 'morazan-osicala', name: 'Osicala', departmentId: 'morazan' },
      { id: 'morazan-perquin', name: 'Perquín', departmentId: 'morazan' },
      { id: 'morazan-san-carlos', name: 'San Carlos', departmentId: 'morazan' },
      {
        id: 'morazan-san-fernando',
        name: 'San Fernando',
        departmentId: 'morazan'
      },
      { id: 'morazan-san-isidro', name: 'San Isidro', departmentId: 'morazan' },
      { id: 'morazan-san-simon', name: 'San Simón', departmentId: 'morazan' },
      { id: 'morazan-sensembra', name: 'Sensembra', departmentId: 'morazan' },
      { id: 'morazan-sociedad', name: 'Sociedad', departmentId: 'morazan' },
      { id: 'morazan-torola', name: 'Torola', departmentId: 'morazan' },
      { id: 'morazan-yamabal', name: 'Yamabal', departmentId: 'morazan' },
      { id: 'morazan-yoloaiquin', name: 'Yoloaiquín', departmentId: 'morazan' }
    ]
  },
  {
    id: 'la-union',
    name: 'La Unión',
    municipalities: [
      { id: 'la-union-la-union', name: 'La Unión', departmentId: 'la-union' },
      { id: 'la-union-anamorós', name: 'Anamoros', departmentId: 'la-union' },
      { id: 'la-union-bolivar', name: 'Bolívar', departmentId: 'la-union' },
      {
        id: 'la-union-concepcion-de-oriente',
        name: 'Concepción de Oriente',
        departmentId: 'la-union'
      },
      { id: 'la-union-conchagua', name: 'Conchagua', departmentId: 'la-union' },
      { id: 'la-union-el-carmen', name: 'El Carmen', departmentId: 'la-union' },
      { id: 'la-union-el-sauce', name: 'El Sauce', departmentId: 'la-union' },
      { id: 'la-union-intipuca', name: 'Intipucá', departmentId: 'la-union' },
      { id: 'la-union-lilisque', name: 'Lilisque', departmentId: 'la-union' },
      {
        id: 'la-union-meanguera-del-golfo',
        name: 'Meanguera del Golfo',
        departmentId: 'la-union'
      },
      {
        id: 'la-union-nueva-esparta',
        name: 'Nueva Esparta',
        departmentId: 'la-union'
      },
      { id: 'la-union-pasaquina', name: 'Pasaquina', departmentId: 'la-union' },
      { id: 'la-union-poloros', name: 'Polorós', departmentId: 'la-union' },
      { id: 'la-union-san-alejo', name: 'San Alejo', departmentId: 'la-union' },
      { id: 'la-union-san-jose', name: 'San José', departmentId: 'la-union' },
      {
        id: 'la-union-santa-rosa-de-lima',
        name: 'Santa Rosa de Lima',
        departmentId: 'la-union'
      },
      {
        id: 'la-union-yayantique',
        name: 'Yayantique',
        departmentId: 'la-union'
      },
      {
        id: 'la-union-yucuaiquin',
        name: 'Yucuaiquín',
        departmentId: 'la-union'
      }
    ]
  }
]

/**
 * Helper functions for working with location data
 */

/**
 * Get department by ID
 */
export const getDepartmentById = (id: string): Department | undefined => {
  return EL_SALVADOR_DEPARTMENTS.find(dept => dept.id === id)
}

/**
 * Get municipality by ID across all departments
 */
export const getMunicipalityById = (id: string): Municipality | undefined => {
  for (const department of EL_SALVADOR_DEPARTMENTS) {
    const municipality = department.municipalities.find(muni => muni.id === id)
    if (municipality) {
      return municipality
    }
  }
  return undefined
}

/**
 * Get municipalities for a specific department
 */
export const getMunicipalitiesByDepartment = (
  departmentId: string
): Municipality[] => {
  const department = getDepartmentById(departmentId)
  return department ? department.municipalities : []
}

/**
 * Get full location display name
 */
export const getFullLocationName = (
  departmentId: string,
  municipalityId?: string
): string => {
  const department = getDepartmentById(departmentId)
  if (!department) {
    return ''
  }

  if (municipalityId) {
    const municipality = department.municipalities.find(
      m => m.id === municipalityId
    )
    if (municipality) {
      return `${municipality.name}, ${department.name}`
    }
  }

  return department.name
}

/**
 * Search locations by name (for autocomplete)
 */
export const searchLocations = (
  query: string
): Array<{
  type: 'department' | 'municipality'
  data: Department | Municipality
}> => {
  const results: Array<{
    type: 'department' | 'municipality'
    data: Department | Municipality
  }> = []
  const lowerQuery = query.toLowerCase()

  // Search departments
  EL_SALVADOR_DEPARTMENTS.forEach(department => {
    if (department.name.toLowerCase().includes(lowerQuery)) {
      results.push({ type: 'department', data: department })
    }

    // Search municipalities
    department.municipalities.forEach(municipality => {
      if (municipality.name.toLowerCase().includes(lowerQuery)) {
        results.push({ type: 'municipality', data: municipality })
      }
    })
  })

  return results
}
