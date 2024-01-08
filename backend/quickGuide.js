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

// group by age
const result = await User.aggregate([
    {
      $group: {
        _id: '$age',
        users: { $push: '$$ROOT' }// $ROOT poora document
      }
    }
  ])


/*
  If you want to group documents by the `category` field in Mongoose using the aggregation framework, you can use the `$group` stage. Here's an example:

Assuming you have a Mongoose model named `Transaction` with a schema like:

javascript
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  category: { type: String, enum: ['a', 'b', 'c'] }
});

const Transaction = mongoose.model('Transaction', transactionSchema);


And you want to group transactions by their `category`. Here's how you can do it:


const result = await Transaction.aggregate([
  {
    $group: {
      _id: '$category',
      totalAmount: { $sum: '$amount' },
      transactions: { $push: '$$ROOT' }
    }
  }
]);
```
/*
Explanation:


- `$group` stage is used to group documents by the `category` field.
- `_id: '$category'` specifies that the grouping key is the `category` field.
- `$sum: '$amount'` calculates the total amount for each category.
- `$push: '$$ROOT'` collects all documents in each category into an array called `transactions`.

The result will look like an array with objects representing each category:


//[
 // { _id: 'a', totalAmount: 100, transactions: [/* array of transactions with category 'a' */] }//a,b,c are category
 // { _id: 'b', totalAmount: 150, transactions: [/* array of transactions with category 'b' */] }
 // { _id: 'c', totalAmount: 75, transactions: [/* array of transactions with category 'c' */] }
//]



//This structure provides the total amount and an array of transactions for each category. You can adjust the stages based on your specific 
//requirements.
*/


const mongoose = require('mongoose');

const session = await mongoose.startSession();

try {
  await session.withTransaction(async () => {
    const result1 = await Model1.create([{ name: 'Document1' }], { session });
    const result2 = await Model1.create([{ name: 'Document1' }], { session });
    // Yahaan par doosra create operation unique constraint violation ke liye error trigger karega
  });
} catch (error) {
  console.error('Transaction failed:', error);
} finally {
  await session.endSession();
}

//Is example mein, `result2` ke create operation mein `name: 'Document1'` ka document pehle hi exist karta hai, isliye unique constraint 
//violation hokar transaction rollback ho jayega.