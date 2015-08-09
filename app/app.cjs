var app = angular.module('freetty',
    [
        'ui.router',
        'ngAnimate',
        'ngFileUpload',
        'ngSanitize',
        'colorpicker.module',
        'wysiwyg.module',
        'mp.datePicker',
        'ui.slider',
        'duScroll',
        'anim-in-out'
    ]);

app.value('duScrollOffset', 50);