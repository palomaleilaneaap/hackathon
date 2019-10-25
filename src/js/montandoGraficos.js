var chart = am4core.create("chartdiv", am4charts.PieChart);
    
chart.data = this.data; 

// Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "nota";
    pieSeries.dataFields.category = "avaliacao";

//  -------------------------------------------------------------------------------------
    // create chart
    var chart2 = am4core.create("chartdiv2", am4charts.GaugeChart);

    chart2.innerRadius = -15;

    var axis = chart2.xAxes.push(new am4charts.CategoryAxis());
    axis.dataFields.category = "category";
    axis.data = this.dataChart2;
    axis.renderer.labels.template.location = 0.5;
    axis.renderer.grid.template.location = 0.5;
    axis.startLocation = 0.5;
    axis.endLocation = 0.5;

    var colorSet = new am4core.ColorSet();

    var range0 = axis.axisRanges.create();
    range0.category = "1";
    range0.endCategory = "6";
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(0);
    range0.axisFill.zIndex = -1;
    range0.locations.category = 0.5;
    range0.locations.endCategory = 0.5;
    range0.label.text = "";
    range0.grid.disabled = true;

    var range1 = axis.axisRanges.create();
    range1.category = "6";
    range1.endCategory = "9";
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(1);
    range1.axisFill.zIndex = -1;
    range1.locations.category = 0.5;
    range1.locations.endCategory = 0.5;
    range1.label.text = "";
    range1.grid.disabled = true;

    var range2 = axis.axisRanges.create();
    range2.category = "9";
    range2.endCategory = "10";
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = colorSet.getIndex(2);
    range2.axisFill.zIndex = -1;
    range2.locations.category = 0.5;
    range2.locations.endCategory = 0.5;
    range2.label.text = "";
    range2.grid.disabled = true;

    var hand = chart2.hands.push(new am4charts.ClockHand());
    hand.value = "3";
