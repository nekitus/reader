var mongoose = require('mongoose');
var blobSchema = new mongoose.Schema({
    name: String,
    data: [Number]
});
mongoose.model('Symbol', blobSchema);