const { User } = require("../models");

module.exports = {
  // Get all Users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create new user
  async createUser(req, res){
    try{
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch(err){
      res.status(500).json(err);
    }
  },
  // Get single User
  async getSingleUser(req, res){
    try{
      const singleUser = await User.findById(req.params.id).populate('thoughts').populate('friends');
      res.json(singleUser);
    } catch(err){
      res.status(500).json(err);
    }
  },
  // Update User
  async updateUser(req, res){
    try{
      const userToUpdate = req.params.id;
      const infoToUpdate = req.body;

      const updatedUser = await User.findByIdAndUpdate(userToUpdate, infoToUpdate, {new: true});
      res.json({message: 'User updated', data: updatedUser});
    } catch(err){
      res.status(500).json(err);
    }
  }
};
