export const dummyUser = {
  username: 'Riswan Saputra',
  role: 'IT Project Manager',
  profilePicture: 'https://ui-avatars.com/api/?name=RiswanSaputra&background=475569&color=fff',
};

export const dummyProjects = [
  {
    id: 'PRJ-001',
    code: 'PRJ-001',
    name: 'Learning and Development (AKSARA) - New 2027',
    description: 'Pengembangan platform pembelajaran dan pengembangan kompetensi karyawan untuk tahun 2027.',
    category: 'FS',
    projectType: 'New',
    status: 'On Progress',
    pm: 'Riswan Saputra',
    bp: 'Budi Santoso',
    requestingUnit: 'HCS',
    owner: 'Toto Prasetyo',
    projectDate: '2026-10-17',
    targetGoLive: '2027-01-15',
    currentStage: 'Komite TI B',
    stageHistory: [
      {
        id: 'STG-1',
        stage: 'Pra Komite',
        status: 'Accepted',
        date: '2026-10-15',
        notes: 'Sudah Dilakukan pembahasan awal dengan tim terkait.',
      },
      {
        id: 'STG-2',
        stage: 'Komite TI B',
        status: 'Revision',
        date: '2026-11-01',
        notes: 'Dokumen business plan perlu diperbaiki'
      },
      {
        id: 'STG-3',
        stage: 'Komite TI B',
        status: 'Planned',
        date: '2026-11-15',
        notes: 'Membahas perbaikan dokumen business plan'
      }
    ],
    supportingDocuments: [
      {
        id: 'DOC-1',
        name: 'Project Proposal AKSARA.pdf',
        size: 2457600,
      },
    ],
  }
];

export const dummyUpdates = [
  {
    id: 'update-001',
    date: '2026-10-15',
    project: 'Learning and Development (AKSARA) - New 2027',
    status: 'On Progress',
    pic: 'Toto Prasetyo',
    activity: 'Melakukan pengembangan halaman input update project menggunakan React.',
    progress: 'Menyelesaikan form input update, searchable dropdown untuk Project dan PIC, serta dropdown Status dan Prioritas.',
    issue: 'Masih terdapat beberapa penyesuaian pada layout dan konsistensi styling komponen.',
    nextStep: 'Melakukan perbaikan UI dan mengintegrasikan form dengan API.',
    deadline: '2026-10-23',
  },
];

export const dummyPMs = [
  { id: 'PM-001', value: 'Riswan Saputra' },
  { id: 'PM-002', value: 'Nadia Putri' },
  { id: 'PM-003', value: 'Dimas Pratama' },
  { id: 'PM-004', value: 'Rizky Firmansyah' },
  { id: 'PM-005', value: 'Aditya Nugraha' },
  { id: 'PM-006', value: 'Fajar Ramadhan' },
  { id: 'PM-007', value: 'Yoga Prakoso' },
];

export const dummyBPs = [
  { id: 'BP-001', value: 'Budi Santoso' },
  { id: 'BP-002', value: 'Siti Aisyah' },
  { id: 'BP-003', value: 'Siti Rahmawati' },
  { id: 'BP-004', value: 'Maya Putri' },
  { id: 'BP-005', value: 'Nadia Safitri' },
  { id: 'BP-006', value: 'Dewi Anggraini' },
  { id: 'BP-007', value: 'Intan Permata' },
];

export const dummyProjectCategories = [
  { id: 'CAT-001', value: 'FS' },
  { id: 'CAT-002', value: 'CR Form' },
  { id: 'CAT-003', value: 'AIR Form' },
  { id: 'CAT-004', value: 'IC Form' },
  { id: 'CAT-005', value: 'SF Form' },
];

export const dummyRequestingUnits = [
  { id: 'UNIT-001', value: 'HCS' },
  { id: 'UNIT-002', value: 'DMA' },
  { id: 'UNIT-003', value: 'AML' },
  { id: 'UNIT-004', value: 'BNU' },
  { id: 'UNIT-005', value: 'IAM' },
];

export const dummyProjectStatus = [
  { id: 'ON_PROGRESS', value: 'On Progress' },
  { id: 'COMPLETED', value: 'Completed' },
  { id: 'ON_HOLD', value: 'On Hold' },
];

export const dummyStagesStatus = [
  { id: 'PLANNED', value: 'Planned' },
  { id: 'ACCEPTED', value: 'Accepted' },
  { id: 'REVISION', value: 'Revision' }
];

export const dummyProjectStage = [
  { id: 'PRE_COMMITTEE', value: 'Pra Komite' },
  { id: 'COMMITTEE_TI_B', value: 'Komite TI B' },
  { id: 'COMMITTEE_TI_A', value: 'Komite TI A' },
];