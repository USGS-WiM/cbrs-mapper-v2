//for jshint
//'use strict';
// Generated on 2015-04-13 using generator-wim 0.0.1

/**
 * Created by bdraper on 4/3/2015.
 */

var map;
var allLayers;
var maxLegendHeight;
var maxLegendDivHeight;
var printCount = 0;
var legendLayers = [];
var measurement;

var identifyTask, identifyParams;

var cbrsClicked = false;
var bufferClicked = false;

var selectPointonMap = false;
var pointSelection;
var inUnit = '';
var inUnitType = '';
var fiDate = "N/A";
var suDate = "N/A";
var pinLoc = 'out';
var infoPar = '';
var mapDate = '';
var mapNo = '';
var lat = 0;
var long = 0;
var locDesc;
var latLong;

require([
    'esri/map',
    'esri/arcgis/utils',
    'esri/config',
    'esri/dijit/Geocoder',
    'esri/dijit/HomeButton',
    'esri/dijit/Legend',
    'esri/dijit/LocateButton',
    'esri/dijit/Measurement',
    'esri/dijit/PopupTemplate',
    'esri/graphic',
    'esri/graphicsUtils',
    'esri/geometry/Extent',
    'esri/geometry/Multipoint',
    'esri/geometry/Point',
    'esri/layers/ArcGISTiledMapServiceLayer',
    'esri/renderers/UniqueValueRenderer',
    'esri/SpatialReference',
    'esri/symbols/PictureMarkerSymbol',
    'esri/symbols/SimpleFillSymbol',
    'esri/symbols/SimpleLineSymbol',
    'esri/tasks/DistanceParameters',
    'esri/tasks/GeometryService',
    'esri/Color',
    'esri/tasks/FindTask',
    'esri/tasks/FindParameters',
    'esri/tasks/FindResult',
    'esri/tasks/IdentifyParameters',
    'esri/tasks/IdentifyTask',
    'esri/tasks/LegendLayer',
    'esri/tasks/PrintTask',
    'esri/tasks/PrintParameters',
    'esri/tasks/PrintTemplate',
    'esri/tasks/query',
    'esri/tasks/QueryTask',
    'esri/tasks/BufferParameters',
    'esri/geometry/webMercatorUtils',
    'esri/urlUtils',
    'dojo/dom',
    'dojo/dom-class',
    'dojo/dnd/Moveable',
    'dojo/query',
    'dojo/on',
    'dojo/domReady!',
    'dojo/_base/array'
], function (
    Map,
    arcgisUtils,
    esriConfig,
    Geocoder,
    HomeButton,
    Legend,
    LocateButton,
    Measurement,
    PopupTemplate,
    Graphic,
    graphicsUtils,
    Extent,
    Multipoint,
    Point,
    ArcGISTiledMapServiceLayer,
    UniqueValueRenderer,
    SpatialReference,
    PictureMarkerSymbol,
    SimpleFillSymbol,
    SimpleLineSymbol,
    DistanceParameters,
    GeometryService,
    Color,
    FindTask,
    FindParameters,
    FindResult,
    IdentifyParameters,
    IdentifyTask,
    LegendLayer,
    PrintTask,
    PrintParameters,
    PrintTemplate,
    Query,
    QueryTask,
    BufferParameters,
    webMercatorUtils,
    urlUtils,
    dom,
    domClass,
    Moveable,
    query,
    on,
    array
) {

        //bring this line back after experiment////////////////////////////
        //allLayers = mapLayers;


        esriConfig.defaults.io.corsEnabledServers.push("fwsprimary.wim.usgs.gov");
        //esri.config.defaults.io.proxyUrl = "https://fwsprimary.wim.usgs.gov/serviceProxy/proxy.ashx";

        esriConfig.defaults.geometryService = new GeometryService("https://fwsmapper.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer");

        /*urlUtils.addProxyRule({
                                proxyUrl: "http://52.70.106.103/serviceProxy/proxy.ashx",
                                urlPrefix: "http://52.70.106.103/arcgis/rest/services/SecurePrinting/"
                            });
        
        urlUtils.addProxyRule({
                                proxyUrl: "http://52.70.106.103/serviceProxy/proxy.ashx",
                                urlPrefix: "http://52.70.106.103/arcgis/rest/services/Wetlands"
                            });
    
        urlUtils.addProxyRule({
                                proxyUrl: "http://52.70.106.103/serviceProxy/proxy.ashx",
                                urlPrefix: "http://52.70.106.103/arcgis/rest/services/Wetlands_Raster"
                            });
    
        urlUtils.addProxyRule({
                                proxyUrl: "http://52.70.106.103/serviceProxy/proxy.ashx",
                                urlPrefix: "http://52.70.106.103/arcgis/rest/services/Wetlands_Status"
                            });
    
        urlUtils.addProxyRule({
                                proxyUrl: "http://52.70.106.103/serviceProxy/proxy.ashx",
                                urlPrefix: "http://52.70.106.103/arcgis/rest/services/Riparian"
                            });
    
        urlUtils.addProxyRule({
                                proxyUrl: "http://52.70.106.103/serviceProxy/proxy.ashx",
                                urlPrefix: "http://52.70.106.103/arcgis/rest/services/Data_Source"
                            });
    
        urlUtils.addProxyRule({
                                proxyUrl: "http://52.70.106.103/serviceProxy/proxy.ashx",
                                urlPrefix: "http://52.70.106.103/arcgis/rest/services/Historic_Wetlands"
                            });*/
        // unablet to add infoWindow: popup
        map = new Map('mapDiv', {
            basemap: 'satellite',
            extent: new Extent(-14638882.654811008, 2641706.3772205533, -6821514.898031538, 6403631.161302788, new SpatialReference({ wkid: 3857 })),
        });

        var home = new HomeButton({
            map: map,
            extent: new Extent(-14638882.654811008, 2641706.3772205533, -6821514.898031538, 6403631.161302788, new SpatialReference({ wkid: 3857 }))
        }, "homeButton");
        home.startup();

        var locate = new LocateButton({
            map: map,
            scale: 4514,
        }, "locateButton");
        locate.startup();

        measurement = new Measurement({
            map: map,
            advancedLocationUnits: true
        }, dom.byId("measurementDiv"));
        measurement.startup();

        //var utmCoords = $('<tr class="esriMeasurementTableRow" id="utmCoords"><td><span>UTM17</span></td><td class="esriMeasurementTableCell"> <span id="utmX" dir="ltr">UTM X</span></td> <td class="esriMeasurementTableCell"> <span id="utmY" dir="ltr">UTM Y</span></td></tr>');
        //$('.esriMeasurementResultTable').append(utmCoords);

        //following block forces map size to override problems with default behavior
        $(window).resize(function () {
            if ($("#legendCollapse").hasClass('in')) {
                maxLegendHeight = ($('#mapDiv').height()) * 0.90;
                //$('#legendElement').css('height', maxLegendHeight);
                $('#legendElement').css('max-height', maxLegendHeight);
                maxLegendDivHeight = ($('#legendElement').height());
                $('#legendDiv').css('max-height', maxLegendDivHeight);
            }
            else {
                $('#legendElement').css('height', 'initial');
            }
            var maxDisclaimerHeight = ($(window).height()) * 0.80;
            $('#disclaimerModal .modal-content').css('max-height', maxDisclaimerHeight);
            $('#validationModal .modal-content').css('max-height', maxDisclaimerHeight);
        });

        var maxDisclaimerHeight = ($(window).height()) * 0.80;
        $('#disclaimerModal .modal-content').css('max-height', maxDisclaimerHeight);
        $('#validationModal .modal-content').css('max-height', maxDisclaimerHeight);

        function showPrintModal() {
            $('#printModal').modal('show');
        }

        $('#printNavButton').click(function () {
            showPrintModal();
        });

        $('#printExecuteButton').click(function (e) {
            e.preventDefault();
            $(this).button('loading');
            printMap();
        });

        $('#clearPoint').click(function() {
            map.graphics.clear();
            document.getElementById('selectPoint').setAttribute("class", "btn btn-default btn-fixed");
            document.getElementById("legendPoint").setAttribute("class", "legendPt")
        })

        $('#clearPrintJobs').click(function() {
            $('.printJobs').html('<p class="toRemove"> No print jobs yet</p><br>');
            $('#clearPrintJobs').css("display", "none");
        })

        $('#getDataButton').click(function () {
            showGetDataModal();
        });

        function showGetDataModal() {
            $('#getDataModal').modal('show');
        }
        
        /*aoiSymbol = new PictureMarkerSymbol("../images/grn-pushpin.png", 45, 45);
    
        renderer.addValue({
            symbol: aoiSymbol
        });*/

        //displays map scale on map load
        on(map, "load", function () {
            var scale = map.getScale().toFixed(0);
            $('#scale')[0].innerHTML = addCommas(scale);
            var initMapCenter = webMercatorUtils.webMercatorToGeographic(map.extent.getCenter());
            $('#latitude').html(initMapCenter.y.toFixed(3));
            $('#longitude').html(initMapCenter.x.toFixed(3));
            //map.setBasemap("topo");
            //map.setBasemap("hybrid");
        });

        //displays map scale on scale change (i.e. zoom level)
        on(map, "zoom-end", function () {
            var scale = map.getScale().toFixed(0);
            $('#scale')[0].innerHTML = addCommas(scale);
        });

        //updates lat/lng indicator on mouse move. does not apply on devices w/out mouse. removes "map center" label
        on(map, "mouse-move", function (cursorPosition) {
            $('#mapCenterLabel').css("display", "none");
            if (cursorPosition.mapPoint != null) {
                var geographicMapPt = webMercatorUtils.webMercatorToGeographic(cursorPosition.mapPoint);
                $('#latitude').html(geographicMapPt.y.toFixed(3));
                $('#longitude').html(geographicMapPt.x.toFixed(3));
            }
        });
        //updates lat/lng indicator to map center after pan and shows "map center" label.
        on(map, "pan-end", function () {
            //displays latitude and longitude of map center
            $('#mapCenterLabel').css("display", "inline");
            var geographicMapCenter = webMercatorUtils.webMercatorToGeographic(map.extent.getCenter());
            $('#latitude').html(geographicMapCenter.y.toFixed(3));
            $('#longitude').html(geographicMapCenter.x.toFixed(3));
        });
        var usgsTopo = new ArcGISTiledMapServiceLayer('https://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer');
        var nationalMapBasemap = new ArcGISTiledMapServiceLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer');
        var usgsImageryTopo = new ArcGISTiledMapServiceLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer');

        //on clicks to swap basemap. map.removeLayer is required for nat'l map b/c it is not technically a basemap, but a tiled layer.
        on(dom.byId('btnStreets'), 'click', function () {
            map.setBasemap('streets');
            map.removeLayer(nationalMapBasemap);
            map.removeLayer(usgsTopo);
            map.removeLayer(usgsImageryTopo);
        });
        on(dom.byId('btnSatellite'), 'click', function () {
            map.setBasemap('satellite');
            map.removeLayer(nationalMapBasemap);
            map.removeLayer(usgsTopo);
            map.removeLayer(usgsImageryTopo);
        });
        on(dom.byId('btnHybrid'), 'click', function () {
            map.setBasemap('hybrid');
            map.removeLayer(nationalMapBasemap);
            map.removeLayer(usgsTopo);
            map.removeLayer(usgsImageryTopo);
        });
        on(dom.byId('btnTerrain'), 'click', function () {
            map.setBasemap('terrain');
            map.removeLayer(nationalMapBasemap);
            map.removeLayer(usgsTopo);
            map.removeLayer(usgsImageryTopo);
        });
        on(dom.byId('btnGray'), 'click', function () {
            map.setBasemap('gray');
            map.removeLayer(nationalMapBasemap);
            map.removeLayer(usgsTopo);
            map.removeLayer(usgsImageryTopo);
        });
        on(dom.byId('btnNatGeo'), 'click', function () {
            map.setBasemap('national-geographic');
            map.removeLayer(nationalMapBasemap);
            map.removeLayer(usgsTopo);
            map.removeLayer(usgsImageryTopo);
        });
        on(dom.byId('btnOSM'), 'click', function () {
            map.setBasemap('osm');
            map.removeLayer(nationalMapBasemap);
            map.removeLayer(usgsTopo);
            map.removeLayer(usgsImageryTopo);
        });
        on(dom.byId('btnTopo'), 'click', function () {
            map.setBasemap('topo');
            map.removeLayer(nationalMapBasemap);
            map.removeLayer(usgsTopo);
            map.removeLayer(usgsImageryTopo);
        });

        on(dom.byId('btnNatlMap'), 'click', function () {
            map.addLayer(nationalMapBasemap, 1);
            map.removeLayer(usgsTopo);
            map.removeLayer(usgsImageryTopo);
            map.removeLayer(usgsImageryTopo);
        });

        on(dom.byId('btnUsgsImgTopo'), 'click', function () {
            map.setBasemap('satellite');
            map.addLayer(usgsImageryTopo, 1);
            map.removeLayer(nationalMapBasemap);
            map.removeLayer(usgsTopo);
        });

        on(dom.byId('btnUsgsTopo'), 'click', function () {
            map.addLayer(usgsTopo, 1);
            map.removeLayer(nationalMapBasemap);
            map.removeLayer(usgsImageryTopo);
        })

        identifyParams = new IdentifyParameters();
        identifyParams.tolerance = 0;
        identifyParams.returnGeometry = true;
        identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
        identifyParams.layerIds = [0, 2, 4, 6];
        identifyParams.spatialReference = map.spatialReference;
        identifyParams.width = map.width;
        identifyParams.height = map.height;
        //identifyTask = new esri.tasks.IdentifyTask("http://50.17.205.92/arcgis/rest/services/NAWQA/DecadalMap/MapServer");
        identifyTask = new IdentifyTask("https://fwsprimary.wim.usgs.gov/server/rest/services/CBRAMapper/CBRS_Prohibitions_Test/MapServer");

        //start LobiPanel
        $("#selectionDiv").lobiPanel({
            unpin: false,
            reload: false,
            minimize: false,
            close: false,
            expand: false,
            editTitle: false,
            maxWidth: 800,
            maxHeight: 500,
        });

        $("#selectionDiv .dropdown").prepend("<div id='selectionClose' tite='close'><b>X</b></div>");
        //$("#selectionDiv .dropdown").prepend("<div id='selectionMin' title='collapse'><b>_</b></div>");

        $("#selectionMin").click(function () {
            $("#selectionDiv").css("visibility", "hidden");
            /*$("#selection-tools-alert").slideDown(250);*/
        });

        $("#selectionClose").click(function () {
            $("#selectionDiv").css("visibility", "hidden");
            map.graphics.clear();
        });
        //End LobiPanel

        $('#selectPoint').click(function() {
            map.graphics.clear();
            selectPointonMap = true;
            $('#validationModal').modal('hide');
        });

        $('#runValidation').click(function () {
            var proc = deferredProcess();
            proc.then(function(results) {
                printVal();
            })
        });


        //start LobiPanel for Buffer
        $("#bufferDiv").lobiPanel({
            unpin: false,
            reload: false,
            minimize: false,
            close: false,
            expand: false,
            editTitle: false,
            maxWidth: 800,
            maxHeight: 500,
        });

        $("#bufferDiv .dropdown").prepend("<div id='bufferClose' tite='close'><b>X</b></div>");
        //$("#selectionDiv .dropdown").prepend("<div id='selectionMin' title='collapse'><b>_</b></div>");

        /*$("#selectionMin").click(function(){
            $("#bufferDiv").css("visibility", "hidden");
            $("#selection-tools-alert").slideDown(250);
        });*/

        $("#bufferClose").click(function () {
            $("#bufferDiv").css("visibility", "hidden");
        });
        //End LobiPanel


        //map click handler
        on(map, "click", function (evt) {

            if (cbrsClicked == true) {
                cbrsClicked = false;
                return;
            }

            if (bufferClicked == true) {
                bufferClicked = false;
                return;
            }

            if (measurement.activeTool != null) {
                return;//
            }

            map.graphics.clear();
            document.getElementById('selectPoint').setAttribute("class", "btn btn-default btn-fixed");
            //map.infoWindow.hide();s

            //alert("scale: " + map.getScale() + ", level: " + map.getLevel());

            identifyParams.geometry = evt.mapPoint;
            identifyParams.mapExtent = map.extent;

            if (map.getLevel()) {
                //the deferred variable is set to the parameters defined above and will be used later to build the contents of the infoWindow.
                identifyTask = new IdentifyTask("https://fwsprimary.wim.usgs.gov/server/rest/services/CBRAMapper/CBRS_Prohibitions_Test/MapServer");
                var deferredResult = identifyTask.execute(identifyParams);
                
                setCursorByID("mainDiv");

                deferredResult.addCallback(function (response) {
                    
                    if (response.length !== 0 && !selectPointonMap) {
                        document.getElementById("legendPoint").setAttribute("class", "legendPt")
                        var feature;
                        var attr;
                        var attrStatus;
                        var unit;
                        var aGraphic;
                        var bGraphic;

                        for (i = 0; i < response.length; i++) {

                            if (response[i].layerName == "CBRS Units") {
                                containsUnit = true;
                                unit = response[i].feature.attributes.Unit;
                            }
                        }

                        for (var i = 0; i < response.length; i++) {
                            feature = response[i].feature;

                            //getting feature attributes
                            attr = feature.attributes;

                            var symbol;
                            if (response[i].layerName == "CBRS Units") {
                                $("#unitId").text(attr["Unit"]);
                                $("#unitName").text(attr["Name"]);
                                $("#unitType").text(attr["Unit_Type"]);

                                if (attr["Fast_Acres"] || attr["Wet_Acres"] !== "") {
                                    var totalAcre;
                                    totalAcre = Number(attr["Fast_Acres"]) + Number(attr["Wet_Acres"]) || "Data not available at this time";
                                };

                                $('#totalAcre').text(addCommas(totalAcre));

                                symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                                    new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                        new dojo.Color([255, 225, 0]), 2), new dojo.Color([98, 194, 204, 0])
                                );

                                feature.geometry.spatialReference = map.spatialReference;
                                var graphic = feature;
                                graphic.setSymbol(symbol);

                                map.graphics.add(graphic);


                                $("#selectionDiv").css("visibility", "visible");
                                var instance = $('#selectionDiv').data('lobiPanel');
                                var docHeight = $(document).height();
                                var docWidth = $(document).width();
                                var percentageOfScreen = 0.9;

                                var instanceX = docWidth * 0.5 - $("#selectionDiv").width() * 0.5;
                                var instanceY = docHeight * 0.8 - $("#selectionDiv").height() * 1.0;


                                instance.setPosition(instanceX, instanceY);
                                if (instance.isPinned() == true) {
                                    instance.unpin();
                                }


                            } else if (response[i].layerName == "CBRS Map Footprints" && response[i].feature.attributes.Title.search(unit) != -1) {
                                $("#mapLink").html('<a href="' + attr["Map_Link"] + '" target="_blank">Click here for official CBRS map</a>');
                                $("#mapDate").text(attr["Map_Date"]);
                                $("#titleOne").text(attr["Title"]);
                                $("#titleTwo").html(attr["Title_2"])
                                $("#titleThree").text(attr["Title_3"]);

                                symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                                    new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                        new dojo.Color([255, 0, 225]), 2), new dojo.Color([98, 194, 204, 0])
                                );

                                if (attr["Title_2"] == "Null") {
                                    $("#titleTwo").hide(attr["Title_2"]);
                                    $(".hideNullTwo").hide();
                                } else {
                                    $("#titleTwo").show(attr["Title_2"]);
                                    $(".hideNullTwo").show();
                                } if (attr["Title_3"] == "Null") {
                                    $("#titleThree").hide(attr["Title_3"]);
                                    $(".hideNullThree").hide();
                                } else {
                                    $("#titleThree").show(attr["Title_3"]);
                                    $(".hideNullThree").show();
                                }

                                feature.geometry.spatialReference = map.spatialReference;
                                var graphic = feature;
                                graphic.setSymbol(symbol);

                                map.graphics.add(graphic);

                            } else if (response[i].layerName == "CBRS Map Footprints" && response[i].feature.attributes.Title_2.search(unit) != -1) {
                                $("#mapLink").html('<a href="' + attr["Map_Link"] + '" target="_blank">Click here for official CBRS map</a>');
                                $("#mapDate").text(attr["Map_Date"]);
                                $("#titleOne").text(attr["Title"]);
                                $("#titleTwo").html(attr["Title_2"])
                                $("#titleThree").text(attr["Title_3"]);

                                symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                                    new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                        new dojo.Color([255, 0, 225]), 2), new dojo.Color([98, 194, 204, 0])
                                );

                                if (attr["Title_2"] == "Null") {
                                    $("#titleTwo").hide(attr["Title_2"]);
                                    $(".hideNullTwo").hide();
                                } else {
                                    $("#titleTwo").show(attr["Title_2"]);
                                    $(".hideNullTwo").show();
                                }

                                feature.geometry.spatialReference = map.spatialReference;
                                var graphic = feature;
                                graphic.setSymbol(symbol);

                                map.graphics.add(graphic);

                            } else if (response[i].layerName == "CBRS Map Footprints" && response[i].feature.attributes.Title_3.search(unit) != -1) {
                                $("#mapLink").html('<a href="' + attr["Map_Link"] + '" target="_blank">Click here for official CBRS map</a>');
                                $("#mapDate").text(attr["Map_Date"]);
                                $("#titleOne").text(attr["Title"]);
                                $("#titleTwo").html(attr["Title_2"])
                                $("#titleThree").text(attr["Title_3"]);

                                symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                                    new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                        new dojo.Color([255, 0, 225]), 2), new dojo.Color([98, 194, 204, 0])
                                );
                                if (attr["Title_3"] == "Null") {
                                    $("#titleThree").hide(attr["Title_3"]);
                                    $(".hideNullThree").hide();
                                } else {
                                    $("#titleThree").show(attr["Title_3"]);
                                    $(".hideNullThree").show();
                                }

                                feature.geometry.spatialReference = map.spatialReference;
                                var graphic = feature;
                                graphic.setSymbol(symbol);

                                map.graphics.add(graphic);

                            } else if (response[i].layerName == "CBRS Prohibitions") {
                                if (feature) {
                                    var su_date = attr["SU_Date"];
                                    if (su_date == "Null") {
                                        su_date = "N/A"
                                    }
                                    $("#FIDate").text(attr["FI_Date"]);
                                    $("#SUDate").text(su_date);
                                }
                            } if (response[i].layerId == 2) {
                                symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                                    new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                                        new dojo.Color([0, 0, 0]), 2), new dojo.Color([0, 0, 0, 0])
                                );
                                /*$('#contactTob').modal('hide');
                                $('#aboutModal').modal('show');
                                $('#aboutTab').trigger('click');*/

                                $("#bufferDiv").css("visibility", "visible");
                                var instance = $('#bufferDiv').data('lobiPanel');
                                var docHeight = $(document).height();
                                var docWidth = $(document).width();
                                var percentageOfScreen = 0.9;

                                var instanceX = docWidth * 0.5 - $("#bufferDiv").width() * 0.5;
                                var instanceY = docHeight * 0.8 - $("#bufferDiv").height() * 1.0;


                                instance.setPosition(instanceX, instanceY);
                                if (instance.isPinned() == true) {
                                    instance.unpin();
                                }

                                if ($("#bufferDiv").css("visibility", "visible")) {
                                    ($("#selectionDiv").modal(hide));
                                }
                            }


                        }

                        setCursorByID("mainDiv", "default");
                        map.setCursor("default");


                    } else if (selectPointonMap) {
                        if (map.getLevel() < 16) {
                            alert('Please zoom in closer to select a point on the map.')
                        } else {
                            map.graphics.clear();
                            long = evt.mapPoint.x.toString()
                            lat = evt.mapPoint.y.toString()
                            inUnit = '';
                            inUnitType = '';
                            fiDate = 'N/A';
                            suDate = 'N/A';
                            pinLoc = 'out';
                            mapDate = '';
                            mapNo = '';
                            locDesc = '';
                            var inBuffer = false;
                            if (response.length > 0) {
                                for (var i = 0; i < response.length; i++) {
                                    if (response[i].layerName == 'CBRS Prohibitions' && !inBuffer) {
                                        inUnit = response[i].feature.attributes.Unit;
                                        inUnitType = response[i].feature.attributes.CBRS_Type;
                                        fiDate = response[i].feature.attributes.FI_Date;
                                        suDate = response[i].feature.attributes.SU_Date;
                                        pinLoc = 'in';
                                    } else if (response[i].layerName == 'CBRS Buffer Zone') {
                                        inBuffer = true;
                                        pinLoc = 'buff';
                                    } else if (response[i].layerName == 'CBRS Map Footprints') {
                                        mapDate = response[i].feature.attributes.Map_Date;
                                        mapNo = response[i].feature.attributes.Panel_No;
                                    }
                                }
                            }
                            getMapPoint(lat, long)
                            selectPointonMap = false;
                        }
                    }
                });
            }
        });

        // Symbols
        /*var sym = createPictureSymbol('../images/purple-pin.png', 0, 12, 13, 24);*/

        function printMap() {
            var text = "This map is for general reference only. The Coastal Barrier Resources System (CBRS) boundaries depicted on this map are representations " +
                "of the controlling CBRS boundaries, which are shown on the official maps, accessible at <a href='https://www.fws.gov/cbra/maps/index.html' target='_blank'>" +
                "<UND><CLR blue='255'>https://www.fws.gov/cbra/maps/index.html</CLR></UND></a>. All CBRS related data should be used in accordance with the layer metadata found " +
                "on the CBRS Mapper website. \r\n\r\n The CBRS Buffer Zone represents the area immediately adjacent to the CBRS boundary where users are advised to contact " +
                "the Service for an official determination (<a href='http://www.fws.gov/cbra/Determinations.html' target='_blank'><UND><CLR blue='255'>http://www.fws.gov/cbra/Determinations.html" +
                '</CLR></UND></a>) as to whether the property or project site is located "in" or "out" of the CBRS. \r\n\r\n CBRS Units normally extend seaward out to the ' +
                "20- or 30-foot bathymetric contour (depending on the location of the unit). The true seaward extent of the units is not shown in the CBRS mapper."

            var printParams = new PrintParameters();
            printParams.map = map;

            var template = new PrintTemplate();
            template.exportOptions = {
                width: 500,
                height: 400,
                dpi: 300
            };
            template.format = "PDF";
            template.layout = "Letter ANSI A Landscape CBRS Mapper V2";
            template.preserveScale = false;
            var cbrsLegendLayer = new LegendLayer();
            cbrsLegendLayer.layerId = "cbrs";
            cbrsLegendLayer.subLayerIds = [2,4,5];

            var userTitle = $("#printTitle").val();
            //if user does not provide title, use default. otherwise apply user title
            if (userTitle == "") {
                template.layoutOptions = {
                    "titleText": "CBRS",
                    "copyrightText": "This page was produced by the CBRS Mapper",
                    "legendLayers": [cbrsLegendLayer],
                    "customTextElements": [{CustomText: text}]
                };
            } else {
                template.layoutOptions = {
                    "titleText": userTitle,
                    "copyrightText": "This page was produced by the CBRS Mapper",
                    "legendLayers": [cbrsLegendLayer],
                    "customTextElements": [{CustomText: text}]
                };
            }

            //"legendLayers": [legendLayer]
            var docTitle = template.layoutOptions.titleText;
            printParams.template = template;
            var printMap = new PrintTask("https://fwsprimary.wim.usgs.gov/server/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");
            printMap.execute(printParams, printDone, printError);

            /* $.get("https://fwsprimary.wim.usgs.gov/pdfLoggingService/pdfLog.asmx/Log?printInfo=" + map.getScale() + "," + map.extent.xmin + "," + map.extent.ymax + "," + map.extent.xmax + "," + map.extent.ymin + ",NWIV2", function(data) {
               //console.log(data);
            }); */

            function printDone(event) {
                //alert(event.url);
                //window.open(event.url, "_blank");
                printCount++;
                //var printJob = $('<a href="'+ event.url +'" target="_blank">Printout ' + printCount + ' </a>');
                var printJob = $('<p><label>' + printCount + ': </label>&nbsp;&nbsp;<a href="' + event.url + '" target="_blank">' + docTitle + ' </a></p>');
                //$("#print-form").append(printJob);
                $("#printJobsDiv").find("p.toRemove").remove();
                $("#printModalBody").append(printJob);
                $("#printTitle").val("");
                $("#printExecuteButton").button('reset');
            }

            function printError(event) {
                alert("Sorry, an unclear print error occurred. Please try refreshing the application to fix the problem");
            }
        }

        function printVal() {
            var valParams = new PrintParameters();
            valParams.map = map;
        
            var valTemplate = new PrintTemplate();
            valTemplate.exportOptions = {
                width: 400,
                height: 550,
                dpi: 300
            };
            valTemplate.format = "PDF";
            valTemplate.layout = "Letter ANSI A Portrait CBRS Mapper V2_Prohibitions";
            valTemplate.preserveScale = false;
        
            valTemplate.layoutOptions = {
                "titleText": userTitle,
                "copyrightText": "This page was produced by the CBRS Mapper",
                "legendLayers": [],
                "scalebarUnit": "Feet",
                "customTextElements": [{CustomText_info: infoPar}, {CustomText_LatLong: latLong}]
            };
        
            //"legendLayers": [legendLayer]
            var docTitle = valTemplate.layoutOptions.titleText;
            valParams.template = valTemplate;
            var printMap = new PrintTask("https://fwsprimary.wim.usgs.gov/server/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");
            printMap.execute(valParams, printDone, printError);
        
            function printDone(event) {
                //alert(event.url);
                //window.open(event.url, "_blank");
                printCount++;
                var printJob = $('<p><label>' + printCount + ': </label>&nbsp;&nbsp;<a href="' + event.url + '" target="_blank">' + docTitle + ' </a></p>');
                //$("#print-form").append(printJob);
                $(".printJobs").append(printJob);
                $('#printProc').css("display", "none");
                $('#clearPrintJobs').css("display", "inline");
                infoPar = '';
            }
        
            function printError(event) {
                alert("Sorry, an unclear print error occurred. Please try refreshing the application to fix the problem");
            }

            //saveCoord()
        }

        function saveCoord() {
            var request;
            if (request) {
                request.abort();
            }

            var now = new Date();
            var datetime = now.getDate();

            $.ajax({
                url: "https://docs.google.com/spreadsheets/d/1rtSXuVChGHwN97wfxs-nEIOjh4G7iS_NUAlMXspZmXM/edit#gid=0",
                type: "post",
                data: datetime,
                success: function (response) {
                    console.log(response);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            }) //may need to do some sort of form
        }

        map.on('load', function () {
            map.infoWindow.set('highlight', false);
            map.infoWindow.set('titleInBody', false);
            map.addLayer(usgsImageryTopo, 1); //Makes the Naip (USGSImageryTopo) the basemap
            $('#disclaimerModal').modal('show');
        });

        //create CBRS Unit Search
        var findCBRS = new FindTask('https://fwsprimary.wim.usgs.gov/server/rest/services/CBRAMapper/CBRS_Prohibitions_Test/MapServer');
        var params = new FindParameters();
        params.layerIds = [4];
        params.searchFields = ["Unit"];
        params.outSpatialReference = map.spatialReference;
        params.returnGeometry = true;
        console.log("find unit:", params.outSpatialReference);

        function doFind() {
            params.searchText = dom.byId("searchText").value;
            findCBRS.execute(params, showResults);
        }

        function showResults(results) {
            if (results.length > 0) {
                var graphics = [];
                var graphic = results[0].feature;
                graphics.push(graphic);
                var graphicsExtent = graphicsUtils.graphicsExtent(graphics);
                map.setExtent(graphicsExtent);
            }
            else {
                $("#invalidSearchModal").modal('show');
            }
        }


        $("#btnUnitSearch").click(doFind);

        // create search_api widget in element "geosearch"



        search_api.create("geosearch", {
            on_result: function (o) {
                // what to do when a location is found
                // o.result is geojson point feature of location with properties
                // zoom to location
                require(["esri/geometry/Extent"], function (Extent) {
                    var noExtents = ["GNIS_MAJOR", "GNIS_MINOR", "ZIPCODE", "AREACODE"];
                    var noExtentCheck = noExtents.indexOf(o.result.properties["Source"])
                    $("#geosearchModal").modal('hide');
                    if (noExtentCheck == -1) {
                        map.setExtent(
                            new esri.geometry.Extent({
                                xmin: o.result.properties.LonMin,
                                ymin: o.result.properties.LatMin,
                                xmax: o.result.properties.LonMax,
                                ymax: o.result.properties.LatMax,
                                spatialReference: { "wkid": 4326 }
                            }),
                            true
                        );
                    } else {
                        //map.setCenter();
                        require(["esri/geometry/Point"], function (Point) {
                            map.centerAndZoom(
                                new Point(o.result.properties.Lon, o.result.properties.Lat),
                                12
                            );
                        });
                    }
                });

            },
            "include_usgs_sw": true,
            "include_usgs_gw": true,
            "include_usgs_sp": true,
            "include_usgs_at": true,
            "include_usgs_ot": true,
            "include_huc2": true,
            "include_huc4": true,
            "include_huc6": true,
            "include_huc8": true,
            "include_huc10": true,
            "include_huc12": true,

            /*on_failure: function(o){
            $("#test").html("Sorry, a location could not be found in search for '"+o.val()+"'");
               $("#invalidSearchLocationModal").modal('show');
            }*/
        });


        // Geosearch functions
        /*on(dom.byId('btnGeosearch'),'click', geosearch);*/

        // Optionally confine search to map extent
        /*function setSearchExtent (){
            geocoder.activeGeocoder.searchExtent = null;*/
        /*if (dom.byId('chkExtent').checked === 1) {
            geocoder.activeGeocoder.searchExtent = map.extent;
        } else {
            geocoder.activeGeocoder.searchExtent = null;
        }*/
        /*}*/
        /*function geosearch() {
            setSearchExtent();
            var def = geocoder.find();
            def.then(function (res){
                geocodeResults(res);
            });
            // Close modal
            $('#geosearchModal').modal('hide');
        }*/
        /*function geocodeSelect(item) {
            clearFindGraphics();
            var g = (item.graphic ? item.graphic : item.result.feature);
            g.setSymbol(sym);
            //addPlaceGraphic(item.result,g.symbol);
            // Close modal
            //$('#geosearchModal').modal('hide');
        }*/
        /*function geocodeResults(places) {
            places = places.results;
            if (places.length > 0) {
                clearFindGraphics();
                var symbol = sym;
                // Create and add graphics with pop-ups
                for (var i = 0; i < places.length; i++) {
                    //addPlaceGraphic(places[i], symbol);
                }
                //zoomToPlaces(places);
                if (places[0].extent != null) {
                    map.setExtent(places[0].extent, true)
                } else {
                    var centerPoint = new Point(places[0].feature.geometry);
                    map.centerAndZoom(centerPoint, 17);
                }
            } else {
                //alert('Sorry, address or place not found.');  // TODO
            }
        }*/
        /*function stripTitle(title) {
            var i = title.indexOf(',');
            if (i > 0) {
                title = title.substring(0,i);
            }
            return title;
        }
        function addPlaceGraphic(item,symbol)  {
            var place = {};
            var attributes,infoTemplate,pt,graphic;
            pt = item.feature.geometry;
            place.address = item.name;
            place.score = item.feature.attributes.Score;
            // Graphic components
            attributes = { address:stripTitle(place.address), score:place.score, lat:pt.getLatitude().toFixed(2), lon:pt.getLongitude().toFixed(2) };
            infoTemplate = new PopupTemplate({title:'{address}', description: 'Latitude: {lat}<br/>Longitude: {lon}'});
            graphic = new Graphic(pt,symbol,attributes,infoTemplate);
            // Add to map
            map.graphics.add(graphic);
        }*/

        /*function zoomToPlaces(places) {
            var multiPoint = new Multipoint(map.spatialReference);
            for (var i = 0; i < places.length; i++) {
                multiPoint.addPoint(places[i].feature.geometry);
            }
            map.setExtent(multiPoint.getExtent().expand(2.0));
        }*/

        /*function clearFindGraphics() {
            map.infoWindow.hide();
            map.graphics.clear();
        }*/

        /*function createPictureSymbol(url, xOffset, yOffset, xWidth, yHeight) {
            return new PictureMarkerSymbol(
                {
                    'angle': 0,
                    'xoffset': xOffset, 'yoffset': yOffset, 'type': 'esriPMS',
                    'url': url,
                    'contentType': 'image/png',
                    'width':xWidth, 'height': yHeight
                });
        }*/

        function setCursorByID(id, cursorStyle) {
            var elem;
            if (document.getElementById &&
                (elem = document.getElementById(id))) {
                if (elem.style) elem.style.cursor = cursorStyle;
            }
        }

        // Show modal dialog; handle legend sizing (both on doc ready)
        $(document).ready(function () {
            function showModal() {
                $('#geosearchModal').modal('show');
            }
            // Geosearch nav menu is selected
            $('#geosearchNav').click(function () {
                showModal();
            });

            $('.showAboutModal').click(function () {
                $('#contactTob').modal('hide');
                $('#aboutModal').modal('show');
                $('#aboutTab').trigger('click');
            });

            function showAboutModal() {
                $('#aboutModal').modal('show');
                $('')
            }
            $('#aboutNav').click(function () {
                showAboutModal();
            });

            function showDisclaimerModal() {
                $('#disclaimerModal').modal('show');
            }

            $("#html").niceScroll();
            $("#sidebar").niceScroll();
            $("#sidebar").scroll(function () {
                $("#sidebar").getNiceScroll().resize();
            });

            maxLegendHeight = ($('#mapDiv').height()) * 0.90;
            $('#legendElement').css('max-height', maxLegendHeight);
            $('#legendDiv').css('max-height', maxLegendDivHeight);

            /*$('#legendCollapse').on('hide.bs.collapse', function () {
                $('#legendElement').css('height', 'initial');
            });*/

            $('#measurementCollapse').on('shown.bs.collapse', function () {
                //show label when the collapse panel is expanded(for mobile, where label is hidden while collapsed)
                $('#measureLabel').show();
            });
            $('#measurementCollapse').on('hide.bs.collapse', function () {
                //hide label on collapse if window is small (mobile)
                if (window.innerWidth <= 767) {
                    $('#measureLabel').hide();
                }
            });

        });

        $(document).ready(function () {
            function showModal() {
                $('#cbrsModal').modal('show');
            }

            $('#cbrsNav').click(function () {
                showModal();
            });
        });

        // invalid CBRS search modal
        $(document).ready(function () {
            function showModal() {
                $('#invalidSearchModal').modal('show');
            }
        });

        $(document).ready(function () {
            function showModal() {
                $('#invalidSearchLocationModal').modal('show');
            }
        });

        $(document).ready(function () {
            $('#validationNav').click(function () {
                $('#validationModal').modal('show');
            });

        });

        require([
            'esri/InfoTemplate',
            'esri/tasks/locator',
            'esri/tasks/query',
            'esri/tasks/QueryTask',
            'esri/graphicsUtils',
            'esri/geometry/Point',
            'esri/geometry/Extent',
            'esri/layers/ArcGISDynamicMapServiceLayer',
            'esri/layers/ArcGISImageServiceLayer',
            'esri/layers/FeatureLayer',
            'esri/layers/WMSLayer',
            'esri/layers/WMSLayerInfo',
            'esri/tasks/GeometryService',
            'dijit/form/CheckBox',
            'dijit/form/RadioButton',
            'dojo/query',
            'dojo/dom',
            'dojo/dom-class',
            'dojo/dom-construct',
            'dojo/dom-style',
            'dojo/on'
        ], function (
            InfoTemplate,
            Locator,
            Query,
            QueryTask,
            graphicsUtils,
            Point,
            Extent,
            ArcGISDynamicMapServiceLayer,
            ArcGISImageServiceLayer,
            FeatureLayer,
            WMSLayer,
            WMSLayerInfo,
            GeometryService,
            CheckBox,
            RadioButton,
            query,
            dom,
            domClass,
            domConstruct,
            domStyle,
            on
        ) {

                var layersObject = [];
                var layerArray = [];
                var staticLegendImage;
                var identifyTask, identifyParams;
                var navToolbar;
                var locator;

                var geomService = new GeometryService("https://fwsmapper.wim.usgs.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer");

                //create global layers lookup
                var mapLayers = [];

                $.each(allLayers, function (index, group) {
                    console.log('processing: ', group.groupHeading)


                    //sub-loop over layers within this groupType
                    $.each(group.layers, function (layerName, layerDetails) {



                        //check for exclusiveGroup for this layer
                        var exclusiveGroupName = '';
                        if (layerDetails.wimOptions.exclusiveGroupName) {
                            exclusiveGroupName = layerDetails.wimOptions.exclusiveGroupName;
                        }

                        else if (layerDetails.wimOptions.layerType === 'agisDynamic') {
                            var layer = new ArcGISDynamicMapServiceLayer(layerDetails.url, layerDetails.options);
                            //check if include in legend is true
                            if (layerDetails.visibleLayers) {
                                layer.setVisibleLayers(layerDetails.visibleLayers);
                            }
                            if (layerDetails.wimOptions && layerDetails.wimOptions.layerDefinitions) {
                                var layerDefs = [];
                                $.each(layerDetails.wimOptions.layerDefinitions, function (index, def) {
                                    layerDefs[index] = def;
                                });
                                layer.setLayerDefinitions(layerDefs);
                            }
                            if (layerDetails.wimOptions && layerDetails.wimOptions.includeLegend == true) {
                                legendLayers.unshift({ layer: layer, title: layerName });
                            }

                            //map.addLayer(layer);
                            addLayer(group.groupHeading, group.showGroupHeading, layer, layerName, exclusiveGroupName, layerDetails.options, layerDetails.wimOptions);
                            //addMapServerLegend(layerName, layerDetails);
                        }

                    });
                });

                function addLayer(groupHeading, showGroupHeading, layer, layerName, exclusiveGroupName, options, wimOptions) {

                    //add layer to map
                    //layer.addTo(map);
                    map.addLayer(layer);

                    /*if (layer.ids == 'cbrs') {
                        on(layer, 'load', function(evt) {
                            on(layer, 'click', function (evt) {
                                cbrsClicked = true;
                                var linkValue = evt.graphic.attributes.HYPERLINK_2;
                                if (linkValue == "None") {
                                    var template = new InfoTemplate("${NAME}",
                                        "Type: ${TYPE}<br/>" +
                                        "Location Website: <a target='_blank' href='${HYPERLINK}'>click here</a><br/>" +
                                        "Water Summary Report: <a target='_blank' href='${WATER_SUMMARY_REPORT}'>click here</a><br/>" +
                                        "Wildlife Action Plan: <a target='_blank' href='${STATE_ACTION_PLAN}'>click here</a><br/>"
                                    );
                                    layer.setInfoTemplate(template);
                                } else {//
                                    var template = new InfoTemplate("${NAME}",
                                        "Type: ${TYPE}<br/>" +
                                        "Ramsar: <a id='ramsarLink' target='_blank' href='${HYPERLINK_2}'>click here</a><br/>" +
                                        "Location Website: <a target='_blank' href='${HYPERLINK}'>click here</a><br/>" +
                                        "Water Summary Report: <a target='_blank' href='${WATER_SUMMARY_REPORT}'>click here</a><br/>" +
                                        "Wildlife Action Plan: <a target='_blank' href='${STATE_ACTION_PLAN}'>click here</a><br/>"
                                    );
                                    layer.setInfoTemplate(template);
                                }
                            });
                        });
                    }*/

                    //add layer to layer list
                    mapLayers.push([exclusiveGroupName, camelize(layerName), layer]);

                    $(function () {
                        if (legendDiv.innerHTML.length == 0) {
                            var legend = new Legend({
                                map: map,
                                layerInfos: legendLayers
                            }, "legendDiv");
                            legend.startup();

                            $("#legendDiv").niceScroll();

                            /*legend.addCallback(function(response) { 
                                maxLegendHeight =  ($('#mapDiv').height()) * 0.90;
                                $('#legendElement').css('max-height', maxLegendHeight);
                                maxLegendDivHeight = ($('#legendElement').height()) - parseInt($('#legendHeading').css("height").replace('px',''));
                                $('#legendDiv').css('max-height', maxLegendDivHeight);
                            });*/
                        }
                    });

                    //check if its an exclusiveGroup item
                    if (exclusiveGroupName) {

                        if (!$('#' + camelize(exclusiveGroupName)).length) {
                            var exGroupRoot;
                            if (exclusiveGroupName == "Data Source") {
                                var exGroupRoot = $('<div id="' + camelize(exclusiveGroupName + " Root") + '" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + exclusiveGroupName + '<span id="info' + camelize(exclusiveGroupName) + '" title="Data Source identifies the scale, year and emulsion of the imagery that was used to map the wetlands and riparian areas for a given area. It also identifies areas that have Scalable data, which is an interim data product in areas of the nation where standard compliant wetland data is not yet available. Click for more info on Scalable data." class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity' + camelize(exclusiveGroupName) + '" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button> </div>');
                            } else {
                                var exGroupRoot = $('<div id="' + camelize(exclusiveGroupName + " Root") + '" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + exclusiveGroupName + '</button> </div>');
                            }

                            exGroupRoot.click(function (e) {
                                exGroupRoot.find('i.glyphspan').toggleClass('fa-check-square-o fa-square-o');

                                $.each(mapLayers, function (index, currentLayer) {

                                    var tempLayer = map.getLayer(currentLayer[2].id);

                                    if (currentLayer[0] == exclusiveGroupName) {
                                        if ($("#" + currentLayer[1]).find('i.glyphspan').hasClass('fa-dot-circle-o') && exGroupRoot.find('i.glyphspan').hasClass('fa-check-square-o')) {
                                            console.log('adding layer: ', currentLayer[1]);
                                            map.addLayer(currentLayer[2]);
                                            var tempLayer = map.getLayer(currentLayer[2].id);
                                            tempLayer.setVisibility(true);
                                        } else if (exGroupRoot.find('i.glyphspan').hasClass('fa-square-o')) {
                                            console.log('removing layer: ', currentLayer[1]);
                                            //map.removeLayer(currentLayer[2]);
                                            var tempLayer = map.getLayer(currentLayer[2].id);
                                            tempLayer.setVisibility(false);
                                        }
                                    }

                                });
                            });

                            var exGroupDiv = $('<div id="' + camelize(exclusiveGroupName) + '" class="btn-group-vertical" data-toggle="buttons"></div>');
                            $('#toggle').append(exGroupDiv);
                        }

                        //create radio button
                        //var button = $('<input type="radio" name="' + camelize(exclusiveGroupName) + '" value="' + camelize(layerName) + '"checked>' + layerName + '</input></br>');
                        if (layer.visible) {
                            var button = $('<div id="' + camelize(layerName) + '" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="' + camelize(exclusiveGroupName) + '" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o ' + camelize(exclusiveGroupName) + '"></i>&nbsp;&nbsp;' + layerName + '</label> </div>');
                        } else {
                            var button = $('<div id="' + camelize(layerName) + '" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="' + camelize(exclusiveGroupName) + '" autocomplete="off"><i class="glyphspan fa fa-circle-o ' + camelize(exclusiveGroupName) + '"></i>&nbsp;&nbsp;' + layerName + '</label> </div>');
                        }

                        $('#' + camelize(exclusiveGroupName)).append(button);

                        //click listener for radio button
                        button.click(function (e) {

                            if ($(this).find('i.glyphspan').hasClass('fa-circle-o')) {
                                $(this).find('i.glyphspan').toggleClass('fa-dot-circle-o fa-circle-o');

                                var newLayer = $(this)[0].id;

                                $.each(mapLayers, function (index, currentLayer) {

                                    if (currentLayer[0] == exclusiveGroupName) {
                                        if (currentLayer[1] == newLayer && $("#" + camelize(exclusiveGroupName + " Root")).find('i.glyphspan').hasClass('fa-check-square-o')) {
                                            console.log('adding layer: ', currentLayer[1]);
                                            map.addLayer(currentLayer[2]);
                                            var tempLayer = map.getLayer(currentLayer[2].id);
                                            tempLayer.setVisibility(true);
                                            //$('#' + camelize(currentLayer[1])).toggle();
                                        }
                                        else if (currentLayer[1] == newLayer && $("#" + camelize(exclusiveGroupName + " Root")).find('i.glyphspan').hasClass('fa-square-o')) {
                                            console.log('group heading not checked');
                                        }
                                        else {
                                            console.log('removing layer: ', currentLayer[1]);
                                            //map.removeLayer(currentLayer[2]);
                                            var tempLayer = map.getLayer(currentLayer[2].id);
                                            tempLayer.setVisibility(false);
                                            if ($("#" + currentLayer[1]).find('i.glyphspan').hasClass('fa-dot-circle-o')) {
                                                $("#" + currentLayer[1]).find('i.glyphspan').toggleClass('fa-dot-circle-o fa-circle-o');
                                            }
                                            //$('#' + camelize(this[1])).toggle();
                                        }
                                    }
                                });
                            }
                        });
                    }

                    //not an exclusive group item
                    else if (wimOptions.includeInLayerList) {

                        //create layer toggle
                        //var button = $('<div align="left" style="cursor: pointer;padding:5px;"><span class="glyphspan glyphicon glyphicon-check"></span>&nbsp;&nbsp;' + layerName + '</div>');
                        if ((layer.visible && wimOptions.hasOpacitySlider)) {
                            var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left" id=' + layer.id + 'Selector><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="opacity' + camelize(layerName) + '" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button></div>');
                        } else if ((!layer.visible && wimOptions.hasOpacitySlider)) {
                            var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="info' + camelize(layerName) + '" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span><span id="opacity' + camelize(layerName) + '" style="padding-right: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></span></button></div>');
                        } else if (layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true) {
                            var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="info' + camelize(layerName) + '" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');
                        } else if ((!layer.visible && wimOptions.hasOpacitySlider !== undefined && wimOptions.hasOpacitySlider == true)) {
                            var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="info' + camelize(layerName) + '" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span>' + '<span id="opacity' + camelize(layerName) + '" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');
                        } else if ((layer.visible)) {
                            var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="info' + camelize(layerName) + '" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></span>' + '<span id="opacity' + camelize(layerName) + '" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');
                        } else if ((!layer.visible)) {
                            var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '<span id="info' + camelize(layerName) + '" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');
                        } else if (layer.visible) {
                            var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;' + layerName + '</button></span></div>');
                        } else {
                            var button = $('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;' + layerName + '</button> </div>');
                        }


                        //click listener for regular
                        button.click(function (e) {

                            //toggle checkmark
                            $(this).find('i.glyphspan').toggleClass('fa-check-square-o fa-square-o');
                            $(this).find('button').button('toggle');



                            //$('#' + camelize(layerName)).toggle();

                            //layer toggle
                            if (layer.visible) {
                                layer.setVisibility(false);
                            } else {
                                layer.setVisibility(true);
                            }

                            if (wimOptions.otherLayersToggled) {
                                $.each(wimOptions.otherLayersToggled, function (key, value) {
                                    var lyr = map.getLayer(value);
                                    lyr.setVisibility(layer.visible);
                                });
                            }

                        });
                    }

                    //group heading logic
                    if (showGroupHeading !== undefined) {

                        //camelize it for divID
                        var groupDivID = camelize(groupHeading);

                        //check to see if this group already exists
                        if (!$('#' + groupDivID).length) {
                            //if it doesn't add the header
                            if (showGroupHeading) {
                                var groupDiv = $('<div id="' + groupDivID + '"><div class="alert alert-info" role="alert"><strong>' + groupHeading + '</strong></div></div>');
                            } else {
                                var groupDiv = $('<div id="' + groupDivID + '"></div>');
                            }
                            $('#toggle').append(groupDiv);
                        }

                        //if it does already exist, append to it

                        if (exclusiveGroupName) {
                            //if (!exGroupRoot.length)$("#slider"+camelize(layerName))
                            $('#' + groupDivID).append(exGroupRoot);
                            $('#' + groupDivID).append(exGroupDiv);
                            if (wimOptions.moreinfo !== undefined && wimOptions.moreinfo) {
                                var id = "#info" + camelize(exclusiveGroupName);
                                var moreinfo = $(id);
                                moreinfo.click(function (e) {
                                    window.open(wimOptions.moreinfo, "_blank");
                                    e.preventDefault();
                                    e.stopPropagation();
                                });
                            }
                            if ($("#opacity" + camelize(exclusiveGroupName)).length > 0) {
                                var id = "#opacity" + camelize(exclusiveGroupName);
                                var opacity = $(id);
                                opacity.click(function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    $(".opacitySlider").remove();
                                    var currOpacity = map.getLayer(options.id).opacity;
                                    var slider = $('<div class="opacitySlider"><label id="opacityValue">Opacity: ' + currOpacity + '</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');
                                    $("body").append(slider);
                                    $("#slider")[0].value = currOpacity * 100;
                                    $(".opacitySlider").css('left', event.clientX - 180);
                                    $(".opacitySlider").css('top', event.clientY - 50);

                                    $(".opacitySlider").mouseleave(function () {
                                        $(".opacitySlider").remove();
                                    });

                                    $(".opacityClose").click(function () {
                                        $(".opacitySlider").remove();
                                    });
                                    $('#slider').change(function (event) {
                                        //get the value of the slider with this call
                                        var o = ($('#slider')[0].value) / 100;
                                        console.log("o: " + o);
                                        $("#opacityValue").html("Opacity: " + o)
                                        map.getLayer(options.id).setOpacity(o);

                                        if (wimOptions.otherLayersToggled) {
                                            $.each(wimOptions.otherLayersToggled, function (key, value) {
                                                var lyr = map.getLayer(value);
                                                lyr.setOpacity(o);
                                            });
                                        }
                                        //here I am just specifying the element to change with a "made up" attribute (but don't worry, this is in the HTML specs and supported by all browsers).
                                        //var e = '#' + $(this).attr('data-wjs-element');
                                        //$(e).css('opacity', o)
                                    });

                                });
                            }
                        } else {
                            $('#' + groupDivID).append(button);
                            if ($("#opacity" + camelize(layerName)).length > 0) {
                                $("#opacity" + camelize(layerName)).click(function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    $(".opacitySlider").remove();
                                    var currOpacity = map.getLayer(options.id).opacity;
                                    var slider = $('<div class="opacitySlider"><label id="opacityValue">Opacity: ' + currOpacity + '</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');
                                    $("body").append(slider);[0]

                                    $("#slider")[0].value = currOpacity * 100;
                                    $(".opacitySlider").css('left', event.clientX - 180);
                                    $(".opacitySlider").css('top', event.clientY - 50);

                                    $(".opacitySlider").mouseleave(function () {
                                        $(".opacitySlider").remove();
                                    });

                                    $(".opacityClose").click(function () {
                                        $(".opacitySlider").remove();
                                    });
                                    $('#slider').change(function (event) {
                                        //get the value of the slider with this call
                                        var o = ($('#slider')[0].value) / 100;
                                        console.log("o: " + o);
                                        $("#opacityValue").html("Opacity: " + o)
                                        map.getLayer(options.id).setOpacity(o);

                                        if (wimOptions.otherLayersToggled) {
                                            $.each(wimOptions.otherLayersToggled, function (key, value) {
                                                var lyr = map.getLayer(value);
                                                lyr.setOpacity(o);
                                            });
                                        }
                                        //here I am just specifying the element to change with a "made up" attribute (but don't worry, this is in the HTML specs and supported by all browsers).
                                        //var e = '#' + $(this).attr('data-wjs-element');
                                        //$(e).css('opacity', o)
                                    });
                                });
                            }
                        }
                    }

                    else {
                        //otherwise append
                        $('#toggle').append(button);
                        if (wimOptions.moreinfo !== undefined && wimOptions.moreinfo) {
                            var id = "#info" + camelize(layerName);
                            var moreinfo = $(id);
                            moreinfo.click(function (e) {
                                alert(e.currentTarget.id);
                                e.preventDefault();
                                e.stopPropagation();
                            });
                        }
                    }
                }
            });//end of require statement containing legend building code

        function getMapPoint(lat, long) {
            var point = new Point({"x": long, "y": lat, "spatialReference": { wkid: 3857 }})
            var symbol = new PictureMarkerSymbol({"angle":0,"xoffset": 0, "yoffset": 12, "type": "esriPMS", "url": 'https://static.arcgis.com/images/Symbols/Basic/RedStickpin.png', "contentType": "image/png", "width": 30, "height": 30 });
            map.graphics.add(new Graphic(point, symbol));

            document.getElementById("legendPoint").setAttribute("class", "legendPtVisible")

            $('#validationModal').modal('show');

            var newpoint = webMercatorUtils.xyToLngLat(long, lat);
            latLong = String(Math.round(newpoint[0] * 1000000)/1000000) + ', ' + String(Math.round(newpoint[1] * 1000000)/1000000);

            document.getElementById('selectPoint').setAttribute("class", "btn btn-success btn-fixed")
        }

        function deferredProcess() {
            var deferred = new dojo.Deferred();
            checkMap();
            runValidation();
            setTimeout(function() {
                deferred.resolve('success');
            }, 1000);
            return deferred.promise;
        }

        function checkMap() {
            graphPoint = map.graphics.graphics[0];
            if (!map._layers.cbrs.visible) {
                document.getElementById('cbrsSelector').click();
            }
            
            if (!(graphPoint && graphPoint.geometry.type == "point")) {
                alert('No map point found. Please place point on map, then try again.')
            }

            if ( 19 <= map.getLevel() || map.getLevel() < 17) {
                map.setLevel(17)
            }

            var graphExtent = esri.graphicsExtent(map.graphics.graphics);
            map.setExtent(graphExtent);

            if (!(map._basemap == 'satellite' || map._basemap == 'hybrid')) {
                document.getElementById('btnSatellite').click();
            }
        }

        function runValidation() {
            locDesc = document.getElementById('locationDesc').value;
            userTitle = document.getElementById('locationDesc').value;
            if (locDesc == "") {
                locDesc = 'N/A'
                userTitle = 'CBRS Documentation'
            }
            var datetime = new Date().toLocaleString("en-US", {timeZone: "America/New_York", timeZoneName: "short"});
            var date = datetime.substr(0, datetime.indexOf(','));
            $('#printProc').css('display', 'inline');
            $("#printJobsVal").find("p.toRemove").remove();
            if (suDate == 'Null') {suDate = 'N/A'};
            if (fiDate == 'Null') {fiDate = 'N/A'};
            if (pinLoc == 'in') {
                pinLocDesc = 'Within Unit ' + inUnit;
                if (inUnitType == 'Otherwise Protected Area') {
                    infoPar = "<BOL>User Supplied Address/Location Description: </BOL>" + locDesc + "\r\n <BOL>Pin Location: </BOL>" + pinLocDesc + "\r\n" +
                        "<BOL>Pin Flood Insurance Prohibition Date: </BOL>" + fiDate + "\r\n <BOL>Pin System Unit Establishment Date: </BOL>" + suDate + "\r\n \r\n" +
                        "The user placed pin is within Otherwise Protected Area (OPA) Unit " + inUnit + " of the CBRS.  For the official map depicting this area, please see the map " +
                        "numbered " + mapNo + ', dated ' + mapDate + ". The official CBRS maps are accessible at <UND><CLR blue='255'><a target='_blank' href='https://www.fws.gov/cbra/maps/index.html'>" +
                        "https://www.fws.gov/cbra/maps/index.html</a></CLR></UND>. \r\n \r\n" +
                        'The Coastal Barrier Improvement Act (Pub. L. 101-591; 42 U.S.C. &#167; 4028) prohibits most new federal flood insurance within OPAs, with an exception for structures ' +
                        'that are used in a manner consistent with the purpose for which the area is protected (e.g., park visitors center, park restroom facilities, etc.). \r\n \r\n' +
                        '<BOL>The prohibition on federal flood insurance for this pin location took effect on ' + fiDate + '. Federal flood insurance through the National Flood Insurance ' +
                        "Program is available if the subject building was constructed (or permitted and under construction) before the area's flood insurance prohibition date, and has not been " +
                        'substantially improved or substantially damaged since.</BOL> For more information about the restrictions on federal flood insurance, please refer to the Federal ' +
                        "Emergency Management Agency's (FEMA) regulations in Title 44 Part 71 of the Code of Federal Regulations and FEMA's Flood Insurance Manual: " +
                        "<UND><CLR blue='255'><a target='_blank' href='https://www.fema.gov/flood-insurance-manual'>https://www.fema.gov/flood-insurance-manual</a></CLR></UND>.\r\n \r\n"
                    
                } else if (inUnitType == 'System Unit') {
                    infoPar = "<BOL>User Supplied Address/Location Description: </BOL>" + locDesc + "\r\n <BOL>Pin Location: </BOL>" + pinLocDesc + "\r\n" +
                        "<BOL>Pin Flood Insurance Prohibition Date: </BOL>" + fiDate + "\r\n <BOL>Pin System Unit Establishment Date: </BOL>" + suDate + "\r\n \r\n" +
                        'The user placed pin location is within System Unit ' + inUnit + ' of the CBRS.  For the official CBRS map depicting this area, please see the map ' +
                        'numbered ' + mapNo + ', dated ' + mapDate + ". The official CBRS maps are accessible at <UND><CLR blue='255'><a target='_blank' href='https://www.fws.gov/cbra/maps/index.html'>" +
                        "https://www.fws.gov/cbra/maps/index.html</a></CLR></UND>. \r\n \r\n" +
                        'The Coastal Barrier Resources Act (Pub. L. 97-348) and subsequent amendments (16 U.S.C. &#167; 3501 et seq.) prohibit most new federal funding and financial assistance ' +
                        'within System Units, including flood insurance. \r\n \r\n' +
                        '<BOL>The prohibition on federal flood insurance for this pin location took effect on ' + fiDate + '. Federal flood insurance through the National Flood Insurance ' +
                        "Program is available if the subject building was constructed (or permitted and under construction) before the area's flood insurance prohibition date, and has not been " +
                        'substantially improved or substantially damaged since.</BOL> For more information about the restrictions on federal flood insurance, please refer to the Federal ' +
                        "Emergency Management Agency's (FEMA) regulations in Title 44 Part 71 of the Code of Federal Regulations and FEMA's Flood Insurance Manual: " +
                        "<UND><CLR blue='255'><a target='_blank' href='https://www.fema.gov/flood-insurance-manual'>https://www.fema.gov/flood-insurance-manual</a></CLR></UND>. " +
                        'The prohibition on all other federal expenditures and financial assistance (besides flood insurance) for this pin location took effect on ' + suDate + '.  \r\n \r\n'
                    
                }
            } else if (pinLoc == 'buff') {
                pinLocDesc = 'Within CBRS Buffer Zone'
                fiDate = 'Undetermined'
                suDate = 'Undetermined'
                infoPar = "<BOL>User Supplied Address/Location Description: </BOL>" + locDesc + "\r\n <BOL>Pin Location: </BOL>" + pinLocDesc + "\r\n" +
                    "<BOL>Pin Flood Insurance Prohibition Date: </BOL>" + fiDate + "\r\n <BOL>Pin System Unit Establishment Date: </BOL>" + suDate + "\r\n \r\n" +
                    'The user placed pin location is within the CBRS Buffer Zone. The CBRS Buffer Zone represents the area immediately adjacent to the CBRS boundary where ' +
                    'users are advised to contact the Service for an official determination as to whether the property or project site is located "in" or "out" ' +
                    "of the CBRS. For information on obtaining an official CBRS Property Determination, please visit: <UND><CLR blue='255'><a target='_blank' href='http://www.fws.gov/cbra/Determinations.html'>" +
                    "http://www.fws.gov/cbra/Determinations.html.</a></CLR></UND> \r\n \r\n"
                
            } else if (pinLoc == 'out') {
                pinLocDesc = 'Outside CBRS'
                if (mapNo == "") {
                    infoPar = "<BOL>User Supplied Address/Location Description: </BOL>" + locDesc + "\r\n <BOL>Pin Location: </BOL>" + pinLocDesc + "\r\n" +
                    "<BOL>Pin Flood Insurance Prohibition Date: </BOL>" + fiDate + "\r\n <BOL>Pin System Unit Establishment Date: </BOL>" + suDate + "\r\n \r\n" +
                    "The user placed pin location is not within the CBRS. The official CBRS maps are accessible at <UND><CLR blue='255'><a target='_blank' href='https://www.fws.gov/cbra/maps/index.html'> https://www.fws.gov/cbra/maps/index.html</a></CLR></UND>. \r\n \r\n"
                } else {
                    infoPar = "<BOL>User Supplied Address/Location Description: </BOL>" + locDesc + "\r\n <BOL>Pin Location: </BOL>" + pinLocDesc + "\r\n" +
                    "<BOL>Pin Flood Insurance Prohibition Date: </BOL>" + fiDate + "\r\n <BOL>Pin System Unit Establishment Date: </BOL>" + suDate + "\r\n \r\n" +
                    'The user placed pin location is not within the CBRS. For the nearest official CBRS map depicting this area, please see the map numbered ' + mapNo + ', dated ' + mapDate +
                    ". The official CBRS maps are accessible at <UND><CLR blue='255'><a target='_blank' href='https://www.fws.gov/cbra/maps/index.html'> https://www.fws.gov/cbra/maps/index.html</a></CLR></UND>. \r\n \r\n"
                }
            }
            infoPar += '<FNT size="8">The CBRS information is derived directly from the CBRS web service provided by the Service. This map was exported on ' + date +
                ' and does not reflect changes or amendments subsequent to this date.  The CBRS boundaries on this map may become superseded by new boundaries over time. \r\n \r\n' +
                'This map image may be void if one or more of the following map elements do not appear: basemap imagery, CBRS unit labels, prohibition date labels, legend, scale bar, map creation date. ' +
                "For additional information about flood insurance and the CBRS, visit: <UND><CLR blue='255'><a target='_blank' href='https://www.fws.gov/cbra/Flood-Insurance.html'>https://www.fws.gov/cbra/Flood-Insurance.html" +
                "</a></CLR></UND>.</FNT> \r\n"
        }

    });

