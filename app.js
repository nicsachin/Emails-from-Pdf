const app = require('express')()
const upload = require('express-fileupload')
const textract = require('textract')
const fs = require('fs')

app.use(upload())

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/views/index.html')
})

app.post('/',(req,res)=>{
    const file = req.files.file
    const name = file.name
      file.mv("./uploads/data.pdf",(err)=>{})
    res.redirect('/job')

})

app.get('/job',(req,res)=>{
   let writeData = fs.createWriteStream('./result/result.txt')

   let all="################\n"
    textract.fromFileWithPath('./uploads/data.pdf',{preserveLineBreaks:true}, function( error, text ) {
        if(!error)
        {
             //console.log(text)
            const patt = /\w+@\w+.[a-z]{2,3}/gi
            let result ;
            let count =0;
            while((result=patt.exec(text))!==null)
            {  count++

                all+=count+' = '+result[0]+'\n'
            }
           writeData.write(all)
            const filename = __dirname+'/result/result.txt'
            res.contentType('text/plain');
           // res.send('This is the content', { 'Content-Disposition': 'attachment; filename='+filename=});
           res.sendFile(__dirname+'/result/result.txt')
          //console.log(all)
        }
    })
})

//server

const port = 3000 || process.env.PORT
app.listen(port,()=>console.log('server started'))