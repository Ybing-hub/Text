/*
 options{
	page页码数
	model文档模型
	query查询条件
	projection显示字段
	sort排序方式
	populates联合查询
 }

 */


async function pagination(options){
	const limit = 3
	let { page,model,query,projection,sort,populates} = options

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
	if (page == 0) {
		page = 1
	}
	let list = []
	for(let i = 1;i<=pages;i++){
		list.push(i)
	}
	let skip = (page-1)*limit
	let result = model.find(query,projection)
	if (populates) {
		populates.forEach(function(populate){
			return result.populate(populate)
		})
	}
 	const docs = await result.sort(sort).skip(skip).limit(limit)
	
	return {
		docs:docs,
		page:page,
		list:list,
		pages:pages
	}
}

module.exports = pagination