const { User } = require("../models");

module.exports = {
    async addFriend(req, res){
        try{
            const userId = req.params.id;
            const friendId = req.params.friendId;
            const newFriend = await User.findByIdAndUpdate(userId, {$push: {friends: friendId}}, {new: true});
            res.json({message: 'Friend added', data: newFriend});
        } catch (err){
            res.status(500).json(err);
        }
    },
};