<script setup>
import { computed, onMounted } from "vue";
import { useMapStore } from "@/stores/MapStore.js";
import { storeToRefs } from "pinia";
let map = null;
const store = useMapStore();

const { keyword } = storeToRefs(store);

computed(() => {
  changeCenterByKeyword(store.keyword);
});

const data = {
  markerPositions1: [
    [33.452278, 126.567803],
    [33.452671, 126.574792],
    [33.451744, 126.572441],
  ],
  markerPositions2: [
    [37.499590490909185, 127.0263723554437],
    [37.499427948430814, 127.02794423197847],
    [37.498553760499505, 127.02882598822454],
    [37.497625593121384, 127.02935713582038],
    [37.49629291770947, 127.02587362608637],
    [37.49754540521486, 127.02546694890695],
    [37.49646391248451, 127.02675574250912],
  ],
  markers: [],
  infowindow: null,
};

onMounted(() => {
  if (!(window.kakao && window.kakao.maps)) {
    const mapScript = document.createElement("script");
    const libScript = document.createElement("script");
    /* global kakao */
    libScript.onload = () => kakao.maps.load(initMap);
    mapScript.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=d79b57317cdaea54c25c615a6bc5ac7d";
    libScript.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=d79b57317cdaea54c25c615a6bc5ac7d&libraries=services,clusterer,drawing";
    document.head.appendChild(mapScript);
    document.head.appendChild(libScript);
  }
});
function initMap() {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 5,
  };
  //지도 객체를 등록합니다.
  //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
  map = new kakao.maps.Map(container, options);
  changeCenterByKeyword(keyword);
}

function changeSize(size) {
  const container = document.getElementById("map");
  container.style.width = `${size}px`;
  container.style.height = `${size}px`;
  map.relayout();
}
function displayMarker(markerPositions) {
  if (data.markers.length > 0) {
    data.markers.forEach((marker) => marker.setMap(null));
  }

  const positions = markerPositions.map((position) => new kakao.maps.LatLng(...position));

  if (positions.length > 0) {
    data.markers = positions.map(
      (position) =>
        new kakao.maps.Marker({
          map: map,
          position,
        })
    );

    const bounds = positions.reduce((bounds, latlng) => bounds.extend(latlng), new kakao.maps.LatLngBounds());

    map.setBounds(bounds);
  }
}
function displayInfoWindow() {
  if (data.infowindow && data.infowindow.getMap()) {
    //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
    map.setCenter(datainfowindow.getPosition());
    return;
  }

  var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
    iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

  data.infowindow = new kakao.maps.InfoWindow({
    map: map, // 인포윈도우가 표시될 지도
    position: iwPosition,
    content: iwContent,
    removable: iwRemoveable,
  });

  map.setCenter(iwPosition);
}

function changeCenterByKeyword() {
  // 주소-좌표 변환 객체를 생성합니다
  var geocoder = new kakao.maps.services.Geocoder();
  console.log("change by keyword");
  console.log(keyword.value);
  // 주소로 좌표를 검색합니다
  geocoder.addressSearch(keyword.value, function (result, status) {
    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      // // 결과값으로 받은 위치를 마커로 표시합니다
      // var marker = new kakao.maps.Marker({
      //     map: map,
      //     position: coords
      // });

      // // 인포윈도우로 장소에 대한 설명을 표시합니다
      // var infowindow = new kakao.maps.InfoWindow({
      //     content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
      // });
      // infowindow.open(map, marker);

      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      map.setCenter(coords);
    }
  });
}
</script>

<template>
  <div>
    <div id="map"></div>
    <div class="button-group">
      <button @click="changeSize(0)">Hide</button>
      <button @click="changeSize(400)">show</button>
      <button @click="displayMarker(data.markerPositions1)">marker set 1</button>
      <button @click="displayMarker(data.markerPositions2)">marker set 2</button>
      <button @click="displayMarker([])">marker set 3 (empty)</button>
      <button @click="displayInfoWindow">infowindow</button>
    </div>
  </div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 750px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
