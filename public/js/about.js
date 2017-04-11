

var ctxWeb = document.getElementById("myWebChart");
var ctxLow = document.getElementById("myLowChart");
var ctxOthers = document.getElementById("myOthersChart");
var myChartWeb = new Chart(ctxWeb, {
    type: 'doughnut',
    data: {
        labels: [
            "C#",
            "XAML",
            "MEF"
        ],
        datasets: [
            {
                data: [300, 50, 100,200],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }],
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }
});
var myChartLow = new Chart(ctxLow, {
    type: 'doughnut',
    data: {
        labels: [
            "Angular2",
            "Node js",
            "Typescript",
            "Gulp"
        ],
        datasets: [
            {
                data: [300, 50, 100,200],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }],
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }
});
var myChartOthers = new Chart(ctxOthers, {
    type: 'doughnut',
    data: {
        labels: [
            "C#",
            "Linux Embedded",
            "XAML",
            "C C++",
            "Node js",
            "MVVM",
            "Typescript"
        ],
        datasets: [
            {
                data: [300, 50, 100,200],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }],
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }
});

