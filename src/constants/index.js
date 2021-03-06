 export const poses = [
  {id:1,sanskrit_name:"Navasana",english_name:"Boat",img:"./1.svg"},
  {id:2,sanskrit_name:"Ardha Navasana",english_name:"Half-Boat",img:"./2.svg"},
  {id:3,sanskrit_name:"Dhanurasana",english_name:"Bow",img:"./3.svg"},
  {id:4,sanskrit_name:"Setu Bandha Sarvangasana",english_name:"Bridge",img:"./4.svg"},
  {id:5,sanskrit_name:"Baddha Konasana",english_name:"Butterfly",img:"./5.svg"},
  {id:6,sanskrit_name:"Ustrasana",english_name:"Camel",img:"./6.svg"},
  {id:7,sanskrit_name:"Marjaryasana",english_name:"Cat",img:"./7.svg"},
  {id:8,sanskrit_name:"Bitilasana",english_name:"Cow",img:"./8.svg"},
  {id:9,sanskrit_name:"Utkatasana",english_name:"Chair",img:"./9.svg"},
  {id:10,sanskrit_name:"Balasana",english_name:"Child's Pose",img:"./10.svg"},
  {id:11,sanskrit_name:"Sivasana",english_name:"Corpse",img:"./11.svg"},
  {id:12,sanskrit_name:"Alanasana",english_name:"Crescent Lunge",img:"./12.svg"},
  {id:13,sanskrit_name:"Bakasana",english_name:"Crow",img:"./13.svg"},
  {id:14,sanskrit_name:"Ardha Pincha Mayurasana",english_name:"Dolphin",img:"./14.svg"},
  {id:15,sanskrit_name:"Adho Mukha Svanasana",english_name:"Downward-Facing Dog",img:"./15.svg"},
  {id:16,sanskrit_name:"Garudasana",english_name:"Eagle",img:"./16.svg"},
  {id:17,sanskrit_name:"Utthita Hasta Padangusthasana",english_name:"Extended Hand to Toe",img:"./17.svg"},
  {id:18,sanskrit_name:"Utthita Parsvakonasana",english_name:"Extended Side Angle",img:"./18.svg"},
  {id:19,sanskrit_name:"Pincha Mayurasana",english_name:"Forearm Stand",img:"./19.svg"},
  {id:20,sanskrit_name:"Uttanasana",english_name:"Forward Bend with Shoulder Opener",img:"./20.svg"},
  {id:21,sanskrit_name:"Ardha Chandrasana",english_name:"Half-Moon",img:"./21.svg"},
  {id:22,sanskrit_name:"Adho Mukha Vrksasana",english_name:"Handstand",img:"./22.svg"},
  {id:23,sanskrit_name:"Anjaneyasana",english_name:"Low Lunge",img:"./23.svg"},
  {id:24,sanskrit_name:"Supta Kapotasana",english_name:"Pigeon",img:"./24.svg"},
  {id:25,sanskrit_name:"Eka Pada Rajakapotasana",english_name:"King Pigeon",img:"./25.svg"},
  {id:26,sanskrit_name:"Phalakasana",english_name:"Plank",img:"./26.svg"},
  {id:27,sanskrit_name:"Halasana",english_name:"Plow",img:"./27.svg"},
  {id:28,sanskrit_name:"Parsvottanasana",english_name:"Pyramid",img:"./28.svg"},
  {id:29,sanskrit_name:"Parsva Virabhadrasana",english_name:"Reverse Warrior",img:"./29.svg"},
  {id:30,sanskrit_name:"Paschimottanasana",english_name:"Seated Forward Bend",img:"./30.svg"},
  {id:31,sanskrit_name:"Padmasana",english_name:"Lotus",img:"./31.svg"},
  {id:32,sanskrit_name:"Ardha Matsyendrasana",english_name:"Half Lord of the Fishes",img:"./32.svg"},
  {id:33,sanskrit_name:"Salamba Sarvangasana",english_name:"Shoulder Stand",img:"./33.svg"},
  {id:34,sanskrit_name:"Vasisthasana",english_name:"Side Plank",img:"./34.svg"},
  {id:35,sanskrit_name:"Salamba Bhujangasana",english_name:"Sphinx",img:"./35.svg"},
  {id:36,sanskrit_name:"Hanumanasana",english_name:"Splits",img:"./36.svg"},
  {id:37,sanskrit_name:"Malasana",english_name:"Squat",img:"./37.svg"},
  {id:38,sanskrit_name:"Uttanasana",english_name:"Standing Forward Bend",img:"./38.svg"},
  {id:39,sanskrit_name:"Ashta Chandrasana",english_name:"Crescent Moon",img:"./39.svg"},
  {id:40,sanskrit_name:"Upavistha Konasana",english_name:"Side Splits",img:"./40.svg"},
  {id:41,sanskrit_name:"Vrksasana",english_name:"Tree",img:"./41.svg"},
  {id:42,sanskrit_name:"Trikonasana",english_name:"Triangle",img:"./42.svg"},
  {id:43,sanskrit_name:"Urdhva Mukha Svsnssana",english_name:"Upward-Facing Dog",img:"./43.svg"},
  {id:44,sanskrit_name:"Virabhadrasana One",english_name:"Warrior One",img:"./44.svg"},
  {id:45,sanskrit_name:"Virabhadrasana Two",english_name:"Warrior Two",img:"./45.svg"},
  {id:46,sanskrit_name:"Virabhadrasana Three",english_name:"Warrior Three",img:"./46.svg"},
  {id:47,sanskrit_name:"Urdhva Dhanurasana",english_name:"Wheel",img:"./47.svg"},
  {id:48,sanskrit_name:"Camatkarasana",english_name:"Wild Thing",img:"./48.svg"}
];

export const reqSvgs = require.context('../imgs', true, /\.svg$/);

export const paths = reqSvgs.keys();

export const svgs = paths.reduce((images, path) => {
  images[path] = reqSvgs(path);
  return images;
}, {});