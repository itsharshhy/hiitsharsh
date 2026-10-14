// Pixel-art me, drawn on a 32 x 34 grid. Each letter is one pixel; '.' is empty.
// Change a colour in `palette` (or a letter in `grid`) and the avatar updates everywhere.
export const palette: Record<string, string> = {
  K: '#141015', // hair
  k: '#3b3342', // hair shine
  S: '#f5d2bb', // skin
  s: '#dfa98f', // skin shadow
  W: '#ecebf2', // eye white
  G: '#141015', // glasses
  H: '#4c2d5e', // hoodie
  h: '#371f47', // hoodie shadow
  L: '#6b4580', // hoodie zip
  D: '#1d1c21', // headphones
  d: '#55535e', // headphones shine
  M: '#4a2e2e', // mouth
  R: '#f2f2f8', // earring
};

export const grid = [
  '................................',
  '.............KKKKKK.............',
  '..........KKKKKKKKKKKK..........',
  '........KKKKKKKKKKKKKKKK........',
  '.......KKKkkkKKKKKKKkkkKKK......',
  '......KKKKKKKKKKKKKKKKKKKKK.....',
  '.....KKKKKKKKKKKKKKKKKKKKKKK....',
  '....KKKKKKKKKKKKKKKKKKKKKKKKK...',
  '..KKKKKKKKKKKKKSKKKKKKKKKKKKKKK.',
  '....KKKKKKKKKKSSKKKSSKKKKKKKKK..',
  '....KKKKKKKKKSSSSKSSSSKKKKKKKK..',
  '.....KKKKKKKSSSSSSSSSSSKKKKKK...',
  '....sSKKKKSSSSSSSSSSSSSSKKKK....',
  '...sSSKKKSGGGGSSSGGGGSSSKKK.....',
  '...sSSKKKGWWWWGGGWWWWGSKK.......',
  '...ssSKKKGWWWWGSGWWWWGSK........',
  '....sRKKSSGGGGSSSGGGGSSSK.......',
  '....RKKKSSSSSSSSSSSSSSSSK.......',
  '.....KKKSSSSSSSSSSSSSSSK........',
  '......KKSSSSSSSSMMMSSSSK........',
  '.......KsSSSSSSSSSSSSSK.........',
  '........ssSSSSSSSSSSSK..........',
  '.........sssSSSSSSSKK...........',
  '..........sssSSSSSs.............',
  '.....DDDD..sssSSSs..DDDD........',
  '....DddDDD..sssSs..DDDdDD.......',
  '...HDddDDDHHHsssHHHDDDddDH......',
  '..HHDDDDDDHHHHsHHHHDDDDDDHH.....',
  '.HHHHDDDDHHHHHLHHHHHDDDDHHHH....',
  'HHHHHHDDHHHHHHLHHHHHHDDHHHHHH...',
  'HHHHHHHHHHHHHhLhHHHHHHHHHHHHHH..',
  'HHHHHhHHHHHHHhLhHHHHHHHhHHHHHHH.',
  'HHHHHhHHHHHHHHLHHHHHHHHhHHHHHHHH',
  'HHHHHhHHHHHHHHLHHHHHHHHhHHHHHHHH',
];

// Where the eyes sit inside the glasses (column of the left edge of each eye, and the eye rows).
export const eyes = { cols: [10, 17], rows: [14, 15], width: 4 };
