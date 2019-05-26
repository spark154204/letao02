$(function () {
  // 登录拦截功能
  if (location.href.indexOf('login.html') == -1) {
    // 没有找到地址栏的地址,去后端查询是否登录
    $.ajax({
      type: 'get',
      url: '/employee/checkRootLogin',
      dataType: 'json',
      success: function (info) {
        if (info.success) {
        }
        if (info.error === 400) {
          // 进行拦截, 拦截到登录页
          location.href = "login.html";
        }
      }
    })
  }
  $('.icon_menu').on('click', function () {
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
    $('.lt_topbar').toggleClass('hidemenu');
  });

  // 二级功能分页
  $('.category').click(function () {
    $(this).next().stop().slideToggle();
  })

  // 模态框
  $('.icon_logout').click(function () {
    $('#logoutModel').modal('show')
  })

  // 退出按钮
  $('#logout_modal').click(function () {
    $.ajax({
      dataType: 'json',
      url: '/employee/employeeLogout',
      success: function (info) {
        if (info.success) {
          window.location.href = './login.html'
        }
      }
    })
  }
  )
})