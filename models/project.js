const mongoose        = require(`mongoose`);

const imageSchema = new mongoose.Schema({
    img:String,
    description:String,
});

const image = mongoose.model("Image", imageSchema);

const projectSchema = new mongoose.Schema({
    title:String,
    description:String,
    images:[imageSchema]
});

module.exports = mongoose.model("Project", projectSchema);