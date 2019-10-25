<template>
  <div id="app">
    <div class="container-fluid">
      <div class="content">
        <div class="row">
          <h1 class="col-md-10">Dashboard de satisfação do cliente</h1>
          <div class="col-md-2">
            <button class="fil" v-on:click="greet">
              <img :src="filtro" alt="">
            </button>
          </div>
        </div>
         <div class="filterSection row">
          <p class="w-100 mb-4">Filtrar por:</p>
          <div class="col-md-3 mb-3 ">
            <div class="form-group bla">
              <label for="pesquisa">Período</label>
              <button v-on:click="periodoFiltro('ULTIMOS_TRINTA_DIAS')" class="per">30 dias</button>
              <button v-on:click="periodoFiltro('ULTIMOS_SETE_DIAS')" class="per">7 dias</button>
              <button v-on:click="periodoFiltro('HOJE')" class="per">Hoje</button>
            </div>
          </div>
         
        </div>
      </div>
    </div>
    
      <div class="container-fluid">
        <div class="content">
          <!-- <h2>Relatórios por pesquisa</h2> -->
          <!--  -->
          <div class="" v-for="formulario in data" v-bind:key="formulario.id">
            <div class="card">
              <h3>{{formulario.descricao}}</h3>
              <div class="row cust" v-for="pergunta in formulario.perguntas" v-bind:key="formulario.id + pergunta.id">
                <div class="col-md-6 containerPergunta">
                  <p>{{pergunta.descricao}}</p>
                  <div class="containResposta" v-on:click="grafs(pergunta.resultado, formulario.id + pergunta.id)">
                    <div class="chartDiv" :id="formulario.id + pergunta.id">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>


// import VueMultiSelect from "vue-simple-multi-select";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import filtro from '../public/filter.svg'
import axios from 'axios'
import $ from 'jquery'



const URL = 'http://localhost:8080/api/dashboard'



am4core.useTheme(am4themes_animated);

export default {
  components: {
    // VueMultiSelect,
  },
  data() {
    return {
      data: '',
     
      filtro: filtro,    
    }
  },
  mounted(){
   axios
    .get(URL, 
      { headers: { "Content-Type": 'application/json' } })
    .then(response => {
      this.data = response.data;
    })
    .catch((error) => {
      this.data = error;
    })
    // ------------
    // axios
    // .get(intervalos, 
    //   { headers: { "Content-Type": 'application/json' } })
    // .then(response => {
    //   this.intervalos = response.data;      
    // })
    // .catch((error) => {
    //   this.data = error
    // })
  

//  -------------------------------------------------------------------------------------
      // create chart
      // var chart2 = am4core.create("chartdiv2", am4charts.GaugeChart);

      // chart2.innerRadius = -15;

      // var axis = chart2.xAxes.push(new am4charts.CategoryAxis());
      // axis.dataFields.category = "category";
      // axis.data = this.dataChart2;
      // axis.renderer.labels.template.location = 0.5;
      // axis.renderer.grid.template.location = 0.5;
      // axis.startLocation = 0.5;
      // axis.endLocation = 0.5;

      // var colorSet = new am4core.ColorSet();

      // var range0 = axis.axisRanges.create();
      // range0.category = "1";
      // range0.endCategory = "6";
      // range0.axisFill.fillOpacity = 1;
      // range0.axisFill.fill = colorSet.getIndex(0);
      // range0.axisFill.zIndex = -1;
      // range0.locations.category = 0.5;
      // range0.locations.endCategory = 0.5;
      // range0.label.text = "";
      // range0.grid.disabled = true;

      // var range1 = axis.axisRanges.create();
      // range1.category = "6";
      // range1.endCategory = "9";
      // range1.axisFill.fillOpacity = 1;
      // range1.axisFill.fill = colorSet.getIndex(1);
      // range1.axisFill.zIndex = -1;
      // range1.locations.category = 0.5;
      // range1.locations.endCategory = 0.5;
      // range1.label.text = "";
      // range1.grid.disabled = true;

      // var range2 = axis.axisRanges.create();
      // range2.category = "9";
      // range2.endCategory = "10";
      // range2.axisFill.fillOpacity = 1;
      // range2.axisFill.fill = colorSet.getIndex(2);
      // range2.axisFill.zIndex = -1;
      // range2.locations.category = 0.5;
      // range2.locations.endCategory = 0.5;
      // range2.label.text = "";
      // range2.grid.disabled = true;

      // var hand = chart2.hands.push(new am4charts.ClockHand());
      // hand.value = "3";


//  -------------------------------------------------------------------------------------
    },

    methods:{
      greet: function () {
        $('.filterSection').slideToggle('fast');       
      },
      grafs: function (lista, iddiv) {
        var chart = am4core.create(iddiv, am4charts.PieChart);
    
        chart.data = lista; 
        chart.legend = new am4charts.Legend();
        
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "valor";
        pieSeries.dataFields.category = "totalNotas";
        pieSeries.labels.template.text = "nota: {valor}";
        pieSeries.legendSettings.labelText = "total: {totalNotas}";
        pieSeries.colors.list = [
          am4core.color("#845EC2"),
          am4core.color("#D65DB1"),
          am4core.color("#FF6F91"),
          am4core.color("#FF9671"),
          am4core.color("#FFC75F"),
          am4core.color("#F9F871"),
        ];
      },

      periodoFiltro: function (dias) {
        axios.post('http://localhost:8080/api/dashboard', {
          body: {
              "tipoPeriodo": dias
          }
        })
      }
    }
   

}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,700,800&display=swap');

