const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
async function connectToDB(){ 

await mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  
  updateDatabase();

};

async function updateDatabase() {
    try{
  console.log("Connected to the database");
  await Recipe.deleteMany()
  
  const firstRecipe= await Recipe.create(
  {
    title: "Scrambled eggs",
    level: "Easy Peasy",
    ingredients: ["eggs", "oil", "salt"],
    cuisine: "worldwide",
    disType:"breakfast",
    image: "https://images.media-allrecipes.com/images/75131.jpg",
    duration: 5,
    creator: "unkown",
  });


  console.log (firstRecipe.title);
  await Recipe.insertMany(data, function (error, docs){});

  await Recipe.findByIdAndUpdate( "6130dcfba3eba6d12bb8c888", {duration: 100});
   

  await Recipe.deleteMany({
    title:"Carrot Cake",
});
console.log("deleted");

   

} catch(e) {    
  console.log('Error connecting to the database', e);
  } finally {
    mongoose.connection.close(); //== finally> regardless if you find an error or not
    // it will close the connection
}
}


connectToDB();