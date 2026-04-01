export interface MasKahwinNegeri {
  negeri: string;
  kadarMinimum: string;
  kadarDisyorkan: string;
  bonusHafizah?: string;
  nota: string;
}

export interface HantaranNegeri {
  negeri: string;
  lelaki: string;
  perempuan: string;
  kandunganLazim: string[];
  nota: string;
}

export interface AdatNegeri {
  negeri: string;
  ringkasan: string;
  adat: { tajuk: string; huraian: string }[];
}

export const masKahwinData: MasKahwinNegeri[] = [
  {
    negeri: 'Selangor',
    kadarMinimum: 'RM80.00',
    kadarDisyorkan: 'RM300 – RM500',
    bonusHafizah: 'RM300 (hafizah)',
    nota: 'Selangor menetapkan kadar minimum RM80 untuk pengantin biasa dan RM300 untuk pengantin hafizah (menghafaz Al-Quran).',
  },
  {
    negeri: 'Wilayah Persekutuan (KL & Putrajaya)',
    kadarMinimum: 'RM80.00',
    kadarDisyorkan: 'RM300 – RM500',
    bonusHafizah: 'RM300 (hafizah)',
    nota: 'Mengikut kadar Selangor. Pengantin hafizah layak menerima mas kahwin RM300.',
  },
  {
    negeri: 'Johor',
    kadarMinimum: 'RM80.00',
    kadarDisyorkan: 'RM300 – RM500',
    nota: 'Johor antara negeri terawal menaikkan kadar minimum mas kahwin kepada RM80.',
  },
  {
    negeri: 'Kedah',
    kadarMinimum: 'RM22.50',
    kadarDisyorkan: 'RM100 – RM300',
    nota: 'Kadar minimum masih RM22.50 tetapi lazimnya ditetapkan lebih tinggi mengikut persetujuan keluarga.',
  },
  {
    negeri: 'Kelantan',
    kadarMinimum: 'RM22.50',
    kadarDisyorkan: 'RM80 – RM300',
    nota: 'Selain wang, mas kahwin di Kelantan kadang kala melibatkan Bunga Emas (emas tempaan) mengikut adat setempat.',
  },
  {
    negeri: 'Terengganu',
    kadarMinimum: 'RM22.50',
    kadarDisyorkan: 'RM80 – RM300',
    nota: 'Kadar minimum RM22.50 tetapi kebiasaannya lebih tinggi. Adat tempatan turut mempengaruhi nilai.',
  },
  {
    negeri: 'Pahang',
    kadarMinimum: 'RM22.50',
    kadarDisyorkan: 'RM100 – RM300',
    nota: 'Kadar minimum mengikut kadar persekutuan. Nilai sebenar biasanya dirunding antara keluarga.',
  },
  {
    negeri: 'Perak',
    kadarMinimum: 'RM22.50',
    kadarDisyorkan: 'RM100 – RM300',
    nota: 'Pelbagai adat tempatan di Perak turut mempengaruhi nilai mas kahwin yang ditetapkan.',
  },
  {
    negeri: 'Negeri Sembilan',
    kadarMinimum: 'RM22.50',
    kadarDisyorkan: 'RM80 – RM300',
    nota: 'Adat Perpatih yang kuat di N9 mungkin menambah nilai simbolik dalam mas kahwin selain wang tunai.',
  },
  {
    negeri: 'Melaka',
    kadarMinimum: 'RM22.50',
    kadarDisyorkan: 'RM80 – RM300',
    nota: 'Melaka mempunyai warisan budaya yang kaya. Nilai mas kahwin biasanya lebih tinggi daripada kadar minimum.',
  },
  {
    negeri: 'Pulau Pinang',
    kadarMinimum: 'RM22.50',
    kadarDisyorkan: 'RM100 – RM500',
    nota: 'Masyarakat urban di Pulau Pinang cenderung menetapkan nilai mas kahwin yang lebih tinggi.',
  },
  {
    negeri: 'Perlis',
    kadarMinimum: 'RM22.50',
    kadarDisyorkan: 'RM80 – RM200',
    nota: 'Negeri terkecil Malaysia. Adat tempatan masih kuat dipengaruhi adat Kedah.',
  },
  {
    negeri: 'Sabah',
    kadarMinimum: 'RM22.50',
    kadarDisyorkan: 'RM80 – RM300',
    nota: 'Kepelbagaian etnik di Sabah menjadikan adat dan nilai mas kahwin berbeza antara komuniti.',
  },
  {
    negeri: 'Sarawak',
    kadarMinimum: 'RM22.50',
    kadarDisyorkan: 'RM100 – RM500',
    nota: 'Nilai mas kahwin di Sarawak berbeza mengikut komuniti. Kadar biasanya lebih tinggi di kawasan bandar.',
  },
];

