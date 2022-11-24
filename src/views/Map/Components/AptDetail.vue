<script setup>
import { onMounted, watch, ref, reactive } from "vue";
import { useMapStore } from "@/stores/MapStore.js";
import { userStore as useUserStore } from "@/stores/UserStore.js";
import { getDealByApt, addBookmark, deleteBookmark } from "@/api/map.js";
import AptDetailTable from "./AptDetailTable.vue";

const store = useMapStore();
const userStore = useUserStore();
let map = null;
let rv = null;
let rvContainer = null;
let rc = null;
let rvResetValue = null;
let apt = ref(null);
let bookmark = ref(false);
const tableData = reactive({
  headers: ["아파트이름", "거래일시", "거래금액", "면적"],
  rows: [],
});

const showInfo = ref(false);

watch(
  () => store.selectedMarker.marker,
  (selectedMarker, preMarker) => {
    apt.value = store.aptList[store.selectedMarker.index];
    console.log("watch before table data");
    setTableData();
    showInfo.value = true;
    setRoadView(selectedMarker);
  }
);

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    // console.log("init, reset");
    // store.$reset();
    const mapScript = document.createElement("script");
    /* global kakao */
    mapScript.onload = () => kakao.maps.load(initMap);
    mapScript.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=d79b57317cdaea54c25c615a6bc5ac7d&libraries=services,clusterer,drawing";
    document.head.appendChild(mapScript);
  }
});

function initMap() {
  rvContainer = document.getElementById("roadview"); // 로드뷰를 표시할 div
  rv = new kakao.maps.Roadview(rvContainer); // 로드뷰 객체 생성
  rc = new kakao.maps.RoadviewClient(); // 좌표를 통한 로드뷰의 panoid를 추출하기 위한 로드뷰 help객체 생성
  rvResetValue = {}; //로드뷰의 초기화 값을 저장할 변수
}

function setRoadView(selectedMarker) {
  const position = selectedMarker.getPosition();
  rv.relayout();
  // const normalImageSize = new kakao.maps.Size(MARKER_WIDTH, MARKER_HEIGHT);
  // const normalImageOption = { offset: new kakao.maps.Point(OFFSET_X, OFFSET_Y) };
  // const normalImage = new kakao.maps.MarkerImage(normalMarkerUrl, normalImageSize, normalImageOption);

  // 지도에 올릴 마커를 생성합니다.
  const mMarker = new kakao.maps.Marker({
    position: position, // 지도의 중심좌표에 올립니다.
    map: map, // 생성하면서 지도에 올립니다.
  });

  // 지도에 올릴 장소명 인포윈도우 입니다.
  var mLabel = new kakao.maps.InfoWindow({
    position: position, // 지도의 중심좌표에 올립니다.
    content: apt.apartmentName, // 인포윈도우 내부에 들어갈 컨텐츠 입니다.
  });

  mLabel.open(map, mMarker);

  // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
  rc.getNearestPanoId(position, 50, function (panoId) {
    rv.setPanoId(panoId, position); //좌표에 근접한 panoId를 통해 로드뷰를 실행합니다.
    rvResetValue.panoId = panoId;
  });

  // 로드뷰 초기화 이벤트
  kakao.maps.event.addListener(rv, "init", function () {
    // 로드뷰에 올릴 마커를 생성합니다.
    var rMarker = new kakao.maps.Marker({
      position: position,
      map: rv, //map 대신 rv(로드뷰 객체)로 설정하면 로드뷰에 올라갑니다.
    });

    // 로드뷰에 올릴 장소명 인포윈도우를 생성합니다.
    var rLabel = new kakao.maps.InfoWindow({
      position: position,
      content: apt.value.apartmentName,
    });
    rLabel.open(rv, rMarker);

    // 로드뷰 마커가 중앙에 오도록 로드뷰의 viewpoint 조정 합니다.
    var projection = rv.getProjection(); // viewpoint(화면좌표)값을 추출할 수 있는 projection 객체를 가져옵니다.

    // 마커의 position과 altitude값을 통해 viewpoint값(화면좌표)를 추출합니다.
    var viewpoint = projection.viewpointFromCoords(rMarker.getPosition(), rMarker.getAltitude());
    rv.setViewpoint(viewpoint); //로드뷰에 뷰포인트를 설정합니다.

    //각 뷰포인트 값을 초기화를 위해 저장해 놓습니다.
    rvResetValue.pan = viewpoint.pan;
    rvResetValue.tilt = viewpoint.tilt;
    rvResetValue.zoom = viewpoint.zoom;
  });
}

//지도 초기화 이벤트 핸들러
function resetKakaoMap() {
  map.setCenter(mapCenter); //지도를 초기화 했던 값으로 다시 셋팅합니다.
  map.setLevel(mapOption.level);
}

//로드뷰 이동 이벤트 핸들러
function moveKakaoRoadview() {
  var panoId = rv.getPanoId(); //현 로드뷰의 panoId값을 가져옵니다.
  var viewpoint = rv.getViewpoint(); //현 로드뷰의 viewpoint(pan,tilt,zoom)값을 가져옵니다.
  const bigbtn = document.getElementById("bigbtn");
  bigbtn.href =
    "https://map.kakao.com/?panoid=" +
    panoId +
    "&pan=" +
    viewpoint.pan +
    "&tilt=" +
    viewpoint.tilt +
    "&zoom=" +
    viewpoint.zoom; //Kakao 지도 로드뷰로 보내는 링크
}

