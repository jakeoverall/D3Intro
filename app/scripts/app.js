var data = [200, 30, 200, 30, 200, 10, 20, 14, 78];
var width = 400,
    height = 200,
    margin = 50,
    dotSize = 3;


var svg = d3.select('body').append('svg')
    .attr('width', width + margin*2)
    .attr('height', height + margin*2)
    .append('g')
    .attr('transform', 'translate(' + margin + ',' + margin + ')');

var scaleX = d3.scale.linear()
    .range([0, width])
    .domain([0, data.length - 1]);

var x = function (d, i) { return scaleX(i); };


var scaleY = d3.scale.linear()
    .range([height, 0])
    .domain(d3.extent(data));
var y = function (d) { return (scaleY(d)); };

var xAxis = d3.svg.axis()
    .scale(scaleX)
    .orient('bottom');

svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

var yAxis = d3.svg.axis()
    .scale(scaleY)
    .orient('left');

svg.append('g')
    .attr('class', 'axis')
    .call(yAxis);

function update() {
    var circles = svg.selectAll('circle').data(data);

    circles.enter()
        .append('circle')
        .attr({
            fill: '#f00',
            cx: x,
            cy: y,
            r: function (d) { return dotSize; }
        });

    var line = d3.svg.line()
        .interpolate('basis')
        .x(x)
        .y(y);

    svg.append('path')
        .datum(data)
        .attr({
            'fill': 'none',
            'stroke-width': 2,
            stroke: '#404',
            d: line
        });

}

update();