export const hantaranData: HantaranNegeri[] = [
  {
    negeri: 'Selangor / KL / Johor (Umum)',
    lelaki: '7 atau 9 dulang',
    perempuan: '5 atau 7 dulang',
    kandunganLazim: [
      'Baju pengantin lengkap',
      'Kasut dan aksesori',
      'Set solek / perfume',
      'Cincin / rantai emas',
      'Kain / tudung',
      'Buah-buahan segar',
      'Sirih junjung / tepung tawar',
      'Wang hantaran (dalam dulang berasingan)',
    ],
    nota: 'Lelaki membawa dulang lebih 2 daripada perempuan. Nombor ganjil (5, 7, 9) lebih diutamakan.',
  },
  {
    negeri: 'Kelantan & Terengganu',
    lelaki: '5 atau 7 dulang',
    perempuan: '3 atau 5 dulang',
    kandunganLazim: [
      'Baju pengantin (baju kurung tradisional)',
      'Kain songket Kelantan / Terengganu',
      'Aksesori emas tradisional',
      'Buah-buahan',
      'Tepung tawar dan sirih junjung',
      'Bunga rampai',
    ],
    nota: 'Adat Kelantan dan Terengganu lebih tradisional. Songket dan kain tenun tempatan sering digunakan sebagai hantaran.',
  },
  {
    negeri: 'Negeri Sembilan (Adat Perpatih)',
    lelaki: '3 atau 5 dulang',
    perempuan: '5 atau 7 dulang',
    kandunganLazim: [
      'Baju pengantin',
      'Kain adat',
      'Aksesori emas',
      'Sirih junjung (wajib)',
      'Buah-buahan',
      'Tepung tawar',
    ],
    nota: 'UNIK: Dalam Adat Perpatih, perempuan membawa lebih banyak dulang daripada lelaki kerana sistem matrilineal. Ini berbeza dengan adat Melayu biasa.',
  },
  {
    negeri: 'Kedah & Perlis',
    lelaki: '7 atau 9 dulang',
    perempuan: '5 atau 7 dulang',
    kandunganLazim: [
      'Baju pengantin (baju Kedah)',
      'Kain pelikat / kain batik',
      'Aksesori',
      'Buah-buahan',
      'Bekas sirih',
      'Wang hantaran',
    ],
    nota: 'Kedah dan Perlis masih kuat pengaruh adat tradisional. Pakaian adat Kedah sering digunakan.',
  },
  {
    negeri: 'Sabah & Sarawak',
    lelaki: '7 atau 9 dulang',
    perempuan: '5 atau 7 dulang',
    kandunganLazim: [
      'Baju pengantin',
      'Aksesori tempatan',
      'Kain tradisional etnik',
      'Buah-buahan tempatan',
      'Barangan keperluan harian',
    ],
    nota: 'Hantaran di Sabah dan Sarawak dipengaruhi adat etnik setempat. Boleh berbeza mengikut komuniti (Bajau, Kadazan, Iban, Melanau, dll).',
  },
];

