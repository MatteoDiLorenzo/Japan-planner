import type { Attraction, MetroStation, MetroLine, Hotel } from '@/types';

export const attractions: Attraction[] = [
  // ==================== TOKYO ====================
  // Templi e Spiritualità
  {
    id: 'sensoji',
    name: 'Senso-ji',
    nameJp: '浅草寺',
    city: 'tokyo',
    type: 'temple',
    duration: '1-2 ore',
    price: 0,
    coordinates: [35.7148, 139.7967],
    description: 'Tempio buddista più antico di Tokyo, situato nel quartiere di Asakusa.',
    image: 'https://www.japan365days.com/img/tokyo/sensoji_temple/sensoji-temple-asakusa-tokyo.jpg'
  },
  {
    id: 'meiji-jingu',
    name: 'Meiji Jingu',
    nameJp: '明治神宮',
    city: 'tokyo',
    type: 'temple',
    duration: '1-2 ore',
    price: 0,
    coordinates: [35.6764, 139.6993],
    description: 'Santuario shintoista dedicato all\'imperatore Meiji.',
    image: 'https://www.meijijingu.or.jp/en/about/images/about_img01.jpg'
  },
  {
    id: 'nezu-shrine',
    name: 'Nezu Shrine',
    nameJp: '根津神社',
    city: 'tokyo',
    type: 'temple',
    duration: '1 ora',
    price: 0,
    coordinates: [35.7203, 139.7595],
    description: 'Santuario storico con tunnel di torii gates e giardino di azalee.',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800'
  },
  
  // Icone e Panorami
  {
    id: 'tokyo-tower',
    name: 'Tokyo Tower',
    nameJp: '東京タワー',
    city: 'tokyo',
    type: 'entertainment',
    duration: '1-2 ore',
    price: 1200,
    coordinates: [35.6586, 139.7454],
    description: 'Iconica torre di comunicazione e punto panoramico.',
    image: 'https://www.japanistry.com/wp-content/uploads/2017/09/Tokyo-Tower-from-Chuo-Dori-v02.jpg'
  },
  {
    id: 'tokyo-skytree',
    name: 'Tokyo Skytree',
    nameJp: '東京スカイツリー',
    city: 'tokyo',
    type: 'entertainment',
    duration: '2 ore',
    price: 2100,
    coordinates: [35.7100, 139.8107],
    description: 'Torre di trasmissione più alta del mondo con vista panoramica.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Tokyo_Skytree_2014_%E2%85%A2.jpg'
  },
  {
    id: 'roppongi-hills',
    name: 'Roppongi Hills',
    nameJp: '六本木ヒルズ',
    city: 'tokyo',
    type: 'entertainment',
    duration: '2-3 ore',
    price: 0,
    coordinates: [35.6604, 139.7292],
    description: 'Complesso con osservatorio Sky Deck, musei e ristoranti.',
    image: 'https://www.japan-guide.com/g18/3031_hills_01.jpg'
  },
  {
    id: 'odaiba-gundam',
    name: 'Odaiba Gundam',
    nameJp: 'お台場ガンダム',
    city: 'tokyo',
    type: 'entertainment',
    duration: '1-2 ore',
    price: 0,
    coordinates: [35.6259, 139.7764],
    description: 'Statua gigante del Gundam e zona divertimenti sull\'isola artificiale.',
    image: 'https://www.japan-experience.com/sites/default/files/images/content_images/odaiba20193.jpg'
  },
  
  // Strade Iconiche e Quartieri
  {
    id: 'shibuya-crossing',
    name: 'Shibuya Crossing',
    nameJp: '渋谷スクランブル交差点',
    city: 'tokyo',
    type: 'entertainment',
    duration: '30 min',
    price: 0,
    coordinates: [35.6595, 139.7004],
    description: 'Incrocio pedonale più famoso del mondo.',
    image: 'https://static.wixstatic.com/media/nsplsh_36554c7933707875784c38~mv2_d_4997_3084_s_4_2.jpg/v1/fill/w_1000,h_617,al_c,q_85,usm_0.66_1.00_0.01/nsplsh_36554c7933707875784c38~mv2_d_4997_3084_s_4_2.jpg'
  },
  {
    id: 'takeshita-street',
    name: 'Takeshita Street',
    nameJp: '竹下通り',
    city: 'tokyo',
    type: 'shopping',
    duration: '1-2 ore',
    price: 0,
    coordinates: [35.6715, 139.7031],
    description: 'Strada iconica di Harajuku con moda giovanile e street food.',
    image: 'https://cdn.prod.rexby.com/image/3bc2c8a7dafe4c2187183ebf6e1b84ff?format=webp&width=1080&height=1350'
  },
  {
    id: 'shinjuku-golden-gai',
    name: 'Shinjuku Golden Gai',
    nameJp: '新宿ゴールデン街',
    city: 'tokyo',
    type: 'food',
    duration: '2-3 ore',
    price: 0,
    coordinates: [35.6940, 139.7040],
    description: 'Labirinto di vicoli con oltre 200 micro-bar tradizionali.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/ee/c0/d7/img-20191104-181904-largejpg.jpg?w=900&h=500&s=1'
  },
  {
    id: 'yanaka-ginza',
    name: 'Yanaka Ginza',
    nameJp: '谷中銀座',
    city: 'tokyo',
    type: 'shopping',
    duration: '1-2 ore',
    price: 0,
    coordinates: [35.7275, 139.7693],
    description: 'Quartiere tradizionale con negozi vintage e atmosfera Showa.',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800'
  },
  
  // Shopping
  {
    id: 'ginza',
    name: 'Ginza',
    nameJp: '銀座',
    city: 'tokyo',
    type: 'shopping',
    duration: '3-4 ore',
    price: 0,
    coordinates: [35.6717, 139.7650],
    description: 'Quartiere dello shopping di lusso.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800'
  },
  {
    id: 'akihabara',
    name: 'Akihabara',
    nameJp: '秋葉原',
    city: 'tokyo',
    type: 'shopping',
    duration: '3-4 ore',
    price: 0,
    coordinates: [35.6984, 139.7731],
    description: 'Quartiere dell\'elettronica, manga, anime e cultura otaku.',
    image: 'https://thumbs.dreamstime.com/b/tokyo-japan-november-neon-lights-billboard-advertisements-buildings-akihabara-rainy-night-shopping-district-138032918.jpg'
  },
  {
    id: 'nakano-broadway',
    name: 'Nakano Broadway',
    nameJp: '中野ブロードウェイ',
    city: 'tokyo',
    type: 'shopping',
    duration: '2-3 ore',
    price: 0,
    coordinates: [35.7061, 139.6656],
    description: 'Paradiso per collezionisti di manga, anime e oggetti vintage.',
    image: 'https://images.unsplash.com/photo-1554797589-7241bb691973?w=800'
  },
  
  // Parchi e Natura
  {
    id: 'ueno-park',
    name: 'Ueno Park',
    nameJp: '上野公園',
    city: 'tokyo',
    type: 'park',
    duration: '3-4 ore',
    price: 0,
    coordinates: [35.7155, 139.7740],
    description: 'Grande parco con musei, zoo e laghi.',
    image: 'https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2014/11/ueno-cherry-blossom-GettyImages-1996449432.jpeg'
  },
  {
    id: 'shinjuku-gyoen',
    name: 'Shinjuku Gyoen',
    nameJp: '新宿御苑',
    city: 'tokyo',
    type: 'park',
    duration: '2-3 ore',
    price: 500,
    coordinates: [35.6852, 139.7100],
    description: 'Bellissimo parco con giardini tradizionali.',
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800'
  },
  {
    id: 'koishikawa-korakuen',
    name: 'Koishikawa Korakuen',
    nameJp: '小石川後楽園',
    city: 'tokyo',
    type: 'park',
    duration: '1-2 ore',
    price: 300,
    coordinates: [35.7055, 139.7486],
    description: 'Giardino paesaggistico giapponese con laghi e ponti.',
    image: 'https://www.japan-guide.com/g18/3034_003_02.jpg'
  },
  
  // Cultura e Musei
  {
    id: 'imperial-palace',
    name: 'Imperial Palace',
    nameJp: '皇居',
    city: 'tokyo',
    type: 'culture',
    duration: '1-2 ore',
    price: 0,
    coordinates: [35.6852, 139.7528],
    description: 'Residenza ufficiale della famiglia imperiale.',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800'
  },
  {
    id: 'teamLab-planets',
    name: 'teamLab Planets',
    nameJp: 'チームラボプラネッツ',
    city: 'tokyo',
    type: 'museum',
    duration: '2-3 ore',
    price: 3800,
    coordinates: [35.6492, 139.7887],
    description: 'Museo digitale immersivo con installazioni interattive.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
  },
  
  // Mercati del Pesce e Cibo
  {
    id: 'tsukiji-outer-market',
    name: 'Tsukiji Outer Market',
    nameJp: '築地場外市場',
    city: 'tokyo',
    type: 'food',
    duration: '2-3 ore',
    price: 0,
    coordinates: [35.6654, 139.7707],
    description: 'Mercato del pesce e street food giapponese.',
    image: 'https://www.jrailpass.com/blog/wp-content/uploads/2019/03/tsukiji-outer-market.jpg'
  },
  {
    id: 'toyosu-market',
    name: 'Toyosu Market',
    nameJp: '豊洲市場',
    city: 'tokyo',
    type: 'food',
    duration: '1-2 ore',
    price: 0,
    coordinates: [35.6556, 139.7877],
    description: 'Nuovo mercato del pesce con asta del tonno all\'alba.',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800'
  },

  // ==================== KYOTO ====================
  // Templi
  {
    id: 'fushimi-inari',
    name: 'Fushimi Inari Taisha',
    nameJp: '伏見稲荷大社',
    city: 'kyoto',
    type: 'temple',
    duration: '2-3 ore',
    price: 0,
    coordinates: [34.9671, 135.7727],
    description: 'Famoso santuario con migliaia di torii gates rossi.',
    image: 'https://www.japan-guide.com/g18/3915_top.jpg'
  },
  {
    id: 'kinkakuji',
    name: 'Kinkaku-ji',
    nameJp: '金閣寺',
    city: 'kyoto',
    type: 'temple',
    duration: '1 ora',
    price: 400,
    coordinates: [35.0394, 135.7292],
    description: 'Il Padiglione d\'Oro, tempio buddista iconico.',
    image: 'https://cdn.gaijinpot.com/app/uploads/sites/6/2016/05/kinkakuji-kyoto-golden-pavilion-1024x576.jpg'
  },
  {
    id: 'kiyomizudera',
    name: 'Kiyomizu-dera',
    nameJp: '清水寺',
    city: 'kyoto',
    type: 'temple',
    duration: '2 ore',
    price: 400,
    coordinates: [34.9949, 135.7850],
    description: 'Tempio con famosa terrazza di legno e vista sulla città.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Kiyomizu.jpg'
  },
  {
    id: 'yasaka-shrine',
    name: 'Yasaka Shrine',
    nameJp: '八坂神社',
    city: 'kyoto',
    type: 'temple',
    duration: '1 ora',
    price: 0,
    coordinates: [35.0037, 135.7786],
    description: 'Santuario shintoista nel cuore di Gion.',
    image: 'https://dskyoto.s3.amazonaws.com/gallery/full/4714/5559/1992/01-20140218_Gion_Mainspot-488.jpg'
  },
  {
    id: 'tofukuji',
    name: 'Tofuku-ji',
    nameJp: '東福寺',
    city: 'kyoto',
    type: 'temple',
    duration: '1-2 ore',
    price: 400,
    coordinates: [34.9762, 135.9817],
    description: 'Tempio zen famoso per i colori autunnali.',
    image: 'https://www.japan-guide.com/g18/3930_top.jpg'
  },
  {
    id: 'daigoji',
    name: 'Daigo-ji',
    nameJp: '醍醐寺',
    city: 'kyoto',
    type: 'temple',
    duration: '2-3 ore',
    price: 600,
    coordinates: [34.9514, 135.8214],
    description: 'Tempio patrimonio UNESCO con giardini e pagoda.',
    image: 'https://www.japan-guide.com/g18/3916_top.jpg'
  },
  
  // Natura
  {
    id: 'arashiyama-bamboo',
    name: 'Arashiyama Bamboo Grove',
    nameJp: '嵐山竹林',
    city: 'kyoto',
    type: 'nature',
    duration: '1-2 ore',
    price: 0,
    coordinates: [35.0170, 135.6710],
    description: 'Sentiero attraverso una foresta di bambù.',
    image: 'https://photos.smugmug.com/i-hFcX6RC/0/1c58ee68/L/famous-bamboo-grove-arashiyama-L.jpg'
  },
  {
    id: 'philosopher-path',
    name: 'Philosopher\'s Path',
    nameJp: '哲学の道',
    city: 'kyoto',
    type: 'nature',
    duration: '1-2 ore',
    price: 0,
    coordinates: [35.0265, 135.7955],
    description: 'Pittoresco sentiero lungo il canale con ciliegi.',
    image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800'
  },
  {
    id: 'kurama-onsen',
    name: 'Kurama Onsen',
    nameJp: '鞍馬温泉',
    city: 'kyoto',
    type: 'nature',
    duration: '2-3 ore',
    price: 1200,
    coordinates: [35.1184, 135.7706],
    description: 'Terme naturali immersi nella montagna.',
    image: 'https://www.japan-experience.com/sites/default/files/legacy/japan_experience/1368606190275.jpg.webp'
  },
  
  // Quartieri e Strade
  {
    id: 'gion',
    name: 'Quartiere Gion',
    nameJp: '祇園',
    city: 'kyoto',
    type: 'culture',
    duration: '2-3 ore',
    price: 0,
    coordinates: [35.0037, 135.7786],
    description: 'Quartiere tradizionale con geisha e tea house.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800'
  },
  {
    id: 'pontocho',
    name: 'Pontocho Alley',
    nameJp: '先斗町',
    city: 'kyoto',
    type: 'food',
    duration: '2-3 ore',
    price: 0,
    coordinates: [35.0055, 135.7711],
    description: 'Vicolo stretto con ristoranti tradizionali lungo il fiume.',
    image: 'https://deepjapan.org/wp-content/uploads/2024/10/dreamstime_l_171722516-scaled.jpg'
  },
  {
    id: 'nijo-castle',
    name: 'Castello Nijo',
    nameJp: '二条城',
    city: 'kyoto',
    type: 'culture',
    duration: '1-2 ore',
    price: 620,
    coordinates: [35.0142, 135.7482],
    description: 'Castello storico con pavimenti che cigolano.',
    image: 'https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?w=800'
  },
  
  // Mercati e Shopping
  {
    id: 'nishiki-market',
    name: 'Nishiki Market',
    nameJp: '錦市場',
    city: 'kyoto',
    type: 'food',
    duration: '1-2 ore',
    price: 0,
    coordinates: [35.0050, 135.7649],
    description: 'Mercato tradizionale con cibo locale e specialità.',
    image: 'https://byfood.b-cdn.net/api/public/assets/9563/content'
  },

  // ==================== OSAKA ====================
  // Icone
  {
    id: 'osaka-castle',
    name: 'Castello di Osaka',
    nameJp: '大阪城',
    city: 'osaka',
    type: 'culture',
    duration: '2-3 ore',
    price: 600,
    coordinates: [34.6873, 135.5262],
    description: 'Castello storico simbolo di Osaka.',
    image: 'https://www.japan-guide.com/g18/4000_top.jpg'
  },
  {
    id: 'tsutenkaku',
    name: 'Tsutenkaku Tower',
    nameJp: '通天閣',
    city: 'osaka',
    type: 'entertainment',
    duration: '1 ora',
    price: 800,
    coordinates: [34.6525, 135.5063],
    description: 'Torre iconica nel quartiere retrò Shinsekai.',
    image: 'https://onb-cdn.b-cdn.net/images-stn-osaka/146-Shinsekai-Osaka1.jpg'
  },
  {
    id: 'usj',
    name: 'Universal Studios Japan',
    nameJp: 'ユニバーサル・スタジオ・ジャパン',
    city: 'osaka',
    type: 'entertainment',
    duration: '1 giorno',
    price: 8600,
    coordinates: [34.6654, 135.4323],
    description: 'Parco divertimenti con attrazioni di film famosi.',
    image: 'https://media.tacdn.com/media/attractions-splice-spp-360x240/17/13/af/fc.jpg'
  },
  
  // Quartieri
  {
    id: 'dotonbori',
    name: 'Dotonbori',
    nameJp: '道頓堀',
    city: 'osaka',
    type: 'food',
    duration: '3-4 ore',
    price: 0,
    coordinates: [34.6687, 135.5013],
    description: 'Quartiere del divertimento con insegne al neon e street food.',
    image: 'https://cdn.cheapoguides.com/wp-content/uploads/sites/3/2016/12/Dotombori-iStock-javarman3.jpg'
  },
  {
    id: 'shinsekai',
    name: 'Shinsekai',
    nameJp: '新世界',
    city: 'osaka',
    type: 'entertainment',
    duration: '2 ore',
    price: 0,
    coordinates: [34.6525, 135.5063],
    description: 'Quartiere retrò con atmosfera vintage e kushikatsu.',
    image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800'
  },
  {
    id: 'amerikamura',
    name: 'Amerikamura',
    nameJp: 'アメリカ村',
    city: 'osaka',
    type: 'shopping',
    duration: '2-3 ore',
    price: 0,
    coordinates: [34.6732, 135.4985],
    description: 'Quartiere giovanile con moda vintage e cultura americana.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Amerikamura.jpg'
  },
  {
    id: 'shinsaibashi',
    name: 'Shinsaibashi',
    nameJp: '心斎橋',
    city: 'osaka',
    type: 'shopping',
    duration: '3-4 ore',
    price: 0,
    coordinates: [35.0030, 135.7596],
    description: 'Strada commerciale coperta con negozi di moda.',
    image: 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/20/00/a2000456/img/basic/a2000456_main.jpg'
  },
  
  // Shopping e Tecnologia
  {
    id: 'den-den-town',
    name: 'Den Den Town',
    nameJp: 'でんでんタウン',
    city: 'osaka',
    type: 'shopping',
    duration: '2-3 ore',
    price: 0,
    coordinates: [34.6642, 135.5036],
    description: 'Quartiere dell\'elettronica e anime, rivale di Akihabara.',
    image: 'https://photos.smugmug.com/Osaka/Den-Den-Town-Guide/i-35CdRnV/0/840040b3/L/DenDen1-L.jpg'
  },
  {
    id: 'namba-parks',
    name: 'Namba Parks',
    nameJp: 'なんばパークス',
    city: 'osaka',
    type: 'shopping',
    duration: '2-3 ore',
    price: 0,
    coordinates: [34.6618, 135.5017],
    description: 'Centro commerciale con giardini pensili.',
    image: 'https://cdn.osaka-info.jp/page_translation/content/dd498958-04bd-11e8-971b-06326e701dd4.jpeg'
  },
  
  // Templi
  {
    id: 'shitennoji',
    name: 'Shitenno-ji',
    nameJp: '四天王寺',
    city: 'osaka',
    type: 'temple',
    duration: '1 ora',
    price: 300,
    coordinates: [34.6533, 135.5164],
    description: 'Uno dei templi buddisti più antichi del Giappone.',
    image: 'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=800'
  },
  {
    id: 'sumiyoshi-taisha',
    name: 'Sumiyoshi Taisha',
    nameJp: '住吉大社',
    city: 'osaka',
    type: 'temple',
    duration: '1-2 ore',
    price: 0,
    coordinates: [34.6123, 135.4914],
    description: 'Santuario shintoista con ponti a schiena d\'asino.',
    image: 'https://www.japan-guide.com/g18/4007_top.jpg'
  },
  
  // Mercati
  {
    id: 'kuromon-market',
    name: 'Kuromon Market',
    nameJp: '黒門市場',
    city: 'osaka',
    type: 'food',
    duration: '1-2 ore',
    price: 0,
    coordinates: [34.6654, 135.5060],
    description: 'Mercato del pesce e della frutta fresca.',
    image: 'https://www.japan-guide.com/g19/4031_11.jpg'
  },
  
  // Panorami
  {
    id: 'umeda-sky',
    name: 'Umeda Sky Building',
    nameJp: '梅田スカイビル',
    city: 'osaka',
    type: 'entertainment',
    duration: '1-2 ore',
    price: 1500,
    coordinates: [34.7055, 135.4896],
    description: 'Edificio con osservatorio panoramico Floating Garden.',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800'
  },

  // ==================== NARA ====================
  // Templi
  {
    id: 'todaiji',
    name: 'Todai-ji',
    nameJp: '東大寺',
    city: 'nara',
    type: 'temple',
    duration: '2 ore',
    price: 600,
    coordinates: [34.6890, 135.8398],
    description: 'Tempio con il grande Buddha di bronzo.',
    image: 'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=800'
  },
  {
    id: 'kasuga-taisha',
    name: 'Kasuga Taisha',
    nameJp: '春日大社',
    city: 'nara',
    type: 'temple',
    duration: '1-2 ore',
    price: 500,
    coordinates: [34.6814, 135.8486],
    description: 'Santuario shintoista con lanterne di pietra.',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800'
  },
  {
    id: 'horyuji',
    name: 'Horyu-ji',
    nameJp: '法隆寺',
    city: 'nara',
    type: 'temple',
    duration: '2 ore',
    price: 700,
    coordinates: [34.6142, 135.7344],
    description: 'Tempio patrimonio UNESCO con pagoda più antica del Giappone.',
    image: 'https://www.japan-guide.com/g19/4104_02.jpg'
  },
  {
    id: 'yakushiji',
    name: 'Yakushi-ji',
    nameJp: '薬師寺',
    city: 'nara',
    type: 'temple',
    duration: '1 ora',
    price: 500,
    coordinates: [34.6689, 135.7847],
    description: 'Tempio con due pagode gemelle.',
    image: 'https://www.japan-guide.com/g19/4105_top.jpg'
  },
  {
    id: 'toshodaiji',
    name: 'Toshodai-ji',
    nameJp: '唐招提寺',
    city: 'nara',
    type: 'temple',
    duration: '1 ora',
    price: 400,
    coordinates: [34.6756, 135.7847],
    description: 'Tempio fondato dal monaco cinese Ganjin.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/81/cb/12/caption.jpg?w=900&h=500&s=1'
  },
  {
    id: 'saidaiji',
    name: 'Saidai-ji',
    nameJp: '西大寺',
    city: 'nara',
    type: 'temple',
    duration: '1 ora',
    price: 300,
    coordinates: [34.6933, 135.8121],
    description: 'Tempio con famosa cerimonia del fuoco.',
    image: 'https://www.japan-experience.com/sites/default/files/images/content_images/saidaiji-temple-1.jpg'
  },
  
  // Natura
  {
    id: 'nara-park',
    name: 'Nara Park',
    nameJp: '奈良公園',
    city: 'nara',
    type: 'park',
    duration: '3 ore',
    price: 0,
    coordinates: [34.6851, 135.8430],
    description: 'Parco con cervi sacri liberi.',
    image: 'https://narashikanko.or.jp/lsc/upfile/article/0000/0022/22_1_l.jpg'
  },
  {
    id: 'isuien-garden',
    name: 'Isuien Garden',
    nameJp: '依水園',
    city: 'nara',
    type: 'park',
    duration: '1 ora',
    price: 650,
    coordinates: [34.6906, 135.8356],
    description: 'Bellissimo giardino giapponese con vista su Todai-ji.',
    image: 'https://www.his-usa.com/destination-japan/up_img/article/fs_1468509016_0.jpg'
  },
  {
    id: 'mount-yoshino',
    name: 'Mount Yoshino',
    nameJp: '吉野山',
    city: 'nara',
    type: 'nature',
    duration: '1 giorno',
    price: 0,
    coordinates: [34.3564, 135.8583],
    description: 'Montagna famosa per i ciliegi in fiore.',
    image: 'https://travel.rakuten.com/contents/sites/contents/files/styles/max_1300x1300/public/2024-03/yoshino-guide_1.jpg?itok=ajMNaQ7b'
  },
  
  // Quartieri
  {
    id: 'naramachi',
    name: 'Naramachi',
    nameJp: 'ならまち',
    city: 'nara',
    type: 'culture',
    duration: '2 ore',
    price: 0,
    coordinates: [34.6789, 135.8289],
    description: 'Quartiere storico con case tradizionali e negozi.',
    image: 'https://content.fun-japan.jp/renewal-prod/cms/articles/content/091cad93896c0e10471d3dbd2a73378047144d9d.jpg'
  },
];

