// Crear un mapa
var map = L.map('map').setView([3.3883161, -76.5588173], 14);

// Agregar capas base
var mapa_base_1 = L.tileLayer('https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    minZoom: 14,
    maxZoom: 16
}).addTo(map);

var mapa_base_2 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
    minZoom: 14,
    maxZoom: 16
}).addTo(map);

// Agregar control de escala
L.control.scale({ position: 'topleft' }).addTo(map);

//Agregar control de localización
L.control.locate({
    setView: 'false',
    flyto: 'false',
    drawCircle: 'false',
    showCompass: 'true',
    drawMarker: 'false',
    keepCurrentZoomLevel: 'true',
    locateOptions: {
        enableHighAccuracy: true
    }
}).addTo(map);

map.on('locationfound', function(e) {
    var latlng = e.latlng;

    // Muestra las coordenadas de latitud y longitud
    alert('Tus coordenadas actuales son: Latitud ' + latlng.lat.toFixed(6) + ', Longitud ' + latlng.lng.toFixed(6));
});

// Agregar control de capas para alternar entre mapas base
var mapasBase = {
    'Mapa Base 1': mapa_base_1,
    'Mapa Base 2': mapa_base_2
};

L.control.layers(mapasBase).addTo(map);

//

var institucion = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "id": 1,
                "nombre": "Universidad Cooperativa de Colombia - Sede Sur"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-76.5505631, 3.3903328]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 2,
                "nombre": "Instituto Comercial Industrial y Tecnológico"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-76.5505631, 3.3903328]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 3,
                "nombre": "Colegio Bilingüe Lacordaire"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-76.5471182, 3.3757209]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 4,
                "nombre": "Fundación Universitaria Unicatólica"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-76.5471182, 3.3757209]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 5,
                "nombre": "Institución Educativa Técnico Comercial Alvaro Echeverry"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-76.5495394, 3.3759576]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 6,
                "nombre": "Colegio Napoles"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-76.5467552, 3.388441]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 7,
                "nombre": "Colegio Internado San Antonio"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-76.5468599, 3.3887936]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 8,
                "nombre": "Colegio El Hogar"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-76.5476349, 3.390289]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 9,
                "nombre": "Colegio Parroquial Divino Salvador"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-76.552725, 3.3955768]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 10,
                "nombre": "Colegio Bilingüe Lancaster"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-76.5548277, 3.3966656]
            }
        }
    ]
};

// Estilo para los puntos de instituciones
var style_institucion = {
    radius: 5, // Tamaño del punto (ajusta según tus preferencias)
    fillColor: 'red', // Color de relleno del punto
    color: '#006000', // Color del borde del punto
    weight: 0.3, // Grosor del borde del punto
    opacity: 1, // Opacidad del punto
    fillOpacity: 0.6 // Opacidad del relleno del punto
};

// Capa de puntos de instituciones
var layer_institucion = L.geoJson(institucion, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, style_institucion)
    },
    onEachFeature: function (feature, layer) {
        // Personaliza la información de la ventana emergente
        layer.bindPopup('Institución: ' + feature.properties.nombre);
    }
}).addTo(map);


// Icono personalizado para instituciones (opcional)
var icono_institucion = L.icon({
    iconUrl: 'image/colegio.png', // Ruta a tu imagen PNG
    iconSize: [20, 20] // Tamaño del icono
});

// Capa de instituciones con icono personalizado (opcional)
var layer_institucion_icono = L.geoJson(institucion, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: icono_institucion })
    },
    onEachFeature: function (feature, layer) {
        // Personaliza la información de la ventana emergente
        layer.bindPopup('Institución: ' + feature.properties.nombre);
    }
}).addTo(map);

////////Capa de puntos///////////

// Obtén una referencia al botón
var botonActivarPuntos = document.getElementById('boton_activar_puntos');

// Variable para rastrear si la capa de puntos está activa o desactivada
var puntosActivados = true;

// Agrega un evento clic al botón
botonActivarPuntos.addEventListener('click', function () {
    if (puntosActivados) {
        // Desactiva la capa de puntos
        map.removeLayer(layer_institucion);
        puntosActivados = false;
    } else {
        // Activa la capa de puntos
        layer_institucion.addTo(map);
        puntosActivados = true;
    }
});



/////Capa de Puntos-Iconos///////////

// Obtén una referencia al botón
var botonAlternarInstituciones = document.getElementById('boton_alternar_instituciones');

// Variable para rastrear si la capa de instituciones con icono está activa o desactivada
var institucionesActivadas = true;

// Agrega un evento clic al botón
botonAlternarInstituciones.addEventListener('click', function () {
    if (institucionesActivadas) {
        // Desactiva la capa de instituciones con icono
        map.removeLayer(layer_institucion_icono);
        institucionesActivadas = false;
    } else {
        // Activa la capa de instituciones con icono
        layer_institucion_icono.addTo(map);
        institucionesActivadas = true;
    }
});





// Convierte la capa GeoJSON de instituciones en una capa de calor
var heatLayer_institucion = L.heatLayer(layer_institucion.toGeoJSON().features.map(function (feature) {
    return feature.geometry.coordinates.reverse(); // Invertimos las coordenadas
}), {
    radius: 45, // Tamaño del radio del calor
    blur: 15, // Intensidad del efecto de difuminado
    maxZoom: 17 // Nivel de zoom máximo en el que se mostrará el calor
});

// Añade la capa de calor al mapa
heatLayer_institucion.addTo(map);

//activa mapa de calor
var heatmap = document.getElementById('heatmap');

var heat = false;

heatmap.addEventListener('click', function() {
    if (heat) {
        heatLayer.addTo(map);
        heat  = false;
    } else {
        map.removeLayer(heatLayer);
        heat = true;
    }
});


