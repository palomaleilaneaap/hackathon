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
          <div class="col-md-3 mb-3">
            <div class="form-group">
              <label for="pesquisa">Visão</label>
             <select name="" id="">
               <option value="">Selecione</option>
             </select>
            </div>
          </div>
          <div class="col-md-9"></div>
          <div class="col-md-3 mb-3 ">
            <div class="form-group">
              <label for="pesquisa">Pesquisa</label>
              <vue-multi-select
                  :options="myOptions"
              ></vue-multi-select>
            </div>
          </div>
                    

          <div class="col-md-3 mb-3">
            <div class="form-group">
              <label for="pesquisa">Tipo de cliente</label>
              <vue-multi-select
                  :options="myOptions"
              ></vue-multi-select>
            </div>
          </div>

          <div class="col-md-3 mb-3">
            <div class="form-group">
              <label for="pesquisa">Cliente</label>
              <vue-multi-select
                  :options="myOptions"
              ></vue-multi-select>
            </div>
          </div>
          <div class="col-md-3"></div>
          <div class="col-md-3 mb-3">
            <div class="form-group">
              <label for="pesquisa">Canal</label>
              <vue-multi-select
                  :options="myOptions"
              ></vue-multi-select>
            </div>
          </div>

          <div class="col-md-3 mb-3">
            <div class="form-group">
              <label for="pesquisa">Responsável</label>
              <vue-multi-select
                  :options="myOptions"
              ></vue-multi-select>
            </div>
          </div>

          <div class="col-md-3 mb-3">
            <div class="form-group">
              <label for="pesquisa">Setor</label>
              <vue-multi-select
                  :options="myOptions"
              ></vue-multi-select>
            </div>
          </div>
        </div>
        </div>
      </div>
    
      <div class="container-fluid">
        <div class="content">
          <!-- <h2>Relatórios por pesquisa</h2> -->
          <!--  -->
            <div class="row">
              <div class="col-md-12" v-for="formulario in data" v-bind:key="formulario.id">
                <div class="card">
                  <h3>{{formulario.descricao}}</h3>
                  <div v-for="pergunta in formulario.perguntas" v-bind:key="formulario.id + pergunta.id">
                    <div class="col-md-6 containerPergunta">
                      <p>{{pergunta.descricao}}</p>
                      <div class="containResposta" v-on:click="caraidegrafico(pergunta.resultado, formulario.id + pergunta.id)">
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
    </div>
</template>

<script>
import VueMultiSelect from "vue-simple-multi-select";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import filtro from '../public/filter.svg'
import axios from 'axios'
import $ from 'jquery'
const URL = 'http://localhost:8081/api/dashboard'

am4core.useTheme(am4themes_animated);

export default {
  components: {
     VueMultiSelect
  },
  data() {
    return {
      data: [
        {
          'valor': '10',
          'totalNotas': '100'
        }
      ],
      filtro: filtro
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
      this.data = error
    })
  

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
      caraidegrafico: function (lista, iddiv) {
        var chart = am4core.create(iddiv, am4charts.PieChart);
    
        chart.data = lista; 

        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "valor";
        pieSeries.dataFields.category = "totalNotas";
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
.containResposta{
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 10px #ddd;
  border-radius: 10px;
}
.containerPergunta p{
  font-size: 22px;
  margin: 10px;
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
  border-radius: 5px;
  padding-bottom: 15px;
}
.card h3{
  padding: 20px 10px;
}
.containerPergunta{
  overflow: visible
}
.filterSection{
  clear: both!important;
}
.filterSection .col-md-3,
.filterSection .col-md-9 {
  float: left!important;
  
}
</style>