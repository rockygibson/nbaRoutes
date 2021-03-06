var app = angular.module('nbaRoutes');

app.controller('teamCtrl', function($scope, $routeParams, teamService, teamData) {

    $scope.teamData = teamData;
    console.log($scope.teamData)
    $scope.newGame = {};
    $scope.showNewGameForm = false;

    $scope.toggleNewGameForm = function() {
        $scope.showNewGameForm = !$scope.showNewGameForm;
    }

    if ($routeParams.team === 'utahjazz') {
        $scope.homeTeam = 'Utah Jazz';
        $scope.logopath = 'images/jazz-logo.png';
    } else if ($routeParams.team === 'losangeleslakers') {
        $scope.homeTeam = 'Los Angeles Lakers';
        $scope.logopath = 'images/lakers-logo.png';
    } else if ($routeParams.team === 'miamiheat') {
        $scope.homeTeam = 'Miami Heat';
        $scope.logopath = 'images/heat-logo.png';
    }
    console.log($scope.homeTeam);
    $scope.submitGame = function() {
        $scope.newGame.homeTeam = $scope.homeTeam.split(' ').join('').toLowerCase();
        teamService.addNewGame($scope.newGame).then(function() {
            teamService.getTeamData($scope.newGame.homeTeam).then(function(results) {
                $scope.teamData = results;
                $scope.newGame = {};
                $scope.showNewGameForm = false;
            })
        })
    }

});
