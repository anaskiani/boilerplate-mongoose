require("dotenv").config();
const MONGO_URI =
  "mongodb+srv://Anaskiani0:mongodb-mongoose@cluster0.ktef5ud.mongodb.net/?retryWrites=true&w=majority";
/** # MONGOOSE SETUP #
/*  ================== */

/** 1) Install & Set up mongoose */
const mongoose = require("mongoose");
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db.");
  })
  .catch((error) => {
    console.log(error);
  });

// let Person;
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});
let Person = mongoose.model("Person", personSchema);

// let usefulProgrammer = function(done) {
//   return new Person({
//     name: "Anas Kiani",
//     age: 22,
//     favouriteFood: ["burger", "pizza"]
//   });
//   if(error) return done(error);
//   done(nll, result);
// };
var createAndSavePerson = (done) => {
  var AnasKiani = new Person({
    name: "AnasKiani",
    age: 19,
    favoriteFoods: ["cheese burger", "cheezious pizza"],
  });
  AnasKiani.save(function (err, data) {
    if (err) return console.log(err);

    console.log("saved to db", data);
    done(null, data);
  });
};
var arrayOfPeople = [
  {
    name: "AnasKiani",
    age: 19,
    favoriteFoods: ["cheese burger", "cheezious pizza"],
  },
  {
    name: "TehseenKiani",
    age: 23,
    favoriteFoods: ["cheese burger", "cheezious pizza"],
  },
  {
    name: "ZainKiani",
    age: 26,
    favoriteFoods: ["cheese burger", "cheezious pizza"],
  },
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, person) {
    if (err) return console.log(err);
    person.favoriteFoods.push("hamburger");
    person.save((err, data) => {
      if (err) return console.log(err);
      done(null, data);
    });
  });
};

const findAndUpdate = (Anas, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: Anas },
    { age: ageToSet },
    { new: true },
    (err, data) => {
      if (err) return console.log(err);
      done(null, data);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, remove) {
    if (err) return console.log(err);
    done(null, remove);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function (err, response) {
    if (err) return console.log(err);
    done(null, response);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      if (err) return console.log(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
