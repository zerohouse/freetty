app.controller('main', function ($scope, req, $timeout, param, $state) {

    document.body.addEventListener('click', function () {
        $scope.date = false;
        $scope.time = false;
    });

    $scope.query = {location: {}};


    var date = new Date(2015, 10, 1);
    $timeout(update, 500);

    function update() {
        var remain = new Date(date - new Date());
        $scope.remainDate = remain.getDate() + "d " + remain.getHours() + "h " + remain.getMinutes() + "m " + remain.getSeconds() + "s";
        $timeout(update, 500);
    }

    $(document).ready(function () {
        window.requestAnimationFrame(scroll);
        function scroll(tick) {
            var jWindow = $(window);
            var wHeight = jWindow.height();
            var eHeight = $('.portfolio-box-caption:eq(0)').height();
            var point1 = (wHeight - (eHeight / 2.5)) / 2 + eHeight * 0.2;
            var point2 = point1 + eHeight / 5 + eHeight * 0.2;

            $('.portfolio-box-caption').each(function (i) {
                var element = $(this);
                var clientTop = element.offset().top - jWindow.scrollTop();
                var clientBottom = clientTop + eHeight;
                if (clientTop < point2) {
                    element.addClass('showing');
                }
                if (clientBottom < point1) {
                    element.removeClass('showing');
                }
                if (clientTop > point2) {
                    element.removeClass('showing');
                }
            });
            window.requestAnimationFrame(scroll);
        }
    });

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

    $scope.search = function () {
        param.setParam($scope.query);
        $state.go('search');
    }


});