// Tokyo Metro
export const tokyoMetroStations: MetroStation[] = [
  // Ginza Line (Orange)
  { id: 'shibuya-g', name: 'Shibuya', nameJp: '渋谷', line: 'ginza', lineColor: '#FF9500', coordinates: [35.6595, 139.7004], connections: ['hachiko', 'yamanote'] },
  { id: 'omotesando-g', name: 'Omotesando', nameJp: '表参道', line: 'ginza', lineColor: '#FF9500', coordinates: [35.6652, 139.7123], connections: ['chiyoda', 'hanzomon'] },
  { id: 'ginza-g', name: 'Ginza', nameJp: '銀座', line: 'ginza', lineColor: '#FF9500', coordinates: [35.6717, 139.7650], connections: ['marunouchi', 'hibiya'] },
  { id: 'tokyo-g', name: 'Tokyo', nameJp: '東京', line: 'ginza', lineColor: '#FF9500', coordinates: [35.6812, 139.7671], connections: ['marunouchi', 'yamanote', 'chuo', 'shinkansen'] },
  { id: 'ueno-g', name: 'Ueno', nameJp: '上野', line: 'ginza', lineColor: '#FF9500', coordinates: [35.7148, 139.7737], connections: ['yamanote', 'keisei', 'hibiya'] },
  { id: 'asakusa-g', name: 'Asakusa', nameJp: '浅草', line: 'ginza', lineColor: '#FF9500', coordinates: [35.7148, 139.7967], connections: ['tobu'] },
  
  // Marunouchi Line (Red)
  { id: 'shinjuku-m', name: 'Shinjuku', nameJp: '新宿', line: 'marunouchi', lineColor: '#E60012', coordinates: [35.6906, 139.6999], connections: ['yamanote', 'shinjuku-line', 'odakyu'] },
  { id: 'tokyo-m', name: 'Tokyo', nameJp: '東京', line: 'marunouchi', lineColor: '#E60012', coordinates: [35.6812, 139.7671], connections: ['ginza', 'yamanote', 'chuo', 'shinkansen'] },
  { id: 'ginza-m', name: 'Ginza', nameJp: '銀座', line: 'marunouchi', lineColor: '#E60012', coordinates: [35.6717, 139.7650], connections: ['ginza-line', 'hibiya'] },
  { id: 'ikebukuro-m', name: 'Ikebukuro', nameJp: '池袋', line: 'marunouchi', lineColor: '#E60012', coordinates: [35.7295, 139.7109], connections: ['yamanote', 'seibu'] },
  
  // Hibiya Line (Silver)
  { id: 'roppongi-h', name: 'Roppongi', nameJp: '六本木', line: 'hibiya', lineColor: '#C9C9C9', coordinates: [35.6628, 139.7314], connections: ['oedo'] },
  { id: 'ginza-h', name: 'Ginza', nameJp: '銀座', line: 'hibiya', lineColor: '#C9C9C9', coordinates: [35.6717, 139.7650], connections: ['ginza', 'marunouchi'] },
  { id: 'akihabara-h', name: 'Akihabara', nameJp: '秋葉原', line: 'hibiya', lineColor: '#C9C9C9', coordinates: [35.6984, 139.7731], connections: ['yamanote', 'keihin'] },
  { id: 'ueno-h', name: 'Ueno', nameJp: '上野', line: 'hibiya', lineColor: '#C9C9C9', coordinates: [35.7148, 139.7737], connections: ['ginza', 'yamanote'] },
  
  // Oedo Line (Magenta)
  { id: 'shinjuku-o', name: 'Shinjuku', nameJp: '新宿', line: 'oedo', lineColor: '#B6007A', coordinates: [35.6906, 139.6999], connections: ['marunouchi', 'yamanote'] },
  { id: 'roppongi-o', name: 'Roppongi', nameJp: '六本木', line: 'oedo', lineColor: '#B6007A', coordinates: [35.6628, 139.7314], connections: ['hibiya'] },
  { id: 'tsukiji-o', name: 'Tsukiji', nameJp: '築地', line: 'oedo', lineColor: '#B6007A', coordinates: [35.6654, 139.7707], connections: ['hibiya'] },
  
  // Chiyoda Line (Green)
  { id: 'omotesando-c', name: 'Omotesando', nameJp: '表参道', line: 'chiyoda', lineColor: '#00BB85', coordinates: [35.6652, 139.7123], connections: ['ginza', 'hanzomon'] },
  { id: 'meijijingumae-c', name: 'Meiji-Jingumae', nameJp: '明治神宮前', line: 'chiyoda', lineColor: '#00BB85', coordinates: [35.6764, 139.6993], connections: ['fukutoshin'] },
  { id: 'akihabara-c', name: 'Akihabara', nameJp: '秋葉原', line: 'chiyoda', lineColor: '#00BB85', coordinates: [35.6984, 139.7731], connections: ['yamanote', 'hibiya'] },
  
  // Yamanote Line (Light Green - JR)
  { id: 'shibuya-y', name: 'Shibuya', nameJp: '渋谷', line: 'yamanote', lineColor: '#9ACD32', coordinates: [35.6595, 139.7004], connections: ['ginza', 'hachiko'] },
  { id: 'shinjuku-y', name: 'Shinjuku', nameJp: '新宿', line: 'yamanote', lineColor: '#9ACD32', coordinates: [35.6906, 139.6999], connections: ['marunouchi', 'shinjuku-line'] },
  { id: 'harajuku-y', name: 'Harajuku', nameJp: '原宿', line: 'yamanote', lineColor: '#9ACD32', coordinates: [35.6702, 139.7027], connections: [] },
  { id: 'tokyo-y', name: 'Tokyo', nameJp: '東京', line: 'yamanote', lineColor: '#9ACD32', coordinates: [35.6812, 139.7671], connections: ['ginza', 'marunouchi', 'chuo'] },
  { id: 'akihabara-y', name: 'Akihabara', nameJp: '秋葉原', line: 'yamanote', lineColor: '#9ACD32', coordinates: [35.6984, 139.7731], connections: ['hibiya'] },
  { id: 'ueno-y', name: 'Ueno', nameJp: '上野', line: 'yamanote', lineColor: '#9ACD32', coordinates: [35.7148, 139.7737], connections: ['ginza', 'hibiya'] },
  { id: 'ikebukuro-y', name: 'Ikebukuro', nameJp: '池袋', line: 'yamanote', lineColor: '#9ACD32', coordinates: [35.7295, 139.7109], connections: ['marunouchi'] },
  
  // Hanzomon Line (Purple)
  { id: 'omotesando-hz', name: 'Omotesando', nameJp: '表参道', line: 'hanzomon', lineColor: '#8F76D6', coordinates: [35.6652, 139.7123], connections: ['ginza', 'chiyoda'] },
  { id: 'shibuya-hz', name: 'Shibuya', nameJp: '渋谷', line: 'hanzomon', lineColor: '#8F76D6', coordinates: [35.6595, 139.7004], connections: ['ginza', 'yamanote'] },
  
  // Asakusa Line (Rose)
  { id: 'asakusa-a', name: 'Asakusa', nameJp: '浅草', line: 'asakusa', lineColor: '#EC6E65', coordinates: [35.7148, 139.7967], connections: ['ginza'] },
  { id: 'nihonbashi-a', name: 'Nihonbashi', nameJp: '日本橋', line: 'asakusa', lineColor: '#EC6E65', coordinates: [35.6840, 139.7745], connections: ['ginza', 'tozai'] },
  
  // Mita Line (Blue)
  { id: 'tokyo-mita', name: 'Tokyo', nameJp: '東京', line: 'mita', lineColor: '#0078C2', coordinates: [35.6812, 139.7671], connections: ['ginza', 'marunouchi', 'yamanote'] },
  { id: 'roppongi-mita', name: 'Roppongi', nameJp: '六本木一丁目', line: 'mita', lineColor: '#0078C2', coordinates: [35.6656, 139.7390], connections: [] },
  
  // Fukutoshin Line (Brown)
  { id: 'shibuya-f', name: 'Shibuya', nameJp: '渋谷', line: 'fukutoshin', lineColor: '#8B4513', coordinates: [35.6595, 139.7004], connections: ['ginza', 'yamanote'] },
  { id: 'ikebukuro-f', name: 'Ikebukuro', nameJp: '池袋', line: 'fukutoshin', lineColor: '#8B4513', coordinates: [35.7295, 139.7109], connections: ['yamanote', 'marunouchi'] },
  
  // Tozai Line (Cyan)
  { id: 'nakano-t', name: 'Nakano', nameJp: '中野', line: 'tozai', lineColor: '#00BFFF', coordinates: [35.7061, 139.6656], connections: ['jr'] },
  { id: 'takadanobaba-t', name: 'Takadanobaba', nameJp: '高田馬場', line: 'tozai', lineColor: '#00BFFF', coordinates: [35.7126, 139.7039], connections: ['yamanote'] },
  { id: 'nihonbashi-t', name: 'Nihonbashi', nameJp: '日本橋', line: 'tozai', lineColor: '#00BFFF', coordinates: [35.6840, 139.7745], connections: ['ginza', 'asakusa'] },
  { id: 'toyosu-t', name: 'Toyosu', nameJp: '豊洲', line: 'tozai', lineColor: '#00BFFF', coordinates: [35.6556, 139.7877], connections: ['yurikamome'] },
  
  // Yurikamome Line (Rainbow)
  { id: 'toyosu-y', name: 'Toyosu', nameJp: '豊洲', line: 'yurikamome', lineColor: '#FF69B4', coordinates: [35.6556, 139.7877], connections: ['tozai'] },
  { id: 'odaiba-y', name: 'Odaiba', nameJp: 'お台場', line: 'yurikamome', lineColor: '#FF69B4', coordinates: [35.6259, 139.7764], connections: [] },
  { id: 'tokyo-teleport-y', name: 'Tokyo Teleport', nameJp: '東京テレポート', line: 'yurikamome', lineColor: '#FF69B4', coordinates: [35.6274, 139.7835], connections: ['rinkai'] },
  
  // Rinkai Line (Navy)
  { id: 'tokyo-teleport-r', name: 'Tokyo Teleport', nameJp: '東京テレポート', line: 'rinkai', lineColor: '#000080', coordinates: [35.6274, 139.7835], connections: ['yurikamome'] },
  { id: 'shin-kiba-r', name: 'Shin-Kiba', nameJp: '新木場', line: 'rinkai', lineColor: '#000080', coordinates: [35.6458, 139.8267], connections: ['yurakucho'] },
];

