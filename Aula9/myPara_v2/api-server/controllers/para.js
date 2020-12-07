// Paragraph controller ----------------------

var mongoose = require('mongoose');
var Paragraph = require('../models/para');

//Returns list of paragraphs
module.exports.list = () => {
    return Paragraph.find().exec();
}

//Returns a paragraph record
module.exports.lookUp = id => {
    return Paragraph.findOne({ _id: id }).exec();
}

//Inserts new paragraph
module.exports.insert = p => {
    console.log(JSON.stringify(p));
    var newParagraph = new Paragraph(p);
    return newParagraph.save();
}

//Deletes a paragraph
module.exports.remove = id => {
    return Paragraph.deleteOne({_id: id});
}

//Changes a paragraph
module.exports.edit = (id, p) => {
    return Paragraph.findByIdAndUpdate(id, p, {new: true})
}
