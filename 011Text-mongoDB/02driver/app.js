const MongoClient = require('mongodb').MongoClient
const uri = "mongodb://127.0.0.1:27017"
const dbName = 'it'


const client = new MongoClient(uri, { useUnifiedTopology: true })
//链接数据库
client.connect(err => {
	if(err){
	 	console.log('connect db error')
	 	throw err
	}
	console.log('connect db success')
	//创建数据库
	const db = client.db(dbName)
	// console.log(db)
	//切换数据库，没有新建
	const collection = db.collection('user')
	//创建集合
	//新增
	/*
	collection.insertMany([{name:"mary",age:18},{name:"mike",age:40}],(err,docs)=>{
		if (err) {
			console.log('insert err',err)
		}else{
			console.log(docs)
		}
		client.close()
	})
	*/
	//查询
	/*
	collection.find({age:{$lt:20}}).toArray((err,docs)=>{
		if (err) {
			console.log('find err',err)
		}else{
			console.log(docs)
		}
		client.close()
	})
	*/
	//修改
	/*
	collection.updateOne({name:"kangkang"},{$set:{age:22}},(err,docs)=>{
		if (err) {
			console.log('find err',err)
		}else{
			console.log(docs)
		}
		client.close()
	})
	*/
	//删除
	collection.deleteOne({name:"kangkang"},{$set:{age:22}},(err,docs)=>{
		if (err) {
			console.log('find err',err)
		}else{
			console.log(docs)
		}
		client.close()
	})
})