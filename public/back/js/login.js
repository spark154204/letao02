$(function () {
  // 1.进行表单校验,用户名或密码不能为空,且密码必须是6-12位

  $('#form').bootstrapValidator({
    message: 'This value is not valid',
    feedbackIcons: {/*input状态样式图片*/
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'

    },
    fields: {/*验证：规则*/
      username: {//验证input项：验证规则
        message: 'The username is not valid',
        validators: {
          notEmpty: {//非空验证：提示消息
            message: '用户名不能为空'
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          threshold: 6, //有6字符以上才发送ajax请求，（input中输入一个字符，插件会向服务器发送一次，设置限制，6字符以上才开始）
          regexp: {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message: '用户名由数字字母下划线和.组成'
          }
        }
      },
      password: {
        message: '密码无效',
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 10,
            message: '用户名长度必须在6到10之间'
          },
          identical: {//相同
            field: 'password', //需要进行比较的input name值
            message: '两次密码不一致'
          },
          different: {//不能和用户名相同
            field: 'username',//需要进行比较的input name值
            message: '不能和用户名相同'
          },
          regexp: {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message: 'The username can only consist of alphabetical, number, dot and underscore'
          },
          callback: {
            message: '密码错误',
          }
        }
      },
    }
  })

    // 检验成功之后发送ajax请求
    .on('success.form.bv', function (e) {//点击提交之后
      e.preventDefault();
      $.ajax({
        type: 'post',
        url: '/employee/employeeLogin',
        dataType: 'json',
        data: $('#form').serialize(),

        success: function (info) {
          if (info.success) {
            location.href = 'index.html';
          };
          if (info.error === 1001) {
            $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
          }
        }
      })
    });
})