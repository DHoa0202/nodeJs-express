console.log('AngularJS start');

const app = angular.module('app', ['ngRoute']);
const serverIO = location.origin;
moment.locale('vi');

app.filter('dateRelative', () => {
    return (date, format) => `${moment(date).format(format)} (${moment(date).fromNow()})`
})

app.directive('convertToNumber', () => {
    return {
        require: 'ngModel',
        link: (s, e, a, ngModel) => {
            ngModel.$parsers.push((val) => val != null ? parseInt(val, 10) : null);
            ngModel.$formatters.push((val) => val != null ? '' + val : null);
        }
    };
});

app.controller('control', ($scope, $http) => {

    $scope.read = (e, to) => $scope[to || 'entity'] = angular.copy(e);
    $scope.clear = (e) => {
        if (!e) return
        let keys = Object.keys(e);
        for (k of keys) e[k] = undefined;
    }

    // get data
    $scope.get = (path, to) => $http
        .get(util.getLink(serverIO, 'api', path))
        .then(r => $scope[to || 'data'] = r.data)
        .catch(e => console.error(e))
    // .finally(() => console.log($scope[to || 'data']))

    $scope.post = (e, to, id, path) => $http
        .post(util.getLink(serverIO, 'api', path || to), e)
        .then(r => $scope[to].unshift(r.data))
        .catch(err => console.log(err))
        .finally(() => $scope.clear(e));

    $scope.put = (e, to, id, path) => $http
        .put(util.getLink(serverIO, 'api', path || to), e)
        .then(r => util.update($scope[to], r.data, id))
        .catch(err => console.log(err))
        .finally(() => $scope.clear(e));

    $scope.delete = (value, to, id, path) => $http
        .delete(util.getLink(serverIO, 'api', path || to, value))
        .then(_r => util.delete($scope[to], value, id))
        .catch(err => console.log(err))
        .finally(() => $scope.clear(e));

    // get first data list
    (async (...getTo) => {
        for (to of getTo)
            if (typeof (to) == 'string') await $scope.get(to);
            else {
                let keys = Object.keys(to)
                for (k of keys) await $scope.get(to[k], k);
            };
    })('products', { cates: 'categories' })

});