const textract = require('textract')

    textract.fromFileWithPath('./myfile2.pdf',{preserveLineBreaks:true}, function( error, text ) {
        if(!error)
        {
        const patt = /\w+@\w+.\w+/gi
        let result ;
        while((result=patt.exec(text))!==null)
        {
            console.log(result[0])
        }


    }
})


  // const str = " my id is nic@gmail.com and abc@mail.com";
  // const patt = /\w+@\w+.\w+/gi
  // let result ;
  // while((result=patt.exec(str))!==null)
  // {
  //     console.log(result[0])
  // }

