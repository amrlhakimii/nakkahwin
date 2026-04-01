export interface BudgetItem {
  category: string;
  minCost: number;
  maxCost: number;
  notes: string;
}

export interface BudgetTier {
  tier: string;
  label: string;
  totalMin: number;
  totalMax: number;
  items: BudgetItem[];
}

export const budgetTiers: BudgetTier[] = [
  {
    tier: 'ekonomi',
    label: 'Ekonomi',
    totalMin: 10000,
    totalMax: 20000,
    items: [
      { category: 'Venue / Dewan', minCost: 2000, maxCost: 5000, notes: 'Dewan kampung atau dewan orang ramai' },
      { category: 'Katering', minCost: 4000, maxCost: 8000, notes: 'Katering tempatan, 200-300 orang' },
      { category: 'Pelamin', minCost: 1500, maxCost: 3000, notes: 'Pakej pelamin asas' },
      { category: 'Baju Pengantin', minCost: 800, maxCost: 2000, notes: 'Baju sewa atau tempahan biasa' },
      { category: 'Fotografi', minCost: 1000, maxCost: 2500, notes: 'Fotografi sahaja' },
      { category: 'Solek (MUA)', minCost: 500, maxCost: 1200, notes: 'Solek asas' },
      { category: 'Doorgift', minCost: 500, maxCost: 1500, notes: 'Doorgift mudah' },
    ],
  },
  {
    tier: 'sederhana',
    label: 'Sederhana',
    totalMin: 20000,
    totalMax: 40000,
    items: [
      { category: 'Venue / Dewan', minCost: 3000, maxCost: 8000, notes: 'Dewan bandar atau hotel bintang tiga' },
      { category: 'Katering', minCost: 8000, maxCost: 15000, notes: 'Katering berkualiti, 300-500 orang' },
      { category: 'Pelamin', minCost: 3000, maxCost: 6000, notes: 'Pelamin tema moden' },
      { category: 'Baju Pengantin', minCost: 2000, maxCost: 5000, notes: 'Tempahan eksklusif' },
      { category: 'Fotografi + Video', minCost: 2500, maxCost: 5000, notes: 'Pakej foto dan video' },
      { category: 'Solek (MUA)', minCost: 1200, maxCost: 2500, notes: 'MUA profesional' },
      { category: 'Doorgift', minCost: 1500, maxCost: 3000, notes: 'Doorgift berkualiti' },
    ],
  },
  {
    tier: 'mewah',
    label: 'Mewah',
    totalMin: 40000,
    totalMax: 100000,
    items: [
      { category: 'Venue / Dewan', minCost: 8000, maxCost: 25000, notes: 'Hotel bintang lima atau resort' },
      { category: 'Katering', minCost: 15000, maxCost: 40000, notes: 'Katering premium, 500+ orang' },
      { category: 'Pelamin', minCost: 6000, maxCost: 15000, notes: 'Pelamin mewah custom design' },
      { category: 'Baju Pengantin', minCost: 5000, maxCost: 15000, notes: 'Baju pengantin haute couture' },
      { category: 'Fotografi + Video', minCost: 5000, maxCost: 15000, notes: 'Pakej premium cinematografi' },
      { category: 'Solek (MUA)', minCost: 2500, maxCost: 6000, notes: 'MUA selebriti / artis' },
      { category: 'Doorgift', minCost: 3000, maxCost: 8000, notes: 'Doorgift premium berlabel' },
    ],
  },
];

export const budgetTips = [
  'Tetapkan bajet keseluruhan sebelum merancang sebarang item.',
  'Kenalpasti keutamaan — fokus belanjawan pada perkara paling penting untuk anda.',
  'Bayar deposit awal untuk elak kenaikan harga.',
  'Simpan sekurang-kurangnya 10% bajet sebagai rizab kecemasan.',
  'Dapatkan sebut harga dari beberapa vendor sebelum membuat keputusan.',
  'Pertimbangkan pakej all-in-one yang sering lebih jimat.',
  'Rancang dengan teliti — perubahan mendadak boleh menambah kos.',
];
