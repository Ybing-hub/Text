const express = require('express')
const app = express()
const swig = require('swig')
app.use(express.static('public'))
//开发阶段设置不走缓存
swig.setDefaults({
  cache: false
})
//配置应用模板
app.engine('html', swig.renderFile);
//配置模板的存放目录
app.set('views', './views')
//注册模板引擎
app.set('view engine', 'html')
app.get('/',(req,res)=>{
    //4.渲染模板
    //第一个参数是相对于模板目录的文件
    //第二个参数是传递给模板的数据
    res.render('index',{
        title:'跨猪网',
        content:'我是内容',
        age:19,
        names:['tom','mary','jane','kangkang']
    })
})


app.listen(3000,()=>console.log('express listen 3000'))