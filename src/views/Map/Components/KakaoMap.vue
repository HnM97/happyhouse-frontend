<script setup>
import { computed, onMounted } from "vue";
import { useMapStore } from "@/stores/MapStore.js";
import { storeToRefs } from "pinia";
let map = null;
const store = useMapStore();
const markerUrl = "src/assets/img/map-marker.png";

// const keyword = computed(() => {
//   changeCenterByKeyword(store.getKeyword);
// });
// store.$subscribe(changeCenterByKeyword);

store.$subscribe((mutation, state) => {
  changeCenterByKeyword(state.keyword);
  initCluster();
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
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    console.log("init, reset");
    store.$reset();
    const mapScript = document.createElement("script");
    /* global kakao */
    mapScript.onload = () => kakao.maps.load(initMap);
    mapScript.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=d79b57317cdaea54c25c615a6bc5ac7d&libraries=services,clusterer,drawing";
    document.head.appendChild(mapScript);
  }
});
function initMap() {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 7,
    mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
  };
  //지도 객체를 등록합니다.
  //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
  map = new kakao.maps.Map(container, options);

  // var roadviewContainer = document.getElementById("roadview");

  // roadview.setPanoId(1050215189, placePosition);

  // 새로고침 시 상태 유지
  if (store.keyword != null) {
    changeCenterByKeyword(store.keyword);
    initCluster();
  }
}

function initCluster() {
  if (!(window.kakao && window.kakao.maps)) {
    return;
  }

  const clusterer = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
    minLevel: 4, // 클러스터 할 최소 지도 레벨
  });

  var imageSize = new kakao.maps.Size(50, 50), // 마커이미지의 크기입니다
    imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  var markerImage = new kakao.maps.MarkerImage(markerUrl, imageSize, imageOption);

  let markers = [];
  // console.log(store.aptList);
  const aptList = store.aptList;
  aptList.map((apt, index) => {
    markers.push(
      new kakao.maps.Marker({
        image: markerImage,
        position: new kakao.maps.LatLng(apt.lat, apt.lng),
      })
    );
  });
  console.log("add markers in cluster");
  clusterer.addMarkers(markers);
}

// 지도와 로드뷰를 감싸고 있는 div의 class를 변경하여 지도를 숨기거나 보이게 하는 함수입니다
function toggleMap(active) {
  if (active) {
    // 지도가 보이도록 지도와 로드뷰를 감싸고 있는 div의 class를 변경합니다
    container.className = "view_map";
  } else {
    // 지도가 숨겨지도록 지도와 로드뷰를 감싸고 있는 div의 class를 변경합니다
    container.className = "view_roadview";
  }
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

function changeCenterByKeyword(keyword) {
  if (!(window.kakao && window.kakao.maps)) {
    return;
  }
  // 주소-좌표 변환 객체를 생성합니다
  var geocoder = new kakao.maps.services.Geocoder();
  console.log("change by keyword");
  // 주소로 좌표를 검색합니다
  geocoder.addressSearch(keyword, function (result, status) {
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
  <div id="map"></div>
  <!-- <div id="container" class="view_map">
    <div id="mapWrapper">
      <div id="map"></div>
      <input type="button" id="btnRoadview" onclick="toggleMap(false)" title="로드뷰 보기" value="로드뷰" />
    </div>
    <div id="rvWrapper" style="width: 100%; height: 300px; position: absolute; top: 0; left: 0">
      <div id="roadview" style="height: 100%"></div>
      
      <input type="button" id="btnMap" onclick="toggleMap(true)" title="지도 보기" value="지도" />
    </div>
  </div> -->
  <!-- <div class="button-group">
      <button @click="changeSize(0)">Hide</button>
      <button @click="changeSize(400)">show</button>
      <button @click="displayMarker(data.markerPositions1)">marker set 1</button>
      <button @click="displayMarker(data.markerPositions2)">marker set 2</button>
      <button @click="displayMarker([])">marker set 3 (empty)</button>
      <button @click="displayInfoWindow">infowindow</button>
    </div> -->
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

#container {
  overflow: hidden;
  position: relative;
}
#btnRoadview,
#btnMap {
  position: absolute;
  top: 5px;
  left: 5px;
  padding: 7px 12px;
  font-size: 14px;
  border: 1px solid #dbdbdb;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
  z-index: 1;
  cursor: pointer;
}
#btnRoadview:hover,
#btnMap:hover {
  background-color: #fcfcfc;
  border: 1px solid #c1c1c1;
}
#container.view_map #mapWrapper {
  z-index: 10;
}
#container.view_map #btnMap {
  display: none;
}
#container.view_roadview #mapWrapper {
  z-index: 0;
}
#container.view_roadview #btnRoadview {
  display: none;
}
</style>