export const adatNegeriData: AdatNegeri[] = [
  {
    negeri: 'Selangor / KL',
    ringkasan: 'Moden dan fleksibel, gabungan adat tradisional dengan gaya urban kontemporari.',
    adat: [
      { tajuk: 'Merisik', huraian: 'Pihak lelaki menghantar wakil untuk melihat keadaan calon isteri dan menilai kesesuaian. Biasanya bersifat tidak rasmi.' },
      { tajuk: 'Meminang', huraian: 'Delegasi rasmi pihak lelaki datang dengan sirih junjung untuk meminta persetujuan perkahwinan. Tarikh, mas kahwin, dan hantaran dirunding.' },
      { tajuk: 'Berinai', huraian: 'Majlis malam berinai diadakan 1-2 malam sebelum majlis. Pengantin dihiasi inai di tangan dan kaki.' },
      { tajuk: 'Akad Nikah', huraian: 'Dijalankan di masjid atau rumah di hadapan kadi, wali, dan dua saksi. Ijab kabul perlu jelas dan disahkan kadi.' },
      { tajuk: 'Bersanding', huraian: 'Majlis bersanding di pelamin. Pengantin duduk di singgahsana, tetamu datang memberi ucapan dan makan.' },
      { tajuk: 'Makan Beradab', huraian: 'Di sesetengah keluarga, pengantin makan bersama-sama di hadapan tetamu sebagai simbol keharmonian.' },
    ],
  },
  {
    negeri: 'Kelantan',
    ringkasan: 'Kaya dengan unsur seni tradisional Melayu, kompang, dan adat istiadat yang kukuh.',
    adat: [
      { tajuk: 'Merisik & Bertanya', huraian: 'Proses merisik di Kelantan lebih formal dengan pemberian "Tanda Tanya" (bekas sirih) sebagai tanda minat.' },
      { tajuk: 'Meminang', huraian: 'Sirih junjung yang elaborate dibawa pihak lelaki. Perundingan mas kahwin dan hantaran selalunya lebih panjang.' },
      { tajuk: 'Berinai Curi', huraian: 'Majlis berinai diadakan secara berasingan bagi lelaki dan perempuan. Sering diiringi kompang dan zikir.' },
      { tajuk: 'Mak Andam', huraian: 'Mak andam (jurukecantikan tradisional) memainkan peranan penting dalam persediaan pengantin perempuan.' },
      { tajuk: 'Bunga Emas', huraian: 'Kelantan terkenal dengan tradisi Bunga Emas yang kadang kala disertakan sebagai sebahagian mas kahwin atau hantaran.' },
      { tajuk: 'Bersanding', huraian: 'Majlis bersanding Kelantan kaya dengan musik tradisional dan pakaian songket yang indah.' },
    ],
  },
  {
    negeri: 'Negeri Sembilan',
    ringkasan: 'Unik dengan Adat Perpatih — sistem matrilineal yang berbeza dari kebanyakan adat Melayu lain.',
    adat: [
      { tajuk: 'Adat Perpatih', huraian: 'Sistem sosial matrilineal — harta dan nama keluarga diwarisi melalui sebelah ibu. Perempuan mempunyai kedudukan tinggi.' },
      { tajuk: 'Suku & Perut', huraian: 'Masyarakat dibahagi kepada suku (clan). Perkahwinan dalam suku yang sama dilarang (eksogami suku).' },
      { tajuk: 'Lelaki Masuk', huraian: 'Tradisi unik di mana pengantin lelaki "masuk" ke dalam keluarga isteri dan tinggal di rumah pihak perempuan.' },
      { tajuk: 'Hantaran Terbalik', huraian: 'Perempuan membawa lebih banyak dulang hantaran berbanding lelaki — berbalikan dengan adat Melayu biasa.' },
      { tajuk: 'Adat Melenggang Perut', huraian: 'Upacara khas semasa kehamilan pertama yang masih diamalkan dalam keluarga tradisional N9.' },
      { tajuk: 'Pakaian Adat', huraian: 'Baju Pengantin N9 mempunyai rekabentuk dan motif khas yang berbeza dari negeri lain.' },
    ],
  },
  {
    negeri: 'Johor',
    ringkasan: 'Dipengaruhi adat istana Bugis dan Melayu klasik yang anggun dan formal.',
    adat: [
      { tajuk: 'Pengaruh Bugis', huraian: 'Adat perkahwinan Johor dipengaruhi kuat oleh kebudayaan Bugis (dari Sulawesi) yang membentuk pemerintahan Johor.' },
      { tajuk: 'Tepak Sirih', huraian: 'Tepak sirih memainkan peranan besar dalam setiap upacara adat — dari merisik hingga meminang.' },
      { tajuk: 'Berarak', huraian: 'Pengantin lelaki diarak ke rumah perempuan dengan kompang, bunga rampai, dan iringan keluarga.' },
      { tajuk: 'Adat Istana', huraian: 'Beberapa keluarga bangsawan Johor masih mengamalkan adat istana yang lebih elaborat dan formal.' },
      { tajuk: 'Bersanding Gaya Johor', huraian: 'Pengantin mengenakan pakaian adat Johor yang khas, biasanya songket atau baju kurung moden yang mewah.' },
    ],
  },
  {
    negeri: 'Terengganu',
    ringkasan: 'Kaya dengan warisan Melayu pesisir, songket, dan tradisi maritim yang unik.',
    adat: [
      { tajuk: 'Bertunang', huraian: 'Bertunang di Terengganu melibatkan pertukaran cincin dan pemberian wang tanda (pendahuluan mas kahwin).' },
      { tajuk: 'Songket Terengganu', huraian: 'Songket Terengganu yang terkenal wajib hadir dalam hantaran dan pakaian pengantin sebagai kebanggaan negeri.' },
      { tajuk: 'Berinai', huraian: 'Majlis berinai diadakan 3 malam sebelum akad nikah. Iringan kompang dan nasyid tradisional.' },
      { tajuk: 'Berendoi', huraian: 'Tradisi nyanyian berendoi oleh wanita tua untuk mendoakan pengantin. Unik kepada Terengganu dan Kelantan.' },
      { tajuk: 'Bersanding', huraian: 'Pengantin bersanding dengan pakaian songket Terengganu yang cantik, diiringi paluan kompang.' },
    ],
  },
  {
    negeri: 'Kedah & Perlis',
    ringkasan: 'Adat tradisional yang kuat dengan pengaruh Thailand utara dan budaya Melayu utara.',
    adat: [
      { tajuk: 'Pengaruh Thai', huraian: 'Kedah dan Perlis, sempadan dengan Thailand, mempunyai beberapa adat yang sedikit berbeza akibat pengaruh budaya utara.' },
      { tajuk: 'Meminang', huraian: 'Upacara meminang di Kedah lebih formal dengan barisan tetua adat dari kedua belah pihak.' },
      { tajuk: 'Berinai', huraian: 'Majlis berinai diadakan malam sebelum nikah. Biasanya diiringi kompang dan bacaan doa.' },
      { tajuk: 'Baju Adat Kedah', huraian: 'Pakaian adat pengantin Kedah mempunyai rekabentuk khas yang berbeza — lebih konservatif dan tradisional.' },
      { tajuk: 'Makan Beradab', huraian: 'Jamuan makan beradab masih diamalkan di kawasan pedalaman, di mana pengantin makan bersama di hadapan tetamu terpilih.' },
    ],
  },
  {
    negeri: 'Sabah',
    ringkasan: 'Kepelbagaian etnik menghasilkan adat perkahwinan yang pelbagai dan unik.',
    adat: [
      { tajuk: 'Kepelbagaian Etnik', huraian: 'Sabah mempunyai lebih 30 kumpulan etnik (Kadazan, Dusun, Bajau, Murut, dll) — setiap satu dengan adat tersendiri.' },
      { tajuk: 'Adat Bajau', huraian: 'Bajau (penunggang kuda Sabah) mengadakan perarakan berkuda untuk pengantin lelaki dalam majlis tertentu.' },
      { tajuk: 'Adat Kadazan-Dusun', huraian: 'Upacara adat Magavau (bagi penganut tradisi) dan minum tapai beras dalam bekas khas semasa perkahwinan.' },
      { tajuk: 'Pakaian Tradisional', huraian: 'Pakaian adat etnik Sabah sangat berwarna-warni dan bermanik. Sering dipakai semasa majlis perkahwinan.' },
      { tajuk: 'Mas Kahwin Islam', huraian: 'Bagi Bajau dan Melayu Islam Sabah, prosedur akad nikah mengikut undang-undang Islam, tetapi dengan sentuhan adat tempatan.' },
    ],
  },
  {
    negeri: 'Sarawak',
    ringkasan: 'Tanah pelbagai adat — dari Iban, Bidayuh, Melanau hingga Melayu Sarawak.',
    adat: [
      { tajuk: 'Melayu Sarawak', huraian: 'Perkahwinan Melayu Sarawak mengikut Islam dengan adat tempatan. Sering melibatkan perahu hias dan iringan air.' },
      { tajuk: 'Adat Iban', huraian: 'Majlis perkahwinan Iban (Gawai Orang Bujang) melibatkan tarian ngajat, tuak, dan pakaian tradisional pua kumbu.' },
      { tajuk: 'Adat Bidayuh', huraian: 'Perkahwinan Bidayuh melibatkan upacara di baruk (rumah bulat komuniti) dan jamuan bersama ketua adat.' },
      { tajuk: 'Melanau', huraian: 'Melanau Islam mengamalkan adat nikah Islam dengan sentuhan budaya pesisir yang unik, termasuk persembahan seni tradisional.' },
      { tajuk: 'Pakaian Adat', huraian: 'Setiap etnik di Sarawak mempunyai pakaian adat perkahwinan yang sangat berbeza dan kaya dengan motif tempatan.' },
    ],
  },
];
