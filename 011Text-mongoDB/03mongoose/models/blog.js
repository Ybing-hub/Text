const mongoose = require('mongoose')


const BlogSchema = new mongoose.Schema({
	title:"dome 1",
	content:"content content content",
	Auther{
			type:mongoose.Schema.Types.ObjectId
	}
})
const BlogModel = mongoose.model('blog', BlogSchema)


module.exports = BlogModel