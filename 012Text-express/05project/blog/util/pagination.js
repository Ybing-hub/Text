/*
 options{
	page页码数
	model文档模型
	query查询条件
	projection显示字段
	sort排序方式
 }

 */


async function pagination(options){
	const limit = 3
	let { page,model,query,projection,sort} = options

	if (isNaN(page)) {
		page = 1
	}
	if (page == 0) {
		page = 1
	}

	const count = await model.countDocuments()
	let pages = Math.ceil(count / limit)
	if (page > pages) {
		page = pages
	}
	if (pages == 0) {
		pages = 1
	}
	let list = []
	for(let i = 1;i<=pages;i++){
		list.push(i)
	}
	let skip = (page-1)*limit

 	const docs = await model.find(query,projection).sort(sort).skip(skip).limit(limit)
	
	return {
		docs:docs,
		page:page,
		list:list,
		pages:pages
	}
}

module.exports = pagination