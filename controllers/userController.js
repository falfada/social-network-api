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
      res.json({message: 'User created successfully', data: newUser});
    } catch(err){
      res.status(500).json(err);
    }
  },
  // Get single User
  async getSingleUser(req, res){
    try{
      const singleUser = await User.findById(req.params.id).populate('thoughts').populate('friends');
      if(!singleUser){
        return res.status(404).json({message: 'User not found'});
      }
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
      if(!updatedUser){
        return res.status(404).json({message: 'User not found'});
      }
      res.json({message: 'User updated', data: updatedUser});
    } catch(err){
      res.status(500).json(err);
    }
  },
  // Delete User
  async deleteUser(req, res){
    try{
      const userId = req.params.id;
      const userToDelete = await User.findByIdAndDelete(userId);
      if(!userToDelete){
        return res.status(404).json({message: 'User not found'});
      }
      res.json({message: 'User deleted', data: userToDelete});
    } catch(err){
      res.status(500).json(err);
    }
  }
};
