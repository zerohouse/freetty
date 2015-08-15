app.controller('main', function ($scope, req, $timeout, param, $state, query) {

    $scope.search = function (keywords) {
        if (keywords == undefined || keywords == '') {
            $state.go('search');
            return;
        }
        if (keywords.constructor == Array) {
            query.keywords = keywords;
            $state.go('search');
            return;
        }
        query.keywords = [];
        query.keywords.push(keywords);
        $state.go('search');
    };


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


});