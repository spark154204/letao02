
$(function () {
  // 进入页面,进行首页数据渲染
  render();
  function render() {
    $.ajax({
      url: '/user/queryUser',
      data: {
        page: 1,
        pageSize: 10,
      },
      success: function (info) {
        console.log(info);
        
        var htmlStr = template('tpl', info);
        $('.lt_content tbody').html(htmlStr);
      }
    })
  }
  // 启用禁用模态框
  $('.lt_content tbody').on('click', '.btn', function () {
    $('#userModal').modal('show');
    //判断用户data-id是启用还是禁用
    var id = $(this).parent().data('id');
    var isDelete = $(this).hasClass('btn-success') ? 1 : 0;
      // 当用户点击确定模态框后
  $('#submitBtn').off('click').on('click', function () {
    // 发送ajax请求
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data:{
        id,
        isDelete
      },
      success:function(info){
        if(info.success){
          $('#userModal').modal("hide");
          render()
          }
     
      }
    })
  })
  });

})