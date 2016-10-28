console.log('6.1');

//First, append <svg> element and implement the margin convention
var m = {t:50,r:50,b:50,l:50};
var outerWidth = document.getElementById('canvas').clientWidth,
    outerHeight = document.getElementById('canvas').clientHeight;
var w = outerWidth - m.l - m.r,
    h = outerHeight - m.t - m.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width',outerWidth)
    .attr('height',outerHeight)
    .append('g')
    .attr('transform','translate(' + m.l + ',' + m.t + ')');



//step 1 - Import data 
d3.csv('../data/olympic_medal_count.csv',parse, function(err, dataLoaded){
	console.table(dataLoaded);

//data mining 

    var minX = d3.min(dataLoaded, function(table){return table.year3}),
	    maxX = d3.max(dataLoaded, function(table){return table.year3});

	console.log(minX, maxX);

// scale 

	var scaleY = d3.scaleLinear()
	.domain ([minX, maxX])
	.range([h,0]); 

    var scaleX = d3.scaleLinear()
    .domain([0,0])
    .range([0,w]);

// axis

	var axisY = d3.axisLeft()
	.scale(scaleY)
	.tickSize(-w);


	

// step 3 - sort array 

   var array = dataLoaded.sort(function(a,b) { 
   	   return b.year3 - a.year3;

   	     });


    var newarr = array.slice(0,5);

    console.table(newarr);
// step 4 - represent 

var bar = plot.selectAll('rect')
        .data(newarr)
        .enter()
        .append('rect')
        .attr('width', 40)
        .attr('height', function(d) { console.log(d.year3, scaleY(d.year3)); return h-scaleY(d.year3); })
        .attr('x', function(d, i) { return i*200; })
        .attr('y', function(d) { return scaleY(d.year3); })
        .style('fill-opacity', 0.8);

        var axisNode = plot.append('g') 
        .attr('class','axis')
        .attr('transform','translate(' + '-'+ 30 + ',' + 0 + ')')

       axisY(axisNode);

       var axisNode = plot.append('g') 
        .attr('class','axis')
        .attr('transform','translate(' + '-'+ 30 + ',' + 0 + ')')

       axisX(axisNode);


});

// add text 



// console.table(dataLoaded);
//callback refers back to the function

//step 1 - parsing

function parse(table) {

	return{
		countryName: table['Country'],
		year1   : +table['1900'],
		year2   : +table['1960'],
		year3   : +table['2012'],



	};

}
