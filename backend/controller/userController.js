

//https://chat.openai.com/share/5939f959-d262-44c1-944e-f431e61151b3

const User = require("../modal/user");


// Get all users
const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new user
const addUser = async (req, res) => {
   // console.log({body:req.body})
  const { username, email } = req.body;
    const dataToBeInserted=[{username, email},{username:'iop2', email:"aop2@gmail.com"}]
  try {
    /*
    const newUser = new User(dataToBeInserted);
    const savedUser = await newUser.save();
    console.log(newUser== savedUser)//true
    res.status(201).json(savedUser);
    */
   /*If you're dealing with a single document and want fine-grained control over the save operation, use .save().
If you're adding one or more documents in a single step and prefer a convenient shorthand, use .create().
If you're inserting a larger set of documents and efficiency is a concern, use .insertMany().
In many cases, the choice between these methods depends on your specific use case and preferences. If you have a small number of documents to
 insert, any of the methods might work. However, for bulk inserts, .insertMany() is often more efficient. */
const savedUser = await User.create(dataToBeInserted)
/* in case of .save method "dataToBeInserted" should be an object , in case of .create it may be array or object and in case of insertMany it should be 
array of objects only*/
res.status(201).json(savedUser);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    console.log({deletedUser})//complete object of user
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(deletedUser);
    /************************************************/
    /*
    Use findOneAndDelete when you want to delete a single document based on a specific query.
    Use findByIdAndDelete when you want to delete a single document by its unique _id.
    Use deleteMany when you want to delete multiple documents based on a specific query condition.

    const deletedUsers = await User.deleteMany({ username: 'desiredUsername' });, use deletedUser.deleteCount if it is 0 means no match

    const deletedUser = await User.findOneAndDelete({ username: 'desiredUsername' });


    */
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { username, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true } // Return the updated document
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUser, addUser, deleteUser, updateUser };