:root {
   font-size: 62.5%;
}
input, select{
    width: 100%;
    padding: 5px 1px;
    border-radius: 2px;
    border: solid 1px #cfcfcf;
}
body {
   font-family: 'Montserrat', sans-serif;
   width: 100%;
   margin: 0;
   font-size: 1.6rem;
   /* background: #426072!important; */
   background: #728089!important;
   -webkit-font-smoothing: antialiased!important;
}

.content h1{
    font-weight: bold;
    color: #407a8b;
    font-size: 3rem;
    letter-spacing: 2px;
}

.content h2{
  font-weight: 500;
  color: #407a8b;
  
}
#sidebar {
   position: relative;
   display: flex;
   flex-direction: column;
   background-image: linear-gradient(-180deg, #80b6db 0%, #7da7e2 100%);
}
.cust{
  margin-right: 0;
  margin-left: 0;
}
.containResposta{
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 10px #ddd;
  border-radius: 10px;
}
.containerPergunta p{
  font-size: 22px;
  margin: 10px;
  text-align: center;
  color: #728089;
  letter-spacing: 2px;
}
.chartDiv{
  min-height: 400px;
  height:  auto;
  width: auto;
}
.containertoDo{
  min-height:  400px;
  margin-top: 100px;
}
.content{
  width: 100%;
  padding: 15px;
  background:  #f5f5f5;
  border-radius: 4px;
  margin: 15px 0;
  float: left;
}
.fil img{
    width:100%;
    opacity: 0.45;
}
.fil{
  float: right;
  width:40px;
  height: 40px;
  background: transparent;
  border:none;
}
.filterSection{
  padding: 15px;
  border-top: solid 1px #ccc;
  margin-top: 11px;
  width: 100%;
  float: left;
  display: none;
}
.required{
  border: solid 1px blue;
}
.card{
      margin-bottom: 15px;
    border-radius: 7px;
    padding-bottom: 15px;
    border: solid 1px #c7c7c7;
    overflow: hidden;
}
.card h3{
    text-align: center;
    background: #e7e9ea;
    font-size: 26px;
    color: #728089;
    padding: 15px;
    letter-spacing: 2px;
    /* border-bottom: dotted 3px #44484a57; */
}
.containerPergunta{
    overflow: visible;
    background: #fff;
    margin-bottom: 75px;
    float: left;
    clear: both;
}
.filterSection{
  clear: both!important;
}
.filterSection .col-md-3,
.filterSection .col-md-9 {
  float: left!important;
}
.bla .pre{
  width: 200px;
  border: solid 1px blue;
  text-align: center;
}
</style>