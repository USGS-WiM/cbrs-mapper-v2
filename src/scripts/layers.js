/* *
 * Created by bdraper on 4/27/2015.
 */
/* var allLayers;
var renderer;
var featureLayers;

require([
    'esri/InfoTemplate',
    'esri/layers/FeatureLayer',
    'esri/renderers/UniqueValueRenderer',
    'esri/symbols/PictureMarkerSymbol',
    'dojo/domReady!'
], function(
    InfoTemplate,
    FeatureLayer,
    UniqueValueRenderer,
    PictureMarkerSymbol
) {

    var defaultSymbol = new PictureMarkerSymbol("./images/grn-pushpin.png", 45, 45);

    renderer = new UniqueValueRenderer(defaultSymbol);

    var template = new InfoTemplate("${NAME}",
        "Type: ${TYPE}<br/>" +
        "Ramsar: <a id='ramsarLink' target='_blank' href='${HYPERLINK_2}'>click here</a><br/>" +
        "Location Website: <a target='_blank' href='${HYPERLINK}'>click here</a><br/>" +
        "Water Summary Report: <a target='_blank' href='${WATER_SUMMARY_REPORT}'>click here</a><br/>" +
        "Wildlife Action Plan: <a target='_blank' href='${STATE_ACTION_PLAN}'>click here</a><br/>"
    )

    allLayers = [
        {
            'groupHeading': 'ESRI dynamic map services',
            'showGroupHeading': false,
            'includeInLayerList': true,
            'layers': {
                'CBRS Units' : {
                    'url': 'https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/featuretest/FeatureServer/4',
                    'visibleLayers': [2,4,5],
                    'options': {
                        'id': 'cbrs',
                        'opacity': 0.75,
                        'mode': esri.layers.FeatureLayer.MODE_ONDEMAND,
                        'outfields': ['*'],
                        'visible': true
                    },
                    "wimOptions": {
                        "type": "layer",
                        "layerType": "agisFeature",
                        "includeInLayerList": true,
                        "hasOpacitySlider": true,
                        "includeLegend": true
                    }
                },
                'CBRS Footprints' : {
                    'url': 'https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/featuretest/FeatureServer/0',
                    'visibleLayers': [0],
                    'options': {
                        'id': 'footprints',
                        'opacity': 0.75,
                        'visible': false
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisFeature',
                        'includeInLayerList': false,
                        'zoomScale': 144448,
                        'hasOpacitySlider': true,
                        'includeLegend' : false
                    }
                },
                'two' : {
                    'url': 'https://fwsprimary.wim.usgs.gov/server/rest/services/CBRAMapper/GeoCBRA/MapServer',
                    'visibleLayers': [2],
                    'options': {
                        'id': 'footprints',
                        'opacity': 0.75,
                        'visible': true
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': false,
                        'zoomScale': 144448,
                        'hasOpacitySlider': true,
                        'includeLegend' : false
                    }
                },
                'four' : {
                    'url': 'https://fwsprimary.wim.usgs.gov/server/rest/services/CBRAMapper/GeoCBRA/MapServer',
                    'visibleLayers': [4],
                    'options': {
                        'id': 'footprints',
                        'opacity': 0.75,
                        'visible': true
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': false,
                        'zoomScale': 144448,
                        'hasOpacitySlider': true,
                        'includeLegend' : false
                    }
                },
                'five' : {
                    'url': 'https://fwsprimary.wim.usgs.gov/server/rest/services/CBRAMapper/GeoCBRA/MapServer',
                    'visibleLayers': [5],
                    'options': {
                        'id': 'footprints',
                        'opacity': 0.75,
                        'visible': true
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': false,
                        'zoomScale': 144448,
                        'hasOpacitySlider': true,
                        'includeLegend' : false
                    }
                }
            }
        }
    ];
 
}); */