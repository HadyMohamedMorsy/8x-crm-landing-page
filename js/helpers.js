//helpers
export const updateContent = (
  content,
  element,
  customWrapper = null,
  displayStyle = "flex"
) => {
  if (!element) return;
  const wrapper = customWrapper || element.parentElement;
  const hasContent = !!content && !content.includes("null");
  element.innerHTML = hasContent ? content : "";
  wrapper.style.display = hasContent ? displayStyle : "none";
};

export const initMap = (unit) => {
  var latLng = { lat: +unit.latitude, lng: +unit.longitude };
  var options = {
    zoom: 9,
    center: latLng,
    mapTypeId: "terrain", // hybrid , satellite , roadmap ,
    scrollwheel: false,
    draggable: true,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      {
        elementType: "labels.text.stroke",
        stylers: [{ color: "#242f3e" }],
      },
      {
        elementType: "labels.text.fill",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
    // panControl: true,
    // zoomControl: true,
    // disableDefaultUI: true,
    // mapTypeControl: true,
    // scaleControl: true,
    // streetViewControl: true,
    // overviewMapControl: true,
    // rotateControl: true,
  };
  var map = new google.maps.Map(document.getElementById("map"), options);
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    icon: "img/pin.png",
    animation: google.maps.Animation.BOUNCE,
    title: "OSUS PROPERTY MANAGEMENT",
  });
  var infoWindow = new google.maps.InfoWindow({
    content: "<p>Osus Property Management</p>",
  });
  marker.addListener("click", function () {
    infoWindow.open(map, marker);
  });
  google.maps.event.addListener(marker, "click", function () {
    var pos = map.getZoom();
    map.setZoom(12);
    map.setCenter(marker.getPosition());
    window.setTimeout(function () {
      map.setZoom(pos);
    }, 3000);
  });
};

export function buildListItemsHtml(items, itemKey = null) {
  if (!items?.length) return "";

  const createItem = (item) => `
    <li>
      ${itemKey ? item[itemKey] : item}
    </li>
  `;

  const createColumn = (items) => `
    <div class="col-xl-4 col-lg-6 mb-3">
      <ul>
        ${items.map(createItem).join("")}
      </ul>
    </div>
  `;

  const chunkSize = 3;
  const groups = Array.from(
    { length: Math.ceil(items.length / chunkSize) },
    (_, i) => items.slice(i * chunkSize, (i + 1) * chunkSize)
  );

  return groups.map(createColumn).join("");
}
