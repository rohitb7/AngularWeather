'use strict';

angular.module('desktopApp')
    .controller('MainCtrl', function($scope, $timeout, $interval) {

        //x is time
        //y is temperature

        $scope.data2 = [{ x: 0, y: 0, img: "images/cloudy/png" }]; // array for dataPoints
        $scope.chart2 = new CanvasJS.Chart("chartContainer2", {
            title: {
                text: "Santa Clara Temperature (AngularJS)"
            },
            axisY: {
                title: "Temperature in °F",
            },
            axisX: {
                title: "Time in Hours (1 sec = 1hour)",
            },
            data: [{
                type: "line",
                dataPoints: $scope.data2
            }]
        });
        ///Mean Calculate
        ///Mean Calculate
        function calculateMean() {
            var mean = 0;
            for (var j = 0; j < $scope.data2.length; j++) {
                mean = mean + $scope.data2[j].y;
            }
            return mean = ((mean / 24).toFixed(2));
        }
        ///Lowest Temperature Calculation
        ///Lowest Temperature Calculation
        function calculateLowestTemp() {
            var lowTemp = 1111111111111;
            for (var l = 0; l < $scope.data2.length; l++) {
                if ($scope.data2[l].y < lowTemp) {
                    lowTemp = $scope.data2[l].y;
                }
            }
            return lowTemp.toFixed(2);
        }


        ///Highest Temperature Calculation
        ///Highest Temperature Calculation
        function calculateHighestTemp() {
            var highTemp = 0;
            for (var h = 0; h < $scope.data2.length; h++) {
                if ($scope.data2[h].y > highTemp) {
                    highTemp = $scope.data2[h].y;
                }
            }
            return highTemp.toFixed(2);
        }



        $scope.meanArray = [];
        var dataLength = 24;
        var days = 0;
        var hours = 0;

        function updateSantaClara() {
            $scope.days = days;
            $scope.hours = hours;

            if ($scope.data2.length == 24) { ///after 24 hours
                $scope.finalMean = calculateMean();
                $scope.finalLowestTemp = calculateLowestTemp();
                $scope.finalHighestTemp = calculateHighestTemp();
            };

            if (hours == 24) {

                days++;
                hours = 0;
                $scope.data2.length = 1;

                //Change images upon mean
                var imgBackground;
                if ($scope.finalMean < 7) {
                    imgBackground = 'images/cold.png';
                } else if (($scope.finalMean >= 7) && ($scope.finalMean <= 9)) {
                    imgBackground = 'images/cloudy.png';
                } else {
                    imgBackground = 'images/Sunnyicon.png';
                }

                $scope.meanArray.push({ day: days, mean: $scope.finalMean, lowTemp: $scope.finalLowestTemp, highTemp: $scope.finalHighestTemp, img: imgBackground });

            }
            //Generate random data
            //Generate random data
            for (var i = 0; i < $scope.data2.length; i++) {
                var z = Math.floor((Math.random() * 15) + 1); //increase or decrease by 
                var decider = ((Math.random() * 1) + 1);
            }
            //Decide whether to add or to substract
            if (decider > 1.5) {
                z = z + decider;
            } else {
                z = z - decider;
            }

            hours++;
            $scope.data2.push({
                x: hours,
                y: z,
                img: imgBackground
            });

            //Shift data when 24 (1 hour is reached)   
            //Shift data when 24 (1 hour is reached)            
            if ($scope.data2.length > dataLength) {
                $scope.data2.shift();
            }

            $scope.chart2.render();

        };

        // generates first set of dataPoints
        updateSantaClara(dataLength);

        $scope.newest = function() {
            $scope.meanArray.length = 0;
        }

        $scope.reset = function() {
            $scope.meanArray.length = 0;
            $scope.data2 = [{ x: 0, y: 0, img: "images/cloudy/png" }];
            $scope.days = 0;
            console.log($scope.days);
            $scope.hours = 0;
            console.log($scope.hours);
            dataLength = 0;
        }


        var stopTimer;

        $scope.start = function() {
            stopTimer = $interval(updateSantaClara, 1000);
        };


        $scope.stop = function() {
            $interval.cancel(stopTimer);

        };

        $scope.$on('$destroy', function() {
            $scope.stop();
        });


    });
