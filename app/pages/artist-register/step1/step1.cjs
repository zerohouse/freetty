app.controller('artist.register.step1', function ($scope, condition) {

    $scope.jobTypes = [];
    $scope.jobTypes.push({value: 'free', name: '프리랜서'});
    $scope.jobTypes.push({value: 'owner', name: '오너'});
    $scope.jobTypes.push({value: 'contract', name: '계약직'});
    $scope.jobTypes.push({value: 'regular', name: '정직원'});
    $scope.jobTypes.push({value: 'shopinshop', name: '샵인샵'});
    $scope.jobTypes.push({value: 'step', name: '스탭'});

});