export const tokyoMetroLines: MetroLine[] = [
  { id: 'ginza', name: 'Ginza Line', color: '#FF9500', stations: ['shibuya-g', 'omotesando-g', 'ginza-g', 'tokyo-g', 'ueno-g', 'asakusa-g'] },
  { id: 'marunouchi', name: 'Marunouchi Line', color: '#E60012', stations: ['shinjuku-m', 'tokyo-m', 'ginza-m', 'ikebukuro-m'] },
  { id: 'hibiya', name: 'Hibiya Line', color: '#C9C9C9', stations: ['roppongi-h', 'ginza-h', 'akihabara-h', 'ueno-h'] },
  { id: 'oedo', name: 'Oedo Line', color: '#B6007A', stations: ['shinjuku-o', 'roppongi-o', 'tsukiji-o'] },
  { id: 'chiyoda', name: 'Chiyoda Line', color: '#00BB85', stations: ['omotesando-c', 'meijijingumae-c', 'akihabara-c'] },
  { id: 'yamanote', name: 'Yamanote Line (JR)', color: '#9ACD32', stations: ['shibuya-y', 'harajuku-y', 'shinjuku-y', 'tokyo-y', 'akihabara-y', 'ueno-y', 'ikebukuro-y'] },
  { id: 'hanzomon', name: 'Hanzomon Line', color: '#8F76D6', stations: ['omotesando-hz', 'shibuya-hz'] },
  { id: 'asakusa', name: 'Asakusa Line', color: '#EC6E65', stations: ['asakusa-a', 'nihonbashi-a'] },
  { id: 'mita', name: 'Mita Line', color: '#0078C2', stations: ['tokyo-mita', 'roppongi-mita'] },
  { id: 'fukutoshin', name: 'Fukutoshin Line', color: '#8B4513', stations: ['shibuya-f', 'ikebukuro-f'] },
  { id: 'tozai', name: 'Tozai Line', color: '#00BFFF', stations: ['nakano-t', 'takadanobaba-t', 'nihonbashi-t', 'toyosu-t'] },
  { id: 'yurikamome', name: 'Yurikamome Line', color: '#FF69B4', stations: ['toyosu-y', 'odaiba-y', 'tokyo-teleport-y'] },
  { id: 'rinkai', name: 'Rinkai Line', color: '#000080', stations: ['tokyo-teleport-r', 'shin-kiba-r'] },
];

