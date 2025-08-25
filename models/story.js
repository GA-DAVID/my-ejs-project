const mongoose = require('mongoose'); //---🦦


//create our story schema blueprint
const storySchema = mongoose.Schema({
    title: { type: String, required: true},
    storyText: {type: String, required: true},
    image: { type: String, required: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})


//Before sending back the story object, please query for the story.author to fill it with the user object instead of only the user's id
storySchema.pre(['findOne', 'find',], function (next) {
    this.populate('author');
    next();
});

const Story = mongoose.model("Story", storySchema, "stories");

module.exports = { Story };


