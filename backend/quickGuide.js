/*
Certainly, here are the names of all the methods used in Mongoose for CRUD operations:

1. **Create:**
   - `Model.create(req.body)`// both array of obj or obj
   - `Model.insertMany(req.body)`//array of object

2. **Read:**
   - `Model.find()`
   - `Model.findById()`
   - `Model.findOne()`
   - `Model.findByIdAndRemove()`
   - `Model.findByIdAndDelete()`

3. **Update:**
   - `Model.updateOne({name:"abcd"},{name:'updated name'})`//dont returns updated data or old data it returns no. of updated data 
   - `Model.updateMany()`//update all mtches returns no of modefied document
   - `Model.findOneAndUpdate(fiter obj, new obj, {new:true})`//it returns data  update with id 
   - `Model.findByIdAndUpdate()`
   - `Model.replaceOne()`

4. **Delete:**
   - `Model.deleteOne()`//count
   - `Model.deleteMany()`//returns count 
   - `Model.findOneAndDelete()`//document
   - `Model.findByIdAndDelete()`//document
   */
   const mongoose = require('mongoose');

   const User = mongoose.model('User', {
     username: String,
     age: Number,
     isBlocked: Boolean,
   });
   
   // Example: Find a user by username, update age if not blocked
   const usernameToFind = 'desiredUsername';
   const newAge = 25;
   
   const updatedUser = await User.findOneAndUpdate(
     {
       $and: [
         { username: usernameToFind },
         { isBlocked: { $ne: true } } // $ne means not equal
       ]
     },
     { $set: { age: newAge } },
     { new: true } // Return the modified document
   );
   
   console.log(updatedUser);
   //****************************************************** 
   //diffrence between $set update and without $set***********************
   // Assume the user document
const existingUser = { username: 'John', age: 30, status: 'active' };

// Using $set
const updatedUserWithSet = { $set: { age: 35 } };
// Result: { username: 'John', age: 35, status: 'active' }

// Using { age: newAge }
const updatedUserWithoutSet = { age: 35 };
// Result: { age: 35 }

//max age student
await User.findOne().sort(-1)//sort(-1) descending order k liye

//second max

const secondMaxAgeUser = await User.find().sort({ age: -1 }).skip(1).limit(1);

console.log(secondMaxAgeUser);

// Find all users
const allUsers = await User.find();

console.log(allUsers);