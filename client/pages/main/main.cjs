app.controller('main', function ($scope) {


    $scope.services = [];


    $scope.services.push(new Service('qmffl', 1000));
    $scope.services.push(new Service('qmffl', 1000));
    $scope.services.push(new Service('qmffl', 1000));
    $scope.services.push(new Service('qmffl', 1000));
    $scope.services.push(new Service('qmffl', 1000));

    function Service(title, price) {
        this.title = title;
        this.price = price;
        this.photos = ["https://a1.muscache.com/ac/pictures/57356551/8aa5a6e4_original.jpg?interpolation=lanczos-none&size=x_medium&output-format=jpg&output-quality=70", "https://a0.muscache.com/ac/pictures/59911857/6b63927a_original.jpg?interpolation=lanczos-none&size=x_medium&output-format=jpg&output-quality=70", "https://a0.muscache.com/ac/pictures/59911868/d27f6f96_original.jpg?interpolation=lanczos-none&size=x_medium&output-format=jpg&output-quality=70", "https://a1.muscache.com/ac/pictures/59911879/772bc123_original.jpg?interpolation=lanczos-none&size=x_medium&output-format=jpg&output-quality=70", "https://a0.muscache.com/ac/pictures/57356553/a045c3c9_original.jpg?interpolation=lanczos-none&size=x_medium&output-format=jpg&output-quality=70", "https://a1.muscache.com/ac/pictures/57356559/c3896c13_original.jpg?interpolation=lanczos-none&size=x_medium&output-format=jpg&output-quality=70", "https://a1.muscache.com/ac/pictures/57356566/321cc1c5_original.jpg?interpolation=lanczos-none&size=x_medium&output-format=jpg&output-quality=70", "https://a2.muscache.com/ac/pictures/57356935/f8a67eb4_original.jpg?interpolation=lanczos-none&size=x_medium&output-format=jpg&output-quality=70", "https://a2.muscache.com/ac/pictures/57356576/ea748cf2_original.jpg?interpolation=lanczos-none&size=x_medium&output-format=jpg&output-quality=70", "https://a1.muscache.com/ac/pictures/57356939/b8de12ef_original.jpg?interpolation=lanczos-none&size=x_medium&output-format=jpg&output-quality=70", "https://a2.muscache.com/ac/pictures/57357143/63c220f0_original.jpg?interpolation=lanczos-none&size=x_medium&output-format=jpg&output-quality=70", "https://a2.muscache.com/ac/pictures/57357181/034d4596_original.jpg?interpolation=lanczos-none&size=x_medium&output-format=jpg&output-quality=70", "https://a0.muscache.com/ac/pictures/18588395/9f20858c_original.jpg?interpolation=lanczos-none&size=x_medium&output-format=jpg&output-quality=70", "https://a0.muscache.com/ac/pictures/57357489/52c6d4d0_original.jpg?interpolation=lanczos-none&size=x_medium&output-format=jpg&output-quality=70", "https://a1.muscache.com/ac/pictures/18937849/d0982d40_original.jpg?interpolation=lanczos-none&size=x_medium&output-format=jpg&output-quality=70", "https://a2.muscache.com/ac/pictures/19199717/6ea9e3ec_original.jpg?interpolation=lanczos-none&size=x_medium&output-format=jpg&output-quality=70", "https://a0.muscache.com/ac/pictures/57357508/93b39328_original.jpg?interpolation=lanczos-none&size=x_medium&output-format=jpg&output-quality=70"];
        this.provider = 'asdf';
    }


});