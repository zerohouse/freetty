app.controller('main', function ($scope, req, $timeout, param, $state) {

    document.body.addEventListener('click', function () {
        $scope.date = false;
        $scope.time = false;
    });

    $scope.query = {location: {}};


    var date = new Date(2015, 9, 1);
    $timeout(update, 500);

    function update() {
        var remain = new Date(date - new Date());
        var sec = remain / 1000;
        var min = sec / 60;
        var hours = min / 60;
        var days = hours / 24;
        $scope.remainDate = parseInt(days) + "d " + parseInt(hours) % 24 + "h " + parseInt(min) % 60 + "m " + parseInt(sec) % 60 + "s";
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