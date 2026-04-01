import type { Task } from '../types/task';

export const checklistTemplate: Omit<Task, 'id'>[] = [
  // Legal
  { title: 'Daftar kursus pra perkahwinan (Kursus Kahwin)', category: 'legal', completed: false },
  { title: 'Dapatkan sijil kursus kahwin', category: 'legal', completed: false },
  { title: 'Isi borang nikah (JPN/pejabat agama)', category: 'legal', completed: false },
  { title: 'Hantar borang nikah ke pejabat agama', category: 'legal', completed: false },
  { title: 'Tentukan tarikh akad nikah dengan kadi/imam', category: 'legal', completed: false },
  { title: 'Sediakan dokumen berkaitan (IC, sijil lahir)', category: 'legal', completed: false },

  // Event
  { title: 'Tentukan tarikh majlis', category: 'event', completed: false },
  { title: 'Tempah dewan / venue majlis', category: 'event', completed: false },
  { title: 'Tempah perkhidmatan katering', category: 'event', completed: false },
  { title: 'Tempah pelamin', category: 'event', completed: false },
  { title: 'Cetak kad jemputan', category: 'event', completed: false },
  { title: 'Edar kad jemputan kepada tetamu', category: 'event', completed: false },
  { title: 'Sediakan dekorasi majlis', category: 'event', completed: false },
  { title: 'Tempah khidmat emcee / pengacara majlis', category: 'event', completed: false },

  // Outfit
  { title: 'Tempah baju pengantin (lelaki)', category: 'outfit', completed: false },
  { title: 'Tempah baju pengantin (perempuan)', category: 'outfit', completed: false },
  { title: 'Fitting baju pengantin', category: 'outfit', completed: false },
  { title: 'Tempah perkhidmatan solek (makeup artist)', category: 'outfit', completed: false },
  { title: 'Sediakan aksesori pengantin', category: 'outfit', completed: false },

  // Finance
  { title: 'Tetapkan bajet keseluruhan', category: 'finance', completed: false },
  { title: 'Buka akaun simpanan khas perkahwinan', category: 'finance', completed: false },
  { title: 'Bayar deposit venue', category: 'finance', completed: false },
  { title: 'Bayar deposit katering', category: 'finance', completed: false },
  { title: 'Sediakan wang hantaran', category: 'finance', completed: false },
  { title: 'Sediakan wang mas kahwin', category: 'finance', completed: false },

  // Family
  { title: 'Berbincang dengan keluarga mengenai tarikh', category: 'family', completed: false },
  { title: 'Hantar wakil untuk merisik / meminang', category: 'family', completed: false },
  { title: 'Tetapkan senarai jemputan keluarga', category: 'family', completed: false },
  { title: 'Bincang hantaran dengan pihak keluarga', category: 'family', completed: false },

  // Honeymoon
  { title: 'Pilih destinasi bulan madu', category: 'honeymoon', completed: false },
  { title: 'Tempah hotel / penginapan', category: 'honeymoon', completed: false },
  { title: 'Tempah tiket penerbangan / pengangkutan', category: 'honeymoon', completed: false },
];