//로드뷰 초기화 이벤트 핸들러
function resetRoadview() {
  //초기화를 위해 저장해둔 변수를 통해 로드뷰를 초기상태로 돌립니다.
  rv.setViewpoint({
    pan: rvResetValue.pan,
    tilt: rvResetValue.tilt,
    zoom: rvResetValue.zoom,
  });
  rv.setPanoId(rvResetValue.panoId);
}

async function setTableData() {
  let newDealList = [];
  await getDealByApt(
    apt.value.aptCode,
    ({ data }) => {
      data.aptInfos.map((aptInfo, index) => {
        var newInfo = {};
        newInfo.apartmentName = aptInfo.apartmentName;
        newInfo.dealAmount = aptInfo.dealAmount;
        newInfo.area = aptInfo.area ? aptInfo.area : "정보 없음";
        newInfo.ymd = `${aptInfo.dealYear}.${aptInfo.dealMonth}.${aptInfo.dealDay}`;
        newDealList.push(newInfo);
      });
      tableData.rows = JSON.parse(JSON.stringify(newDealList));
      console.log(tableData);
    },
    (error) => {
      console.log(error);
    }
  );
}

function handlePrevious() {}

async function handleBookmark() {
  if (bookmark.value) {
    await deleteBookmark(userStore.userInfo.userId, apt.value.aptCode);
  } else {
    await addBookmark(userStore.userInfo.userId, apt.value.aptCode);
  }
  bookmark.value = !bookmark.value;
}
</script>

<template>
  <div class="bg-white z-index-1 shadow">
    <div class="wrap_content">
      <div class="wrap_roadview">
        <div id="roadview" style="width: 100%; height: 100%"></div>
        <!-- 로드뷰를 표시할 div 입니다 -->
        <div class="wrap_button">
          <a
            href="javascript:;"
            id="bigbtn"
            class="btn_comm btn_linkRoadview"
            target="_blank"
            @click="moveKakaoRoadview"
            ><span class="screen_out">로드뷰 크게보기</span></a
          >
          <!-- 로드뷰 크게보기 버튼입니다 -->
          <a href="javascript:;" class="btn_comm btn_resetRoadview" @click="resetRoadview"
            ><span class="screen_out">로드뷰 크게보기</span></a
          >
          <!-- 로드뷰 리셋 버튼입니다 -->
        </div>
      </div>
    </div>
    <div class="px-2 py-3" v-if="showInfo">
      <div class="ms-2 pb-1 fs-4">
        <div class="row">
          <div class="col-1">
            <font-awesome-icon @click="handlePrevious" icon="fa-solid fa-arrow-left-long" title="돌아가기" />
          </div>
          <div class="col-4 text-nowrap">
            {{ apt.apartmentName }}
          </div>
          <div class="col-5"></div>
          <a class="col-1 ms-4" @click="handleBookmark">
            <font-awesome-icon v-show="bookmark" icon="fa-solid fa-heart"></font-awesome-icon>
            <font-awesome-icon v-show="!bookmark" icon="fa-regular fa-heart"></font-awesome-icon>
          </a>
        </div>
      </div>
      <hr class="my-0 pb-3 rounded-1 border-dark border-1 border-top" />
      <div class="pb-2">
        <font-awesome-icon class="ms-2 me-1" icon="fa-solid fa-person-digging" />
        {{ apt.buildYear }}
      </div>
      <div class="pb-2">
        <font-awesome-icon class="ms-2 me-1" icon="fa-solid fa-location-dot" />
        {{ apt.roadName }}
      </div>
      <div class="pb-2">
        <font-awesome-icon class="ms-2 me-1" icon="fa-solid fa-circle-dollar-to-slot" />
        {{ apt.minAmount }} ~ {{ apt.maxAmount }}
      </div>
      <div class="fs-5 pt-2 pb-1">거래내역</div>
      <hr class="my-0 rounded-1 pb-1 border-dark border-1 border-top" />
      <AptDetailTable class="w-100" v-bind="tableData" />
    </div>
  </div>
</template>

<style>
.wrap_content {
  width: 100%;
  height: 250px;
}

.screen_out {
  display: block;
  overflow: hidden;
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  font-size: 0;
  line-height: 0;
  text-indent: -9999px;
}
.wrap_content {
  overflow: hidden;
  height: 250;
}
.wrap_map {
  width: 50%;
  height: 300px;
  float: left;
  position: relative;
}
.wrap_roadview {
  width: 100%;
  height: 100%;
  float: left;
  position: relative;
}
.wrap_button {
  position: absolute;
  left: 15px;
  top: 12px;
  z-index: 2;
}
.btn_comm {
  float: left;
  display: block;
  width: 70px;
  height: 27px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/sample_button_control.png) no-repeat;
}
.btn_linkMap {
  background-position: 0 0;
}
.btn_resetMap {
  background-position: -69px 0;
}
.btn_linkRoadview {
  background-position: 0 0;
}
.btn_resetRoadview {
  background-position: -69px 0;
}
</style>
