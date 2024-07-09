const { Thought, User } = require("../models");

module.exports = {
  //Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  // Get single thought
  async getSingleThought(req, res){
    try{
      const thoughtId = req.params.id;
      const thought = await Thought.findById(thoughtId);
      if(!thought){
        return res.status(404).json({message: 'Thought not found'});
      }
      res.json(thought);
    } catch (err){
      res.status(500).json({message: err.message});
    }
  },
  // Create thought
  async createThought(req, res){
    try{
      const userId = req.body.userId;
      const thought = await Thought.create(req.body);
      await User.findByIdAndUpdate(userId, {$push: {thoughts: thought._id}}, {new: true});
      res.json({message: 'Thought created successfully', data: thought});
    } catch(err){
      res.status(500).json({message: err.message});
    }
  },
  // Update thought
  async upateThought(req, res){
    try{
      const thoughtId = req.params.id;
      const thoughtUpdated = await Thought.findByIdAndUpdate(thoughtId, req.body, {new:true});
      if(!thoughtUpdated){
        return res.status(404).json({message: 'Thought not found'});
      }
      res.json({message: 'Thought updated', data: thoughtUpdated});
    } catch(err){
      res.status(500).json({message: erro.message});
    }
  },
  // Delete thought
  async deleteThought(req, res){
    try{
      const thoughtId = req.params.id;
      const deletedThought = await Thought.findByIdAndDelete(thoughtId);
      if(!deletedThought){
        return res.status(404).json({message: 'Thought not found'});
      }
      res.json({message: 'Thought deleted', data: deletedThought})
    } catch(err){
      res.status(500).json({message: err.message});
    }
  }
};
