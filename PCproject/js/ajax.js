function ajaxFun(){
    $.ajax({
        //地址
        url:'https://free-api.heweather.net/s6/weather?location=taiyuan&key=ae91f53c153b4dd8ac7fb6394f2c4660',
        //get/post/put
        type:"get",
        //是否异步，true是
        async:false,
        //传参
        data:{
            name:"zhangdan",
            pwd:"123456"
        },
        //传xml格式数据，防止数据转换
        processData:false,
        //接口返回执行方法 complete不管成不成功都执行
        success:function(res){
            /*
            {
                code:200/404/500,
                msg:"更新成功，服务器内部错误",
                data:{}/[]
            }
            */
           console.log('成功=====',res)
        },
        error:function(err){
            console.log('失败====',err);
        }




    })

}