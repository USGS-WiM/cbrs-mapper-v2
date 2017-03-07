function addCommas(e){e+="";for(var i=e.split("."),t=i[0],a=i.length>1?"."+i[1]:"",n=/(\d+)(\d{3})/;n.test(t);)t=t.replace(n,"$1,$2");return t+a}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,i){return 0===i?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}function stateSelected(){var e=$("#stateSelect")[0];if(e.selectedIndex>0){var i=e.options[e.selectedIndex].value,t=e.options[e.selectedIndex].label;$("#downloadState").html("Download <a target='_blank' href='http://www.fws.gov/wetlands/Downloads/State/"+i+"_wetlands.zip'>Geodatabase</a> and <a target='_blank' href='http://www.fws.gov/wetlands/Downloads/State/"+i+"_shapefile_wetlands.zip'>Shapefile</a> data for <b>"+t+"</b>")}else $("#downloadState").html("")}function hucLinkListener(e){console.log(e),$.get("https://fwsmapper.wim.usgs.gov/downloadLoggingService/downloadLog.asmx/Log?huc="+e+",NWIV2",function(e){})}var allLayers,renderer;require(["esri/InfoTemplate","esri/renderers/UniqueValueRenderer","esri/symbols/PictureMarkerSymbol","dojo/domReady!"],function(e,i,t){var a=new t("./images/grn-pushpin.png",45,45);renderer=new i(a);new e("${NAME}","Type: ${TYPE}<br/>Ramsar: <a id='ramsarLink' target='_blank' href='${HYPERLINK_2}'>click here</a><br/>Location Website: <a target='_blank' href='${HYPERLINK}'>click here</a><br/>Water Summary Report: <a target='_blank' href='${WATER_SUMMARY_REPORT}'>click here</a><br/>Wildlife Action Plan: <a target='_blank' href='${STATE_ACTION_PLAN}'>click here</a><br/>");allLayers=[{groupHeading:"ESRI dynamic map services",showGroupHeading:!1,includeInLayerList:!0,layers:{"CBRS Units":{url:"https://fws.wim.usgs.gov/arcgis/rest/services/CBRAMapper/GeoCBRA/MapServer",visibleLayers:[0,2,4,5],options:{id:"cbrs",opacity:.75,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,includeLegend:!0}},"CBRS Footprints":{url:"https://fws.wim.usgs.gov/arcgis/rest/services/CBRAMapper/GeoCBRA/MapServer",visibleLayers:[0],options:{id:"footprints",opacity:.75,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,includeLegend:!0}},"CBRS Buffer Zone":{url:"https://fws.wim.usgs.gov/arcgis/rest/services/CBRAMapper/GeoCBRA/MapServer",visibleLayers:[2],options:{id:"riparian",opacity:.75,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,includeLegend:!0}}}}]});var map,allLayers,maxLegendHeight,maxLegendDivHeight,printCount=0,legendLayers=[],measurement,identifyTask,identifyParams,cbrsClicked=!1;require(["esri/map","esri/arcgis/utils","esri/config","esri/dijit/Geocoder","esri/dijit/HomeButton","esri/dijit/Legend","esri/dijit/LocateButton","esri/dijit/Measurement","esri/dijit/PopupTemplate","esri/graphic","esri/geometry/Extent","esri/geometry/Multipoint","esri/geometry/Point","esri/layers/ArcGISTiledMapServiceLayer","esri/renderers/UniqueValueRenderer","esri/SpatialReference","esri/symbols/PictureMarkerSymbol","esri/tasks/GeometryService","esri/tasks/IdentifyParameters","esri/tasks/IdentifyTask","esri/tasks/LegendLayer","esri/tasks/PrintTask","esri/tasks/PrintParameters","esri/tasks/PrintTemplate","esri/geometry/webMercatorUtils","esri/urlUtils","dojo/dom","dojo/dom-class","dojo/dnd/Moveable","dojo/query","dojo/on","dojo/domReady!"],function(e,i,t,a,n,o,s,r,l,p,c,d,g,m,y,u,f,h,b,v,w,L,S,T,k,x,I,C,O,P,D){function R(){$("#printModal").modal("show")}function M(){$("#getDataModal").modal("show")}function _(){Y.activeGeocoder.searchExtent=null}function E(){_();var e=Y.find();e.then(function(e){H(e)}),$("#geosearchModal").modal("hide")}function z(e){A();var i=e.graphic?e.graphic:e.result.feature;i.setSymbol(F)}function H(e){if(e=e.results,e.length>0){A();for(var i=0;i<e.length;i++);if(null!=e[0].extent)map.setExtent(e[0].extent,!0);else{var t=new g(e[0].feature.geometry);map.centerAndZoom(t,17)}}}function A(){map.infoWindow.hide(),map.graphics.clear()}function N(e,i,t,a,n){return new f({angle:0,xoffset:i,yoffset:t,type:"esriPMS",url:e,contentType:"image/png",width:a,height:n})}function B(){function e(e){printCount++;var i=$("<p><label>"+printCount+': </label>&nbsp;&nbsp;<a href="'+e.url+'" target="_blank">'+r+" </a></p>");$("#printJobsDiv").find("p.toRemove").remove(),$("#printModalBody").append(i),$("#printTitle").val(""),$("#printExecuteButton").button("reset")}function i(e){alert("Sorry, an unclear print error occurred. Please try refreshing the application to fix the problem")}var t=new S;t.map=map;var a=new T;a.exportOptions={width:500,height:400,dpi:300},a.format="PDF",a.layout="Letter ANSI A Landscape test",a.preserveScale=!1;var n=new w;n.layerId="wetlands";var o=new w;o.layerId="wetlandsRaster";var s=$("#printTitle").val();""==s?a.layoutOptions={titleText:"Wetlands",authorText:"National Wetlands Inventory (NWI)",copyrightText:"This page was produced by the NWI mapper",legendLayers:[n,o]}:a.layoutOptions={titleText:s,authorText:"National Wetlands Inventory (NWI)",copyrightText:"This page was produced by the NWI mapper",legendLayers:[n,o]};var r=a.layoutOptions.titleText;t.template=a;var l=new L("https://fwsmapper.wim.usgs.gov/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");l.execute(t,e,i),$.get("https://fwsmapper.wim.usgs.gov/pdfLoggingService/pdfLog.asmx/Log?printInfo="+map.getScale()+","+map.extent.xmin+","+map.extent.ymax+","+map.extent.xmax+","+map.extent.ymin+",NWIV2",function(e){})}function G(e,i){var t;document.getElementById&&(t=document.getElementById(e))&&t.style&&(t.style.cursor=i)}t.defaults.io.corsEnabledServers.push("fwsmapper.wim.usgs.gov"),esri.config.defaults.io.proxyUrl="https://fwsmapper.wim.usgs.gov/serviceProxy/proxy.ashx",t.defaults.geometryService=new h("https://fwsmapper.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer"),map=new e("mapDiv",{basemap:"hybrid",extent:new c(-14638882.654811008,2641706.3772205533,-6821514.898031538,6403631.161302788,new u({wkid:3857}))});var W=new n({map:map,extent:new c(-14638882.654811008,2641706.3772205533,-6821514.898031538,6403631.161302788,new u({wkid:3857}))},"homeButton");W.startup();var j=new s({map:map,scale:4514},"locateButton");j.startup(),measurement=new r({map:map,advancedLocationUnits:!0},I.byId("measurementDiv")),measurement.startup(),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),$("#printNavButton").click(function(){R()}),$("#printExecuteButton").click(function(e){e.preventDefault(),$(this).button("loading"),B()}),$("#getDataButton").click(function(){M()}),D(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var i=k.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(i.y.toFixed(3)),$("#longitude").html(i.x.toFixed(3))}),D(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),D(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!=e.mapPoint){var i=k.webMercatorToGeographic(e.mapPoint);$("#latitude").html(i.y.toFixed(3)),$("#longitude").html(i.x.toFixed(3))}}),D(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=k.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(3)),$("#longitude").html(e.x.toFixed(3))});var q=new m("https://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer"),U=new m("https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer");D(I.byId("btnStreets"),"click",function(){map.setBasemap("streets"),map.removeLayer(U),map.removeLayer(q)}),D(I.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),map.removeLayer(U),map.removeLayer(q)}),D(I.byId("btnHybrid"),"click",function(){map.setBasemap("hybrid"),map.removeLayer(U),map.removeLayer(q)}),D(I.byId("btnTerrain"),"click",function(){map.setBasemap("terrain"),map.removeLayer(U),map.removeLayer(q)}),D(I.byId("btnGray"),"click",function(){map.setBasemap("gray"),map.removeLayer(U),map.removeLayer(q)}),D(I.byId("btnNatGeo"),"click",function(){map.setBasemap("national-geographic"),map.removeLayer(U),map.removeLayer(q)}),D(I.byId("btnOSM"),"click",function(){map.setBasemap("osm"),map.removeLayer(U),map.removeLayer(q)}),D(I.byId("btnTopo"),"click",function(){map.setBasemap("topo"),map.removeLayer(U),map.removeLayer(q)}),D(I.byId("btnNatlMap"),"click",function(){map.addLayer(U,1),map.removeLayer(q)}),D(I.byId("btnUsgsTopo"),"click",function(){map.addLayer(q,1),map.removeLayer(U)}),$("#selectionDiv").lobiPanel({unpin:!1,reload:!1,minimize:!1,close:!1,expand:!1,editTitle:!1,maxWidth:800,maxHeight:500}),$("#selectionDiv .dropdown").prepend("<div id='selectionClose' tite='close'><b>X</b></div>"),$("#selectionDiv .dropdown").prepend("<div id='selectionMin' title='collapse'><b>_</b></div>"),$("#selectionMin").click(function(){$("#selectionDiv").css("visibility","hidden")}),$("#selectionClose").click(function(){$("#selectionDiv").css("visibility","hidden")}),identifyParams=new b,identifyParams.tolerance=0,identifyParams.returnGeometry=!0,identifyParams.layerOption=b.LAYER_OPTION_ALL,identifyParams.layerIds=[0,2,4],identifyParams.spatialReference=map.spatialReference,identifyParams.width=map.width,identifyParams.height=map.height,identifyTask=new v(allLayers[0].layers["CBRS Units"].url),D(map,"click",function(e){if(1==cbrsClicked)return void(cbrsClicked=!1);if(null==measurement.activeTool&&(map.graphics.clear(),identifyParams.geometry=e.mapPoint,identifyParams.mapExtent=map.extent,map.getLevel()>=8&&0==$("#huc-download-alert")[0].scrollHeight)){identifyTask=new v(allLayers[0].layers["CBRS Units"].url);var i=identifyTask.execute(identifyParams);G("mainDiv","wait"),map.setCursor("wait"),i.addCallback(function(e){if(e.length>1){for(var i,t,a=0;a<e.length;a++){i=e[a].feature,t=i.attributes;var n;0==e[a].layerId?($("#mapDate").text(t.Map_Date),$("#titleOne").text(t.Title),$("#titleTwo").text(t.Title_2),$("#titleThree").text(t.Title_3),n=new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color([255,255,0]),2),new dojo.Color([98,194,204,0]))):4==e[a].layerId&&(n=new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color([255,0,255]),2),new dojo.Color([98,194,204,0]))),i.geometry.spatialReference=map.spatialReference;var o=i;o.setSymbol(n),map.graphics.add(o)}$("#selectionDiv").css("visibility","visible");var s=$("#selectionDiv").data("lobiPanel"),r=$(document).height(),l=$(document).width(),p=.9,c=r*p,d=l*p;500>r&&$("#selectionDiv").height(c),500>l&&$("#selectionDiv").width(d);var g=.5*l-.5*$("#selectionDiv").width(),m=.5*r-.5*$("#selectionDiv").height();s.setPosition(g,m),1==s.isPinned()&&s.unpin();var y=new esri.InfoTemplate("CBRS Units","<b>Map Link:</b> "+t.Map_Link+"<br/><p><b>Title:</b> "+t.Title+"<br/><b>Title 2:</b> "+t.Title_2+"<br/><b>Title 3:</b> "+t.Title_3+i.setInfoTemplate(y));map.infoWindow.setFeatures([i]);var u=dojo.connect(map.infoWindow,"onHide",function(e){map.graphics.clear(),dojo.disconnect(map.infoWindow,u)});G("mainDiv","default"),map.setCursor("default"),$("#infoWindowLink").click(function(e){var t=k.webMercatorToGeographic(i.geometry),a=t.getExtent();map.setExtent(a,!0)})}})}});var Y=new a({value:"",maxLocations:25,autoComplete:!0,arcgisGeocoder:!0,autoNavigate:!1,map:map},"geosearch");Y.startup(),Y.on("select",z),Y.on("findResults",H),Y.on("clear",A),D(Y.inputNode,"keydown",function(e){13==e.keyCode&&_()});var F=N("../images/purple-pin.png",0,12,13,24);map.on("load",function(){map.infoWindow.set("highlight",!1),map.infoWindow.set("titleInBody",!1)}),D(I.byId("btnGeosearch"),"click",E),$(document).ready(function(){function e(){$("#geosearchModal").modal("show")}function i(){$("#aboutModal").modal("show")}$("#geosearchNav").click(function(){e()}),$("#aboutNav").click(function(){i()}),$("#html").niceScroll(),$("#sidebar").niceScroll(),$("#sidebar").scroll(function(){$("#sidebar").getNiceScroll().resize()}),maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=maxLegendHeight-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight),$("#legendCollapse").on("shown.bs.collapse",function(){if(0==legendDiv.innerHTML.length){var e=new o({map:map,layerInfos:legendLayers},"legendDiv");e.startup(),$("#legendDiv").niceScroll()}}),$("#legendCollapse").on("hide.bs.collapse",function(){$("#legendElement").css("height","initial")}),$("#measurementCollapse").on("shown.bs.collapse",function(){$("#measureLabel").show()}),$("#measurementCollapse").on("hide.bs.collapse",function(){window.innerWidth<=767&&$("#measureLabel").hide()})}),require(["esri/InfoTemplate","esri/tasks/locator","esri/tasks/query","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ArcGISImageServiceLayer","esri/layers/FeatureLayer","esri/layers/WMSLayer","esri/layers/WMSLayerInfo","esri/tasks/GeometryService","dijit/form/CheckBox","dijit/form/RadioButton","dojo/query","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/on"],function(e,i,t,a,n,o,s,r,l,p,c,d,g,m,y,u,f,h,b,v,w){function L(i,t,a,n,o,s,r){if(map.addLayer(a),"cbrs"==a.id&&w(a,"load",function(i){w(a,"click",function(i){cbrsClicked=!0;var t=i.graphic.attributes.HYPERLINK_2;if("None"==t){var n=new e("${NAME}","Type: ${TYPE}<br/>Location Website: <a target='_blank' href='${HYPERLINK}'>click here</a><br/>Water Summary Report: <a target='_blank' href='${WATER_SUMMARY_REPORT}'>click here</a><br/>Wildlife Action Plan: <a target='_blank' href='${STATE_ACTION_PLAN}'>click here</a><br/>");a.setInfoTemplate(n)}else{var n=new e("${NAME}","Type: ${TYPE}<br/>Ramsar: <a id='ramsarLink' target='_blank' href='${HYPERLINK_2}'>click here</a><br/>Location Website: <a target='_blank' href='${HYPERLINK}'>click here</a><br/>Water Summary Report: <a target='_blank' href='${WATER_SUMMARY_REPORT}'>click here</a><br/>Wildlife Action Plan: <a target='_blank' href='${STATE_ACTION_PLAN}'>click here</a><br/>");a.setInfoTemplate(n)}})}),S.push([o,camelize(n),a]),o){if(!$("#"+camelize(o)).length){var l;if("Data Source"==o)var l=$('<div id="'+camelize(o+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+o+'<span id="info'+camelize(o)+'" title="Data Source identifies the scale, year and emulsion of the imagery that was used to map the wetlands and riparian areas for a given area. It also identifies areas that have Scalable data, which is an interim data product in areas of the nation where standard compliant wetland data is not yet available. Click for more info on Scalable data." class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity'+camelize(o)+'" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button> </div>');else var l=$('<div id="'+camelize(o+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+o+"</button> </div>");l.click(function(e){l.find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$.each(S,function(e,i){var t=map.getLayer(i[2].id);if(i[0]==o)if($("#"+i[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&l.find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",i[1]),map.addLayer(i[2]);var t=map.getLayer(i[2].id);t.setVisibility(!0)}else if(l.find("i.glyphspan").hasClass("fa-square-o")){console.log("removing layer: ",i[1]);var t=map.getLayer(i[2].id);t.setVisibility(!1)}})});var p=$('<div id="'+camelize(o)+'" class="btn-group-vertical" data-toggle="buttons"></div>');$("#toggle").append(p)}if(a.visible)var c=$('<div id="'+camelize(n)+'" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(o)+'" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o '+camelize(o)+'"></i>&nbsp;&nbsp;'+n+"</label> </div>");else var c=$('<div id="'+camelize(n)+'" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(o)+'" autocomplete="off"><i class="glyphspan fa fa-circle-o '+camelize(o)+'"></i>&nbsp;&nbsp;'+n+"</label> </div>");$("#"+camelize(o)).append(c),c.click(function(e){if($(this).find("i.glyphspan").hasClass("fa-circle-o")){$(this).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o");var i=$(this)[0].id;$.each(S,function(e,t){if(t[0]==o)if(t[1]==i&&$("#"+camelize(o+" Root")).find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",t[1]),map.addLayer(t[2]);var a=map.getLayer(t[2].id);a.setVisibility(!0)}else if(t[1]==i&&$("#"+camelize(o+" Root")).find("i.glyphspan").hasClass("fa-square-o"))console.log("group heading not checked");else{console.log("removing layer: ",t[1]);var a=map.getLayer(t[2].id);a.setVisibility(!1),$("#"+t[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&$("#"+t[1]).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o")}})}})}else if(r.includeInLayerList){if(a.visible&&void 0!==r.hasOpacitySlider&&1==r.hasOpacitySlider&&void 0!==r.moreinfo&&r.moreinfo)var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+n+'<span id="info'+camelize(n)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity'+camelize(n)+'" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button></div>');else if(!a.visible&&void 0!==r.hasOpacitySlider&&1==r.hasOpacitySlider&&void 0!==r.moreinfo&&r.moreinfo)var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+n+'<span id="info'+camelize(n)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity'+camelize(n)+'" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button></div>');else if(a.visible&&void 0!==r.hasOpacitySlider&&1==r.hasOpacitySlider)var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+n+'<span id="info'+camelize(n)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');else if(a.visible||void 0===r.hasOpacitySlider||1!=r.hasOpacitySlider)if(a.visible&&void 0!==r.moreinfo&&r.moreinfo)var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+n+'<span id="opacity'+camelize(n)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');else if(!a.visible&&void 0!==r.moreinfo&&r.moreinfo)var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+n+'<span id="info'+camelize(n)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');else if(a.visible)var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+n+"</button></span></div>");else var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+n+"</button> </div>");else var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+n+'<span id="opacity'+camelize(n)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');c.click(function(e){$(this).find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$(this).find("button").button("toggle"),a.visible?a.setVisibility(!1):a.setVisibility(!0),r.otherLayersToggled&&$.each(r.otherLayersToggled,function(e,i){var t=map.getLayer(i);t.setVisibility(a.visible)})})}if(void 0!==t){var d=camelize(i);if(!$("#"+d).length){if(t)var g=$('<div id="'+d+'"><div class="alert alert-info" role="alert"><strong>'+i+"</strong></div></div>");else var g=$('<div id="'+d+'"></div>');$("#toggle").append(g)}if(o){if($("#"+d).append(l),$("#"+d).append(p),void 0!==r.moreinfo&&r.moreinfo){var m="#info"+camelize(o),y=$(m);y.click(function(e){window.open(r.moreinfo,"_blank"),e.preventDefault(),e.stopPropagation()})}if($("#opacity"+camelize(o)).length>0){var m="#opacity"+camelize(o),u=$(m);u.click(function(e){e.preventDefault(),e.stopPropagation(),$(".opacitySlider").remove();var i=map.getLayer(s.id).opacity,t=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+i+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(t),$("#slider")[0].value=100*i,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var i=$("#slider")[0].value/100;console.log("o: "+i),$("#opacityValue").html("Opacity: "+i),map.getLayer(s.id).setOpacity(i),r.otherLayersToggled&&$.each(r.otherLayersToggled,function(e,t){var a=map.getLayer(t);a.setOpacity(i)})})})}}else{if($("#"+d).append(c),void 0!==r.moreinfo&&r.moreinfo){var m="#info"+camelize(n),y=$(m);y.click(function(e){window.open(r.moreinfo,"_blank"),e.preventDefault(),e.stopPropagation()})}$("#opacity"+camelize(n)).length>0&&$("#opacity"+camelize(n)).click(function(e){e.preventDefault(),e.stopPropagation(),$(".opacitySlider").remove();var i=map.getLayer(s.id).opacity,t=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+i+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(t),$("#slider")[0].value=100*i,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var i=$("#slider")[0].value/100;console.log("o: "+i),$("#opacityValue").html("Opacity: "+i),map.getLayer(s.id).setOpacity(i),r.otherLayersToggled&&$.each(r.otherLayersToggled,function(e,t){var a=map.getLayer(t);a.setOpacity(i)})})})}}else if($("#toggle").append(c),void 0!==r.moreinfo&&r.moreinfo){var m="#info"+camelize(n),y=$(m);y.click(function(e){alert(e.currentTarget.id),e.preventDefault(),e.stopPropagation()})}}var S=(new g("https://fwsmapper.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer"),[]);$.each(allLayers,function(e,i){console.log("processing: ",i.groupHeading),$.each(i.layers,function(e,t){var a="";if(t.wimOptions.exclusiveGroupName&&(a=t.wimOptions.exclusiveGroupName),"agisFeature"===t.wimOptions.layerType){var n=new p(t.url,t.options);void 0!==t.wimOptions.renderer&&n.setRenderer(t.wimOptions.renderer),t.wimOptions&&1==t.wimOptions.includeLegend&&legendLayers.unshift({layer:n,title:e}),L(i.groupHeading,i.showGroupHeading,n,e,a,t.options,t.wimOptions)}else if("agisWMS"===t.wimOptions.layerType){var n=new c(t.url,{resourceInfo:t.options.resourceInfo,visibleLayers:t.options.visibleLayers},t.options);t.wimOptions&&1==t.wimOptions.includeLegend&&legendLayers.unshift({layer:n,title:e}),L(i.groupHeading,i.showGroupHeading,n,e,a,t.options,t.wimOptions)}else if("agisDynamic"===t.wimOptions.layerType){var n=new r(t.url,t.options);if(t.visibleLayers&&n.setVisibleLayers(t.visibleLayers),t.wimOptions&&t.wimOptions.layerDefinitions){var o=[];$.each(t.wimOptions.layerDefinitions,function(e,i){o[e]=i}),n.setLayerDefinitions(o)}t.wimOptions&&1==t.wimOptions.includeLegend&&legendLayers.unshift({layer:n,title:e}),L(i.groupHeading,i.showGroupHeading,n,e,a,t.options,t.wimOptions)}else if("agisImage"===t.wimOptions.layerType){var n=new l(t.url,t.options);t.wimOptions&&1==t.wimOptions.includeLegend&&legendLayers.unshift({layer:n,title:e}),t.visibleLayers&&n.setVisibleLayers(t.visibleLayers),L(i.groupHeading,i.showGroupHeading,n,e,a,t.options,t.wimOptions)}})})})}),$(".close-alert").click(function(){$(this).parent().slideUp(250)}),$(document).ready(function(){});