// Kyoto Metro
export const kyotoMetroStations: MetroStation[] = [
  // Karasuma Line (Green)
  { id: 'kokusai-kaikan', name: 'Kokusai Kaikan', nameJp: '国際会館', line: 'karasuma', lineColor: '#00A040', coordinates: [35.0612, 135.7851], connections: [] },
  { id: 'kitaoji', name: 'Kitaoji', nameJp: '北大路', line: 'karasuma', lineColor: '#00A040', coordinates: [35.0448, 135.7589], connections: [] },
  { id: 'imadegawa', name: 'Imadegawa', nameJp: '今出川', line: 'karasuma', lineColor: '#00A040', coordinates: [35.0301, 135.7593], connections: [] },
  { id: 'karasuma-oike', name: 'Karasuma Oike', nameJp: '烏丸御池', line: 'karasuma', lineColor: '#00A040', coordinates: [35.0102, 135.7598], connections: ['tozai'] },
  { id: 'shijo', name: 'Shijo', nameJp: '四条', line: 'karasuma', lineColor: '#00A040', coordinates: [35.0030, 135.7596], connections: ['hankyu'] },
  { id: 'kyoto-station', name: 'Kyoto', nameJp: '京都', line: 'karasuma', lineColor: '#00A040', coordinates: [34.9858, 135.7588], connections: ['shinkansen', 'jr'] },
  
  // Tozai Line (Red)
  { id: 'uzumasa-tenjingawa', name: 'Uzumasa Tenjingawa', nameJp: '太秦天神川', line: 'tozai', lineColor: '#E60012', coordinates: [35.0130, 135.7106], connections: [] },
  { id: 'nijo', name: 'Nijo', nameJp: '二条', line: 'tozai', lineColor: '#E60012', coordinates: [35.0102, 135.7598], connections: ['karasuma', 'jr'] },
  { id: 'kyoto-shiyakusho-mae', name: 'Kyoto Shiyakusho-mae', nameJp: '京都市役所前', line: 'tozai', lineColor: '#E60012', coordinates: [35.0210, 135.7596], connections: [] },
  { id: 'sanjo-keihan', name: 'Sanjo Keihan', nameJp: '三条京阪', line: 'tozai', lineColor: '#E60012', coordinates: [35.0094, 135.7716], connections: ['keihan'] },
  { id: 'higashiyama', name: 'Higashiyama', nameJp: '東山', line: 'tozai', lineColor: '#E60012', coordinates: [35.0037, 135.7786], connections: [] },
  { id: 'misasagi', name: 'Misasagi', nameJp: '御陵', line: 'tozai', lineColor: '#E60012', coordinates: [34.9968, 135.8014], connections: ['keihan'] },
  
  // Keihan Line (Olive)
  { id: 'sanjo-keihan-k', name: 'Sanjo', nameJp: '三条', line: 'keihan', lineColor: '#6B8E23', coordinates: [35.0094, 135.7716], connections: ['tozai'] },
  { id: 'gion-shijo-k', name: 'Gion-Shijo', nameJp: '祇園四条', line: 'keihan', lineColor: '#6B8E23', coordinates: [35.0037, 135.7786], connections: ['hankyu'] },
  { id: 'fushimi-inari-k', name: 'Fushimi-Inari', nameJp: '伏見稲荷', line: 'keihan', lineColor: '#6B8E23', coordinates: [34.9671, 135.7727], connections: ['jr'] },
  
  // Hankyu Line (Maroon)
  { id: 'karasuma-h', name: 'Karasuma', nameJp: '烏丸', line: 'hankyu', lineColor: '#800000', coordinates: [35.0030, 135.7596], connections: ['karasuma-line'] },
  { id: 'omiya-h', name: 'Omiya', nameJp: '大宮', line: 'hankyu', lineColor: '#800000', coordinates: [35.0034, 135.7489], connections: [] },
  { id: 'kawaramachi-h', name: 'Kawaramachi', nameJp: '河原町', line: 'hankyu', lineColor: '#800000', coordinates: [35.0037, 135.7786], connections: ['keihan'] },
  
  // JR Nara Line (Green)
  { id: 'kyoto-jr', name: 'Kyoto', nameJp: '京都', line: 'jr-nara', lineColor: '#228B22', coordinates: [34.9858, 135.7588], connections: ['shinkansen', 'karasuma'] },
  { id: 'inari-jr', name: 'Inari', nameJp: '稲荷', line: 'jr-nara', lineColor: '#228B22', coordinates: [34.9671, 135.7727], connections: ['keihan'] },
  { id: 'nara-jr', name: 'Nara', nameJp: '奈良', line: 'jr-nara', lineColor: '#228B22', coordinates: [34.6851, 135.8175], connections: ['kintetsu'] },
  
  // JR Sagano Line (Blue)
  { id: 'kyoto-sagano', name: 'Kyoto', nameJp: '京都', line: 'jr-sagano', lineColor: '#4169E1', coordinates: [34.9858, 135.7588], connections: ['shinkansen', 'karasuma'] },
  { id: 'umekoji-kyotonishi', name: 'Umekoji-Kyotonishi', nameJp: '梅小路京都西', line: 'jr-sagano', lineColor: '#4169E1', coordinates: [34.9898, 135.7413], connections: [] },
  { id: 'sagaarashiyama', name: 'Saga-Arashiyama', nameJp: '嵯峨嵐山', line: 'jr-sagano', lineColor: '#4169E1', coordinates: [35.0170, 135.6710], connections: [] },
];

