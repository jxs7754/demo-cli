import L from 'leaflet';

export default {
  methods: {
    initMapLayer() {
      let normalMap = L.tileLayer(
        this.$configData.mapUrl, {
          minZoom: 2,
          maxZoom: 11,
        },
      );
      let centerLatLng;
      let defaultLatLng = [40.7212366, 20.12659405];
      let optionsZoom;
      let defaultZoom = 3;
      let latLng = centerLatLng && centerLatLng.length ? centerLatLng
        : defaultLatLng;
      let zoom = optionsZoom && optionsZoom ? optionsZoom : defaultZoom;
      // let corner1 = L.latLng(180, 90);
      // let corner2 = L.latLng(-180, -90);
      // let bounds = L.latLngBounds(corner1, corner2);
      let opt = {
        center: latLng,
        zoom,
        layers: [normalMap],
        zoomControl: false,
        attributionControl: false,
        noWrap: true,
        // renderer: L.svg(),
        // maxBounds: bounds,
      };
      if (this.$configData.mapCrs) {
        opt.crs = L.CRS.EPSG4326;
      }
      let map = L.map(this.$refs.el, opt);
      this.map = map;
      map.on('mousedown', () => {
        this.popperShow = false;
        this.map.closePopup();
      });
      map.on('zoom', () => {
        this.popperShow = false;
        this.map.closePopup();
      });
      // map.on('popupopen', (...values) => {
      //   console.log(values);
      //   let wrap = values[0].popup._wrapper;
      //   let imgList = wrap.getElementsByClassName('timeline-img');
      //   console.log(imgList);
      //   for (i of imgList) {
      //     console.log(i);
      //     // console.log(i.data('img'));
      //   }
      // });
    },
  },
};
