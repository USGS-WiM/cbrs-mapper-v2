function addCommas(e){e+="";for(var a=e.split("."),t=a[0],i=a.length>1?"."+a[1]:"",o=/(\d+)(\d{3})/;o.test(t);)t=t.replace(o,"$1,$2");return t+i}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,a){return 0===a?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}function stateSelected(){var e=$("#stateSelect")[0];if(e.selectedIndex>0){var a=e.options[e.selectedIndex].value,t=e.options[e.selectedIndex].label;$("#downloadState").html("Download <a target='_blank' href='http://www.fws.gov/wetlands/Downloads/State/"+a+"_wetlands.zip'>Geodatabase</a> and <a target='_blank' href='http://www.fws.gov/wetlands/Downloads/State/"+a+"_shapefile_wetlands.zip'>Shapefile</a> data for <b>"+t+"</b>")}else $("#downloadState").html("")}function hucLinkListener(e){console.log(e),$.get("https://fwsmapper.wim.usgs.gov/downloadLoggingService/downloadLog.asmx/Log?huc="+e+",NWIV2",function(e){})}var allLayers,renderer;require(["esri/InfoTemplate","esri/renderers/UniqueValueRenderer","esri/symbols/PictureMarkerSymbol","dojo/domReady!"],function(e,a,t){var i=new t("./images/grn-pushpin.png",45,45);renderer=new a(i);new e("${NAME}","Type: ${TYPE}<br/>Ramsar: <a id='ramsarLink' target='_blank' href='${HYPERLINK_2}'>click here</a><br/>Location Website: <a target='_blank' href='${HYPERLINK}'>click here</a><br/>Water Summary Report: <a target='_blank' href='${WATER_SUMMARY_REPORT}'>click here</a><br/>Wildlife Action Plan: <a target='_blank' href='${STATE_ACTION_PLAN}'>click here</a><br/>");allLayers=[{groupHeading:"ESRI dynamic map services",showGroupHeading:!1,includeInLayerList:!0,layers:{"CBRS Units":{url:"https://fws.wim.usgs.gov/arcgis/rest/services/CBRAMapper/GeoCBRA/MapServer",visibleLayers:[4,5],options:{id:"wetlands",opacity:.75,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,includeLegend:!0}},"CBRS Footprints":{url:"https://fws.wim.usgs.gov/arcgis/rest/services/CBRAMapper/GeoCBRA/MapServer",visibleLayers:[0],options:{id:"riparian",opacity:.75,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,includeLegend:!0}},"CBRS Buffer Zone":{url:"https://fws.wim.usgs.gov/arcgis/rest/services/CBRAMapper/GeoCBRA/MapServer",visibleLayers:[2],options:{id:"riparian",opacity:.75,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,includeLegend:!0}}}}]});var map,allLayers,maxLegendHeight,maxLegendDivHeight,printCount=0,legendLayers=[],measurement,identifyTask,identifyParams,aoiClicked=!1;require(["esri/map","esri/arcgis/utils","esri/config","esri/dijit/Geocoder","esri/dijit/HomeButton","esri/dijit/Legend","esri/dijit/LocateButton","esri/dijit/Measurement","esri/dijit/PopupTemplate","esri/graphic","esri/geometry/Extent","esri/geometry/Multipoint","esri/geometry/Point","esri/layers/ArcGISTiledMapServiceLayer","esri/renderers/UniqueValueRenderer","esri/SpatialReference","esri/symbols/PictureMarkerSymbol","esri/tasks/GeometryService","esri/tasks/IdentifyParameters","esri/tasks/IdentifyTask","esri/tasks/LegendLayer","esri/tasks/PrintTask","esri/tasks/PrintParameters","esri/tasks/PrintTemplate","esri/geometry/webMercatorUtils","esri/urlUtils","dojo/dom","dojo/dom-class","dojo/dnd/Moveable","dojo/query","dojo/on","dojo/domReady!"],function(e,a,t,i,o,n,r,s,l,p,c,d,m,g,u,y,f,h,b,v,w,L,S,T,k,I,x,E,P,A,C){function O(){$("#printModal").modal("show")}function D(){$("#getDataModal").modal("show")}function M(){V.activeGeocoder.searchExtent=null}function R(){M();var e=V.find();e.then(function(e){N(e)}),$("#geosearchModal").modal("hide")}function _(e){W();var a=e.graphic?e.graphic:e.result.feature;a.setSymbol(K)}function N(e){if(e=e.results,e.length>0){W();for(var a=0;a<e.length;a++);if(null!=e[0].extent)map.setExtent(e[0].extent,!0);else{var t=new m(e[0].feature.geometry);map.centerAndZoom(t,17)}}}function W(){map.infoWindow.hide(),map.graphics.clear()}function H(e,a,t,i,o){return new f({angle:0,xoffset:a,yoffset:t,type:"esriPMS",url:e,contentType:"image/png",width:i,height:o})}function G(){function e(e){printCount++;var a=$("<p><label>"+printCount+': </label>&nbsp;&nbsp;<a href="'+e.url+'" target="_blank">'+s+" </a></p>");$("#printJobsDiv").find("p.toRemove").remove(),$("#printModalBody").append(a),$("#printTitle").val(""),$("#printExecuteButton").button("reset")}function a(e){alert("Sorry, an unclear print error occurred. Please try refreshing the application to fix the problem")}var t=new S;t.map=map;var i=new T;i.exportOptions={width:500,height:400,dpi:300},i.format="PDF",i.layout="Letter ANSI A Landscape test",i.preserveScale=!1;var o=new w;o.layerId="wetlands";var n=new w;n.layerId="wetlandsRaster";var r=$("#printTitle").val();""==r?i.layoutOptions={titleText:"Wetlands",authorText:"National Wetlands Inventory (NWI)",copyrightText:"This page was produced by the NWI mapper",legendLayers:[o,n]}:i.layoutOptions={titleText:r,authorText:"National Wetlands Inventory (NWI)",copyrightText:"This page was produced by the NWI mapper",legendLayers:[o,n]};var s=i.layoutOptions.titleText;t.template=i;var l=new L("https://fwsmapper.wim.usgs.gov/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");l.execute(t,e,a),$.get("https://fwsmapper.wim.usgs.gov/pdfLoggingService/pdfLog.asmx/Log?printInfo="+map.getScale()+","+map.extent.xmin+","+map.extent.ymax+","+map.extent.xmax+","+map.extent.ymin+",NWIV2",function(e){})}function j(e,a){var t;document.getElementById&&(t=document.getElementById(e))&&t.style&&(t.style.cursor=a)}t.defaults.io.corsEnabledServers.push("fwsmapper.wim.usgs.gov"),esri.config.defaults.io.proxyUrl="https://fwsmapper.wim.usgs.gov/serviceProxy/proxy.ashx",t.defaults.geometryService=new h("https://fwsmapper.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer"),map=new e("mapDiv",{basemap:"hybrid",extent:new c(-14638882.654811008,2641706.3772205533,-6821514.898031538,6403631.161302788,new y({wkid:3857}))});var z=new o({map:map,extent:new c(-14638882.654811008,2641706.3772205533,-6821514.898031538,6403631.161302788,new y({wkid:3857}))},"homeButton");z.startup();var B=new r({map:map,scale:4514},"locateButton");B.startup(),measurement=new s({map:map,advancedLocationUnits:!0},x.byId("measurementDiv")),measurement.startup(),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),$("#printNavButton").click(function(){O()}),$("#printExecuteButton").click(function(e){e.preventDefault(),$(this).button("loading"),G()}),$("#getDataButton").click(function(){D()}),C(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var a=k.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(a.y.toFixed(3)),$("#longitude").html(a.x.toFixed(3))}),C(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),C(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!=e.mapPoint){var a=k.webMercatorToGeographic(e.mapPoint);$("#latitude").html(a.y.toFixed(3)),$("#longitude").html(a.x.toFixed(3))}}),C(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=k.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(3)),$("#longitude").html(e.x.toFixed(3))});var U=new g("https://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer"),F=new g("https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer");C(x.byId("btnStreets"),"click",function(){map.setBasemap("streets"),map.removeLayer(F),map.removeLayer(U)}),C(x.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),map.removeLayer(F),map.removeLayer(U)}),C(x.byId("btnHybrid"),"click",function(){map.setBasemap("hybrid"),map.removeLayer(F),map.removeLayer(U)}),C(x.byId("btnTerrain"),"click",function(){map.setBasemap("terrain"),map.removeLayer(F),map.removeLayer(U)}),C(x.byId("btnGray"),"click",function(){map.setBasemap("gray"),map.removeLayer(F),map.removeLayer(U)}),C(x.byId("btnNatGeo"),"click",function(){map.setBasemap("national-geographic"),map.removeLayer(F),map.removeLayer(U)}),C(x.byId("btnOSM"),"click",function(){map.setBasemap("osm"),map.removeLayer(F),map.removeLayer(U)}),C(x.byId("btnTopo"),"click",function(){map.setBasemap("topo"),map.removeLayer(F),map.removeLayer(U)}),C(x.byId("btnNatlMap"),"click",function(){map.addLayer(F,1),map.removeLayer(U)}),C(x.byId("btnUsgsTopo"),"click",function(){map.addLayer(U,1),map.removeLayer(F)}),identifyParams=new b,identifyParams.tolerance=0,identifyParams.returnGeometry=!0,identifyParams.layerOption=b.LAYER_OPTION_ALL,identifyParams.width=map.width,identifyParams.height=map.height,identifyTask=new v(allLayers[0].layers["CBRS Units"].url);var q=A(".title",map.infoWindow.domNode)[0],Y=new P(map.infoWindow.domNode,{handle:q});C(Y,"FirstMove",function(){var e=A(".outerPointer",map.infoWindow.domNode)[0];E.add(e,"hidden");var e=A(".pointer",map.infoWindow.domNode)[0];E.add(e,"hidden")}.bind(this)),C(map,"click",function(e){if(1==aoiClicked)return void(aoiClicked=!1);if(null==measurement.activeTool)if(map.graphics.clear(),identifyParams.geometry=e.mapPoint,identifyParams.mapExtent=map.extent,map.getLevel()>=12&&0==$("#huc-download-alert")[0].scrollHeight){o=new v(allLayers[0].layers.Wetlands.url);var a=o.execute(identifyParams),t=new b;t.returnGeometry=!0,t.tolerance=0,t.width=map.width,t.height=map.height,t.geometry=e.mapPoint,t.layerOption=b.LAYER_OPTION_ALL,t.mapExtent=map.extent,t.layerIds=[0,1],j("mainDiv","wait"),map.setCursor("wait"),a.addCallback(function(a){if(a.length>1){for(var i,n,r,s=0;s<a.length;s++)0==a[s].layerId?(i=a[s].feature,n=i.attributes):1==a[s].layerId&&(r=a[s].feature.attributes);var l=new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color([255,255,0]),2),new dojo.Color([98,194,204,0]));i.geometry.spatialReference=map.spatialReference;var p=i;p.setSymbol(l),map.graphics.add(p);var c="";c="None"==r.SUPPMAPINFO?" NONE":" <a target='_blank' href='"+r.SUPPMAPINFO+"'>click here</a>",("<Null>"==r.IMAGE_DATE||"0"==r.IMAGE_DATE||0==r.IMAGE_DATE)&&(r.IMAGE_DATE=c);var d=new esri.InfoTemplate("Wetland","<b>Classification:</b> "+n.ATTRIBUTE+" (<a target='_blank' href='https://fwsmapper.wim.usgs.gov/decoders/SWI.aspx?CodeURL="+n.ATTRIBUTE+"''>decode</a>)<br/><p><b>Wetland Type:</b> "+n.WETLAND_TYPE+"<br/><b>Acres:</b> "+Number(n.ACRES).toFixed(2)+"<br/><b>Image Date(s):</b> "+r.IMAGE_DATE+"<br/><b>Project Metadata:</b>"+c+"<br/><p><a id='infoWindowLink' href='javascript:void(0)'>Zoom to wetland</a></p>");i.setInfoTemplate(d),map.infoWindow.setFeatures([i]),map.infoWindow.show(e.mapPoint,map.getInfoWindowAnchor(e.screenPoint));var m=dojo.connect(map.infoWindow,"onHide",function(e){map.graphics.clear(),dojo.disconnect(map.infoWindow,m)});j("mainDiv","default"),map.setCursor("default"),$("#infoWindowLink").click(function(e){var a=k.webMercatorToGeographic(i.geometry),t=a.getExtent();map.setExtent(t,!0)})}else if(a.length<=1){o=new v(allLayers[0].layers.Riparian.url);var g=o.execute(identifyParams);g.addCallback(function(a){if(a.length>1){for(var i,o,n,r=0;r<a.length;r++)0==a[r].layerId?(i=a[r].feature,o=i.attributes):1==a[r].layerId&&(n=a[r].feature.attributes);var s=new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color([255,255,0]),2),new dojo.Color([98,194,204,0]));i.geometry.spatialReference=map.spatialReference;var l=i;l.setSymbol(s),map.graphics.add(l);var p="";p="None"==n.SUPPMAPINFO?" NONE":" <a target='_blank' href='"+n.SUPPMAPINFO+"'>click here</a>";var c=new esri.InfoTemplate("Riparian","<b>Classification:</b> "+o.ATTRIBUTE+" (<a target='_blank' href='https://fwsmapper.wim.usgs.gov/decoders/riparian.aspx?CodeURL="+o.ATTRIBUTE+"''>decode</a>)<br/><p><b>Wetland Type:</b> "+o.WETLAND_TYPE+"<br/><b>Acres:</b> "+Number(o.ACRES).toFixed(2)+"<br/><b>Image Date(s):</b> "+n.IMAGE_DATE+"<br/><b>Project Metadata:</b>"+p+"<br/><p><a id='infoWindowLink' href='javascript:void(0)'>Zoom to wetland</a></p>");i.setInfoTemplate(c),map.infoWindow.setFeatures([i]),map.infoWindow.show(e.mapPoint);var d=dojo.connect(map.infoWindow,"onHide",function(e){map.graphics.clear(),dojo.disconnect(map.infoWindow,d)});j("mainDiv","default"),map.setCursor("default"),$("#infoWindowLink").click(function(e){var a=k.webMercatorToGeographic(i.geometry),t=a.getExtent();map.setExtent(t,!0)})}else if(a.length<=1){var m=new v(allLayers[2].layers["Historic Wetland Data"].url),g=m.execute(t);g.addCallback(function(a){if(a.length>=1){for(var t,i,o,n=0;n<a.length;n++)0==a[n].layerId?(t=a[n].feature,i=t.attributes):1==a[n].layerId&&(o=a[n].feature.attributes);var r=new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color([255,255,0]),2),new dojo.Color([98,194,204,0]));t.geometry.spatialReference=map.spatialReference;var s=t;s.setSymbol(r),map.graphics.add(s);var l="";l="None"==o.SUPPMAPINFO?" NONE":" <a target='_blank' href='"+o.SUPPMAPINFO+"'>click here</a>",("<Null>"==o.IMAGE_DATE||"0"==o.IMAGE_DATE||0==o.IMAGE_DATE)&&(o.IMAGE_DATE=l);var p=new esri.InfoTemplate("Historic Wetland","<p><b>Wetland Type:</b> "+i.WETLAND_TYPE+"<br/><b>Acres:</b> "+Number(i.ACRES).toFixed(2)+"<br/><b>Project Metadata:</b>"+l+"<br/><p><a id='infoWindowLink' href='javascript:void(0)'>Zoom to wetland</a></p>");t.setInfoTemplate(p),map.infoWindow.setFeatures([t]),map.infoWindow.show(e.mapPoint,map.getInfoWindowAnchor(e.screenPoint));var c=dojo.connect(map.infoWindow,"onHide",function(e){map.graphics.clear(),dojo.disconnect(map.infoWindow,c)});j("mainDiv","default"),map.setCursor("default"),$("#infoWindowLink").click(function(e){var a=k.webMercatorToGeographic(t.geometry),i=a.getExtent();map.setExtent(i,!0)})}else j("mainDiv","default"),map.setCursor("default"),map.infoWindow.hide()})}})}})}else if($("#huc-download-alert")[0].scrollHeight>0){var i=new b;i.returnGeometry=!0,i.tolerance=0,i.width=map.width,i.height=map.height,i.geometry=e.mapPoint,i.layerOption=b.LAYER_OPTION_TOP,i.mapExtent=map.extent,i.spatialReference=map.spatialReference;var o=new v(allLayers[0].layers.HUC8.url),n=o.execute(i);n.addCallback(function(e){if(e.length>=1){var a;a=e[0].feature;var t=new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color([255,255,0]),2),new dojo.Color([98,194,204,0]));a.geometry.spatialReference=map.spatialReference;var i=a;i.setSymbol(t),map.graphics.add(i);var o=k.webMercatorToGeographic(a.geometry),n=o.getExtent();map.setExtent(n,!0);var r=e[0].feature.attributes.HUC8,s=e[0].feature.attributes.Name;dojo.byId("innerAlert").innerHTML="<h4><b>Download Data</b></h4><p>Click the link below to download data for "+s+" watershed<br/><p onclick='hucLinkListener("+r+")'><a target='_blank' href='http://www.fws.gov/wetlands/downloads/Watershed/HU8_"+r+"_watershed.zip'>HUC "+r+"</a></p>"}})}}),$(document).on("click","#showHUCs",function(){event.preventDefault(),$("#getDataModal").modal("hide"),$("#huc-download-alert").slideDown(250),map.getLayer("huc8").setVisibility(!0),dojo.byId("innerAlert").innerHTML="<h4><b>Download Data</b></h4><p>Please review the Data Download (<a target='_blank' href='https://www.fws.gov/wetlands/Data/Data-Download.html'>www.fws.gov/wetlands/Data/Data-Download.html</a>) page for information on how to download data, what is included in the download and data use limitations and disclaimer.</p><br/><p><b>Click the map to select a watershed from which to extract wetland data.</b></p>"});var V=new i({value:"",maxLocations:25,autoComplete:!0,arcgisGeocoder:!0,autoNavigate:!1,map:map},"geosearch");V.startup(),V.on("select",_),V.on("findResults",N),V.on("clear",W),C(V.inputNode,"keydown",function(e){13==e.keyCode&&M()});var K=H("../images/purple-pin.png",0,12,13,24);map.on("load",function(){map.infoWindow.set("highlight",!1),map.infoWindow.set("titleInBody",!1)}),C(x.byId("btnGeosearch"),"click",R),$(document).ready(function(){function e(){$("#geosearchModal").modal("show")}function a(){$("#aboutModal").modal("show")}$("#geosearchNav").click(function(){e()}),$("#aboutNav").click(function(){a()}),$("#html").niceScroll(),$("#sidebar").niceScroll(),$("#sidebar").scroll(function(){$("#sidebar").getNiceScroll().resize()}),maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=maxLegendHeight-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight),$("#legendCollapse").on("shown.bs.collapse",function(){if(0==legendDiv.innerHTML.length){var e=new n({map:map,layerInfos:legendLayers},"legendDiv");e.startup(),$("#legendDiv").niceScroll()}}),$("#legendCollapse").on("hide.bs.collapse",function(){$("#legendElement").css("height","initial")}),$("#measurementCollapse").on("shown.bs.collapse",function(){$("#measureLabel").show()}),$("#measurementCollapse").on("hide.bs.collapse",function(){window.innerWidth<=767&&$("#measureLabel").hide()})}),require(["esri/InfoTemplate","esri/tasks/locator","esri/tasks/query","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ArcGISImageServiceLayer","esri/layers/FeatureLayer","esri/layers/WMSLayer","esri/layers/WMSLayerInfo","esri/tasks/GeometryService","dijit/form/CheckBox","dijit/form/RadioButton","dojo/query","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/on"],function(e,a,t,i,o,n,r,s,l,p,c,d,m,g,u,y,f,h,b,v,w){function L(a,t,i,o,n,r,s){if(map.addLayer(i),"aoi"==i.id&&w(i,"load",function(a){w(i,"click",function(a){aoiClicked=!0;var t=a.graphic.attributes.HYPERLINK_2;if("None"==t){var o=new e("${NAME}","Type: ${TYPE}<br/>Location Website: <a target='_blank' href='${HYPERLINK}'>click here</a><br/>Water Summary Report: <a target='_blank' href='${WATER_SUMMARY_REPORT}'>click here</a><br/>Wildlife Action Plan: <a target='_blank' href='${STATE_ACTION_PLAN}'>click here</a><br/>");i.setInfoTemplate(o)}else{var o=new e("${NAME}","Type: ${TYPE}<br/>Ramsar: <a id='ramsarLink' target='_blank' href='${HYPERLINK_2}'>click here</a><br/>Location Website: <a target='_blank' href='${HYPERLINK}'>click here</a><br/>Water Summary Report: <a target='_blank' href='${WATER_SUMMARY_REPORT}'>click here</a><br/>Wildlife Action Plan: <a target='_blank' href='${STATE_ACTION_PLAN}'>click here</a><br/>");i.setInfoTemplate(o)}})}),S.push([n,camelize(o),i]),n){if(!$("#"+camelize(n)).length){var l;if("Data Source"==n)var l=$('<div id="'+camelize(n+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+n+'<span id="info'+camelize(n)+'" title="Data Source identifies the scale, year and emulsion of the imagery that was used to map the wetlands and riparian areas for a given area. It also identifies areas that have Scalable data, which is an interim data product in areas of the nation where standard compliant wetland data is not yet available. Click for more info on Scalable data." class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity'+camelize(n)+'" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button> </div>');else var l=$('<div id="'+camelize(n+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+n+"</button> </div>");l.click(function(e){l.find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$.each(S,function(e,a){var t=map.getLayer(a[2].id);if(a[0]==n)if($("#"+a[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&l.find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",a[1]),map.addLayer(a[2]);var t=map.getLayer(a[2].id);t.setVisibility(!0)}else if(l.find("i.glyphspan").hasClass("fa-square-o")){console.log("removing layer: ",a[1]);var t=map.getLayer(a[2].id);t.setVisibility(!1)}})});var p=$('<div id="'+camelize(n)+'" class="btn-group-vertical" data-toggle="buttons"></div>');$("#toggle").append(p)}if(i.visible)var c=$('<div id="'+camelize(o)+'" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(n)+'" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o '+camelize(n)+'"></i>&nbsp;&nbsp;'+o+"</label> </div>");else var c=$('<div id="'+camelize(o)+'" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(n)+'" autocomplete="off"><i class="glyphspan fa fa-circle-o '+camelize(n)+'"></i>&nbsp;&nbsp;'+o+"</label> </div>");$("#"+camelize(n)).append(c),c.click(function(e){if($(this).find("i.glyphspan").hasClass("fa-circle-o")){$(this).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o");var a=$(this)[0].id;$.each(S,function(e,t){if(t[0]==n)if(t[1]==a&&$("#"+camelize(n+" Root")).find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",t[1]),map.addLayer(t[2]);var i=map.getLayer(t[2].id);i.setVisibility(!0)}else if(t[1]==a&&$("#"+camelize(n+" Root")).find("i.glyphspan").hasClass("fa-square-o"))console.log("group heading not checked");else{console.log("removing layer: ",t[1]);var i=map.getLayer(t[2].id);i.setVisibility(!1),$("#"+t[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&$("#"+t[1]).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o")}})}})}else if(s.includeInLayerList){if(i.visible&&void 0!==s.hasOpacitySlider&&1==s.hasOpacitySlider&&void 0!==s.moreinfo&&s.moreinfo)var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+o+'<span id="info'+camelize(o)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity'+camelize(o)+'" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button></div>');else if(!i.visible&&void 0!==s.hasOpacitySlider&&1==s.hasOpacitySlider&&void 0!==s.moreinfo&&s.moreinfo)var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+o+'<span id="info'+camelize(o)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity'+camelize(o)+'" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button></div>');else if(i.visible&&void 0!==s.hasOpacitySlider&&1==s.hasOpacitySlider)var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+o+'<span id="info'+camelize(o)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');else if(i.visible||void 0===s.hasOpacitySlider||1!=s.hasOpacitySlider)if(i.visible&&void 0!==s.moreinfo&&s.moreinfo)var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+o+'<span id="opacity'+camelize(o)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');else if(!i.visible&&void 0!==s.moreinfo&&s.moreinfo)var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+o+'<span id="info'+camelize(o)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');else if(i.visible)var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+o+"</button></span></div>");else var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+o+"</button> </div>");else var c=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+o+'<span id="opacity'+camelize(o)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');c.click(function(e){$(this).find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$(this).find("button").button("toggle"),i.visible?i.setVisibility(!1):i.setVisibility(!0),s.otherLayersToggled&&$.each(s.otherLayersToggled,function(e,a){var t=map.getLayer(a);t.setVisibility(i.visible)})})}if(void 0!==t){var d=camelize(a);if(!$("#"+d).length){if(t)var m=$('<div id="'+d+'"><div class="alert alert-info" role="alert"><strong>'+a+"</strong></div></div>");else var m=$('<div id="'+d+'"></div>');$("#toggle").append(m)}if(n){if($("#"+d).append(l),$("#"+d).append(p),void 0!==s.moreinfo&&s.moreinfo){var g="#info"+camelize(n),u=$(g);u.click(function(e){window.open(s.moreinfo,"_blank"),e.preventDefault(),e.stopPropagation()})}if($("#opacity"+camelize(n)).length>0){var g="#opacity"+camelize(n),y=$(g);y.click(function(e){e.preventDefault(),e.stopPropagation(),$(".opacitySlider").remove();var a=map.getLayer(r.id).opacity,t=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+a+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(t),$("#slider")[0].value=100*a,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var a=$("#slider")[0].value/100;console.log("o: "+a),$("#opacityValue").html("Opacity: "+a),map.getLayer(r.id).setOpacity(a),s.otherLayersToggled&&$.each(s.otherLayersToggled,function(e,t){var i=map.getLayer(t);i.setOpacity(a)})})})}}else{if($("#"+d).append(c),void 0!==s.moreinfo&&s.moreinfo){var g="#info"+camelize(o),u=$(g);u.click(function(e){window.open(s.moreinfo,"_blank"),e.preventDefault(),e.stopPropagation()})}$("#opacity"+camelize(o)).length>0&&$("#opacity"+camelize(o)).click(function(e){e.preventDefault(),e.stopPropagation(),$(".opacitySlider").remove();var a=map.getLayer(r.id).opacity,t=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+a+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(t),$("#slider")[0].value=100*a,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var a=$("#slider")[0].value/100;console.log("o: "+a),$("#opacityValue").html("Opacity: "+a),map.getLayer(r.id).setOpacity(a),s.otherLayersToggled&&$.each(s.otherLayersToggled,function(e,t){var i=map.getLayer(t);i.setOpacity(a)})})})}}else if($("#toggle").append(c),void 0!==s.moreinfo&&s.moreinfo){var g="#info"+camelize(o),u=$(g);u.click(function(e){alert(e.currentTarget.id),e.preventDefault(),e.stopPropagation()})}}var S=(new m("https://fwsmapper.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer"),[]);$.each(allLayers,function(e,a){console.log("processing: ",a.groupHeading),$.each(a.layers,function(e,t){var i="";if(t.wimOptions.exclusiveGroupName&&(i=t.wimOptions.exclusiveGroupName),"agisFeature"===t.wimOptions.layerType){var o=new p(t.url,t.options);void 0!==t.wimOptions.renderer&&o.setRenderer(t.wimOptions.renderer),t.wimOptions&&1==t.wimOptions.includeLegend&&legendLayers.unshift({layer:o,title:e}),L(a.groupHeading,a.showGroupHeading,o,e,i,t.options,t.wimOptions)}else if("agisWMS"===t.wimOptions.layerType){var o=new c(t.url,{resourceInfo:t.options.resourceInfo,visibleLayers:t.options.visibleLayers},t.options);t.wimOptions&&1==t.wimOptions.includeLegend&&legendLayers.unshift({layer:o,title:e}),L(a.groupHeading,a.showGroupHeading,o,e,i,t.options,t.wimOptions)}else if("agisDynamic"===t.wimOptions.layerType){var o=new s(t.url,t.options);if(t.visibleLayers&&o.setVisibleLayers(t.visibleLayers),t.wimOptions&&t.wimOptions.layerDefinitions){var n=[];$.each(t.wimOptions.layerDefinitions,function(e,a){n[e]=a}),o.setLayerDefinitions(n)}t.wimOptions&&1==t.wimOptions.includeLegend&&legendLayers.unshift({layer:o,title:e}),L(a.groupHeading,a.showGroupHeading,o,e,i,t.options,t.wimOptions)}else if("agisImage"===t.wimOptions.layerType){var o=new l(t.url,t.options);t.wimOptions&&1==t.wimOptions.includeLegend&&legendLayers.unshift({layer:o,title:e}),t.visibleLayers&&o.setVisibleLayers(t.visibleLayers),L(a.groupHeading,a.showGroupHeading,o,e,i,t.options,t.wimOptions)}})})})}),$(".close-alert").click(function(){$(this).parent().slideUp(250)}),$(document).ready(function(){});