export const kyotoMetroLines: MetroLine[] = [
  { id: 'karasuma', name: 'Karasuma Line', color: '#00A040', stations: ['kokusai-kaikan', 'kitaoji', 'imadegawa', 'karasuma-oike', 'shijo', 'kyoto-station'] },
  { id: 'tozai', name: 'Tozai Line', color: '#E60012', stations: ['uzumasa-tenjingawa', 'nijo', 'kyoto-shiyakusho-mae', 'sanjo-keihan', 'higashiyama', 'misasagi'] },
  { id: 'keihan', name: 'Keihan Line', color: '#6B8E23', stations: ['sanjo-keihan-k', 'gion-shijo-k', 'fushimi-inari-k'] },
  { id: 'hankyu', name: 'Hankyu Line', color: '#800000', stations: ['karasuma-h', 'omiya-h', 'kawaramachi-h'] },
  { id: 'jr-nara', name: 'JR Nara Line', color: '#228B22', stations: ['kyoto-jr', 'inari-jr', 'nara-jr'] },
  { id: 'jr-sagano', name: 'JR Sagano Line', color: '#4169E1', stations: ['kyoto-sagano', 'umekoji-kyotonishi', 'sagaarashiyama'] },
];

// Osaka Metro
export const osakaMetroStations: MetroStation[] = [
  // Midosuji Line (Red)
  { id: 'esaka', name: 'Esaka', nameJp: '江坂', line: 'midosuji', lineColor: '#E60012', coordinates: [34.7587, 135.4968], connections: [] },
  { id: 'senri-chuo', name: 'Senri-Chuo', nameJp: '千里中央', line: 'midosuji', lineColor: '#E60012', coordinates: [34.8086, 135.4965], connections: [] },
  { id: 'umeda', name: 'Umeda', nameJp: '梅田', line: 'midosuji', lineColor: '#E60012', coordinates: [34.7008, 135.4990], connections: ['jr', 'hankyu', 'hanshin'] },
  { id: 'shinsaibashi', name: 'Shinsaibashi', nameJp: '心斎橋', line: 'midosuji', lineColor: '#E60012', coordinates: [34.6785, 135.5002], connections: ['nagahori'] },
  { id: 'namba', name: 'Namba', nameJp: '難波', line: 'midosuji', lineColor: '#E60012', coordinates: [34.6664, 135.5013], connections: ['nankai', 'kintetsu', 'hanshin'] },
  { id: 'tennoji', name: 'Tennoji', nameJp: '天王寺', line: 'midosuji', lineColor: '#E60012', coordinates: [34.6472, 135.5140], connections: ['jr', 'kintetsu'] },
  
  // Chuo Line (Green)
  { id: 'cosmo-square', name: 'Cosmo Square', nameJp: 'コスモスクエア', line: 'chuo', lineColor: '#00A040', coordinates: [34.6425, 135.4122], connections: [] },
  { id: 'osakako', name: 'Osakako', nameJp: '大阪港', line: 'chuo', lineColor: '#00A040', coordinates: [34.6536, 135.4324], connections: [] },
  { id: 'hommachi', name: 'Hommachi', nameJp: '本町', line: 'chuo', lineColor: '#00A040', coordinates: [34.6819, 135.4972], connections: ['midosuji', 'yotsubashi'] },
  { id: 'morinomiya', name: 'Morinomiya', nameJp: '森ノ宮', line: 'chuo', lineColor: '#00A040', coordinates: [34.6814, 135.5345], connections: ['nagahori'] },
  { id: 'nagata', name: 'Nagata', nameJp: '長田', line: 'chuo', lineColor: '#00A040', coordinates: [34.6796, 135.5766], connections: [] },
  
  // Sakaisuji Line (Brown)
  { id: 'tenjimbashisuji-rokuchome', name: 'Tenjimbashisuji 6-chome', nameJp: '天神橋筋六丁目', line: 'sakaisuji', lineColor: '#8B4513', coordinates: [34.7108, 135.5116], connections: ['tanimachi'] },
  { id: 'kita-senri', name: 'Kita-Senri', nameJp: '北千里', line: 'sakaisuji', lineColor: '#8B4513', coordinates: [34.7752, 135.5106], connections: [] },
  { id: 'sakaisuji-hommachi', name: 'Sakaisuji-Hommachi', nameJp: '堺筋本町', line: 'sakaisuji', lineColor: '#8B4513', coordinates: [34.6819, 135.5056], connections: ['chuo'] },
  { id: 'nipponbashi', name: 'Nipponbashi', nameJp: '日本橋', line: 'sakaisuji', lineColor: '#8B4513', coordinates: [34.6659, 135.5063], connections: ['sennichimae'] },
  { id: 'dobutsuen-mae', name: 'Dobutsuen-mae', nameJp: '動物園前', line: 'sakaisuji', lineColor: '#8B4513', coordinates: [34.6489, 135.5050], connections: ['midosuji'] },
  
  // Nagahori Tsurumi-ryokuchi Line (Gold)
  { id: 'shinsaibashi-n', name: 'Shinsaibashi', nameJp: '心斎橋', line: 'nagahori', lineColor: '#FFD700', coordinates: [34.6785, 135.5002], connections: ['midosuji'] },
  { id: 'namba-n', name: 'Namba', nameJp: '難波', line: 'nagahori', lineColor: '#FFD700', coordinates: [34.6664, 135.5013], connections: ['midosuji', 'nankai'] },
  { id: 'morinomiya-n', name: 'Morinomiya', nameJp: '森ノ宮', line: 'nagahori', lineColor: '#FFD700', coordinates: [34.6814, 135.5345], connections: ['chuo', 'jr'] },
  { id: 'kyocera-dome', name: 'Kyocera Dome', nameJp: 'ドーム前', line: 'nagahori', lineColor: '#FFD700', coordinates: [34.6693, 135.4763], connections: [] },
  
  // Yotsubashi Line (Blue)
  { id: 'nishiumeda-y', name: 'Nishi-Umeda', nameJp: '西梅田', line: 'yotsubashi', lineColor: '#0078C2', coordinates: [34.6989, 135.4957], connections: ['umeda'] },
  { id: 'hommachi-y', name: 'Hommachi', nameJp: '本町', line: 'yotsubashi', lineColor: '#0078C2', coordinates: [34.6819, 135.4972], connections: ['midosuji', 'chuo'] },
  { id: 'namba-y', name: 'Namba', nameJp: '難波', line: 'yotsubashi', lineColor: '#0078C2', coordinates: [34.6664, 135.5013], connections: ['midosuji', 'nankai'] },
  
  // JR Osaka Loop Line (Red)
  { id: 'osaka-jr', name: 'Osaka', nameJp: '大阪', line: 'jr-loop', lineColor: '#E60012', coordinates: [34.7025, 135.4959], connections: ['midosuji', 'shinkansen'] },
  { id: 'tennoji-jr', name: 'Tennoji', nameJp: '天王寺', line: 'jr-loop', lineColor: '#E60012', coordinates: [34.6472, 135.5140], connections: ['midosuji', 'kintetsu'] },
  { id: 'kyobashi-jr', name: 'Kyobashi', nameJp: '京橋', line: 'jr-loop', lineColor: '#E60012', coordinates: [34.6969, 135.5282], connections: ['keihan'] },
  
  // JR Kobe Line (Blue)
  { id: 'osaka-kobe', name: 'Osaka', nameJp: '大阪', line: 'jr-kobe', lineColor: '#4169E1', coordinates: [34.7025, 135.4959], connections: ['shinkansen'] },
  { id: 'umeda-kobe', name: 'Umeda', nameJp: '梅田', line: 'jr-kobe', lineColor: '#4169E1', coordinates: [34.7008, 135.4990], connections: ['midosuji'] },
  
  // JR Kyoto Line (Navy)
  { id: 'osaka-kyoto', name: 'Osaka', nameJp: '大阪', line: 'jr-kyoto', lineColor: '#000080', coordinates: [34.7025, 135.4959], connections: ['shinkansen'] },
  { id: 'shin-osaka', name: 'Shin-Osaka', nameJp: '新大阪', line: 'jr-kyoto', lineColor: '#000080', coordinates: [34.7335, 135.5000], connections: ['shinkansen', 'midosuji'] },
  
  // JR Nara Line (Green)
  { id: 'tennoji-nara', name: 'Tennoji', nameJp: '天王寺', line: 'jr-nara', lineColor: '#228B22', coordinates: [34.6472, 135.5140], connections: ['midosuji'] },
  { id: 'sakai-nara', name: 'Sakai', nameJp: '堺', line: 'jr-nara', lineColor: '#228B22', coordinates: [34.5823, 135.4679], connections: [] },
  
  // Hankyu Kobe Line (Maroon)
  { id: 'umeda-hankyu', name: 'Umeda', nameJp: '梅田', line: 'hankyu-kobe', lineColor: '#800000', coordinates: [34.7008, 135.4990], connections: ['midosuji'] },
  { id: 'sannomiya-hankyu', name: 'Sannomiya', nameJp: '三宮', line: 'hankyu-kobe', lineColor: '#800000', coordinates: [34.6937, 135.1955], connections: ['jr', 'port-liner'] },
  
  // Nankai Line (Orange)
  { id: 'namba-nankai', name: 'Namba', nameJp: '難波', line: 'nankai', lineColor: '#FF8C00', coordinates: [34.6664, 135.5013], connections: ['midosuji'] },
  { id: 'kansai-airport', name: 'Kansai Airport', nameJp: '関西空港', line: 'nankai', lineColor: '#FF8C00', coordinates: [34.4358, 135.2441], connections: ['jr'] },
  
  // Kintetsu Line (Pink)
  { id: 'namba-kintetsu', name: 'Namba', nameJp: '難波', line: 'kintetsu', lineColor: '#FF69B4', coordinates: [34.6664, 135.5013], connections: ['midosuji'] },
  { id: 'nara-kintetsu', name: 'Kintetsu Nara', nameJp: '近鉄奈良', line: 'kintetsu', lineColor: '#FF69B4', coordinates: [34.6842, 135.8274], connections: ['jr'] },
  
  // Hanshin Line (Navy)
  { id: 'umeda-hanshin', name: 'Umeda', nameJp: '梅田', line: 'hanshin', lineColor: '#191970', coordinates: [34.7008, 135.4990], connections: ['midosuji'] },
  { id: 'sannomiya-hanshin', name: 'Sannomiya', nameJp: '三宮', line: 'hanshin', lineColor: '#191970', coordinates: [34.6937, 135.1955], connections: ['hankyu'] },
];

