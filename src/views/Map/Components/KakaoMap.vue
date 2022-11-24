<script setup>
import { computed, onMounted, watch } from "vue";
import { useMapStore } from "@/stores/MapStore.js";
import { storeToRefs } from "pinia";
let map = null;
let clusterer = null;
let geocoder = null;
let selectedMarker = null; // 클릭한 마커를 담을 변수

const store = useMapStore();
const normalMarkerUrl = "src/assets/img/map-origin-marker.png";
const selectMarkerUrl = "src/assets/img/map-select-marker.png";

const MARKER_WIDTH = 50, // 기본, 클릭 마커의 너비
  MARKER_HEIGHT = 50, // 기본, 클릭 마커의 높이
  OFFSET_X = 12, // 기본, 클릭 마커의 기준 X좌표
  OFFSET_Y = MARKER_HEIGHT, // 기본, 클릭 마커의 기준 Y좌표
  OVER_MARKER_WIDTH = 60, // 오버 마커의 너비
  OVER_MARKER_HEIGHT = 60, // 오버 마커의 높이
  OVER_OFFSET_X = 18, // 오버 마커의 기준 X좌표
  OVER_OFFSET_Y = OVER_MARKER_HEIGHT, // 오버 마커의 기준 Y좌표
  SELECT_MARKER_WIDTH = 60, // 선택 마커의 너비
  SELECT_MARKER_HEIGHT = 60, // 선택 마커의 높이
  SELECT_OFFSET_X = 18, // 선택 마커의 기준 X좌표
  SELECT_OFFSET_Y = OVER_MARKER_HEIGHT; // 오버 마커의 기준 Y좌표

watch(
  () => store.aptList,
  (aptList, preList) => {
    if (clusterer) {
      clusterer.clear();
    }
    changeCenterByKeyword(store.keyword);
    changeMarkers();
  }
);

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const mapScript = document.createElement("script");
    /* global kakao */
    mapScript.onload = () => kakao.maps.load(initMap);
    mapScript.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=d79b57317cdaea54c25c615a6bc5ac7d&libraries=services,clusterer,drawing";
    document.head.appendChild(mapScript);
  }
});
function initMap() {
  console.log("init map called");
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 7,
    mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
  };
  //지도 객체를 등록합니다.
  //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
  map = new kakao.maps.Map(container, options);

  // 주소-좌표 변환 객체를 생성합니다
  geocoder = new kakao.maps.services.Geocoder();

  clusterer = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
    minLevel: 5, // 클러스터 할 최소 지도 레벨
  });

  changeMarkers();

  // 새로고침 시 상태 유지
  if (store.keyword != null) {
    changeCenterByKeyword(store.keyword);
    changeMarkers();
  }
}

function changeMarkers() {
  if (!(window.kakao && window.kakao.maps && clusterer)) {
    console.log("markers no load");
    return;
  }

  const normalImageSize = new kakao.maps.Size(MARKER_WIDTH, MARKER_HEIGHT), // 마커이미지의 크기입니다
    overImageSize = new kakao.maps.Size(OVER_MARKER_WIDTH, OVER_MARKER_HEIGHT),
    selectImageSize = new kakao.maps.Size(SELECT_MARKER_WIDTH, SELECT_MARKER_HEIGHT),
    normalImageOption = { offset: new kakao.maps.Point(OFFSET_X, OFFSET_Y) }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    overImageOption = { offset: new kakao.maps.Point(OVER_OFFSET_X, OVER_OFFSET_Y) },
    selectImageOption = { offset: new kakao.maps.Point(SELECT_OFFSET_X, SELECT_OFFSET_Y) };

  const normalImage = new kakao.maps.MarkerImage(normalMarkerUrl, normalImageSize, normalImageOption);
  const overImage = new kakao.maps.MarkerImage(normalMarkerUrl, overImageSize, overImageOption);
  const selectImage = new kakao.maps.MarkerImage(selectMarkerUrl, selectImageSize, selectImageOption);

  // console.log(store.aptList);
  const aptList = store.aptList;
  let markers = [];
  aptList.map((apt, index) => {
    var marker = new kakao.maps.Marker({
      image: normalImage,
      position: new kakao.maps.LatLng(apt.lat, apt.lng),
    });
    marker.normalImage = normalImage;

    // 마커에 mouseover 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "mouseover", function () {
      // 클릭된 마커가 없고, mouseover된 마커가 클릭된 마커가 아니면
      // 마커의 이미지를 오버 이미지로 변경합니다
      if (!selectedMarker || selectedMarker !== marker) {
        marker.setImage(overImage);
      }
    });

    // 마커에 mouseout 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "mouseout", function () {
      // 클릭된 마커가 없고, mouseout된 마커가 클릭된 마커가 아니면
      // 마커의 이미지를 기본 이미지로 변경합니다
      if (!selectedMarker || selectedMarker !== marker) {
        marker.setImage(normalImage);
      }
    });

    // 마커에 click 이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "click", function () {
      // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
      // 마커의 이미지를 클릭 이미지로 변경합니다
      if (!selectedMarker || selectedMarker !== marker) {
        // 클릭된 마커 객체가 null이 아니면
        // 클릭된 마커의 이미지를 기본 이미지로 변경하고
        !!selectedMarker && selectedMarker.setImage(selectedMarker.normalImage);

        // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
        marker.setImage(selectImage);
        marker.setZIndex(1);
      }

      // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
      selectedMarker = marker;
      console.log(marker);
      console.log(index);
      store.setMarker(selectedMarker, index);
    });

    markers.push(marker);
  });
  console.log(markers);
  console.log("add markers in cluster");

  clusterer.addMarkers(markers);
}

async function changeCenterByKeyword(keyword) {
  if (!(window.kakao && window.kakao.maps)) {
    return;
  }
  console.log("change by keyword");
  // 주소로 좌표를 검색합니다
  await geocoder.addressSearch(keyword, function (result, status) {
    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      map.setCenter(coords);
    }
  });
}
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 750px;
}
</style>
