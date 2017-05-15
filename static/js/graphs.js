queue()
    .defer(d3.json, "/data")
    .await(makeGraphs);

function makeGraphs(error, recordsJson) {
	var records = recordsJson;
	//Create a Crossfilter instance
	var ndx = crossfilter(records);
	//Define Dimensions
	var continentDim = ndx.dimension(function(d) { return d["Continente"]; });
	var countryDim = ndx.dimension(function(d) { return d["Pais"]; });
	var stateDim = ndx.dimension(function(d) { return d["Estado"]; });
	var typeDim = ndx.dimension(function(d) { return d["Tipo"]; });
	var yearDim = ndx.dimension(function(d) { return d["Ano"]; });
	var monthDim = ndx.dimension(function(d) { return d["Mês"]; });
	var numberDim = ndx.dimension(function(d) { return d["Chegadas"]; });
	var allDim = ndx.dimension(function(d) {return d;});

	//Group Data
	var continentGroup = continentDim.group().reduceSum(function(d) {return d["Chegadas"];});
	var countryGroup = countryDim.group().reduceSum(function(d) {return d["Chegadas"];});
	var stateGroup = stateDim.group().reduceSum(function(d) {return d["Chegadas"];});
	var typeGroup = typeDim.group().reduceSum(function(d) {return d["Chegadas"];});
	var yearGroup = yearDim.group().reduceSum(function(d) {return d["Chegadas"];});
	var monthGroup = monthDim.group().reduceSum(function(d) {return d["Chegadas"];});
	var numberGroup = numberDim.group();
	var numbers = ndx.groupAll().reduceSum(function(d) {return d["Chegadas"];});
    
	function getTops(source_group) {
    return {
        all: function () {
            return source_group.top(5);
        }
    };
	};
	countryGroup5 = getTops(countryGroup);

	//Define values (to be used in charts)
	var minDate = yearDim.bottom(1)[0]["Ano"];
	var maxDate = yearDim.top(1)[0]["Ano"];


    //Charts
	var timeChart = dc.barChart("#time-chart");
	var continentChart = dc.rowChart("#continent-row-chart");
	var countryChart = dc.rowChart("#country-row-chart");
	var stateChart = dc.rowChart("#state-row-chart");
	var typeChart = dc.rowChart("#type-row-chart");
	var monthChart = dc.rowChart("#month-row-chart");
	var numberChart = dc.numberDisplay("#number-tourists");
	var topCountryChart = dc.pieChart("#top-5-countries");
	
	timeChart
		.width(650)
		.height(250)
		.margins({top: 10, right: 50, bottom: 30, left: 80})
		.dimension(yearDim)
		.group(yearGroup)
		.transitionDuration(500)
		.x(d3.time.scale().domain([1989, 2016]))
		.elasticY(true)
		.yAxis().ticks(6);

	continentChart
        .width(400)
        .height(250)
        .dimension(continentDim)
        .group(continentGroup)
		.colors("#7F97E0")
        .ordering(function(d) { return -d.value })
        .elasticX(true)
        .xAxis().ticks(4);

	countryChart
        .width(300)
        .height(800)
        .dimension(countryDim)
        .group(countryGroup5)
		.colors("#7F97E0")
        .ordering(function(d) { return -d.value })
        .elasticX(true)
        .xAxis().ticks(4);
	
	topCountryChart
		.width(600)
		.height(240)
		.slicesCap(5)
		.innerRadius(30)
		.drawPaths(true)
		.colors(d3.scale.category10())
		.externalRadiusPadding(30)
		.dimension(countryDim)
		.group(countryGroup5)
		.legend(dc.legend())
		.on('pretransition', function(chart) {
			chart.selectAll('text.pie-slice').text(function(d) {
				return d.data.key;
			})
		});
			
	topCountryChart.on('pretransition', function(chart) {
          chart.selectAll('.dc-legend-item text')
              .text('')
            .append('tspan')
              .text(function(d) { return d.name; })
            .append('tspan')
              .attr('x', 150)
              .attr('text-anchor', 'end')
              .text(function(d) { return d.data; });
    });
	
	stateChart
		.width(350)
		.height(550)
        .dimension(stateDim)
        .group(stateGroup)
		.colors("#7F97E0")
        .elasticX(true)
        .labelOffsetY(10)
        .xAxis().ticks(4);

	typeChart
		.width(300)
		.height(240)
        .dimension(typeDim)
        .group(typeGroup)
		.colors("#7F97E0")
        .ordering(function(d) { return -d.value })
        .elasticX(true)
        .xAxis().ticks(4);

    monthChart
    	.width(200)
		.height(510)
        .dimension(monthDim)
        .group(monthGroup)
		.colors("#7F97E0")
        .ordering(function(d) { return -d.value })
        .colors(['#6baed6'])
        .elasticX(true)
        .labelOffsetY(10)
        .xAxis().ticks(4);

	numberChart
		.formatNumber(d3.format("d"))
		.valueAccessor(function(d){return d; })
		.group(numbers);	
		
	dcCharts = [timeChart, continentChart, stateChart, typeChart, monthChart, numberChart];

	dc.renderAll();

};