export const osakaMetroLines: MetroLine[] = [
  { id: 'midosuji', name: 'Midosuji Line', color: '#E60012', stations: ['esaka', 'senri-chuo', 'umeda', 'shinsaibashi', 'namba', 'tennoji'] },
  { id: 'chuo', name: 'Chuo Line', color: '#00A040', stations: ['cosmo-square', 'osakako', 'hommachi', 'morinomiya', 'nagata'] },
  { id: 'sakaisuji', name: 'Sakaisuji Line', color: '#8B4513', stations: ['tenjimbashisuji-rokuchome', 'kita-senri', 'sakaisuji-hommachi', 'nipponbashi', 'dobutsuen-mae'] },
  { id: 'nagahori', name: 'Nagahori Line', color: '#FFD700', stations: ['shinsaibashi-n', 'namba-n', 'morinomiya-n', 'kyocera-dome'] },
  { id: 'yotsubashi', name: 'Yotsubashi Line', color: '#0078C2', stations: ['nishiumeda-y', 'hommachi-y', 'namba-y'] },
  { id: 'jr-loop', name: 'JR Osaka Loop Line', color: '#E60012', stations: ['osaka-jr', 'tennoji-jr', 'kyobashi-jr'] },
  { id: 'jr-kobe', name: 'JR Kobe Line', color: '#4169E1', stations: ['osaka-kobe', 'umeda-kobe'] },
  { id: 'jr-kyoto', name: 'JR Kyoto Line', color: '#000080', stations: ['osaka-kyoto', 'shin-osaka'] },
  { id: 'jr-nara', name: 'JR Nara Line', color: '#228B22', stations: ['tennoji-nara', 'sakai-nara'] },
  { id: 'hankyu-kobe', name: 'Hankyu Kobe Line', color: '#800000', stations: ['umeda-hankyu', 'sannomiya-hankyu'] },
  { id: 'nankai', name: 'Nankai Line', color: '#FF8C00', stations: ['namba-nankai', 'kansai-airport'] },
  { id: 'kintetsu', name: 'Kintetsu Line', color: '#FF69B4', stations: ['namba-kintetsu', 'nara-kintetsu'] },
  { id: 'hanshin', name: 'Hanshin Line', color: '#191970', stations: ['umeda-hanshin', 'sannomiya-hanshin'] },
];

