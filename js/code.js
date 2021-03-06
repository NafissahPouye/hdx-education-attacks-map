var map = L.map('map',

    {
        maxZoom: 5,
        minZoom: 2
    });

map.setView([13.67, 22.15], 3);
//map.setView([9.58, 10.37], 3);

//3/13.67/
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/traffic-day-v2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW1hZG91MTciLCJhIjoib3NhRnROQSJ9.lW0PVXVIS-j8dGaULTyupg', {
    attribution: '<a href="http://mapbox.com">Mapbox</a>'
}).addTo(map);




var geojson;


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        // color: '#ff4000', //'#3182bd', //'#666',
        //dashArray: '',
        //fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}
//
//function zoomToFeature(e) {
//    // map.fitBounds(e.target.getBounds());
//}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        //click: zoomToFeature
    });
    layer.bindPopup('<h5><strong>' + feature.properties.name + '</strong></h5><h5>' +'Classification: '+ feature.properties.affecte + '</h5><h5>' + 'Incidents of attack on education: ' + feature.properties.incidents_of_attacks_on_education + '</h5><h5>'+ 'People harmed by attacks on education: ' + feature.properties.harmed + '</h5><h5>'+ 'Attacks on schools: ' + feature.properties.attacks + '</h5><h5>'+ 'Students and education personnel directly targeted: ' + feature.properties.targeted + '</h5><h5>'+ 'Military use of educational facilities: ' + feature.properties.facilities + '</h5><h5>'+ 'Attacks on higher education facilities: '+ feature.properties.higher + '</h5><h5>'+ 'Students and education personnel harmed by attacks on higher education: '+ feature.properties.snp +'</h5>');

}


function style(feature) {
    if (feature.properties.affecte == 'Very Heavily Affected') {
        return {

            fillColor:  '#f03b20',
            weight: 4,
            opacity: 0.2,
            color: '#f03b20',
            fillOpacity: 0.8
        };
    } else if (feature.properties.affecte == 'Heavily Affected') {
        return {

            fillColor: '#feb24c',
            weight: 2,
            opacity: 0.6,

           color: '#feb24c',
            //dashArray: '3',
            fillOpacity: 0.5
        };
    } else if (feature.properties.affecte == 'Affected') {
        return {
            fillColor: '#ffeda0',
            weight: 2,
            opacity: 0.6,
            color: '#ffeda0',
            //dashArray: '3',
            fillOpacity: 0.5
        };
    }
}


geojson = L.geoJson(countries, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

function getColor(d) {
    return d > 1000 ? '#800026' :
        d > 500 ? '#BD0026' :
        d > 200 ? '#E31A1C' :
        d > 100 ? '#FC4E2A' :
        d > 50 ? '#FD8D3C' :
        d > 20 ? '#FEB24C' :
        d > 10 ? '#FED976' :
        '#FFEDA0';
}


//
//var legend = L.control({
//    position: 'bottomright'
//});
//
//legend.onAdd = function (map) {
//
//    var div = L.DomUtil.create('div', 'info legend'),
//
//    div.innerHTML +=
//        '<i style="background:#FF493D">Very heavily affected</i>  <br/'
//    div.innerHTML +=
//        '<i style="background:#2b8cbe">Heavily affected</i>  <br/'
//    div.innerHTML +=
//        '<i style="background:#ffeda0">Affected</i>  <br/'
//
//
//    return div;
//};
//
//legend.addTo(map);