function stateSelected() {
    var select = $('#stateSelect')[0];
    if (select.selectedIndex > 0) {
        var selectedVal = select.options[select.selectedIndex].value;
        var selectedState = select.options[select.selectedIndex].label;
        $('#downloadState').html("Download <a target='_blank' href='http://www.fws.gov/wetlands/Downloads/State/" + selectedVal + "_wetlands.zip'>Geodatabase</a> and <a target='_blank' href='http://www.fws.gov/wetlands/Downloads/State/" + selectedVal + "_shapefile_wetlands.zip'>Shapefile</a> data for <b>" + selectedState + "</b>");
    } else {
        $('#downloadState').html("");
    }
}

$(".close-alert").click(function () {
    $(this).parent().slideUp(250);
});

function hucLinkListener(HUCNumber) {
    console.log(HUCNumber);
    $.get("https://fwsmapper.wim.usgs.gov/downloadLoggingService/downloadLog.asmx/Log?huc=" + HUCNumber + ",NWIV2", function (data) {
        //console.log(data);
    });
}

$(document).ready(function () {
    //7 lines below are handler for the legend buttons. to be removed if we stick with the in-map legend toggle
    //$('#legendButtonNavBar, #legendButtonSidebar').on('click', function () {
    //    $('#legend').toggle();
    //    //return false;
    //});
    //$('#legendClose').on('click', function () {
    //    $('#legend').hide();
    //});

});


// tool tip for Unit Type on Popup
$(function () {
    $('[data-toggle="tooltip"]').tooltip({
        'selector': '',
        'placement': 'top',
        'container': 'body',
        'html': true,
        'delay': {show: 0, hide: 600}
    });
});

// adding helpful message to Measure button
function message() {
    document.getElementById("helpfulHint").innerHTML = "<hr>Click the tool again to deselect it and return to normal map controls";
}