// Nara - linee JR e Kintetsu
export const naraStations: MetroStation[] = [
  { id: 'nara-station', name: 'Nara', nameJp: '奈良', line: 'jr', lineColor: '#0078C2', coordinates: [34.6851, 135.8175], connections: ['kintetsu'] },
  { id: 'kintetsu-nara', name: 'Kintetsu Nara', nameJp: '近鉄奈良', line: 'kintetsu', lineColor: '#E60012', coordinates: [34.6842, 135.8274], connections: ['jr'] },
  { id: 'shin-omiya', name: 'Shin-Omiya', nameJp: '新大宮', line: 'kintetsu', lineColor: '#E60012', coordinates: [34.6933, 135.8121], connections: [] },
  { id: 'ikoma', name: 'Ikoma', nameJp: '生駒', line: 'kintetsu', lineColor: '#E60012', coordinates: [34.6932, 135.6997], connections: [] },
  { id: 'kashihara-jingu-mae', name: 'Kashihara-Jingu-mae', nameJp: '橿原神宮前', line: 'kintetsu', lineColor: '#E60012', coordinates: [34.4841, 135.7936], connections: [] },
  { id: 'horyuji', name: 'Horyuji', nameJp: '法隆寺', line: 'jr', lineColor: '#0078C2', coordinates: [34.6142, 135.7344], connections: [] },
  { id: 'sakurai', name: 'Sakurai', nameJp: '桜井', line: 'jr', lineColor: '#0078C2', coordinates: [34.5178, 135.8475], connections: ['kintetsu'] },
  { id: 'yoshino', name: 'Yoshino', nameJp: '吉野', line: 'kintetsu', lineColor: '#E60012', coordinates: [34.3564, 135.8583], connections: [] },
];

export const naraLines: MetroLine[] = [
  { id: 'jr', name: 'JR Line', color: '#0078C2', stations: ['nara-station', 'horyuji', 'sakurai'] },
  { id: 'kintetsu', name: 'Kintetsu Line', color: '#E60012', stations: ['kintetsu-nara', 'shin-omiya', 'ikoma', 'kashihara-jingu-mae', 'yoshino'] },
];

// All metro stations combined
export const metroStations: MetroStation[] = [
  ...tokyoMetroStations,
  ...kyotoMetroStations,
  ...osakaMetroStations,
  ...naraStations,
];

// All metro lines combined
export const metroLines: MetroLine[] = [
  ...tokyoMetroLines,
  ...kyotoMetroLines,
  ...osakaMetroLines,
  ...naraLines,
];

export const cityCoordinates: Record<string, [number, number]> = {
  tokyo: [35.6762, 139.6503],
  kyoto: [35.0116, 135.7681],
  osaka: [34.6937, 135.5023],
  nara: [34.6851, 135.8048],
  hiroshima: [34.3853, 132.4553],
  kanazawa: [36.5611, 136.6566],
  hakone: [35.2324, 139.0269],
  nikko: [36.7194, 139.6980],
};

export const cityNames: Record<string, { name: string; nameJp: string }> = {
  tokyo: { name: 'Tokyo', nameJp: '東京' },
  kyoto: { name: 'Kyoto', nameJp: '京都' },
  osaka: { name: 'Osaka', nameJp: '大阪' },
  nara: { name: 'Nara', nameJp: '奈良' },
  hiroshima: { name: 'Hiroshima', nameJp: '広島' },
  kanazawa: { name: 'Kanazawa', nameJp: '金沢' },
  hakone: { name: 'Hakone', nameJp: '箱根' },
  nikko: { name: 'Nikko', nameJp: '日光' },
};

// Sample hotels data
export const sampleHotels: Hotel[] = [
  {
    id: 'hotel-1',
    name: 'Shibuya Excel Hotel Tokyu',
    nameJp: '渋谷エクセルホテル東急',
    city: 'tokyo',
    coordinates: [35.6595, 139.7004],
    address: '1-12-2 Dogenzaka, Shibuya-ku, Tokyo',
    price: 18000,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    bookingUrl: 'https://www.booking.com/hotel/jp/shibuya-excel-tokyu.html',
  },
  {
    id: 'hotel-2',
    name: 'Hotel Granvia Kyoto',
    nameJp: 'ホテルグランヴィア京都',
    city: 'kyoto',
    coordinates: [34.9858, 135.7588],
    address: 'Shimogyo-ku, Kyoto',
    price: 25000,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    bookingUrl: 'https://www.booking.com/hotel/jp/granvia-kyoto.html',
  },
  {
    id: 'hotel-3',
    name: 'Swissotel Nankai Osaka',
    nameJp: 'スイスホテル南海大阪',
    city: 'osaka',
    coordinates: [34.6664, 135.5013],
    address: '5-1-60 Namba, Chuo-ku, Osaka',
    price: 22000,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    bookingUrl: 'https://www.booking.com/hotel/jp/swissotel-nankai-osaka.html',
  },
  {
    id: 'hotel-4',
    name: 'Nara Hotel',
    nameJp: '奈良ホテル',
    city: 'nara',
    coordinates: [34.6851, 135.8430],
    address: '1096 Takabatake-cho, Nara',
    price: 35000,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    bookingUrl: 'https://www.booking.com/hotel/jp/nara.html',
  },
  {
    id: 'hotel-5',
    name: 'Park Hyatt Tokyo',
    nameJp: 'パークハイアット東京',
    city: 'tokyo',
    coordinates: [35.6856, 139.6907],
    address: '3-7-1-2 Nishi Shinjuku, Shinjuku-ku, Tokyo',
    price: 65000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    bookingUrl: 'https://www.booking.com/hotel/jp/park-hyatt-tokyo.html',
  },
  {
    id: 'hotel-6',
    name: 'The Ritz-Carlton Kyoto',
    nameJp: 'ザ・リッツ・カールトン京都',
    city: 'kyoto',
    coordinates: [35.0116, 135.7681],
    address: 'Kamogawa Nijo-Ohashi Hotori, Nakagyo-ku, Kyoto',
    price: 85000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    bookingUrl: 'https://www.booking.com/hotel/jp/the-ritz-carlton-kyoto.html',
  },
];

// Helper function to find nearest metro station to coordinates
export function findNearestStation(coordinates: [number, number], city: string): MetroStation | null {
  let cityStations: MetroStation[] = [];
  
  switch (city) {
    case 'tokyo':
      cityStations = tokyoMetroStations;
      break;
    case 'kyoto':
      cityStations = kyotoMetroStations;
      break;
    case 'osaka':
      cityStations = osakaMetroStations;
      break;
    case 'nara':
      cityStations = naraStations;
      break;
    default:
      return null;
  }
  
  let nearest: MetroStation | null = null;
  let minDistance = Infinity;
  
  for (const station of cityStations) {
    const R = 6371;
    const dLat = (station.coordinates[0] - coordinates[0]) * Math.PI / 180;
    const dLon = (station.coordinates[1] - coordinates[1]) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coordinates[0] * Math.PI / 180) * Math.cos(station.coordinates[0] * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    if (distance < minDistance) {
      minDistance = distance;
      nearest = station;
    }
  }
  
  return nearest;
}

// Helper function to find best metro route between two points
export function findMetroRoute(fromCoords: [number, number], toCoords: [number, number], city: string): { fromStation: MetroStation; toStation: MetroStation; line: string } | null {
  const fromStation = findNearestStation(fromCoords, city);
  const toStation = findNearestStation(toCoords, city);
  
  if (!fromStation || !toStation) return null;
  
  // Check if they're on the same line
  const fromLines = metroLines.filter(l => l.stations.includes(fromStation.id));
  const toLines = metroLines.filter(l => l.stations.includes(toStation.id));
  
  const commonLine = fromLines.find(fl => toLines.some(tl => tl.id === fl.id));
  
  if (commonLine) {
    return { fromStation, toStation, line: commonLine.name };
  }
  
  // If no direct line, return the nearest stations anyway
  return { fromStation, toStation, line: fromStation.line };
}
