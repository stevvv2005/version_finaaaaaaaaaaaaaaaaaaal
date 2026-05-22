let sheetExpanded = false;
  let cityMap;
  let parkingLots = [];
  let parkingMarkers = [];
  let parkingUserMarker = null;
  let parkingSearchCircle = null;
  let parkingRouteLine = null;
  let parkingUserLocation = null;
  let parkingUserLocationLabel = '';
  let parkingSelectionMode = false;
  let activeParkingSearchRadiusKm = 1;
  let activeParkingTypeFilter = 'all';
  let parkingViewMode = 'list';
  let parkingLiveSimulationInterval = null;
  let trafficIntersections = [];
  let initialTrafficCounts = {};
  let trafficIntersectionMarkers = [];
  let trafficCameraMarkers = [];
  let trafficRoadSegments = [];
  let trafficFlowLayers = [];
  let trafficHeatLayers = [];
  let incidentMarkers = [];
  let selectedIncidentType = 'accident';
  let etaClickPoints = [];
  let etaLine = null;
  let trafficSimulationInterval = null;
  let trafficSimulationRunning = false;
  let activeTrafficCameraId = null;
  let reservationCountdownInterval = null;
  let selectingStart = false;
  let selectingDestination = false;
  let startLocation = null;
  let destinationLocation = null;
  let startMarker = null;
  let destinationMarker = null;
  let recommendedRouteLine = null;
  let boardingStopMarker = null;
  let exitStopMarker = null;
  let alternativeRouteLayers = [];
  let fullBusRouteLayers = [];
  let routeStopMarkers = [];
  let congestionRouteLayers = [];
  let activeRouteMode = 'public_transport';
  let allStopMarkers = [];
  let activeBusMarkers = {};
  let activeBusAnimationFrame = null;
  let activeBusAnimationStartedAt = 0;
  let liveBusInfoInterval = null;
  let recommendedTripResult = null;
  let recommendedBus = null;
  let followingRecommendedBus = false;
  let selectedRouteLayer = null;
  let selectedStopMarkers = [];
  let selectedBusMarker = null;
  let selectedBusAnimationFrame = null;
  let selectedBusRoute = [];
  let selectedBusSegmentIndex = 0;
  let selectedBusProgress = 0;
  let activeRouteId = null;
  let overviewRouteLayers = [];
  let highlightedRoadLayers = [];
  let activeBusFilter = 'all';
  let routeSuggestionOptions = [];
  const roadRouteCache = new Map();
  const trafficRouteCache = new Map();
  let trafficRoadDrawToken = 0;
  let trafficFlowDrawToken = 0;
  const activeReservations = [];
  const RESERVATION_TIMEOUT = 120000;
  const DEFAULT_USER_POSITION = [31.6295, -7.9811];
  let currentUserPosition = DEFAULT_USER_POSITION;
  const principalTrafficCorridors = [
    {
      name: 'Boulevard Allal Al Fassi',
      coords: [[31.6548, -8.0205], [31.6498, -8.0189], [31.6449, -8.0174], [31.6398, -8.0158], [31.6350, -8.0142]]
    },
    {
      name: 'Avenue Hassan II',
      coords: [[31.6418, -8.0169], [31.6387, -8.0120], [31.6359, -7.9986], [31.6317, -8.0081], [31.6288, -8.0142]]
    },
    {
      name: 'Boulevard Mohammed V',
      coords: [[31.6370, -8.0100], [31.6332, -8.0065], [31.6292, -7.9986], [31.6244, -7.9932], [31.6204, -7.9910]]
    },
    {
      name: 'Avenue Yacoub El Mansour',
      coords: [[31.6410, -8.0044], [31.6370, -8.0100], [31.6317, -8.0081], [31.6260, -8.0048]]
    },
    {
      name: 'Avenue Moulay Abdellah',
      coords: [[31.6336, -8.0035], [31.6317, -8.0081], [31.6286, -8.0137], [31.6248, -8.0194]]
    }
  ];
  const reportedIncidents = [
    { id: 'INC-1', type: 'accident', label: 'Accident leger', coords: [31.6369, -8.0021], severity: 'high' },
    { id: 'INC-2', type: 'travaux', label: 'Travaux voirie', coords: [31.6292, -7.9986], severity: 'medium' },
    { id: 'INC-3', type: 'obstacle', label: 'Obstacle signale', coords: [31.6412, -8.0111], severity: 'medium' },
    { id: 'INC-4', type: 'accident', label: 'Accrochage', coords: [31.6244, -7.9932], severity: 'high' },
    { id: 'INC-5', type: 'travaux', label: 'Deviation temporaire', coords: [31.6317, -8.0081], severity: 'low' },
    { id: 'INC-6', type: 'obstacle', label: 'Vehicule arrete', coords: [31.6500, -8.0500], severity: 'medium' },
    { id: 'INC-7', type: 'travaux', label: 'ChaussÃ©e reduite', coords: [31.6069, -8.0363], severity: 'low' },
    { id: 'INC-8', type: 'accident', label: 'Traffic ralenti', coords: [31.6359, -7.9986], severity: 'high' },
    { id: 'INC-9', type: 'accident', label: 'Alerte MÃ¢alizia - Av. Errazi', coords: [31.6158, -8.0536], severity: 'high' }
  ];
  const PARKING_SEARCH_RADIUS_KM = 1;
  const PARKING_EXPANDED_RADIUS_KM = 3;
  const marrakechPlaces = [
    { name: "Jamaa El Fna", coords: [31.6258, -7.9891] },
    { name: "Gueliz", coords: [31.6370, -8.0100] },
    { name: "Bab Doukkala", coords: [31.6359, -7.9986] },
    { name: "ENSA Marrakech", coords: [31.6469, -8.0203] },
    { name: "Faculte Semlalia", coords: [31.6394, -8.0066] },
    { name: "Marrakech Menara Airport", coords: [31.6069, -8.0363] },
    { name: "Koutoubia", coords: [31.6244, -7.9932] },
    { name: "Carre Eden", coords: [31.6317, -8.0081] },
    { name: "Mhamid", coords: [31.5905, -8.0273] },
    { name: "Massira", coords: [31.6500, -8.0500] },
    { name: "Sidi Youssef Ben Ali", coords: [31.6118, -7.9717] }
  ];
  let busLines = [];
  const activeBuses = [];

  async function loadParkingLots() {
    const module = await import('../../data/parkingLots.js');
    parkingLots = module.parkingLots;
    parkingLots.forEach(parking => {
      parking.reservedSpaces = parking.reservedSpaces || 0;
      parking.status = getParkingStatus(parking);
    });
  }

  async function loadBusLines() {
    const module = await import('../../data/busLines.js');
    busLines = module.busLines;
  }

  async function loadTrafficCameras() {
    const module = await import('../../data/trafficCameras.js');
    trafficIntersections = module.trafficIntersections;
    initialTrafficCounts = {};
    trafficIntersections.forEach(intersection => {
      intersection.cameras.forEach(camera => {
        initialTrafficCounts[camera.id] = camera.vehicleCount;
      });
    });
  }

  function createMapIcon(label, color) {
    return L.divIcon({
      className: '',
      html: `<div class="map-pin"><div class="pin-body" style="background:${color}">${label}</div></div>`,
      iconSize: [34, 40],
      iconAnchor: [17, 38],
      popupAnchor: [0, -34]
    });
  }

  function createUserIcon() {
    return L.divIcon({
      className: '',
      html: '<div class="pin-user"></div>',
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });
  }

  function createTrafficCameraIcon(direction) {
    const labels = { North: 'N', South: 'S', East: 'E', West: 'W' };
    return L.divIcon({
      className: '',
      html: `
        <div class="camera-marker">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14.5 4 12 7H7a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3h-1.5L14.5 4Z"/>
            <circle cx="12" cy="13" r="3"/>
          </svg>
          <span class="camera-dir">${labels[direction] || direction.charAt(0)}</span>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -16]
    });
  }

  function createTrafficIntersectionIcon() {
    return L.divIcon({
      className: '',
      html: '<div class="intersection-marker">AI</div>',
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -18]
    });
  }

  function initLeafletMap() {
    if (!window.L || cityMap) return;

    const marrakech = DEFAULT_USER_POSITION;
    cityMap = L.map('map', {
      center: marrakech,
      zoom: 13,
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: true,
      dragging: true,
      tap: true,
      touchZoom: true,
      doubleClickZoom: true
    });

    addBaseMapLayer();

    L.control.zoom({
      position: 'bottomright'
    }).addTo(cityMap);

    drawIncidentLayer();
    showParkingLotsOnMap();
    drawBusOverviewLines();

    cityMap.on('click', handleMapClick);

    refreshMapSize();
    setTimeout(refreshMapSize, 100);
    setTimeout(refreshMapSize, 300);
    setTimeout(refreshMapSize, 700);
  }

  function addBaseMapLayer() {
    if (window.google && L.gridLayer?.googleMutant) {
      L.gridLayer.googleMutant({
        type: 'roadmap',
        maxZoom: 19
      }).addTo(cityMap);
      return;
    }

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(cityMap);
  }

  function drawHighlightedRoads() {
    if (!cityMap || !window.L || highlightedRoadLayers.length) return;
    principalTrafficCorridors.forEach(corridor => drawHighlightedRoad(corridor.coords));
  }

  async function drawHighlightedRoad(roadCoords) {
    const roadPath = await fetchRoadRoute(roadCoords)
      .then(route => route.length ? route : densifyRoute(roadCoords))
      .catch(() => densifyRoute(roadCoords));
    drawHighlightedRoadPath(roadPath);
  }

  function drawHighlightedRoadPath(pathCoords) {
    const layer = L.polyline(pathCoords, {
      color: '#64748B',
      weight: 4,
      opacity: 0.28,
      lineCap: 'round',
      lineJoin: 'round',
      interactive: false
    }).addTo(cityMap);

    highlightedRoadLayers.push(layer);
    layer.bringToBack();
  }

  async function startApp() {
    // â•â•â• APP BOOT EXPERIENCE â•â•â•
    applyTimeTheme();
    applyStoredDarkMode();
    setupPwa();
    setupBottomSheetGestures();
    setupKeyboardAccess();
    setupDebouncedSearch();
    await loadParkingLots();
    await loadBusLines();
    await loadTrafficCameras();
    initLeafletMap();
    populateRouteSuggestions();
    renderBusLinesList();
    renderParkingService();
    renderInsightsDashboard();
    populateDeliverySelectors();
    updateCityScore();
    fetchWeather();
    locateUser(false);
    scheduleDataRefresh();
    showStartupMoments();
    startReservationCountdown();
    startParkingLiveSimulation();
    loadDeliveryOrders();
  }

  function populateRouteSuggestions() {
    const target = document.getElementById('routePlaceSuggestions');
    if (!target) return;
    const names = new Set(marrakechPlaces.map(place => place.name));
    busLines.forEach(line => line.stops.forEach(stop => names.add(stop.name)));
    target.innerHTML = Array.from(names)
      .sort((a, b) => a.localeCompare(b))
      .slice(0, 160)
      .map(name => `<option value="${name}"></option>`)
      .join('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
  } else {
    startApp();
  }

  window.addEventListener('load', refreshMapSize);
  window.addEventListener('resize', () => {
    refreshMapSize();
  });

  function refreshMapSize() {
    if (!cityMap) return;
    requestAnimationFrame(() => {
      cityMap.invalidateSize({ pan: false });
      cityMap.setView(DEFAULT_USER_POSITION, cityMap.getZoom(), { animate: false });
    });
  }

  function toggleSheet() {
    sheetExpanded = !sheetExpanded;
    document.getElementById('bottomSheet').classList.toggle('open', sheetExpanded);
    const sub = document.querySelector('#panel-default .bs-back');
    if (sub) sub.textContent = sheetExpanded ? 'Collapse â†“' : 'See more â†‘';
  }

  function showPanel(id) {
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('visible'));
    const target = document.getElementById('panel-' + id) || document.getElementById('panel-default');
    if (target) target.classList.add('visible');
  }

  function setChip(chip) {
    document.querySelectorAll('.chip').forEach(c =>
      c.classList.toggle('active', c.dataset.chip === chip)
    );
    const map = { map:'default', bus:'bus', parking:'parking', traffic:'traffic', route:'route', bike:'route', alerts:'alerts', delivery:'delivery' };
    showPanel(map[chip] || 'default');
    if (chip !== 'delivery') {
      clearDeliveryMarkers();
    }
    if (chip === 'delivery') {
      clearParkingService();
      clearTrafficLayers();
      renderDeliveryUI();
    }
    if (chip === 'parking') {
      clearTrafficLayers();
      renderParkingService();
      showParkingLotsOnMap();
    }
    if (chip === 'bus') {
      clearParkingService();
      clearTrafficLayers();
      renderBusLinesList();
      drawBusOverviewLines();
    }
    if (chip === 'traffic') {
      clearParkingService();
      renderTrafficService();
      showTrafficCameras();
      drawTrafficHeatmap();
      drawTrafficRoadSegments();
      drawTrafficFlowPolylines();
      if (cityMap) cityMap.flyTo([31.6318, -8.0008], 13, { duration: 0.45 });
      if (!trafficSimulationRunning) startTrafficCameraSimulation(false);
    }
    if (chip === 'route') {
      clearParkingService();
      clearTrafficLayers();
    }
    if (chip !== 'traffic' && chip !== 'parking') {
      clearTrafficLayers();
      stopTrafficCameraSimulation(false);
    }
    if (chip !== 'map' && !sheetExpanded) toggleSheet();
    if (chip === 'map' && sheetExpanded) toggleSheet();
  }

  function setNav(nav) {
    document.querySelectorAll('.nav-item').forEach(n => {
      const isActive = n.id === 'nav-' + nav;
      n.classList.toggle('active', isActive);
      const icon  = n.querySelector('.nav-icon');
      const label = n.querySelector('.nav-label');
      if (icon)  icon.style.color  = isActive ? '#2563EB' : '#9ca3af';
      if (label) label.style.color = isActive ? '#2563EB' : '#9ca3af';
    });
  }

  function animateBtn(el, action) {
    el.style.transform = 'scale(0.84)';
    setTimeout(() => { el.style.transform = ''; }, 160);
    if (!cityMap) return;
    if (action === 'zoomIn') cityMap.zoomIn();
    if (action === 'zoomOut') cityMap.zoomOut();
    if (action === 'center') cityMap.flyTo(DEFAULT_USER_POSITION, 13, { duration: 0.6 });
  }

  async function drawBusOverviewLines() {
    if (!cityMap || !window.L || !busLines.length) return;
    overviewRouteLayers.forEach(layer => layer.remove());
    overviewRouteLayers = [];
    if (!activeRouteId) return;

    const visibleLines = busLines
      .filter(line => activeRouteId === 'all' ? ['urban', 'airport', 'brt'].includes(line.type) : line.id === activeRouteId);

    const resolvedRoutes = await Promise.all(visibleLines.map(async line => ({
      line,
      coords: await getRoadAwareLineRoute(line)
    })));

    overviewRouteLayers = resolvedRoutes
      .map(({ line, coords }) => {
        const layer = L.polyline(coords, {
          color: line.color,
          weight: activeRouteId === 'all' ? 4 : 6,
          opacity: activeRouteId === 'all' ? 0.42 : 1,
          lineCap: 'round',
          lineJoin: 'round',
          smoothFactor: 1.1
        }).addTo(cityMap);
        layer.on('click', () => showBusLine(line.id));
        layer.bindPopup(`${line.name}<br>${line.from} -> ${line.to}`);
        return layer;
      });
  }

  function renderBusLinesList() {
    const target = document.getElementById('busLinesList');
    if (!target) return;
    const query = normalizeText(document.getElementById('busLineSearch')?.value || '');
    const filteredLines = busLines.filter(line => {
      const matchesFilter = activeBusFilter === 'all' || line.type === activeBusFilter;
      const searchable = normalizeText(`${line.id} ${line.name} ${line.from} ${line.to}`);
      return matchesFilter && (!query || searchable.includes(query));
    });

    if (!filteredLines.length) {
      target.innerHTML = '<div class="parking-empty-state"><div class="parking-name">Aucune ligne trouvee.</div></div>';
      return;
    }

    target.innerHTML = filteredLines.map(line => `
      <article class="bus-line-card">
        <div class="bus-line-badge" style="background:${line.color}">${line.id}</div>
        <div class="bus-line-main">
          <div class="bus-line-title">${line.from} -> ${line.to}</div>
          <div class="bus-line-meta">${line.operator} Â· ${line.frequency} Â· ${line.duration}</div>
        </div>
        <button class="bus-line-btn" type="button" onclick="showBusLine('${line.id}')">Afficher</button>
      </article>
    `).join('');
  }

  function setBusLineFilter(filter) {
    activeBusFilter = filter;
    document.querySelectorAll('.bus-filter-btn').forEach(button => {
      button.classList.toggle('active', button.dataset.busFilter === filter);
    });
    renderBusLinesList();
  }

  function showAllBusLines() {
    clearSelectedLine();
    activeRouteId = 'all';
    drawBusOverviewLines().then(() => {
      if (!cityMap || !overviewRouteLayers.length) return;
      const points = overviewRouteLayers.flatMap(layer => layer.getLatLngs().map(latLng => [latLng.lat, latLng.lng]));
      cityMap.fitBounds(L.latLngBounds(points), { padding: [42, 42], maxZoom: 13 });
    });
  }

  async function showBusLine(lineId) {
    clearSelectedLine();
    activeRouteId = lineId;
    document.querySelectorAll('.chip').forEach(chip =>
      chip.classList.toggle('active', chip.dataset.chip === 'bus')
    );
    showPanel('bus');
    clearParkingService();
    clearTrafficLayers();
    renderBusLinesList();
    if (!sheetExpanded) toggleSheet();
    const line = busLines.find(item => item.id === lineId);
    if (!line || !cityMap || !window.L) return;

    const routeCoords = await getRoadAwareLineRoute(line);
    selectedRouteLayer = L.polyline(routeCoords, {
      color: line.color,
      weight: 7,
      opacity: 0.95,
      lineCap: 'round',
      lineJoin: 'round',
      smoothFactor: 1.1
    }).addTo(cityMap);
    selectedRouteLayer.bindPopup(`${line.name}<br>${line.from} -> ${line.to}`);

    selectedStopMarkers = line.stops.map(stopItem =>
      L.circleMarker(stopItem.coords, {
        radius: 5,
        color: line.color,
        fillColor: '#ffffff',
        fillOpacity: 1,
        weight: 3
      })
        .addTo(cityMap)
        .bindPopup(`<strong>${stopItem.order}. ${stopItem.name}</strong><br>${line.name}`)
    );

    if (selectedRouteLayer) {
      cityMap.fitBounds(selectedRouteLayer.getBounds(), { padding: [40, 40], maxZoom: 14 });
    } else if (routeCoords.length) {
      cityMap.fitBounds(L.latLngBounds(routeCoords), { padding: [40, 40], maxZoom: 14 });
    }
    renderLineDetails(line);
    startSelectedBusAnimation(line);
  }

  function clearSelectedLine() {
    activeRouteId = null;
    overviewRouteLayers.forEach(layer => layer.remove());
    overviewRouteLayers = [];
    if (selectedRouteLayer) selectedRouteLayer.remove();
    selectedStopMarkers.forEach(marker => marker.remove());
    selectedStopMarkers = [];
    selectedRouteLayer = null;
    if (selectedBusMarker) selectedBusMarker.remove();
    selectedBusMarker = null;
    if (selectedBusAnimationFrame) cancelAnimationFrame(selectedBusAnimationFrame);
    selectedBusAnimationFrame = null;
    selectedBusRoute = [];
    selectedBusSegmentIndex = 0;
    selectedBusProgress = 0;
    const details = document.getElementById('selectedLineDetails');
    if (details) details.innerHTML = '';
  }

  function renderLineDetails(line) {
    const target = document.getElementById('selectedLineDetails');
    if (!target) return;
    target.innerHTML = `
      <div class="bus-line-detail">
        <div class="bus-detail-head">
          <div>
            <div class="bus-detail-title">${line.name}</div>
            <div class="bus-detail-sub">${line.from} -> ${line.to}</div>
          </div>
          <span class="bus-line-badge" style="background:${line.color}">${line.id}</span>
        </div>
        <div class="bus-detail-grid">
          <div class="bus-detail-item"><div class="bus-detail-label">Frequence</div><div class="bus-detail-value">${line.frequency}</div></div>
          <div class="bus-detail-item"><div class="bus-detail-label">Duree</div><div class="bus-detail-value">${line.duration}</div></div>
          <div class="bus-detail-item"><div class="bus-detail-label">Service</div><div class="bus-detail-value">${line.serviceHours}</div></div>
          <div class="bus-detail-item"><div class="bus-detail-label">Arrets</div><div class="bus-detail-value">${line.stops.length}</div></div>
        </div>
        <button class="trip-btn muted" type="button" onclick="clearSelectedLine(); if (cityMap) cityMap.flyTo(DEFAULT_USER_POSITION, 13, { duration: 0.45 });">Reinitialiser la carte</button>
      </div>
    `;
  }

  async function startSelectedBusAnimation(line) {
    selectedBusRoute = await getRoadAwareLineRoute(line);
    if (!selectedBusRoute.length) return;
    selectedBusSegmentIndex = 0;
    selectedBusProgress = 0;
    selectedBusMarker = L.marker(selectedBusRoute[0], { icon: createSmallBusIcon(line.color) })
      .addTo(cityMap)
      .bindPopup(`${line.name}<br>Bus simule`);

    let lastFrame = performance.now();
    const animate = timestamp => {
      const delta = timestamp - lastFrame;
      lastFrame = timestamp;
      selectedBusProgress += delta / 9000;
      while (selectedBusProgress >= 1) {
        selectedBusProgress -= 1;
        selectedBusSegmentIndex += 1;
        if (selectedBusSegmentIndex >= selectedBusRoute.length - 1) selectedBusSegmentIndex = 0;
      }
      const nextIndex = Math.min(selectedBusSegmentIndex + 1, selectedBusRoute.length - 1);
      selectedBusMarker.setLatLng(interpolatePosition(selectedBusRoute[selectedBusSegmentIndex], selectedBusRoute[nextIndex], selectedBusProgress));
      selectedBusAnimationFrame = requestAnimationFrame(animate);
    };
    selectedBusAnimationFrame = requestAnimationFrame(animate);
  }

  function createSmallBusIcon(color = '#2563EB') {
    return L.divIcon({
      className: '',
      html: `<div class="small-bus-marker" style="background:${color}">B</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -14]
    });
  }

  function getLineRouteCoords(line) {
    return line.route && line.route.length ? line.route : line.stops.map(stopItem => stopItem.coords);
  }

  async function getRoadAwareLineRoute(line) {
    if (!line) return [];
    if (line.roadRoute?.length) return line.roadRoute;
    if (roadRouteCache.has(line.id)) return roadRouteCache.get(line.id);

    const fallbackRoute = densifyRoute(getLineRouteCoords(line));
    const routePromise = fetchRoadRoute(getLineRouteCoords(line))
      .then(route => route.length ? route : fallbackRoute)
      .catch(() => fallbackRoute)
      .then(route => {
        line.roadRoute = route;
        return route;
      });

    roadRouteCache.set(line.id, routePromise);
    return routePromise;
  }

  async function fetchRoadRoute(coords) {
    const waypoints = normalizeRoadWaypoints(coords);
    if (waypoints.length < 2) return waypoints;

    const osrmCoords = waypoints
      .map(coord => `${coord[1].toFixed(6)},${coord[0].toFixed(6)}`)
      .join(';');
    const url = `https://router.project-osrm.org/route/v1/driving/${osrmCoords}?overview=full&geometries=geojson&continue_straight=false`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Road routing unavailable');

    const data = await response.json();
    const route = data.routes?.[0]?.geometry?.coordinates;
    if (!route?.length) return [];
    return route.map(([lng, lat]) => [lat, lng]);
  }

  function normalizeRoadWaypoints(coords) {
    const unique = [];
    coords.forEach(coord => {
      const previous = unique[unique.length - 1];
      if (!previous || haversineDistance(previous, coord) > 0.03) unique.push(coord);
    });

    if (unique.length <= 24) return unique;
    const sampled = [unique[0]];
    const step = (unique.length - 1) / 22;
    for (let index = 1; index < 23; index += 1) {
      sampled.push(unique[Math.round(index * step)]);
    }
    sampled.push(unique[unique.length - 1]);
    return sampled;
  }

  function densifyRoute(coords) {
    if (coords.length < 2) return coords;
    const dense = [];
    coords.forEach((coord, index) => {
      if (index === 0) {
        dense.push(coord);
        return;
      }
      const previous = coords[index - 1];
      const distanceKm = haversineDistance(previous, coord);
      const segments = Math.max(1, Math.ceil(distanceKm / 0.18));
      for (let segment = 1; segment <= segments; segment += 1) {
        dense.push(interpolatePosition(previous, coord, segment / segments));
      }
    });
    return dense;
  }

  function enableStartSelection() {
    selectingStart = true;
    selectingDestination = false;
    parkingSelectionMode = false;
    setChip('route');
    setTripStatus('Cliquez sur la carte pour choisir votre depart.');
    showToast('Cliquez sur la carte pour choisir votre depart.');
  }

  function enableDestinationSelection() {
    selectingDestination = true;
    selectingStart = false;
    parkingSelectionMode = false;
    setChip('route');
    setTripStatus('Cliquez sur la carte pour choisir votre destination.');
    showToast('Cliquez sur la carte pour choisir votre destination.');
  }

  function handleMapClick(e) {
    const coords = [e.latlng.lat, e.latlng.lng];
    if (selectingStart) {
      setStartLocation(coords, 'Position choisie sur la carte');
      return;
    }
    if (selectingDestination) {
      setDestinationLocation(coords, 'Destination choisie sur la carte');
      return;
    }
    if (parkingSelectionMode) {
      setParkingUserLocation(coords, 'Position choisie sur la carte');
      parkingSelectionMode = false;
      showToast('Position choisie. Recherche des parkings proches.');
      return;
    }
    handleEtaClick(coords);
  }

  function setStartLocation(coords, label = 'Votre position de depart') {
    startLocation = { coords, label };
    selectingStart = false;
    if (startMarker) startMarker.remove();
    startMarker = L.marker(coords, { icon: createRoutePointIcon('D', '#22C55E') })
      .addTo(cityMap)
      .bindPopup('Votre position de depart');
    const input = document.getElementById('tripStartInput');
    if (input) input.value = label;
    setTripStatus('Depart selectionne.');
  }

  function setDestinationLocation(coords, label = 'Votre destination') {
    destinationLocation = { coords, label };
    selectingDestination = false;
    if (destinationMarker) destinationMarker.remove();
    destinationMarker = L.marker(coords, { icon: createRoutePointIcon('A', '#EF4444') })
      .addTo(cityMap)
      .bindPopup('Votre destination');
    const input = document.getElementById('tripDestinationInput');
    if (input) input.value = label;
    setTripStatus('Destination selectionnee.');
  }

  async function setStartFromInput() {
    const input = document.getElementById('tripStartInput');
    const query = input ? input.value.trim() : '';
    if (!query) return;
    setTripStatus('Recherche du depart...');
    const result = searchMockPlace(query) || await geocodeLocation(query);
    setStartLocation(result.coords, result.name);
  }

  async function setDestinationFromInput() {
    const input = document.getElementById('tripDestinationInput');
    const query = input ? input.value.trim() : '';
    if (!query) return;
    setTripStatus('Recherche de la destination...');
    const result = searchMockPlace(query) || await geocodeLocation(query);
    setDestinationLocation(result.coords, result.name);
  }

  async function findTripFromInputs() {
    try {
      const startInput = document.getElementById('tripStartInput');
      const destinationInput = document.getElementById('tripDestinationInput');
      if (!startLocation && startInput && startInput.value.trim()) await setStartFromInput();
      if (!destinationLocation && destinationInput && destinationInput.value.trim()) await setDestinationFromInput();
      if (!startLocation || !destinationLocation) {
        setTripStatus('Choisissez un depart et une destination.');
        return;
      }
      setTripStatus('Calcul de l itineraire...');
      const result = await calculateRoute(startLocation, destinationLocation, activeRouteMode);
      if (!result) {
        setTripStatus('Aucun itineraire trouve pour ce mode.');
        return;
      }
      recommendedTripResult = result;
      if (result.mode === 'public_transport') {
        recommendedBus = findBestAvailableBusForStop(createActiveBusesForLine(result.line), result.boardingStop, result.line, result.direction);
        result.recommendedBus = recommendedBus;
      }
      renderRouteRecommendation(result);
      await showRecommendedRoute(result);
      setTripStatus('Itineraire pret.');
    } catch (error) {
      setTripStatus(error.message || 'Recherche impossible pour le moment.');
    }
  }

  function setRouteMode(mode) {
    activeRouteMode = mode;
    document.querySelectorAll('.route-mode-btn').forEach(button => {
      button.classList.toggle('active', button.dataset.routeMode === mode);
    });
  }

  async function calculateRoute(origin, destination, mode = activeRouteMode) {
    if (mode === 'public_transport') return calculatePublicTransportRoute(origin, destination);
    return calculateRoadRoute(origin, destination, mode);
  }

  async function calculatePublicTransportRoute(origin, destination) {
    const options = await findBusRouteOptions(origin, destination);
    const result = options[0];
    if (!result) return null;
    const busPath = await getRoadAwareRouteSlice(result.line, result.boardingIndex, result.exitIndex);
    const path = [origin.coords, result.boardingStop.coords, ...busPath, result.exitStop.coords, destination.coords];
    const distanceMeters =
      result.distanceToBoardingStop +
      result.routeDistanceMeters +
      result.distanceFromExitToDestination;
    const alternatives = options
      .slice(1, 4)
      .map(option => ({ path: option.busPathRoad, color: option.line.color, name: option.line.name }))
      .filter(Boolean);

    return {
      ...result,
      mode: 'public_transport',
      path,
      alternatives,
      options,
      distanceMeters,
      durationMinutes: result.totalEstimatedMinutes,
      steps: [
        { icon: '1', title: `Marcher vers ${result.boardingStop.name}`, subtitle: `${formatMeters(result.distanceToBoardingStop)} jusqu a l arret`, minutes: result.estimatedWalkToStopMinutes },
        { icon: '2', title: `Prendre ${result.line.name}`, subtitle: `${result.boardingStop.name} -> ${result.exitStop.name}`, minutes: result.estimatedBusRideMinutes },
        { icon: '3', title: `Marcher vers ${destination.label}`, subtitle: `${formatMeters(result.distanceFromExitToDestination)} depuis ${result.exitStop.name}`, minutes: result.estimatedWalkFromStopMinutes }
      ]
    };
  }

  async function calculateRoadRoute(origin, destination, mode) {
    const profile = mode === 'walking' ? 'foot' : 'car';
    const url = `https://router.project-osrm.org/route/v1/${profile}/${origin.coords[1]},${origin.coords[0]};${destination.coords[1]},${destination.coords[0]}?overview=full&geometries=geojson&alternatives=true&steps=false`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('OSRM indisponible');
      const data = await response.json();
      if (!data.routes?.length) throw new Error('Aucun itineraire trouve');
      const [primary, ...alternatives] = data.routes;
      return {
        mode,
        path: primary.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
        alternatives: alternatives.slice(0, 2).map(route => route.geometry.coordinates.map(([lng, lat]) => [lat, lng])),
        distanceMeters: primary.distance,
        durationMinutes: Math.max(1, Math.round(primary.duration / 60)),
        steps: buildDirectRouteSteps(origin, destination, mode, primary.distance, primary.duration)
      };
    } catch (error) {
      const distanceMeters = haversineDistance(origin.coords, destination.coords) * 1000;
      const speed = mode === 'walking' ? 80 : 520;
      return {
        mode,
        path: [origin.coords, destination.coords],
        alternatives: [],
        distanceMeters,
        durationMinutes: Math.max(1, Math.round(distanceMeters / speed)),
        steps: buildDirectRouteSteps(origin, destination, mode, distanceMeters, distanceMeters / speed * 60)
      };
    }
  }

  function buildDirectRouteSteps(origin, destination, mode, distanceMeters, durationSeconds) {
    const action = mode === 'walking' ? 'Marcher' : 'Conduire';
    return [
      { icon: '1', title: `${action} depuis ${origin.label}`, subtitle: `${formatMeters(distanceMeters)} vers ${destination.label}`, minutes: Math.max(1, Math.round(durationSeconds / 60)) },
      { icon: '2', title: 'Arriver a destination', subtitle: destination.label, minutes: 0 }
    ];
  }

  function getRouteSlice(line, startIndex, exitIndex) {
    return getStopRange(line, startIndex, exitIndex).map(stop => stop.coords);
  }

  function getStopRange(line, startIndex, exitIndex) {
    const step = startIndex <= exitIndex ? 1 : -1;
    const stops = [];
    for (let index = startIndex; step > 0 ? index <= exitIndex : index >= exitIndex; index += step) {
      stops.push(line.stops[index]);
    }
    return stops;
  }

  async function getRoadAwareRouteSlice(line, startIndex, exitIndex) {
    const stopCoords = getRouteSlice(line, startIndex, exitIndex);
    return fetchRoadRoute(stopCoords)
      .then(route => route.length ? route : densifyRoute(stopCoords))
      .catch(() => densifyRoute(stopCoords));
  }

  async function findBusRouteOptions(start, destination, limit = 6) {
    const options = busLines.map(line => {
      const boarding = findNearestStop(line, start.coords);
      const exit = findNearestStop(line, destination.coords);
      if (!boarding || !exit || boarding.index === exit.index) return null;
      const direction = boarding.index < exit.index ? 'outbound' : 'inbound';
      const routeDistanceMeters = calculateRouteDistance(line, boarding.index, exit.index);
      const score = boarding.distanceMeters + exit.distanceMeters + routeDistanceMeters * 0.2;
      const result = {
        line,
        direction,
        boardingStop: boarding.stop,
        exitStop: exit.stop,
        boardingIndex: boarding.index,
        exitIndex: exit.index,
        distanceToBoardingStop: boarding.distanceMeters,
        distanceFromExitToDestination: exit.distanceMeters,
        estimatedWalkToStopMinutes: calculateWalkingTime(boarding.distanceMeters),
        estimatedWalkFromStopMinutes: calculateWalkingTime(exit.distanceMeters),
        estimatedBusRideMinutes: calculateBusRideTime(line, boarding.stop, exit.stop),
        routeDistanceMeters,
        score
      };
      result.totalEstimatedMinutes =
        result.estimatedWalkToStopMinutes +
        result.estimatedWalkFromStopMinutes +
        result.estimatedBusRideMinutes;
      const buses = createActiveBusesForLine(line);
      result.recommendedBus = findBestAvailableBusForStop(buses, result.boardingStop, line, direction);
      result.busEtaMinutes = result.recommendedBus?.eta || 1;
      return result;
    }).filter(Boolean);

    options.sort((a, b) =>
      (a.totalEstimatedMinutes + a.busEtaMinutes) - (b.totalEstimatedMinutes + b.busEtaMinutes) ||
      a.score - b.score
    );

    const selected = options.slice(0, limit);
    await Promise.all(selected.map(async option => {
      option.busPathRoad = await getRoadAwareRouteSlice(option.line, option.boardingIndex, option.exitIndex);
    }));
    routeSuggestionOptions = selected;
    return selected;
  }

  function findBestBusRoute(start, destination) {
    const candidates = busLines.map(line => {
      const boarding = findNearestStop(line, start.coords);
      const exit = findNearestStop(line, destination.coords);
      if (!boarding || !exit || boarding.index === exit.index) return null;
      const routeDistanceMeters = calculateRouteDistance(line, boarding.index, exit.index);
      const score = boarding.distanceMeters + exit.distanceMeters + routeDistanceMeters * 0.2;
      return {
        line,
        direction: boarding.index < exit.index ? 'outbound' : 'inbound',
        boardingStop: boarding.stop,
        exitStop: exit.stop,
        boardingIndex: boarding.index,
        exitIndex: exit.index,
        distanceToBoardingStop: boarding.distanceMeters,
        distanceFromExitToDestination: exit.distanceMeters,
        estimatedWalkToStopMinutes: calculateWalkingTime(boarding.distanceMeters),
        estimatedWalkFromStopMinutes: calculateWalkingTime(exit.distanceMeters),
        estimatedBusRideMinutes: calculateBusRideTime(line, boarding.stop, exit.stop),
        routeDistanceMeters,
        score
      };
    }).filter(Boolean);
    return candidates.sort((a, b) => a.score - b.score)[0] || null;
  }

  function findNearestStop(line, point) {
    return line.stops.reduce((nearest, stop, index) => {
      const distanceMeters = haversineDistance(point, stop.coords) * 1000;
      if (!nearest || distanceMeters < nearest.distanceMeters) {
        return { stop, index, distanceMeters };
      }
      return nearest;
    }, null);
  }

  function calculateWalkingTime(distanceMeters) {
    return Math.max(1, Math.round(distanceMeters / 80));
  }

  function calculateBusRideTime(line, boardingStop, exitStop) {
    const startIndex = line.stops.indexOf(boardingStop);
    const exitIndex = line.stops.indexOf(exitStop);
    const distanceMeters = calculateRouteDistance(line, startIndex, exitIndex);
    return Math.max(3, Math.round(distanceMeters / 260));
  }

  function calculateRouteDistance(line, startIndex, exitIndex) {
    let distance = 0;
    const step = startIndex <= exitIndex ? 1 : -1;
    for (let i = startIndex; i !== exitIndex; i += step) {
      distance += haversineDistance(line.stops[i].coords, line.stops[i + step].coords) * 1000;
    }
    return distance;
  }

  function renderRouteRecommendation(result) {
    const target = document.getElementById('routeRecommendation');
    if (!target) return;
    const bus = result.recommendedBus || null;
    const eta = bus && result.boardingStop ? calculateETA(bus.position, result.boardingStop, result.line, result.direction) : 0;
    const modeLabels = { public_transport: 'Transport public', driving: 'Voiture', walking: 'Marche' };
    const duration = result.mode === 'public_transport' ? result.durationMinutes + eta : result.durationMinutes;
    const lineBadge = result.mode === 'public_transport' ? result.line.name : modeLabels[result.mode];
    target.innerHTML = `
      <div class="trip-card route-result-card">
        <div class="trip-reco-head">
          <div>
            <div class="trip-route-name">Itineraire recommande</div>
            <div class="trip-route-sub">${startLocation.label} -> ${destinationLocation.label}</div>
          </div>
          <span class="trip-line-badge">${lineBadge}</span>
        </div>
        <div class="route-summary-strip">
          <div class="route-summary-item"><div class="route-summary-label">Duree</div><div class="route-summary-value">${duration} min</div></div>
          <div class="route-summary-item"><div class="route-summary-label">Distance</div><div class="route-summary-value">${formatMeters(result.distanceMeters)}</div></div>
          <div class="route-summary-item"><div class="route-summary-label">Mode</div><div class="route-summary-value">${modeLabels[result.mode]}</div></div>
        </div>
        ${result.mode === 'public_transport' && result.options?.length ? renderRouteOptionCards(result.options, result.line.id, result.direction) : ''}
        ${result.mode === 'public_transport' ? `
          <div class="trip-detail-list">
            <div class="trip-detail-row"><span class="trip-detail-label">Montez a</span><span class="trip-detail-value">${result.boardingStop.name}</span></div>
            <div class="trip-detail-row"><span class="trip-detail-label">Descendez a</span><span class="trip-detail-value">${result.exitStop.name}</span></div>
            <div class="trip-detail-row"><span class="trip-detail-label">Bus le plus proche</span><span class="trip-detail-value">${bus ? bus.id : '-'} - ${eta} min</span></div>
            <div class="trip-detail-row"><span class="trip-detail-label">Frequence</span><span class="trip-detail-value">3 aller + 3 retour, toutes les 20 min</span></div>
            <div class="trip-detail-row"><span class="trip-detail-label">Position actuelle</span><span class="trip-detail-value" id="liveBusPosition">${bus ? getNearestStopName(result.line, bus.position) : '-'}</span></div>
          </div>
        ` : ''}
        <div class="route-step-list">
          ${result.steps.map(step => `
            <div class="route-step">
              <div class="route-step-dot">${step.icon}</div>
              <div>
                <div class="route-step-title">${step.title}</div>
                <div class="route-step-sub">${step.subtitle}</div>
              </div>
              <div class="route-step-time">${step.minutes ? `${step.minutes} min` : ''}</div>
            </div>
          `).join('')}
        </div>
        <div class="trip-action-stack">
          <button class="trip-btn primary" type="button" onclick="followBusesArea()">Demarrer</button>
          <button class="trip-btn muted" type="button" onclick="toggleRouteAlternatives()">Voir alternatives</button>
          ${result.mode === 'public_transport' ? '<button class="trip-btn muted" id="followRecommendedBusBtn" type="button" onclick="followRecommendedBus()">Suivre le bus recommande</button><button class="trip-btn muted" type="button" onclick="showAllStopsForRecommendedRoute()">Voir tous les arrets</button>' : ''}
          <button class="trip-btn danger" type="button" onclick="clearTripPlanning()">Effacer itineraire</button>
        </div>
      </div>
    `;
  }

  function renderRouteOptionCards(options, activeLineId, activeDirection) {
    return `
      <div class="route-suggestion-list" aria-label="Lignes de bus suggerees">
        ${options.map((option, index) => {
          const directionLabel = option.direction === 'outbound' ? 'Aller' : 'Retour';
          const eta = option.recommendedBus?.eta || option.busEtaMinutes || 1;
          const total = option.totalEstimatedMinutes + eta;
          const active = option.line.id === activeLineId && option.direction === activeDirection;
          return `
            <button class="route-suggestion-card ${active ? 'active' : ''}" type="button" onclick="selectRouteSuggestion(${index})">
              <span class="trip-line-badge" style="background:${option.line.color}">${option.line.name}</span>
              <span>
                <span class="trip-route-name">${option.boardingStop.name} -> ${option.exitStop.name}</span>
                <span class="route-suggestion-meta">${directionLabel} Â· ${formatMeters(option.distanceToBoardingStop)} a pied Â· trajet ${option.estimatedBusRideMinutes} min</span>
              </span>
              <span class="route-suggestion-eta">Bus ${eta} min<br>${total} min total</span>
            </button>
          `;
        }).join('')}
      </div>
    `;
  }

  async function selectRouteSuggestion(index) {
    const option = routeSuggestionOptions[index];
    if (!option || !startLocation || !destinationLocation) return;
    const buses = createActiveBusesForLine(option.line);
    option.recommendedBus = findBestAvailableBusForStop(buses, option.boardingStop, option.line, option.direction);
    option.busEtaMinutes = option.recommendedBus?.eta || 1;
    const busPath = option.busPathRoad || await getRoadAwareRouteSlice(option.line, option.boardingIndex, option.exitIndex);
    option.busPathRoad = busPath;
    const distanceMeters =
      option.distanceToBoardingStop +
      option.routeDistanceMeters +
      option.distanceFromExitToDestination;
    const result = {
      ...option,
      mode: 'public_transport',
      path: [startLocation.coords, option.boardingStop.coords, ...busPath, option.exitStop.coords, destinationLocation.coords],
      alternatives: routeSuggestionOptions
        .filter((_, optionIndex) => optionIndex !== index)
        .slice(0, 3)
        .map(item => ({ path: item.busPathRoad, color: item.line.color, name: item.line.name }))
        .filter(item => item.path?.length),
      options: routeSuggestionOptions,
      distanceMeters,
      durationMinutes: option.totalEstimatedMinutes,
      steps: [
        { icon: '1', title: `Marcher vers ${option.boardingStop.name}`, subtitle: `${formatMeters(option.distanceToBoardingStop)} jusqu a l arret`, minutes: option.estimatedWalkToStopMinutes },
        { icon: '2', title: `Prendre ${option.line.name}`, subtitle: `${option.boardingStop.name} -> ${option.exitStop.name}`, minutes: option.estimatedBusRideMinutes },
        { icon: '3', title: `Marcher vers ${destinationLocation.label}`, subtitle: `${formatMeters(option.distanceFromExitToDestination)} depuis ${option.exitStop.name}`, minutes: option.estimatedWalkFromStopMinutes }
      ]
    };
    recommendedTripResult = result;
    recommendedBus = result.recommendedBus;
    renderRouteRecommendation(result);
    await showRecommendedRoute(result);
    setTripStatus(`${option.line.name} selectionnee.`);
  }

  async function showRecommendedRoute(result) {
    clearRecommendedMapLayers(false);
    alternativeRouteLayers = result.alternatives.map(alternative => {
      const path = Array.isArray(alternative) ? alternative : alternative.path;
      const color = Array.isArray(alternative) ? '#94A3B8' : alternative.color;
      return L.polyline(path, {
        color,
        weight: 5,
        opacity: 0.55,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(cityMap).bindPopup(Array.isArray(alternative) ? 'Alternative' : alternative.name);
    });
    recommendedRouteLine = L.polyline(result.path, {
      color: result.mode === 'public_transport' ? result.line.color : '#2563EB',
      weight: 7,
      opacity: 0.96,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(cityMap).bindPopup('Itineraire recommande');
    recommendedRouteLine.bringToFront();

    if (result.mode === 'public_transport') {
      await drawCompleteBusLinesForRoute(result);
      boardingStopMarker = L.marker(result.boardingStop.coords, { icon: createStopIcon('BUS', '#2563EB') })
        .addTo(cityMap)
        .bindPopup(`Montez a : ${result.boardingStop.name}`);
      exitStopMarker = L.marker(result.exitStop.coords, { icon: createStopIcon('OFF', '#2563EB', true) })
        .addTo(cityMap)
        .bindPopup(`Descendez a : ${result.exitStop.name}`);
      routeStopMarkers = result.line.stops
        .slice(result.boardingIndex, result.exitIndex + 1)
        .map(stop => L.circleMarker(stop.coords, {
          radius: 4,
          color: '#2563EB',
          fillColor: '#fff',
          fillOpacity: 1,
          weight: 2
        }).addTo(cityMap).bindPopup(`${result.line.name} - ${stop.name}`));

      await drawPrincipalCongestionRoads();

      const buses = createActiveBusesForLine(result.line);
      await startMultipleBusTracking(result.line, buses, result.direction);
    }

    followBusesArea();
  }

  async function drawCompleteBusLinesForRoute(result) {
    const lineMap = new Map();
    [result, ...(result.options || [])].forEach(option => {
      if (option?.line && !lineMap.has(option.line.id)) lineMap.set(option.line.id, option.line);
    });

    const completeLineLayers = await Promise.all([...lineMap.values()].map(async line => {
      const path = await getRoadAwareLineRoute(line);
      if (path.length < 2) return null;
      return L.polyline(path, {
        color: line.color,
        weight: line.id === result.line.id ? 8 : 5,
        opacity: line.id === result.line.id ? 0.38 : 0.24,
        dashArray: line.id === result.line.id ? null : '10 12',
        lineCap: 'round',
        lineJoin: 'round',
        smoothFactor: 1.1
      }).addTo(cityMap).bindPopup(`${line.name}<br>Ligne complete`);
    }));

    fullBusRouteLayers = completeLineLayers.filter(Boolean);
    fullBusRouteLayers.forEach(layer => layer.bringToBack());
  }

  async function drawPrincipalCongestionRoads() {
    if (!cityMap || !window.L) return;
    congestionRouteLayers.forEach(layer => layer.remove());
    const congestedCorridors = principalTrafficCorridors.slice(0, 3);

    const layers = await Promise.all(congestedCorridors.map(async corridor => {
      const path = await fetchRoadRoute(corridor.coords)
        .then(route => route.length ? route : densifyRoute(corridor.coords))
        .catch(() => densifyRoute(corridor.coords));
      return L.polyline(path, {
        color: '#DC2626',
        weight: 4,
        opacity: 0.42,
        dashArray: '16 12',
        lineCap: 'round',
        lineJoin: 'round',
        smoothFactor: 1.1
      }).addTo(cityMap).bindPopup(`${corridor.name}<br>Embouteillage sur axe principal`);
    }));

    congestionRouteLayers = layers;
    congestionRouteLayers.forEach(layer => layer.bringToBack());
  }

  function createActiveBusesForLine(line) {
    const existing = activeBuses.filter(bus => bus.lineId === line.id);
    if (existing.length >= 6) return existing;
    activeBuses
      .filter(bus => bus.lineId === line.id)
      .forEach(bus => activeBuses.splice(activeBuses.indexOf(bus), 1));

    const occupancies = ['low', 'medium', 'high'];
    const schedules = [
      { direction: 'outbound', progressOffset: 0, departureOffset: 0 },
      { direction: 'outbound', progressOffset: 1 / 3, departureOffset: 20 },
      { direction: 'outbound', progressOffset: 2 / 3, departureOffset: 40 },
      { direction: 'inbound', progressOffset: 0, departureOffset: 0 },
      { direction: 'inbound', progressOffset: 1 / 3, departureOffset: 20 },
      { direction: 'inbound', progressOffset: 2 / 3, departureOffset: 40 }
    ];

    schedules.forEach((schedule, index) => {
      const routeStops = getDirectionalStops(line, schedule.direction);
      const maxSegmentIndex = Math.max(0, routeStops.length - 2);
      const routeIndex = Math.min(maxSegmentIndex, Math.floor(schedule.progressOffset * Math.max(1, routeStops.length - 1)));
      activeBuses.push({
        id: `BUS-${line.id}-${String(index + 1).padStart(2, '0')}`,
        lineId: line.id,
        direction: schedule.direction,
        departureOffsetMinutes: schedule.departureOffset,
        currentRouteIndex: Math.min(routeIndex, line.stops.length - 2),
        progress: [0, 0.35, 0.7, 0, 0.35, 0.7][index],
        routeProgress: schedule.progressOffset,
        status: 'active',
        occupancy: occupancies[index % occupancies.length],
        speedFactor: [1, 0.86, 1.12, 0.98, 0.9, 1.08][index],
        loopDuration: 260000,
        headwayMinutes: 20,
        position: routeStops[Math.min(routeIndex, routeStops.length - 1)].coords
      });
    });
    return activeBuses.filter(bus => bus.lineId === line.id);
  }

  async function startMultipleBusTracking(line, buses, preferredDirection = null) {
    if (activeBusAnimationFrame) cancelAnimationFrame(activeBusAnimationFrame);
    Object.values(activeBusMarkers).forEach(marker => marker.remove());
    activeBusMarkers = {};
    activeBusAnimationStartedAt = performance.now();
    const completeRoute = await getRoadAwareLineRoute(line);

    buses.forEach(bus => {
      bus.routePath = bus.direction === 'inbound' ? completeRoute.slice().reverse() : completeRoute;
      bus.routeMetric = buildRouteMetric(bus.routePath);
      bus.position = getBusInterpolatedPosition(line, bus, activeBusAnimationStartedAt);
      activeBusMarkers[bus.id] = L.marker(bus.position, { icon: createBusIcon(line.color) })
        .addTo(cityMap)
        .bindPopup(renderBusPopup(bus, line));
    });

    const animate = timestamp => {
      buses.forEach(bus => {
        advanceBus(line, bus, timestamp);
        const marker = activeBusMarkers[bus.id];
        if (marker) {
          marker.setLatLng(bus.position);
          marker.setPopupContent(renderBusPopup(bus, line));
        }
      });
      if (followingRecommendedBus && recommendedBus && activeBusMarkers[recommendedBus.id]) {
        const busLatLng = L.latLng(recommendedBus.position);
        if (!cityMap.getBounds().pad(-0.12).contains(busLatLng)) {
          cityMap.panTo(recommendedBus.position, { animate: true, duration: 0.45 });
        }
      }
      activeBusAnimationFrame = requestAnimationFrame(animate);
    };

    activeBusAnimationFrame = requestAnimationFrame(animate);
    if (liveBusInfoInterval) clearInterval(liveBusInfoInterval);
    liveBusInfoInterval = setInterval(updateLiveBusInfo, 2000);
  }

  function advanceBus(line, bus, timestamp) {
    if (!bus.lastFrameTime) bus.lastFrameTime = timestamp;
    const delta = timestamp - bus.lastFrameTime;
    bus.lastFrameTime = timestamp;
    const routeStops = getDirectionalStops(line, bus.direction);
    if (bus.routeMetric?.path?.length > 1) {
      const duration = bus.loopDuration / bus.speedFactor;
      bus.routeProgress = (bus.routeProgress + delta / duration) % 1;
      bus.progress = bus.routeProgress * Math.max(1, routeStops.length - 1) % 1;
      bus.currentRouteIndex = Math.min(
        routeStops.length - 2,
        Math.floor(bus.routeProgress * Math.max(1, routeStops.length - 1))
      );
    } else {
      const duration = 32000 / bus.speedFactor;
      bus.progress += delta / duration;
      while (bus.progress >= 1) {
        bus.progress -= 1;
        bus.currentRouteIndex += 1;
        if (bus.currentRouteIndex >= routeStops.length - 1) bus.currentRouteIndex = 0;
      }
    }
    bus.position = getBusInterpolatedPosition(line, bus);
  }

  function getBusInterpolatedPosition(line, bus) {
    if (bus.routeMetric?.path?.length > 1) {
      return getPointOnRouteMetric(bus.routeMetric, bus.routeProgress || 0);
    }
    const routeStops = getDirectionalStops(line, bus.direction);
    const currentIndex = Math.min(bus.currentRouteIndex, routeStops.length - 1);
    const nextIndex = Math.min(currentIndex + 1, routeStops.length - 1);
    return interpolatePosition(routeStops[currentIndex].coords, routeStops[nextIndex].coords, bus.progress);
  }

  function buildRouteMetric(path) {
    if (!path?.length) return { path: [], totalDistance: 0, distances: [] };
    const distances = [0];
    for (let index = 1; index < path.length; index += 1) {
      distances[index] = distances[index - 1] + haversineDistance(path[index - 1], path[index]);
    }
    return { path, totalDistance: distances[distances.length - 1] || 0, distances };
  }

  function getPointOnRouteMetric(metric, progress) {
    if (!metric.path.length) return DEFAULT_USER_POSITION;
    if (metric.path.length === 1 || metric.totalDistance === 0) return metric.path[0];

    const targetDistance = (progress % 1) * metric.totalDistance;
    let segmentIndex = metric.distances.findIndex(distance => distance >= targetDistance);
    if (segmentIndex <= 0) segmentIndex = 1;

    const startDistance = metric.distances[segmentIndex - 1];
    const endDistance = metric.distances[segmentIndex];
    const segmentProgress = endDistance === startDistance
      ? 0
      : (targetDistance - startDistance) / (endDistance - startDistance);
    return interpolatePosition(metric.path[segmentIndex - 1], metric.path[segmentIndex], segmentProgress);
  }

  function getDirectionalStops(line, direction = 'outbound') {
    return direction === 'inbound' ? line.stops.slice().reverse() : line.stops;
  }

  function interpolatePosition(pointA, pointB, progress) {
    return [
      pointA[0] + (pointB[0] - pointA[0]) * progress,
      pointA[1] + (pointB[1] - pointA[1]) * progress
    ];
  }

  function findBestAvailableBusForStop(buses, boardingStop, line, direction = null) {
    return buses.reduce((best, bus) => {
      if (direction && bus.direction !== direction) return best;
      bus.position = bus.position || getBusInterpolatedPosition(line, bus);
      const eta = calculateETA(bus.position, boardingStop, line, bus.direction);
      bus.eta = eta;
      if (!best || eta < best.eta) return bus;
      return best;
    }, null);
  }

  function calculateETA(busPosition, targetStop, line = null, direction = 'outbound') {
    if (line && targetStop?.coords) {
      const routeStops = getDirectionalStops(line, direction);
      const targetIndex = routeStops.findIndex(stop => stop.name === targetStop.name);
      const current = findNearestStop({ stops: routeStops }, busPosition);
      if (targetIndex >= 0 && current) {
        let segments = targetIndex - current.index;
        if (segments < 0) segments += Math.max(1, routeStops.length - 1);
        const partial = current.index === targetIndex ? 1 - (current.distanceMeters < 80 ? 0.8 : 0) : 0;
        return Math.max(1, Math.round((segments + partial) * 4));
      }
    }
    const distanceMeters = haversineDistance(busPosition, targetStop.coords || targetStop) * 1000;
    return Math.max(1, Math.round(distanceMeters / 240));
  }

  function updateLiveBusInfo() {
    if (!recommendedTripResult) return;
    const buses = activeBuses.filter(bus => bus.lineId === recommendedTripResult.line.id);
    recommendedBus = findBestAvailableBusForStop(buses, recommendedTripResult.boardingStop, recommendedTripResult.line, recommendedTripResult.direction);
    recommendedTripResult.recommendedBus = recommendedBus;
    const etaNode = document.getElementById('liveBusPosition');
    if (etaNode && recommendedBus) {
      etaNode.textContent = `${getNearestStopName(recommendedTripResult.line, recommendedBus.position)} - arrive dans ${recommendedBus.eta} min`;
    }
  }

  function followBusesArea() {
    if (!cityMap || !recommendedTripResult) return;
    const points = [
      startLocation?.coords,
      destinationLocation?.coords,
      recommendedTripResult.boardingStop?.coords,
      recommendedTripResult.exitStop?.coords,
      recommendedBus?.position
    ].filter(Boolean);
    if (recommendedTripResult.path?.length) {
      points.push(...recommendedTripResult.path);
    }
    if (points.length) cityMap.fitBounds(L.latLngBounds(points), { padding: [44, 44], maxZoom: 15 });
  }

  function followRecommendedBus() {
    if (!recommendedBus || !recommendedTripResult) return;
    followingRecommendedBus = true;
    const button = document.getElementById('followRecommendedBusBtn');
    if (button) {
      button.textContent = 'Arreter le suivi';
      button.onclick = stopFollowingBus;
    }
    showCompleteLineForTrackedBus();
  }

  function stopFollowingBus() {
    followingRecommendedBus = false;
    const button = document.getElementById('followRecommendedBusBtn');
    if (button) {
      button.textContent = 'Suivre le bus recommande';
      button.onclick = followRecommendedBus;
    }
  }

  function clearTripPlanning() {
    selectingStart = false;
    selectingDestination = false;
    startLocation = null;
    destinationLocation = null;
    recommendedTripResult = null;
    recommendedBus = null;
    followingRecommendedBus = false;
    if (startMarker) startMarker.remove();
    if (destinationMarker) destinationMarker.remove();
    startMarker = null;
    destinationMarker = null;
    clearRecommendedMapLayers(true);
    const startInput = document.getElementById('tripStartInput');
    const destinationInput = document.getElementById('tripDestinationInput');
    const recommendation = document.getElementById('routeRecommendation');
    if (startInput) startInput.value = '';
    if (destinationInput) destinationInput.value = '';
    if (recommendation) recommendation.innerHTML = '';
    setTripStatus('');
  }

  function clearRecommendedMapLayers(stopAnimation = true) {
    if (recommendedRouteLine) recommendedRouteLine.remove();
    if (boardingStopMarker) boardingStopMarker.remove();
    if (exitStopMarker) exitStopMarker.remove();
    alternativeRouteLayers.forEach(layer => layer.remove());
    fullBusRouteLayers.forEach(layer => layer.remove());
    routeStopMarkers.forEach(marker => marker.remove());
    congestionRouteLayers.forEach(layer => layer.remove());
    recommendedRouteLine = null;
    boardingStopMarker = null;
    exitStopMarker = null;
    alternativeRouteLayers = [];
    fullBusRouteLayers = [];
    routeStopMarkers = [];
    congestionRouteLayers = [];
    allStopMarkers.forEach(marker => marker.remove());
    allStopMarkers = [];
    Object.values(activeBusMarkers).forEach(marker => marker.remove());
    activeBusMarkers = {};
    if (stopAnimation && activeBusAnimationFrame) cancelAnimationFrame(activeBusAnimationFrame);
    if (stopAnimation && liveBusInfoInterval) clearInterval(liveBusInfoInterval);
    activeBusAnimationFrame = null;
    liveBusInfoInterval = null;
  }

  function showAllStopsForRecommendedRoute() {
    if (!recommendedTripResult || !cityMap) return;
    allStopMarkers.forEach(marker => marker.remove());
    allStopMarkers = recommendedTripResult.line.stops.map((stop, index) =>
      L.marker(stop.coords, { icon: createStopIcon(String(index + 1), recommendedTripResult.line.color) })
        .addTo(cityMap)
        .bindPopup(`${recommendedTripResult.line.name} - ${stop.name}`)
    );
  }

  function showCompleteLineForTrackedBus() {
    if (!recommendedTripResult || !cityMap) return;
    showAllStopsForRecommendedRoute();

    fullBusRouteLayers.forEach(layer => {
      const popup = layer.getPopup?.();
      const popupText = popup?.getContent?.() || '';
      const isRecommendedLine = popupText.includes(recommendedTripResult.line.name);
      layer.setStyle({
        color: recommendedTripResult.line.color,
        weight: isRecommendedLine ? 9 : 4,
        opacity: isRecommendedLine ? 0.72 : 0.18,
        dashArray: isRecommendedLine ? null : '10 12'
      });
      if (isRecommendedLine) layer.bringToFront();
    });

    if (recommendedRouteLine) recommendedRouteLine.bringToFront();
    Object.values(activeBusMarkers).forEach(marker => marker.setZIndexOffset(850));

    const points = [
      ...recommendedTripResult.line.stops.map(stop => stop.coords),
      recommendedBus?.position
    ].filter(Boolean);
    if (points.length) cityMap.fitBounds(L.latLngBounds(points), { padding: [46, 46], maxZoom: 13 });
  }

  function createBusIcon(color = '#2563EB') {
    return L.divIcon({
      className: '',
      html: `<div class="bus-marker" style="background:${color}">B</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -18]
    });
  }

  function createRoutePointIcon(label, color) {
    return L.divIcon({
      className: '',
      html: `<div class="route-point-marker" style="background:${color}">${label}</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -18]
    });
  }

  function createStopIcon(label, color, isExit = false) {
    return L.divIcon({
      className: '',
      html: `<div class="stop-marker ${isExit ? 'exit' : ''}" style="border-color:${color};color:${color}">${label}</div>`,
      iconSize: [26, 26],
      iconAnchor: [13, 13],
      popupAnchor: [0, -16]
    });
  }

  function renderBusPopup(bus, line) {
    const routeStops = getDirectionalStops(line, bus.direction);
    const nextStop = routeStops[Math.min(bus.currentRouteIndex + 1, routeStops.length - 1)] || routeStops[0];
    const directionLabel = bus.direction === 'outbound' ? 'aller' : 'retour';
    return `Bus ${bus.id} - ${line.name}<br>Sens : ${directionLabel}<br>Passage : chaque 20 min<br>Occupation : ${getOccupancyLabel(bus.occupancy)}<br>Prochain arret : ${nextStop.name}`;
  }

  function getOccupancyLabel(occupancy) {
    return { low: 'faible', medium: 'moyenne', high: 'elevee' }[occupancy] || occupancy;
  }

  function getNearestStopName(line, coords) {
    const nearest = findNearestStop(line, coords);
    return nearest ? `proche de ${nearest.stop.name}` : '-';
  }

  function setTripStatus(message) {
    const target = document.getElementById('tripStatus');
    if (target) target.textContent = message;
  }

  function formatMeters(distanceMeters) {
    if (!Number.isFinite(distanceMeters)) return '-';
    if (distanceMeters < 1000) return `${Math.round(distanceMeters)} m`;
    return `${(distanceMeters / 1000).toFixed(1)} km`;
  }

  function toggleRouteAlternatives() {
    if (!alternativeRouteLayers.length) {
      showToast('Aucune alternative disponible pour cet itineraire.');
      return;
    }
    const hidden = alternativeRouteLayers[0].options.opacity === 0;
    alternativeRouteLayers.forEach(layer => layer.setStyle({ opacity: hidden ? 0.55 : 0 }));
  }

  function getTrafficStatus(vehicleCount) {
    if (vehicleCount > 40) {
      return {
        status: 'heavy',
        label: 'Embouteillage fort',
        color: '#DC2626'
      };
    }

    if (vehicleCount >= 20) {
      return {
        status: 'medium',
        label: 'Trafic moyen',
        color: '#F59E0B'
      };
    }

    return {
      status: 'low',
      label: 'Fluide',
      color: '#22C55E'
    };
  }

  function getPriorityDirection(intersection) {
    return intersection.cameras.reduce((priority, camera) =>
      camera.vehicleCount > priority.vehicleCount ? camera : priority
    , intersection.cameras[0]);
  }

  function getTrafficSummary() {
    const cameras = trafficIntersections.flatMap(intersection => intersection.cameras);
    return cameras.reduce((summary, camera) => {
      const status = getTrafficStatus(camera.vehicleCount);
      summary.totalCameras += 1;
      summary.totalVehicles += camera.vehicleCount;
      summary[status.status] += 1;
      return summary;
    }, { totalCameras: 0, totalVehicles: 0, low: 0, medium: 0, heavy: 0 });
  }

  function getCameraTrafficEntries() {
    return trafficIntersections.flatMap(intersection =>
      intersection.cameras.map(camera => ({ intersection, camera }))
    );
  }

  function getDynamicTrafficStyle(camera, heavyCameraIds = null) {
    const status = getTrafficStatus(camera.vehicleCount);
    const isPeak = status.status === 'heavy' && (!heavyCameraIds || heavyCameraIds.has(camera.id));

    if (isPeak) {
      return {
        ...status,
        color: '#DC2626',
        weight: 5,
        opacity: 0.58,
        dashArray: '14 12'
      };
    }

    if (status.status === 'heavy') {
      return {
        ...status,
        status: 'medium',
        label: 'Trafic eleve',
        color: '#F97316',
        weight: 4,
        opacity: 0.5,
        dashArray: '10 12'
      };
    }

    if (status.status === 'medium') {
      return {
        ...status,
        color: '#F59E0B',
        weight: 4,
        opacity: 0.46,
        dashArray: '8 12'
      };
    }

    return {
      ...status,
      color: '#14B8A6',
      weight: 3,
      opacity: 0.32,
      dashArray: '5 13'
    };
  }

  function getPeakTrafficCameraIds(limit = 3) {
    return new Set(
      getCameraTrafficEntries()
        .filter(({ camera }) => getTrafficStatus(camera.vehicleCount).status === 'heavy')
        .sort((a, b) => b.camera.vehicleCount - a.camera.vehicleCount)
        .slice(0, limit)
        .map(({ camera }) => camera.id)
    );
  }

  function clearTrafficLayers() {
    trafficRoadDrawToken += 1;
    trafficFlowDrawToken += 1;
    trafficIntersectionMarkers.forEach(marker => marker.remove());
    trafficCameraMarkers.forEach(marker => marker.remove());
    trafficRoadSegments.forEach(segment => segment.remove());
    trafficFlowLayers.forEach(layer => layer.remove());
    trafficHeatLayers.forEach(layer => layer.remove());
    trafficIntersectionMarkers = [];
    trafficCameraMarkers = [];
    trafficRoadSegments = [];
    trafficFlowLayers = [];
    trafficHeatLayers = [];
  }

  function showTrafficCameras() {
    if (!cityMap || !window.L || !trafficIntersections.length) return;

    trafficIntersectionMarkers.forEach(marker => marker.remove());
    trafficCameraMarkers.forEach(marker => marker.remove());
    trafficIntersectionMarkers = [];
    trafficCameraMarkers = [];

    trafficIntersections.forEach(intersection => {
      const priority = getPriorityDirection(intersection);
      const intersectionMarker = L.marker(intersection.coords, { icon: createTrafficIntersectionIcon() })
        .addTo(cityMap)
        .bindPopup(`
          <strong>${intersection.name}</strong><br>
          ${intersection.cameras.length} cameras actives<br>
          Feu vert prioritaire : ${priority.label} - ${priority.vehicleCount} voitures
        `);
      trafficIntersectionMarkers.push(intersectionMarker);

      intersection.cameras.forEach(camera => {
        const status = getTrafficStatus(camera.vehicleCount);
        const marker = L.marker(camera.coords, { icon: createTrafficCameraIcon(camera.direction) })
          .addTo(cityMap)
          .bindPopup(`
            <strong>Camera ${camera.label}</strong><br>
            ${intersection.name}<br>
            Voitures detectees : ${camera.vehicleCount}<br>
            Statut : <span style="color:${status.color};font-weight:700">${status.label}</span><br>
            <button onclick="openTrafficCameraView('${camera.id}')" style="border:0;border-radius:8px;background:#2563EB;color:#fff;margin-top:8px;padding:7px 9px;font-weight:800;cursor:pointer">Voir la situation</button>
          `);
        marker.on('click', () => {
          setChip('traffic');
          openTrafficCameraView(camera.id);
        });
        trafficCameraMarkers.push(marker);
      });
    });
  }

  async function drawTrafficRoadSegments() {
    if (!cityMap || !window.L || !trafficIntersections.length) return;

    trafficRoadDrawToken += 1;
    const drawToken = trafficRoadDrawToken;
    trafficRoadSegments.forEach(segment => segment.remove());
    trafficRoadSegments = [];
    const peakCameraIds = getPeakTrafficCameraIds(3);

    const cameraEntries = getCameraTrafficEntries();
    const roadLayers = await Promise.all(cameraEntries.map(async ({ intersection, camera }, index) => {
        const status = getDynamicTrafficStyle(camera, peakCameraIds);
        const mainCorridor = status.status === 'heavy'
          ? principalTrafficCorridors[index % principalTrafficCorridors.length]
          : null;
        const warning = status.status === 'heavy' ? '<br><strong style="color:#DC2626">Route a eviter maintenant</strong>' : '';
        const routePath = mainCorridor
          ? await fetchRoadRoute(mainCorridor.coords)
            .then(route => route.length ? route : densifyRoute(mainCorridor.coords))
            .catch(() => densifyRoute(mainCorridor.coords))
          : await getRoadAwareTrafficRoute(intersection, camera);
        const segment = L.polyline(routePath, {
          color: status.color,
          weight: status.weight,
          opacity: status.opacity,
          dashArray: status.dashArray,
          lineCap: 'round',
          lineJoin: 'round',
          smoothFactor: 1.1
        }).addTo(cityMap).bindPopup(`
          <strong>${mainCorridor ? mainCorridor.name : `${intersection.name} - ${camera.label}`}</strong><br>
          ${camera.vehicleCount} voitures<br>
          ${status.label}${warning}
        `);
        if (status.status === 'heavy') segment.bringToFront();
        return segment;
      }
    ));

    if (drawToken !== trafficRoadDrawToken) {
      roadLayers.forEach(layer => layer.remove());
      return;
    }

    trafficRoadSegments = roadLayers;
  }

  async function getRoadAwareTrafficRoute(intersection, camera) {
    const rawPath = camera.roadSegment?.length ? camera.roadSegment : [camera.coords, intersection.coords];
    const fallbackRoute = densifyRoute(rawPath);
    const cacheKey = `${camera.id}:${rawPath.map(coord => coord.join(',')).join('|')}`;
    if (trafficRouteCache.has(cacheKey)) return trafficRouteCache.get(cacheKey);

    const routePromise = fetchRoadRoute(rawPath)
      .then(route => route.length ? route : fallbackRoute)
      .catch(() => fallbackRoute);

    trafficRouteCache.set(cacheKey, routePromise);
    return routePromise;
  }

  function renderAvoidRoadsList() {
    const peakCameraIds = getPeakTrafficCameraIds(3);
    const avoidRoads = getCameraTrafficEntries()
      .filter(({ camera }) => peakCameraIds.has(camera.id))
      .sort((a, b) => b.camera.vehicleCount - a.camera.vehicleCount);

    if (!avoidRoads.length) {
      return `
        <div class="traffic-avoid">
          <div class="traffic-avoid-title">Rues a eviter</div>
          <div class="traffic-avoid-item">Aucune route rouge pour le moment.</div>
        </div>
      `;
    }

    return `
      <div class="traffic-avoid">
        <div class="traffic-avoid-title">Rues a eviter</div>
        ${avoidRoads.map(({ intersection, camera }) => `
          <div class="traffic-avoid-item">${intersection.name} - ${camera.label} : ${camera.vehicleCount} voitures</div>
        `).join('')}
      </div>
    `;
  }

  function findTrafficCameraEntry(cameraId) {
    return getCameraTrafficEntries().find(({ camera }) => camera.id === cameraId);
  }

  function openTrafficCameraView(cameraId) {
    const entry = findTrafficCameraEntry(cameraId);
    if (!entry) return;

    const { intersection, camera } = entry;
    const status = getTrafficStatus(camera.vehicleCount);
    activeTrafficCameraId = camera.id;

    const panel = document.getElementById('cameraLivePanel');
    if (!panel) return;

    document.getElementById('cameraLiveTitle').textContent = `Camera ${camera.label}`;
    document.getElementById('cameraLiveSubtitle').textContent = intersection.name;
    document.getElementById('cameraLiveVehicles').textContent = camera.vehicleCount;
    document.getElementById('cameraLiveStatus').textContent = status.label;
    document.getElementById('cameraLiveStatus').style.color = status.color;
    document.getElementById('cameraLiveDirection').textContent = getDirectionLabel(camera.direction);
    renderTrafficCameraScene(intersection, camera);

    panel.classList.add('show');
  }

  function closeTrafficCameraView() {
    const panel = document.getElementById('cameraLivePanel');
    activeTrafficCameraId = null;
    if (panel) panel.classList.remove('show');
  }

  function getDirectionLabel(direction) {
    const labels = { North: 'Nord', South: 'Sud', East: 'Est', West: 'Ouest' };
    return labels[direction] || direction;
  }

  function getOptimizerStatusInfo(count) {
    if (count >= 42) return { key: 'heavy', label: 'High', color: '#EF4444', light: 'green' };
    if (count >= 25) return { key: 'medium', label: 'Medium', color: '#F59E0B', light: 'amber' };
    return { key: 'low', label: 'Low', color: '#22C55E', light: 'red' };
  }

  function renderTrafficLight(activeLight) {
    return `
      <div class="traffic-light-mini">
        <span class="red ${activeLight === 'red' ? 'on' : ''}"></span>
        <span class="amber ${activeLight === 'amber' ? 'on' : ''}"></span>
        <span class="green ${activeLight === 'green' ? 'on' : ''}"></span>
      </div>
    `;
  }

  function renderOptimizerCard(camera, activeCameraId) {
    const status = getOptimizerStatusInfo(camera.vehicleCount);
    const direction = getDirectionLabel(camera.direction);
    return `
      <div class="optimizer-card ${camera.direction.toLowerCase()} ${camera.id === activeCameraId ? 'active' : ''}">
        <div class="optimizer-card-head">
          <div class="optimizer-direction">${direction}</div>
          ${renderTrafficLight(status.light)}
        </div>
        <div class="optimizer-count">${camera.vehicleCount} <span>cars</span></div>
        <div class="optimizer-status" style="background:${status.color}">${status.label}</div>
      </div>
    `;
  }

  function renderOptimizerCars(cameras, activeCameraId) {
    const activeIndex = Math.max(0, cameras.findIndex(camera => camera.id === activeCameraId));
    const positions = [
      { left: 18, top: 60, rotate: 0 },
      { left: 96, top: 60, rotate: 0 },
      { left: 58, top: 18, rotate: 90 },
      { left: 58, top: 96, rotate: 90 },
      { left: 34, top: 74, rotate: 0 },
      { left: 82, top: 48, rotate: 90 },
      { left: 70, top: 76, rotate: 0 },
      { left: 46, top: 38, rotate: 90 }
    ];
    const colors = ['#22C55E', '#2563EB', '#EF4444', '#F97316', '#E2E8F0', '#0EA5E9'];
    return positions.map((position, index) => {
      const isPriority = index % 4 === activeIndex % 4;
      return `<span class="optimizer-car ${isPriority ? 'priority' : ''}" style="left:${position.left}px;top:${position.top}px;background:${colors[index % colors.length]};transform:rotate(${position.rotate}deg);animation-delay:${index * -0.18}s"></span>`;
    }).join('');
  }

  function renderTrafficCameraScene(intersection, activeCamera) {
    const target = document.getElementById('cameraLiveScene');
    if (!target) return;
    const priority = getPriorityDirection(intersection);
    target.innerHTML = `
      <div class="optimizer-stage">
        <div class="optimizer-title">Smart Traffic Optimizer</div>
        <div class="optimizer-subtitle">${intersection.name} - simulation des feux par camera</div>
        <div class="camera-live-badge"><span class="camera-live-dot"></span> LIVE AI</div>
        <div class="camera-road-label">${getDirectionLabel(activeCamera.direction)}</div>
        ${intersection.cameras.map(camera => renderOptimizerCard(camera, activeCamera.id)).join('')}
        <div class="optimizer-intersection">
          <div class="optimizer-road-x"></div>
          <div class="optimizer-road-y"></div>
          <div class="optimizer-lane-line"></div>
          <div class="optimizer-lane-line vertical"></div>
          <div class="optimizer-core"></div>
          ${renderOptimizerCars(intersection.cameras, activeCamera.id)}
        </div>
        <div class="optimizer-ai"><strong>AI Recommendation:</strong> donner le feu vert a ${getDirectionLabel(priority.direction)} (${priority.vehicleCount} cars), puis recalculer la priorite.</div>
      </div>
    `;
  }

  function refreshActiveTrafficCameraView() {
    if (activeTrafficCameraId) openTrafficCameraView(activeTrafficCameraId);
  }

  window.openTrafficCameraView = openTrafficCameraView;
  window.closeTrafficCameraView = closeTrafficCameraView;

  function renderTrafficIntersectionCard(intersection) {
    const priority = getPriorityDirection(intersection);
    return `
      <article class="traffic-intersection-card">
        <div class="traffic-card-head">
          <div>
            <div class="traffic-card-name">${intersection.name}</div>
            <div class="traffic-card-sub">4 cameras intelligentes actives</div>
          </div>
          <span class="parking-status available" style="background:#2563EB">Surveille</span>
        </div>
        <div class="traffic-camera-list">
          ${intersection.cameras.map(camera => {
            const status = getTrafficStatus(camera.vehicleCount);
            return `
              <button class="traffic-camera-row" type="button" onclick="openTrafficCameraView('${camera.id}')">
                <span class="traffic-status-dot" style="background:${status.color}"></span>
                <div class="traffic-camera-main">
                  <div class="traffic-camera-label">${camera.label}</div>
                  <div class="traffic-camera-status" style="color:${status.color}">${status.label}</div>
                </div>
                <div class="traffic-camera-count">${camera.vehicleCount} voitures</div>
              </button>
            `;
          }).join('')}
        </div>
        <div class="traffic-priority">
          Feu vert prioritaire : ${priority.label} - ${priority.vehicleCount} voitures
        </div>
      </article>
    `;
  }

  function renderTrafficService() {
    const target = document.getElementById('panel-traffic');
    if (!target) return;
    const summary = getTrafficSummary();
    target.innerHTML = `
      <div class="bs-title">
        Smart Traffic
        <span class="bs-back" onclick="setChip('map')">Retour</span>
      </div>
      <div class="traffic-subtitle">Cameras intelligentes pour detecter les embouteillages en temps reel</div>
      <div class="traffic-actions">
        <button class="traffic-btn primary" onclick="startTrafficCameraSimulation()">Demarrer simulation</button>
        <button class="traffic-btn" onclick="stopTrafficCameraSimulation()">Pause simulation</button>
        <button class="traffic-btn danger" onclick="resetTrafficSimulation()">Reinitialiser</button>
      </div>
      <div class="traffic-summary">
        <div class="traffic-stat">
          <div class="traffic-stat-value">${trafficIntersections.length}</div>
          <div class="traffic-stat-label">Ronds-points surveilles</div>
        </div>
        <div class="traffic-stat">
          <div class="traffic-stat-value">${summary.totalCameras}</div>
          <div class="traffic-stat-label">Cameras actives</div>
        </div>
        <div class="traffic-stat">
          <div class="traffic-stat-value">${summary.totalVehicles}</div>
          <div class="traffic-stat-label">Voitures detectees</div>
        </div>
        <div class="traffic-stat">
          <div class="traffic-stat-value">${summary.low}/${summary.medium}/${summary.heavy}</div>
          <div class="traffic-stat-label">Fluides / Moyennes / Embouteillees</div>
        </div>
      </div>
      ${renderAvoidRoadsList()}
      ${trafficIntersections.map(renderTrafficIntersectionCard).join('')}
      <div class="traffic-intersection-card">
        <div class="traffic-card-name">Insights ville</div>
        <div class="traffic-card-sub">Congestion par heure, parking et ponctualite bus</div>
        <div id="insightsDashboard" class="insight-grid"></div>
      </div>
    `;
    renderInsightsDashboard();
  }

  function updateCameraVehicleCounts() {
    const cameras = getCameraTrafficEntries().map(({ camera }) => camera);
    cameras.forEach(camera => {
      const variation = Math.floor(Math.random() * 13) - 6;
      camera.vehicleCount = Math.max(4, Math.min(54, camera.vehicleCount + variation));
    });

    const peakCount = Math.min(3, cameras.length);
    const peakCameras = [...cameras]
      .sort(() => Math.random() - 0.5)
      .slice(0, peakCount);

    peakCameras.forEach((camera, index) => {
      camera.vehicleCount = Math.min(70, Math.max(camera.vehicleCount, 44 + index * 5 + Math.floor(Math.random() * 10)));
    });

    cameras
      .filter(camera => !peakCameras.includes(camera) && camera.vehicleCount > 42)
      .forEach(camera => {
        camera.vehicleCount = 28 + Math.floor(Math.random() * 12);
      });

    updateTrafficUI();
  }

  function updateTrafficUI() {
    renderTrafficService();
    refreshActiveTrafficCameraView();
    drawTrafficRoadSegments();
    drawTrafficFlowPolylines();
    showTrafficCameras();
    drawIncidentLayer();
    updateCityScore();
  }

  function startTrafficCameraSimulation(shouldToast = true) {
    if (trafficSimulationInterval) clearInterval(trafficSimulationInterval);
    trafficSimulationRunning = true;
    updateCameraVehicleCounts();
    trafficSimulationInterval = setInterval(updateCameraVehicleCounts, 4000);
    if (shouldToast) showToast('Simulation Smart Traffic activee.');
  }

  function stopTrafficCameraSimulation(shouldToast = true) {
    if (trafficSimulationInterval) clearInterval(trafficSimulationInterval);
    trafficSimulationInterval = null;
    trafficSimulationRunning = false;
    renderTrafficService();
    if (shouldToast) showToast('Simulation Smart Traffic en pause.');
  }

  function resetTrafficSimulation() {
    stopTrafficCameraSimulation(false);
    trafficIntersections.forEach(intersection => {
      intersection.cameras.forEach(camera => {
        camera.vehicleCount = initialTrafficCounts[camera.id] ?? camera.vehicleCount;
      });
    });
    updateTrafficUI();
    showToast('Flux Smart Traffic reinitialises.');
  }

  function renderParkingService() {
    const target = document.getElementById('panel-parking');
    if (!target) return;

    const radiusLabel = activeParkingSearchRadiusKm === PARKING_SEARCH_RADIUS_KM ? '1 km' : '3 km';
    const nearbyParkings = parkingUserLocation
      ? getNearbyAvailableParkings(parkingUserLocation, activeParkingSearchRadiusKm)
      : [];
    const userLabel = parkingUserLocationLabel
      ? `<div class="parking-location-status">Position : ${parkingUserLocationLabel}</div>`
      : '<div class="parking-location-status">Choisissez votre localisation pour afficher les parkings proches.</div>';
    const resultBlock = parkingUserLocation
      ? renderParkingCards(nearbyParkings)
      : '';

    target.innerHTML = `
      <div class="bs-title">
        Smart Parking
        <span class="bs-back" onclick="setChip('map')">Retour</span>
      </div>
      <div class="parking-subtitle">Trouvez les parkings disponibles dans un rayon de ${radiusLabel}</div>
      <div class="parking-tools">
        <div class="parking-filter-row">
          ${['all:Toutes','underground:Souterrain','surface:Surface','pmr:PMR','bike:Velo'].map(item => {
            const [value, label] = item.split(':');
            return `<button class="parking-filter-chip ${activeParkingTypeFilter === value ? 'active' : ''}" type="button" onclick="setParkingTypeFilter('${value}')">${label}</button>`;
          }).join('')}
        </div>
        <button class="trip-btn muted" type="button" onclick="toggleParkingView()">Vue ${parkingViewMode === 'list' ? 'carte' : 'liste'}</button>
      </div>
      <div class="parking-location-card">
        <div class="parking-location-title">Votre position</div>
        <div class="parking-location-actions">
          <button class="parking-mini-btn primary" type="button" onclick="chooseCurrentLocation()">Utiliser ma position actuelle</button>
          <button class="parking-mini-btn" type="button" onclick="enableParkingLocationSelection()">Choisir sur la carte</button>
        </div>
        <div class="parking-location-input-row">
          <input class="parking-location-input" id="parkingLocationQuery" type="text" placeholder="Entrer une adresse ou un lieu" onkeydown="if(event.key === 'Enter') searchParkingLocation(this.value)"/>
          <button class="parking-mini-btn primary" type="button" onclick="searchParkingLocation(document.getElementById('parkingLocationQuery').value)">Rechercher</button>
        </div>
        <div class="parking-location-status" id="parkingLocationStatus">${parkingSelectionMode ? 'Cliquez sur la carte pour choisir votre position' : ''}</div>
        ${userLabel}
      </div>
      <div id="parkingCards" class="parking-list">${resultBlock}</div>
    `;
  }

  function renderParkingCards(nearbyParkings = []) {
    if (!parkingUserLocation) return '';
    if (parkingViewMode === 'map') {
      return '<div class="parking-empty-state"><div class="parking-name">Vue carte activee</div><div class="parking-address">Les parkings proches sont visibles sur la carte.</div></div>';
    }
    nearbyParkings = nearbyParkings.filter(({ parking }) => parkingMatchesFilter(parking));
    if (!nearbyParkings.length) {
      return `
        <div class="parking-empty-state">
          <div class="parking-name">Aucun parking disponible dans un rayon de ${activeParkingSearchRadiusKm} km.</div>
          ${activeParkingSearchRadiusKm === PARKING_SEARCH_RADIUS_KM
            ? '<button class="parking-mini-btn primary" type="button" style="margin-top:12px;width:100%" onclick="expandParkingSearchRadius()">Elargir a 3 km</button>'
            : ''}
        </div>
      `;
    }

    return nearbyParkings.map(({ parking, distanceKm }) => {
      parking.status = getParkingStatus(parking);
      const activeReservation = activeReservations.find(reservation =>
        reservation.parkingId === parking.id && reservation.status === 'active'
      );
      const reserveText = activeReservation ? 'Reserve temporairement' : 'Reserver';
      const reserveClass = activeReservation ? 'reserved' : 'reserve';
      const reserveDisabled = activeReservation ? 'disabled' : '';
      const reservationBlock = activeReservation
        ? `<div class="reservation-info">
             1 place reservee temporairement<br>
             Expire dans <span data-reservation-timer="${activeReservation.id}">${renderReservationTimer(activeReservation)}</span>
           </div>`
        : '';

      return `
        <article class="parking-card">
          <div class="parking-card-header">
            <div>
              <div class="parking-name">${parking.name}</div>
              <div class="parking-address">Adresse : ${parking.address}</div>
              <div class="parking-address">Distance : ${formatDistance(distanceKm)}</div>
            </div>
            <span class="parking-status ${activeReservation ? 'reserved' : parking.status}">${activeReservation ? 'Reserve' : getParkingStatusLabel(parking.status)}</span>
          </div>
          <div class="parking-details">
            <div class="parking-detail">
              <div class="parking-detail-label">Places disponibles</div>
              <div class="parking-detail-value">${parking.availableSpaces} / ${parking.totalSpaces}</div>
            </div>
            <div class="parking-detail">
              <div class="parking-detail-label">Prix</div>
              <div class="parking-detail-value">${parking.pricePerHour} DH/h</div>
            </div>
          </div>
          <svg class="parking-prediction" viewBox="0 0 120 34" aria-label="Prediction occupation">${renderParkingPredictionBars(parking)}</svg>
          ${reservationBlock}
          <div class="parking-actions">
            <button class="parking-btn guide" onclick="guideToParking('${parking.id}')">Me guider</button>
            <button class="parking-btn ${reserveClass}" onclick="reserveParkingSpot('${parking.id}')" ${reserveDisabled}>${reserveText}</button>
            <div class="parking-qr" aria-label="QR acces rapide"></div>
          </div>
        </article>
      `;
    }).join('');
  }

  function chooseCurrentLocation() {
    if (!navigator.geolocation) {
      showToast('Geolocalisation non disponible dans ce navigateur.');
      return;
    }

    showParkingStatus('Recherche de votre position actuelle...');
    navigator.geolocation.getCurrentPosition(
      position => {
        setParkingUserLocation(
          [position.coords.latitude, position.coords.longitude],
          'Position actuelle'
        );
      },
      () => showParkingStatus('Impossible de recuperer votre position actuelle.')
    );
  }

  function enableParkingLocationSelection() {
    parkingSelectionMode = true;
    setChip('parking');
    showParkingStatus('Cliquez sur la carte pour choisir votre position');
    showToast('Cliquez sur la carte pour choisir votre position');
  }

  function setParkingUserLocation(coords, label = 'Position choisie') {
    parkingUserLocation = coords;
    parkingUserLocationLabel = label;
    activeParkingSearchRadiusKm = PARKING_SEARCH_RADIUS_KM;
    parkingSelectionMode = false;
    updateParkingServiceUI();
  }

  async function searchParkingLocation(query) {
    const value = (query || '').trim();
    if (!value) {
      showParkingStatus('Entrez une adresse ou un lieu.');
      return;
    }

    try {
      showParkingStatus('Recherche du lieu...');
      const mockPlace = searchMockPlace(value);
      const result = mockPlace || await geocodeLocation(value);
      setParkingUserLocation(result.coords, result.name);
    } catch (error) {
      showParkingStatus(error.message || 'Lieu introuvable.');
    }
  }

  function searchMockPlace(query) {
    const normalizedQuery = normalizeText(query);
    const knownPlace = marrakechPlaces.find(place =>
      normalizeText(place.name).includes(normalizedQuery) ||
      normalizedQuery.includes(normalizeText(place.name))
    );
    if (knownPlace) return knownPlace;

    for (const line of busLines) {
      const stop = line.stops.find(item =>
        normalizeText(item.name).includes(normalizedQuery) ||
        normalizedQuery.includes(normalizeText(item.name))
      );
      if (stop) return { name: stop.name, coords: stop.coords };
    }
    return null;
  }

  async function geocodeLocation(query) {
    const fullQuery = /\bmarrakech\b/i.test(query) ? query : `${query}, Marrakech, Morocco`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=ma&q=${encodeURIComponent(fullQuery)}`;
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Recherche OpenStreetMap indisponible.');

    const results = await response.json();
    if (!Array.isArray(results) || !results.length) {
      throw new Error('Aucun lieu trouve a Marrakech.');
    }

    return {
      name: results[0].display_name || query,
      coords: [Number(results[0].lat), Number(results[0].lon)]
    };
  }

  function normalizeText(value) {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9 ]/g, '')
      .trim();
  }

  function getNearbyAvailableParkings(userLocation, radiusKm) {
    return parkingLots
      .map(parking => ({
        parking,
        distanceKm: haversineDistance(userLocation, parking.coords)
      }))
      .filter(item => item.distanceKm <= radiusKm && item.parking.availableSpaces > 0)
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }

  function haversineDistance(coord1, coord2) {
    const earthRadiusKm = 6371;
    const toRad = degrees => degrees * Math.PI / 180;
    const [lat1, lng1] = coord1;
    const [lat2, lng2] = coord2;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function formatDistance(distanceKm) {
    if (distanceKm < 1) {
      return `${Math.round(distanceKm * 1000)} m`;
    }
    return `${distanceKm.toFixed(1)} km`;
  }

  function showNearbyParkingsOnMap(userLocation, nearbyParkings) {
    if (!cityMap || !window.L || !userLocation) return;
    parkingMarkers.forEach(marker => marker.remove());
    parkingMarkers = [];
    if (parkingUserMarker) parkingUserMarker.remove();
    if (parkingSearchCircle) parkingSearchCircle.remove();

    parkingUserMarker = L.marker(userLocation, { icon: createUserIcon() })
      .addTo(cityMap)
      .bindPopup('Votre position');

    parkingSearchCircle = L.circle(userLocation, {
      radius: activeParkingSearchRadiusKm * 1000,
      color: '#2563EB',
      fillColor: '#2563EB',
      fillOpacity: 0.08,
      weight: 2
    }).addTo(cityMap);

    const bounds = L.latLngBounds([userLocation]);
    parkingMarkers = nearbyParkings.map(({ parking, distanceKm }) => {
      const color = getParkingMarkerColor(parking.status);
      const activeReservation = activeReservations.find(reservation =>
        reservation.parkingId === parking.id && reservation.status === 'active'
      );
      const reserveText = activeReservation ? 'Reserve temporairement' : 'Reserver';
      const disabled = activeReservation ? 'disabled' : '';
      const popup = `
        <strong>${parking.name}</strong><br>
        Distance : ${formatDistance(distanceKm)}<br>
        ${parking.availableSpaces} / ${parking.totalSpaces} places disponibles<br>
        ${parking.pricePerHour} DH/h
        <div style="display:flex;gap:6px;margin-top:8px">
          <button onclick="guideToParking('${parking.id}')" style="border:0;border-radius:8px;background:#2563EB;color:#fff;padding:7px 8px;font-weight:700;cursor:pointer">Me guider</button>
          <button onclick="reserveParkingSpot('${parking.id}')" ${disabled} style="border:1px solid #BFDBFE;border-radius:8px;background:#fff;color:#2563EB;padding:7px 8px;font-weight:700;cursor:pointer">${reserveText}</button>
        </div>
      `;

      const marker = L.marker(parking.coords, { icon: createMapIcon('P', color) })
        .addTo(cityMap)
        .bindPopup(popup);
      marker.on('click', () => setChip('parking'));
      bounds.extend(parking.coords);
      return marker;
    });

    if (nearbyParkings.length) {
      cityMap.fitBounds(bounds, { padding: [48, 48], maxZoom: 16 });
    } else {
      cityMap.fitBounds(parkingSearchCircle.getBounds(), { padding: [38, 38], maxZoom: 15 });
    }
  }

  function showParkingLotsOnMap() {
    const nearbyParkings = parkingUserLocation
      ? getNearbyAvailableParkings(parkingUserLocation, activeParkingSearchRadiusKm)
      : [];
    if (parkingUserLocation) showNearbyParkingsOnMap(parkingUserLocation, nearbyParkings);
  }

  function expandParkingSearchRadius() {
    activeParkingSearchRadiusKm = PARKING_EXPANDED_RADIUS_KM;
    updateParkingServiceUI();
    showToast('Recherche elargie a 3 km.');
  }

  function reserveParkingSpot(parkingId) {
    const parking = parkingLots.find(p => p.id === parkingId);
    if (!parking) return;

    const alreadyReserved = activeReservations.some(reservation =>
      reservation.parkingId === parkingId && reservation.status === 'active'
    );
    if (alreadyReserved) {
      showToast('Vous avez deja une reservation temporaire pour ce parking.');
      return;
    }

    if (parking.availableSpaces <= 0) {
      showToast('Parking complet. Aucune place disponible.');
      return;
    }

    parking.availableSpaces -= 1;
    parking.reservedSpaces += 1;
    parking.status = getParkingStatus(parking);

    const reservation = {
      id: `RES-${Date.now()}`,
      parkingId,
      createdAt: Date.now(),
      expiresAt: Date.now() + RESERVATION_TIMEOUT,
      status: 'active'
    };

    activeReservations.push(reservation);

    updateParkingServiceUI();
    showToast('Place reservee temporairement.');
    launchConfetti();

    setTimeout(() => {
      expireReservation(reservation.id);
    }, RESERVATION_TIMEOUT);
  }

  function expireReservation(reservationId) {
    const reservation = activeReservations.find(r => r.id === reservationId);
    if (!reservation || reservation.status !== 'active') return;

    const parking = parkingLots.find(p => p.id === reservation.parkingId);
    if (!parking) return;

    reservation.status = 'expired';
    parking.availableSpaces = Math.min(parking.totalSpaces, parking.availableSpaces + 1);
    parking.reservedSpaces = Math.max(0, parking.reservedSpaces - 1);
    parking.status = getParkingStatus(parking);

    updateParkingServiceUI();
    showToast('Reservation expiree. La place est a nouveau disponible.');
  }

  function cancelExpiredReservation(reservationId) {
    expireReservation(reservationId);
  }

  function updateParkingAvailability(parkingId, shouldRender = true) {
    const parking = parkingLots.find(p => p.id === parkingId);
    if (!parking) return;
    parking.status = getParkingStatus(parking);
    if (shouldRender) {
      updateParkingServiceUI();
    }
  }

  function getParkingStatus(parking) {
    if (parking.availableSpaces <= 0) return 'full';
    if (parking.availableSpaces / parking.totalSpaces <= 0.15) return 'almost_full';
    return 'available';
  }

  function getParkingStatusLabel(status) {
    const labels = {
      available: 'Disponible',
      almost_full: 'Presque plein',
      full: 'Complet',
      reserved: 'Reserve'
    };
    return labels[status] || 'Disponible';
  }

  function getParkingMarkerColor(status) {
    const colors = {
      available: '#22C55E',
      almost_full: '#F59E0B',
      full: '#EF4444'
    };
    return colors[status] || '#22C55E';
  }

  function guideToParking(parkingId) {
    const parking = parkingLots.find(p => p.id === parkingId);
    if (!parking || !cityMap || !window.L) return;
    if (!parkingUserLocation) {
      showToast('Veuillez choisir votre position d abord.');
      return;
    }

    clearParkingRoute();
    parkingRouteLine = L.polyline([parkingUserLocation, parking.coords], {
      color: '#2563EB',
      weight: 5,
      dashArray: '8 8'
    }).addTo(cityMap).bindPopup(`Itineraire vers ${parking.name}`);

    cityMap.fitBounds(parkingRouteLine.getBounds(), { padding: [44, 44], maxZoom: 15 });
    parkingRouteLine.openPopup();
    showToast(`Itineraire vers ${parking.name}`);
  }

  function startParkingLiveSimulation() {
    stopParkingLiveSimulation();
    parkingLiveSimulationInterval = setInterval(() => {
      if (!parkingLots.length) return;
      const parking = parkingLots[Math.floor(Math.random() * parkingLots.length)];
      const result = simulateParkingChange(parking);
      if (!result.changed) return;
      if (parkingUserLocation) {
        updateParkingServiceUI();
        showToast(`${result.label} voiture a ${parking.name} : ${result.delta}`);
      }
    }, 5000 + Math.floor(Math.random() * 3000));
  }

  function stopParkingLiveSimulation() {
    if (parkingLiveSimulationInterval) clearInterval(parkingLiveSimulationInterval);
    parkingLiveSimulationInterval = null;
  }

  function simulateParkingChange(parking) {
    const maxAvailable = Math.max(0, parking.totalSpaces - parking.reservedSpaces);
    const action = Math.random() > 0.5 ? 'entry' : 'exit';

    if (action === 'entry' && parking.availableSpaces > 0) {
      parking.availableSpaces -= 1;
      parking.status = getParkingStatus(parking);
      return { changed: true, label: 'Entree', delta: '-1 place' };
    }

    if (action === 'exit' && parking.availableSpaces < maxAvailable) {
      parking.availableSpaces += 1;
      parking.status = getParkingStatus(parking);
      return { changed: true, label: 'Sortie', delta: '+1 place' };
    }

    parking.status = getParkingStatus(parking);
    return { changed: false, label: '', delta: '' };
  }

  function updateParkingServiceUI() {
    renderParkingService();
    if (!parkingUserLocation) {
      clearParkingMarkers();
      return;
    }
    const nearbyParkings = getNearbyAvailableParkings(parkingUserLocation, activeParkingSearchRadiusKm);
    showNearbyParkingsOnMap(parkingUserLocation, nearbyParkings);
  }

  function clearParkingMarkers() {
    parkingMarkers.forEach(marker => marker.remove());
    parkingMarkers = [];
    if (parkingUserMarker) {
      parkingUserMarker.remove();
      parkingUserMarker = null;
    }
    if (parkingSearchCircle) {
      parkingSearchCircle.remove();
      parkingSearchCircle = null;
    }
    clearParkingRoute();
  }

  function clearParkingRoute() {
    if (parkingRouteLine) {
      parkingRouteLine.remove();
      parkingRouteLine = null;
    }
  }

  function renderReservationTimer(reservation) {
    const remaining = Math.max(0, reservation.expiresAt - Date.now());
    const totalSeconds = Math.ceil(remaining / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  function startReservationCountdown() {
    if (reservationCountdownInterval) clearInterval(reservationCountdownInterval);
    reservationCountdownInterval = setInterval(() => {
      activeReservations
        .filter(reservation => reservation.status === 'active' && reservation.expiresAt <= Date.now())
        .forEach(reservation => expireReservation(reservation.id));

      document.querySelectorAll('[data-reservation-timer]').forEach(timer => {
        const reservation = activeReservations.find(r => r.id === timer.dataset.reservationTimer);
        if (!reservation) return;
        timer.textContent = renderReservationTimer(reservation);
      });
    }, 1000);
  }

  function clearParkingService() {
    clearParkingMarkers();
    parkingSelectionMode = false;
    const target = document.getElementById('parkingCards');
    if (target) target.innerHTML = '';
  }

  function showParkingStatus(message) {
    const target = document.getElementById('parkingLocationStatus');
    if (target) target.textContent = message;
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timeoutId);
    showToast.timeoutId = setTimeout(() => {
      toast.classList.remove('show');
    }, 2600);
  }

  // â•â•â• HACKATHON SMART FEATURES â•â•â•
  function applyTimeTheme() {
    const hour = new Date().getHours();
    document.body.classList.toggle('night-theme', hour < 7 || hour >= 19);
    document.body.classList.toggle('day-theme', hour >= 7 && hour < 19);
  }

  function applyStoredDarkMode() {
    document.body.classList.toggle('dark-mode', localStorage.getItem('cityflow-dark') === '1');
  }

  function toggleDarkMode() {
    const active = !document.body.classList.contains('dark-mode');
    document.body.classList.toggle('dark-mode', active);
    localStorage.setItem('cityflow-dark', active ? '1' : '0');
  }

  function showStartupMoments() {
    setTimeout(() => document.getElementById('splashScreen')?.classList.add('done'), 2000);
    setTimeout(() => document.getElementById('skeletonLayer')?.classList.remove('show'), 1200);
    if (!document.getElementById('loginScreen') && !localStorage.getItem('cityflow-onboarded')) {
      setTimeout(() => document.getElementById('onboarding')?.classList.add('open'), 2100);
    }
    setTimeout(() => showToast('Place disponible a 200m de vous !'), 2600);
  }

  function nextOnboardingSlide() {
    const slides = Array.from(document.querySelectorAll('.onboarding-slide'));
    const current = slides.findIndex(slide => slide.classList.contains('active'));
    slides[current]?.classList.remove('active');
    if (current >= slides.length - 1) {
      localStorage.setItem('cityflow-onboarded', '1');
      document.getElementById('onboarding')?.classList.remove('open');
      return;
    }
    slides[current + 1]?.classList.add('active');
  }

  async function fetchWeather() {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${DEFAULT_USER_POSITION[0]}&longitude=${DEFAULT_USER_POSITION[1]}&current=temperature_2m,weather_code`;
      const data = await fetch(url).then(response => response.json());
      const temp = Math.round(data.current?.temperature_2m ?? 24);
      document.getElementById('weatherWidget').textContent = `${temp}Â°`;
    } catch {
      document.getElementById('weatherWidget').textContent = '24Â°';
    }
  }

  function locateUser(showFeedback = true) {
    if (!navigator.geolocation) {
      if (showFeedback) showToast('Geolocalisation non disponible.');
      return;
    }
    navigator.geolocation.getCurrentPosition(position => {
      currentUserPosition = [position.coords.latitude, position.coords.longitude];
      if (cityMap) cityMap.flyTo(currentUserPosition, 14, { duration: 0.6 });
      if (showFeedback) showToast('Position detectee.');
    }, () => {
      currentUserPosition = DEFAULT_USER_POSITION;
      if (showFeedback) showToast('Position par defaut Marrakech utilisee.');
    });
  }

  function drawTrafficHeatmap() {
    if (!cityMap || trafficHeatLayers.length) return;
    const heatPoints = [
      { coords: [31.6359, -7.9986], color: '#DC2626', radius: 300 },
      { coords: [31.6317, -8.0081], color: '#F59E0B', radius: 260 },
      { coords: [31.6244, -7.9932], color: '#14B8A6', radius: 230 },
      { coords: [31.6394, -8.0066], color: '#F97316', radius: 270 }
    ];
    trafficHeatLayers = heatPoints.map(point => L.circle(point.coords, {
      radius: point.radius,
      color: point.color,
      fillColor: point.color,
      fillOpacity: 0.07,
      opacity: 0.12,
      weight: 1
    }).addTo(cityMap));
  }

  function drawIncidentLayer() {
    if (!cityMap) return;
    incidentMarkers.forEach(marker => marker.remove());
    incidentMarkers = reportedIncidents.map(incident => L.marker(incident.coords, {
      icon: L.divIcon({
        className: '',
        html: `<div class="incident-marker" style="background:${incident.severity === 'high' ? '#EF4444' : incident.severity === 'medium' ? '#F97316' : '#22C55E'}">${incident.type === 'travaux' ? 'T' : incident.type === 'obstacle' ? '!' : 'A'}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      })
    }).addTo(cityMap).bindPopup(`${incident.label}<br>${incident.type}`));
  }

  async function drawTrafficFlowPolylines() {
    if (!cityMap) return;
    trafficFlowDrawToken += 1;
    const drawToken = trafficFlowDrawToken;
    trafficFlowLayers.forEach(layer => layer.remove());
    trafficFlowLayers = [];

    const peakCameraIds = getPeakTrafficCameraIds(3);
    const flows = getCameraTrafficEntries()
      .sort((a, b) => b.camera.vehicleCount - a.camera.vehicleCount)
      .slice(0, 6)
      .map(({ intersection, camera }) => {
        const style = getDynamicTrafficStyle(camera, peakCameraIds);
        return {
          path: camera.roadSegment?.length ? camera.roadSegment : [camera.coords, intersection.coords],
          color: style.color,
          weight: style.status === 'heavy' ? 4 : 3,
          opacity: style.status === 'heavy' ? 0.34 : 0.24,
          dashArray: '3 15',
          status: style.status
        };
      });

    const layers = await Promise.all(flows.map(async flow => {
      const routePath = await getRoadAwareFlowRoute(flow);
      return L.polyline(routePath, {
        color: flow.color,
        weight: flow.weight,
        opacity: flow.opacity,
        dashArray: flow.dashArray,
        lineCap: 'round',
        lineJoin: 'round',
        smoothFactor: 1.1
      }).addTo(cityMap);
    }));

    if (drawToken !== trafficFlowDrawToken) {
      layers.forEach(layer => layer.remove());
      return;
    }

    trafficFlowLayers = layers;
    trafficFlowLayers.forEach(layer => {
      if (layer.options.color === '#DC2626') layer.bringToFront();
    });
  }

  async function getRoadAwareFlowRoute(flow) {
    const fallbackRoute = densifyRoute(flow.path);
    const cacheKey = `flow:${flow.path.map(coord => coord.join(',')).join('|')}`;
    if (trafficRouteCache.has(cacheKey)) return trafficRouteCache.get(cacheKey);

    const routePromise = fetchRoadRoute(flow.path)
      .then(route => route.length ? route : fallbackRoute)
      .catch(() => fallbackRoute);

    trafficRouteCache.set(cacheKey, routePromise);
    return routePromise;
  }

  function openIncidentPanel() {
    document.getElementById('incidentPanel')?.classList.add('open');
  }

  function closeIncidentPanel() {
    document.getElementById('incidentPanel')?.classList.remove('open');
  }

  function selectIncidentType(type) {
    selectedIncidentType = type;
    document.querySelectorAll('.incident-choice').forEach(button => button.classList.toggle('active', button.dataset.incidentType === type));
  }

  function submitIncident() {
    const incident = {
      id: `INC-${Date.now()}`,
      type: selectedIncidentType,
      label: selectedIncidentType === 'travaux' ? 'Travaux signales' : selectedIncidentType === 'obstacle' ? 'Obstacle signale' : 'Accident signale',
      coords: currentUserPosition,
      severity: selectedIncidentType === 'accident' ? 'high' : 'medium'
    };
    reportedIncidents.push(incident);
    drawIncidentLayer();
    closeIncidentPanel();
    showToast('Incident signale. Merci pour votre contribution.');
  }

  function handleEtaClick(coords) {
    etaClickPoints.push(coords);
    if (etaClickPoints.length < 2) {
      showToast('Cliquez un deuxieme point pour calculer un ETA.');
      return;
    }
    const [a, b] = etaClickPoints.slice(-2);
    if (etaLine) etaLine.remove();
    etaLine = L.polyline([a, b], { color: '#7C3AED', weight: 4, dashArray: '6 8' }).addTo(cityMap);
    const minutes = Math.max(2, Math.round((haversineDistance(a, b) * 1000) / 420));
    showToast(`ETA estime : ${minutes} min`);
    etaClickPoints = [];
  }

  function setParkingTypeFilter(filter) {
    activeParkingTypeFilter = filter;
    renderParkingService();
  }

  function parkingMatchesFilter(parking) {
    if (activeParkingTypeFilter === 'all') return true;
    const type = parking.type || (parking.id?.length % 2 ? 'surface' : 'underground');
    if (activeParkingTypeFilter === 'pmr') return parking.accessible !== false;
    if (activeParkingTypeFilter === 'bike') return parking.bikeSpaces || parking.totalSpaces > 80;
    return type === activeParkingTypeFilter;
  }

  function toggleParkingView() {
    parkingViewMode = parkingViewMode === 'list' ? 'map' : 'list';
    renderParkingService();
    if (parkingViewMode === 'map' && parkingUserLocation) showParkingLotsOnMap();
  }

  function renderParkingPredictionBars(parking) {
    const now = new Date().getHours();
    return Array.from({ length: 8 }).map((_, index) => {
      const hour = (now + index) % 24;
      const rush = hour >= 8 && hour <= 10 || hour >= 17 && hour <= 20;
      const load = Math.min(0.95, Math.max(0.18, 1 - parking.availableSpaces / parking.totalSpaces + (rush ? 0.18 : -0.05) + index * 0.015));
      const height = Math.round(load * 28);
      const color = load > 0.75 ? '#EF4444' : load > 0.5 ? '#F59E0B' : '#22C55E';
      return `<rect x="${index * 15 + 3}" y="${31 - height}" width="9" height="${height}" rx="3" fill="${color}"/>`;
    }).join('');
  }

  function launchConfetti() {
    const colors = ['#2563EB', '#22C55E', '#EF4444', '#F59E0B', '#7C3AED'];
    for (let i = 0; i < 28; i += 1) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[i % colors.length];
      piece.style.animationDelay = `${Math.random() * 180}ms`;
      document.getElementById('cf-app').appendChild(piece);
      setTimeout(() => piece.remove(), 1500);
    }
  }

  function toggleCityBot() {
    document.getElementById('cityBotPanel')?.classList.toggle('open');
  }

  function askCityBot() {
    const input = document.getElementById('cityBotInput');
    const log = document.getElementById('cityBotLog');
    const question = input.value.trim();
    if (!question || !log) return;
    log.insertAdjacentHTML('beforeend', `<div class="user-msg">${question}</div>`);
    input.value = '';
    const q = normalizeText(question);
    let answer = 'Je peux aider avec parkings, bus, trafic et trajets CityFlow.';
    if (q.includes('parking') || q.includes('moins cher')) {
      const cheapest = parkingLots.slice().sort((a, b) => a.pricePerHour - b.pricePerHour)[0];
      answer = cheapest ? `Le parking le moins cher est ${cheapest.name}, a ${cheapest.pricePerHour} DH/h.` : answer;
    } else if (q.includes('embouteillage') || q.includes('trafic') || q.includes('eviter')) {
      answer = 'Evitez Bab Doukkala et privilÃ©giez les axes verts. Activez Route Planner pour comparer bus, marche et voiture.';
    } else if (q.includes('bus') || q.includes('centre')) {
      answer = 'Pour le centre-ville, essayez Ligne 1 ou Ligne 19 selon votre depart. CityFlow peut afficher uniquement la ligne choisie.';
    }
    log.insertAdjacentHTML('beforeend', `<div class="bot-msg">${answer}</div>`);
    log.scrollTop = log.scrollHeight;
  }

  function updateCityScore() {
    const summary = getTrafficSummary?.() || { heavy: 1, medium: 2, totalVehicles: 80 };
    const parkingRatio = parkingLots.length ? parkingLots.reduce((sum, p) => sum + p.availableSpaces / p.totalSpaces, 0) / parkingLots.length : 0.5;
    const score = Math.max(0, Math.min(100, Math.round(92 - summary.heavy * 9 - summary.medium * 3 + parkingRatio * 12)));
    const badge = document.getElementById('cityScoreBadge');
    if (badge) badge.textContent = String(score);
    return score;
  }

  function renderInsightsDashboard() {
    const target = document.getElementById('insightsDashboard');
    if (!target) return;
    const score = updateCityScore();
    target.innerHTML = `
      <svg viewBox="0 0 260 80" width="100%" height="80">
        <text x="0" y="14" font-size="11" font-weight="800" fill="#64748B">CityScore ${score}/100</text>
        <rect x="0" y="28" width="220" height="10" rx="5" fill="#E5E7EB"/><rect x="0" y="28" width="${score * 2.2}" height="10" rx="5" fill="#2563EB"/>
        ${[42,64,48,70,55,36].map((h,i)=>`<rect x="${i*38}" y="${76-h}" width="22" height="${h}" rx="5" fill="${h>60?'#EF4444':h>48?'#F59E0B':'#22C55E'}"/>`).join('')}
      </svg>
    `;
  }

  function setupBottomSheetGestures() {
    const sheet = document.getElementById('bottomSheet');
    if (!sheet) return;
    let startY = 0;
    sheet.addEventListener('touchstart', event => { startY = event.touches[0].clientY; }, { passive: true });
    sheet.addEventListener('touchend', event => {
      const delta = event.changedTouches[0].clientY - startY;
      if (delta < -45 && !sheetExpanded) toggleSheet();
      if (delta > 45 && sheetExpanded) toggleSheet();
    }, { passive: true });
  }

  function requestCityNotification() {
    if (!('Notification' in window)) {
      showToast('Notifications non supportees.');
      return;
    }
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') new Notification('CityFlow', { body: 'Trafic dense sur votre trajet habituel.' });
    });
  }

  function shareMyPosition() {
    const link = `https://cityflow.local/share?lat=${currentUserPosition[0].toFixed(5)}&lng=${currentUserPosition[1].toFixed(5)}`;
    navigator.clipboard?.writeText(link);
    showToast('Lien de position simule copie.');
  }

  function subscribeDelayAlerts() {
    showToast("Alerte activee : retard bus > 5 min.");
  }

  function setupDebouncedSearch() {
    const input = document.querySelector('.search-bar input');
    if (!input) return;
    let timeout;
    input.addEventListener('input', event => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const query = normalizeText(event.target.value);
        if (query.includes('parking')) setChip('parking');
        if (query.includes('bus')) setChip('bus');
        if (query.includes('route') || query.includes('trajet')) setChip('route');
      }, 300);
    });
  }

  function setupKeyboardAccess() {
    document.querySelectorAll('button, .chip, .nav-item, .icon-btn').forEach(element => {
      if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '0');
      if (!element.getAttribute('aria-label')) element.setAttribute('aria-label', element.textContent.trim() || 'Action CityFlow');
    });
  }

  function setupPwa() {
    const manifest = {
      name: 'CityFlow Smart City',
      short_name: 'CityFlow',
      start_url: './index.html',
      display: 'standalone',
      background_color: '#F8FAFC',
      theme_color: '#2563EB'
    };
    const link = document.createElement('link');
    link.rel = 'manifest';
    link.href = `data:application/manifest+json,${encodeURIComponent(JSON.stringify(manifest))}`;
    document.head.appendChild(link);
    if ('serviceWorker' in navigator) {
      const swCode = "self.addEventListener('install',e=>self.skipWaiting());self.addEventListener('fetch',e=>{});";
      const swUrl = URL.createObjectURL(new Blob([swCode], { type: 'text/javascript' }));
      navigator.serviceWorker.register(swUrl).catch(() => {});
    }
  }

  function scheduleDataRefresh() {
    setInterval(() => {
      document.getElementById('dataRefresh')?.classList.add('show');
      updateCameraVehicleCounts();
      updateCityScore();
      renderInsightsDashboard();
      setTimeout(() => document.getElementById('dataRefresh')?.classList.remove('show'), 1200);
    }, 30000);
  }

  function startDemoTour() {
    const steps = [
      { selector: '.search-bar', text: 'Recherche rapide avec debounce pour lieux, bus et parkings.' },
      { selector: '.map-floating-stack', text: 'Actions carte: geolocalisation, incident et partage.' },
      { selector: '.bottom-sheet', text: 'Bottom sheet mobile avec gestes tactiles.' }
    ];
    let index = 0;
    const tooltip = document.getElementById('demoTooltip');
    const run = () => {
      document.querySelector('.demo-target')?.classList.remove('demo-target');
      if (index >= steps.length) {
        tooltip?.classList.remove('open');
        return;
      }
      const step = steps[index++];
      document.querySelector(step.selector)?.classList.add('demo-target');
      tooltip.innerHTML = `<div class="trip-card-title">Demo CityFlow</div><div class="onboarding-copy">${step.text}</div>`;
      tooltip.classList.add('open');
      setTimeout(run, 3000);
    };
    run();
  }

  // â•â•â• DELIVERY SYSTEM â•â•â•
  let deliveryOrders = [];
  let deliveryRiderMarker = null;
  let deliveryClientMarker = null;
  let deliverySellerMarker = null;
  let deliveryRouteLine = null;
  let activeDeliveryAdminFilter = 'all';
  let activeDeliveryTab = 'client';
  let riderSimulationInterval = null;
  let deliveryRouteDrawToken = 0;
  const deliveryRouteCache = new Map();
  let selectedLoginRole = 'client';
  let activeLoginMode = 'login';

  const DEFAULT_RIDER_POSITION = [31.6332, -8.0065];
  const DELIVERY_RIDERS = [
    { id: 'rider-1', name: 'Rachid', status: 'Disponible', area: 'Gueliz', coords: DEFAULT_RIDER_POSITION },
    { id: 'rider-2', name: 'Salma', status: 'En ligne', area: 'Medina', coords: [31.6264, -7.9912] },
    { id: 'rider-3', name: 'Youssef', status: 'Occupe', area: 'Bab Doukkala', coords: [31.6359, -7.9986] }
  ];
  const DELIVERY_MERCHANTS = [
    { name: 'Nomad', coords: [31.6271, -7.9866] },
    { name: 'Terrasse des Epices', coords: [31.6290, -7.9894] },
    { name: "L'Mida", coords: [31.6263, -7.9871] },
    { name: 'La Cantine des Gazelles', coords: [31.6255, -7.9883] },
    { name: 'Le Jardin', coords: [31.6294, -7.9890] },
    { name: 'Dar Yacout', coords: [31.6361, -7.9921] },
    { name: 'Al Fassia', coords: [31.6358, -8.0127] },
    { name: 'Dar Essalam', coords: [31.6228, -7.9872] },
    { name: 'Pepe Nero', coords: [31.6226, -7.9836] },
    { name: 'Comptoir Darna', coords: [31.6222, -8.0029] },
    { name: 'Safran by Koya', coords: [31.6309, -8.0105] },
    { name: 'Le Foundouk', coords: [31.6311, -7.9854] },
    { name: 'Bazaar Cafe', coords: [31.6278, -7.9877] },
    { name: 'Le Trou Au Mur', coords: [31.6318, -7.9892] },
    { name: 'Malah Cafe', coords: [31.6202, -7.9855] },
    { name: 'Ksar El Hamra', coords: [31.6268, -7.9908] },
    { name: 'La Trattoria', coords: [31.6352, -8.0120] },
    { name: 'Plus61', coords: [31.6257, -8.0069] },
    { name: 'Cafe Arabe', coords: [31.6300, -7.9892] },
    { name: 'Dar Cherifa', coords: [31.6291, -7.9898] }
  ];
  const DELIVERY_CLIENT_ADDRESSES = [
    { name: 'Hay Hassani', coords: [31.6460, -8.0450] },
    { name: 'Massira I', coords: [31.6491, -8.0552] },
    { name: 'Massira II', coords: [31.6532, -8.0598] },
    { name: 'Massira III', coords: [31.6573, -8.0641] },
    { name: 'Daoudiate', coords: [31.6484, -7.9978] },
    { name: 'Sidi Youssef Ben Ali', coords: [31.6118, -7.9717] },
    { name: 'Mabrouka', coords: [31.6488, -8.0278] },
    { name: 'Targa', coords: [31.6694, -8.0467] },
    { name: 'Izdihar', coords: [31.6601, -8.0129] },
    { name: 'Charaf', coords: [31.6421, -8.0086] }
  ];

  function normalizeDeliveryRole(role) {
    const value = String(role || '').toLowerCase().trim();
    if (['driver', 'rider', 'courier', 'livreur'].includes(value)) return 'rider';
    if (['admin', 'administrator'].includes(value)) return 'admin';
    return 'client';
  }

  function getConnectedDeliveryRole() {
    const candidates = [
      sessionStorage.getItem('cityflow-user-role'),
      sessionStorage.getItem('cityflow-role'),
      localStorage.getItem('cityflow-user-role'),
      localStorage.getItem('cityflow-role'),
      localStorage.getItem('cityflow-auth-role')
    ];

    for (const raw of candidates) {
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw);
        if (parsed?.role) return normalizeDeliveryRole(parsed.role);
      } catch (e) {
        return normalizeDeliveryRole(raw);
      }
    }

    try {
      const sessionUser = JSON.parse(sessionStorage.getItem('cityflow-user') || localStorage.getItem('cityflow-user') || '{}');
      if (sessionUser?.role) return normalizeDeliveryRole(sessionUser.role);
    } catch (e) {}

    return 'client';
  }

  function getDeliveryRoleLabel(role = activeDeliveryTab) {
    return role === 'rider' ? 'Livreur' : role === 'admin' ? 'Admin' : 'Client';
  }

  function getDeliveryStatusLabel(status) {
    const labels = {
      normal: 'En attente',
      accepted: 'Acceptée',
      arrived_seller: 'Livreur chez le commerçant',
      picking: 'Commande récupérée',
      delivering: 'En livraison',
      ended: 'Livrée',
      cancelled: 'Annulée'
    };
    return labels[status] || status;
  }

  function populateDeliverySelectors() {
    const sellerSelect = document.getElementById('sim-order-seller');
    if (sellerSelect) {
      sellerSelect.innerHTML = DELIVERY_MERCHANTS.map(merchant =>
        `<option value="${merchant.name}" data-lat="${merchant.coords[0]}" data-lng="${merchant.coords[1]}">${merchant.name}</option>`
      ).join('');
    }

    const addressSelect = document.getElementById('sim-order-client-address');
    if (addressSelect) {
      addressSelect.innerHTML = DELIVERY_CLIENT_ADDRESSES.map(address =>
        `<option value="${address.name}" data-lat="${address.coords[0]}" data-lng="${address.coords[1]}">${address.name}</option>`
      ).join('');
    }
  }

  function selectLoginRole(role) {
    selectedLoginRole = normalizeDeliveryRole(role) === 'rider' ? 'livreur' : 'client';
    document.querySelectorAll('.login-role').forEach(button => {
      button.classList.toggle('active', button.dataset.role === selectedLoginRole);
    });
  }

  function setLoginMode(mode) {
    activeLoginMode = mode === 'register' ? 'register' : 'login';
    document.getElementById('loginCard')?.classList.toggle('register-mode', activeLoginMode === 'register');
    document.getElementById('loginModeTab')?.classList.toggle('active', activeLoginMode === 'login');
    document.getElementById('registerModeTab')?.classList.toggle('active', activeLoginMode === 'register');
    const submit = document.getElementById('loginSubmitBtn');
    if (submit) submit.textContent = activeLoginMode === 'register' ? "S'inscrire" : 'Se connecter';
    const hint = document.getElementById('loginHint');
    if (hint) hint.textContent = activeLoginMode === 'register'
      ? "Choisissez votre role une seule fois pendant l'inscription."
      : "Le role sera recupere automatiquement depuis votre compte.";
  }

  function submitLogin(event) {
    event.preventDefault();
    const identifier = document.getElementById('loginIdentifier')?.value?.trim() || 'user@cityflow.local';
    const password = document.getElementById('loginPassword')?.value || '';
    const fullName = document.getElementById('registerFullName')?.value?.trim();
    const users = getCityFlowUsers();

    if (activeLoginMode === 'register') {
      if (users.some(user => user.identifier.toLowerCase() === identifier.toLowerCase())) {
        showToast('Ce compte existe deja. Connectez-vous.');
        setLoginMode('login');
        return;
      }
      users.push({
        id: selectedLoginRole === 'livreur' ? `rider-${Date.now()}` : `client-${Date.now()}`,
        name: fullName || (selectedLoginRole === 'livreur' ? 'Livreur CityFlow' : 'Client CityFlow'),
        identifier,
        password,
        role: selectedLoginRole === 'livreur' ? 'livreur' : 'client',
        createdAt: new Date().toISOString()
      });
      saveCityFlowUsers(users);
    }

    const account = users.find(user =>
      user.identifier.toLowerCase() === identifier.toLowerCase() && user.password === password
    );

    if (!account) {
      showToast('Identifiants incorrects ou compte inexistant.');
      return;
    }

    const role = normalizeDeliveryRole(account.role) === 'rider' ? 'livreur' : 'client';
    const sessionUser = {
      id: account.id,
      name: account.name,
      identifier,
      role,
      authMode: activeLoginMode
    };

    sessionStorage.setItem('cityflow-user-role', role);
    sessionStorage.setItem('cityflow-role', role);
    sessionStorage.setItem('cityflow-user', JSON.stringify(sessionUser));
    localStorage.setItem('cityflow-user-role', role);
    localStorage.setItem('cityflow-role', role);
    localStorage.setItem('cityflow-user', JSON.stringify(sessionUser));

    document.getElementById('loginScreen')?.classList.add('done');
    document.getElementById('onboarding')?.classList.remove('open');
    renderDeliveryUI();
    showToast(`${activeLoginMode === 'register' ? 'Inscription terminee' : 'Connecte'} en tant que ${role === 'livreur' ? 'livreur' : 'client'}.`);
  }

  function getCityFlowUsers() {
    try {
      return JSON.parse(localStorage.getItem('cityflow-users-db') || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveCityFlowUsers(users) {
    localStorage.setItem('cityflow-users-db', JSON.stringify(users));
  }

  function loadDeliveryOrders() {
    const stored = localStorage.getItem('cityflow-delivery-orders');
    if (stored) {
      try {
        deliveryOrders = JSON.parse(stored);
      } catch (e) {
        deliveryOrders = [];
      }
    }
    
    // Initialize mock orders if empty
    if (!deliveryOrders || deliveryOrders.length === 0) {
      deliveryOrders = [
        {
          orderId: "ORD-9821034",
          clientId: "client-AM",
          sellerId: "Restaurant Gueliz",
          deliveryPersonId: null,
          addressId: "ENSA Marrakech",
          totalAmount: 125,
          paymentMethod: "Cash on Delivery",
          status: "normal",
          createdAt: new Date(Date.now() - 3600000).toLocaleString(),
          updatedAt: new Date(Date.now() - 3600000).toLocaleString(),
          sellerLat: 31.6370,
          sellerLng: -8.0100,
          clientLat: 31.6469,
          clientLng: -8.0203,
          riderLat: null,
          riderLng: null
        },
        {
          orderId: "ORD-4819203",
          clientId: "client-AM",
          sellerId: "Medina Store",
          deliveryPersonId: "rider-1",
          addressId: "Carre Eden",
          totalAmount: 85,
          paymentMethod: "Cash on Delivery",
          status: "picking",
          createdAt: new Date(Date.now() - 7200000).toLocaleString(),
          updatedAt: new Date(Date.now() - 1800000).toLocaleString(),
          sellerLat: 31.6258,
          sellerLng: -7.9891,
          clientLat: 31.6317,
          clientLng: -8.0081,
          riderLat: 31.6332,
          riderLng: -8.0065
        },
        {
          orderId: "ORD-1092843",
          clientId: "client-AM",
          sellerId: "Bab Doukkala Mall",
          deliveryPersonId: "rider-1",
          addressId: "Koutoubia Park",
          totalAmount: 210,
          paymentMethod: "Cash on Delivery",
          status: "ended",
          createdAt: new Date(Date.now() - 86400000).toLocaleString(),
          updatedAt: new Date(Date.now() - 82800000).toLocaleString(),
          sellerLat: 31.6359,
          sellerLng: -7.9986,
          clientLat: 31.6244,
          clientLng: -7.9932,
          riderLat: 31.6244,
          riderLng: -7.9932
        }
      ];
      saveDeliveryOrders();
    }
    
    // Auto-resume rider simulation if there are active missions
    const activeMission = deliveryOrders.find(o => o.deliveryPersonId === "rider-1" && ['accepted', 'delivering'].includes(o.status));
    if (activeMission) {
      startRiderSimulation(activeMission.orderId);
    }
  }

  function saveDeliveryOrders() {
    localStorage.setItem('cityflow-delivery-orders', JSON.stringify(deliveryOrders));
  }

  function setDeliveryTab(role) {
    activeDeliveryTab = normalizeDeliveryRole(role);
    document.querySelectorAll('.delivery-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === activeDeliveryTab);
    });
    document.querySelectorAll('.delivery-space-content').forEach(content => {
      content.classList.toggle('active', content.id === `delivery-${activeDeliveryTab}-space`);
    });
    renderDeliveryUI();
  }

  function renderDeliveryUI() {
    const connectedRole = getConnectedDeliveryRole();
    activeDeliveryTab = connectedRole;
    document.querySelectorAll('.delivery-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === connectedRole);
    });
    document.querySelectorAll('.delivery-space-content').forEach(content => {
      content.classList.toggle('active', content.id === `delivery-${connectedRole}-space`);
    });
    const roleNote = document.getElementById('delivery-role-note');
    if (roleNote) {
      roleNote.textContent = `Role connecte : ${getDeliveryRoleLabel(connectedRole)}. Seules les actions autorisees pour ce role sont affichees.`;
    }

    updateAdminStats();
    
    if (connectedRole === 'client') {
      renderClientOrders();
    } else if (connectedRole === 'rider') {
      renderRiderOrders();
    } else if (connectedRole === 'admin') {
      renderAdminOrders();
    }
    
    // Redraw map markers if active tracking exists
    updateMapDeliveryMarkers();
  }

  function renderClientOrders() {
    const container = document.getElementById('client-orders-container');
    if (!container) return;
    
    const clientOrders = deliveryOrders.filter(o => o.clientId === 'client-AM');
    if (clientOrders.length === 0) {
      container.innerHTML = `
        <div class="parking-empty-state"><div class="parking-name">Aucune commande active</div></div>
        ${renderAvailableRidersCard()}
      `;
      return;
    }
    
    // Sort reverse chronological
    const sorted = [...clientOrders].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    container.innerHTML = sorted.map(o => {
      const isFinished = o.status === 'ended' || o.status === 'cancelled';
      let progressPercent = 0;
      let step1 = 'active', step2 = '', step3 = '', step4 = '';
      
      if (o.status === 'accepted' || o.status === 'arrived_seller' || o.status === 'picking') {
        progressPercent = 33;
        step1 = 'active';
        step2 = 'active pending';
      } else if (o.status === 'delivering') {
        progressPercent = 66;
        step1 = 'active';
        step2 = 'active';
        step3 = 'active pending';
      } else if (o.status === 'ended') {
        progressPercent = 100;
        step1 = 'active';
        step2 = 'active';
        step3 = 'active';
        step4 = 'active';
      }
      
      const riderInfo = o.deliveryPersonId 
        ? `<div style="font-size:10px; color:#475569; display:flex; align-items:center; gap:4px; margin-top:4px;">ðŸï¸ Livreur assignÃ©: <strong>Rachid</strong></div>` 
        : `<div style="font-size:10px; color:#EAB308; margin-top:4px;">â³ Recherche de livreur en cours...</div>`;
        
      const routeBtn = (o.status === 'accepted' || o.status === 'arrived_seller' || o.status === 'picking' || o.status === 'delivering')
        ? `<button class="parking-mini-btn primary" style="width:100%; margin-top:10px;" onclick="focusOnDelivery('${o.orderId}')">ðŸ“ Suivre sur la carte</button>`
        : '';
        
      const cancelBtn = (o.status === 'normal')
        ? `<button class="parking-mini-btn" style="border:1px solid #FECACA; color:#EF4444; width:100%; margin-top:6px;" onclick="cancelDeliveryOrder('${o.orderId}')">Annuler commande</button>`
        : '';

      return `
        <article class="parking-card" style="margin-bottom:12px;">
          <div class="parking-card-header">
            <div>
              <div class="parking-name" style="font-size:13px; font-weight:800;">Commande #${o.orderId.split('-')[1]}</div>
              <div class="parking-address" style="margin-top:2px;">Marchand: <strong>${o.sellerId}</strong></div>
              <div class="parking-address">Adresse: ${o.addressId}</div>
              <div style="font-size:11px; margin-top:4px; font-weight:700;">Total: <span style="color:#2563EB">${o.totalAmount} DH</span> Â· ${o.paymentMethod}</div>
            </div>
            <span class="status-badge ${o.status}">${getDeliveryStatusLabel(o.status)}</span>
          </div>

          ${!isFinished ? `
          <div class="delivery-progress">
            <div class="progress-line-fill" style="width: ${progressPercent}%;"></div>
            <div class="progress-step ${step1}">
              <div class="step-dot">1</div>
              <div class="step-label">PlacÃ©e</div>
            </div>
            <div class="progress-step ${step2}">
              <div class="step-dot">2</div>
              <div class="step-label">PrÃ©paration</div>
            </div>
            <div class="progress-step ${step3}">
              <div class="step-dot">3</div>
              <div class="step-label">Livraison</div>
            </div>
            <div class="progress-step ${step4}">
              <div class="step-dot">4</div>
              <div class="step-label">LivrÃ©e</div>
            </div>
          </div>
          ` : ''}

          <div style="border-top:1px solid #F1F5F9; padding-top:8px; margin-top:8px;">
            ${riderInfo}
            <div style="font-size:9px; color:#94A3B8; margin-top:2px;">CrÃ©Ã©e le: ${o.createdAt}</div>
          </div>
          <div style="margin-top:6px; display:flex; flex-direction:column; gap:4px;">
            ${routeBtn}
            ${cancelBtn}
          </div>
        </article>
      `;
    }).join('') + renderAvailableRidersCard();
  }

  function renderAvailableRidersCard() {
    const available = DELIVERY_RIDERS.filter(rider => rider.status !== 'Occupe');
    return `
      <div class="trip-card-title" style="margin:14px 0 8px;">Livreurs disponibles</div>
      <div class="feature-card" style="padding:10px;">
        ${available.map(rider => `
          <div class="traffic-camera-row" style="margin-bottom:6px;">
            <span class="traffic-status-dot" style="background:#22C55E"></span>
            <div class="traffic-camera-main">
              <div class="traffic-camera-label">${rider.name}</div>
              <div class="traffic-camera-status">${rider.area} - ${rider.status}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderRiderOrders() {
    const availableContainer = document.getElementById('rider-available-orders');
    const missionContainer = document.getElementById('rider-active-mission');
    
    if (!availableContainer || !missionContainer) return;
    
    // 1. Available Orders (status = normal)
    const normals = deliveryOrders.filter(o => o.status === 'normal');
    if (normals.length === 0) {
      availableContainer.innerHTML = `<div class="parking-empty-state"><div class="parking-name" style="font-size:11px;">Aucune commande en attente de livreur</div></div>`;
    } else {
      availableContainer.innerHTML = normals.map(o => `
        <article class="parking-card" style="margin-bottom:8px; padding:10px;">
          <div style="display:flex; justify-content:space-between; align-items:start; width:100%;">
            <div>
              <div style="font-weight:800; font-size:12px;">Commande #${o.orderId.split('-')[1]}</div>
              <div style="font-size:11px; color:#64748B; margin-top:2px;">Retrait: <strong>${o.sellerId}</strong></div>
              <div style="font-size:11px; color:#64748B;">Livraison: <strong>${o.addressId}</strong></div>
              <div style="font-size:11px; font-weight:700; color:#2563EB; margin-top:2px;">Course: ${o.totalAmount} DH (CoD)</div>
            </div>
            <button class="parking-mini-btn primary" onclick="acceptDeliveryOrder('${o.orderId}')">Accepter</button>
          </div>
        </article>
      `).join('');
    }
    
    // 2. Active Mission (status = picking or delivering assigned to rider-1)
    const activeMission = deliveryOrders.find(o => o.deliveryPersonId === 'rider-1' && ['accepted', 'arrived_seller', 'picking', 'delivering'].includes(o.status));
    
    if (!activeMission) {
      missionContainer.innerHTML = `<div class="parking-empty-state"><div class="parking-name" style="font-size:11px;">Vous n'avez pas de mission en cours</div></div>`;
      return;
    }
    
    let actionBtn = '';
    
    if (activeMission.status === 'accepted') {
      actionBtn = `<button class="trip-btn primary" style="width:100%; margin-bottom:6px;" onclick="arriveAtSeller('${activeMission.orderId}')">Arrive chez le commercant</button>`;
    } else if (activeMission.status === 'arrived_seller') {
      actionBtn = `<button class="trip-btn primary" style="width:100%; margin-bottom:6px;" onclick="pickupDeliveryOrder('${activeMission.orderId}')">Recuperer la commande</button>`;
    } else if (activeMission.status === 'picking') {
      actionBtn = `<button class="trip-btn primary" style="width:100%; margin-bottom:6px;" onclick="startDeliveryToClient('${activeMission.orderId}')">En route vers le client</button>`;
    } else if (activeMission.status === 'delivering') {
      actionBtn = `<button class="trip-btn primary" style="width:100%; margin-bottom:6px;" onclick="completeDeliveryOrder('${activeMission.orderId}')">Terminer la livraison</button>`;
    }
    
    const destCoords = ['accepted', 'arrived_seller'].includes(activeMission.status)
      ? [activeMission.sellerLat, activeMission.sellerLng] 
      : [activeMission.clientLat, activeMission.clientLng];
      
    const originCoords = [activeMission.riderLat || DEFAULT_RIDER_POSITION[0], activeMission.riderLng || DEFAULT_RIDER_POSITION[1]];
    
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${originCoords[0]},${originCoords[1]}&destination=${destCoords[0]},${destCoords[1]}&travelmode=driving`;

    missionContainer.innerHTML = `
      <article class="parking-card" style="border-left: 4px solid #16A34A; padding:12px; margin-bottom:12px;">
        <div class="parking-card-header">
          <div>
            <div class="parking-name" style="font-size:13px; font-weight:800; color:#16A34A;">MISSION EN COURS</div>
            <div class="parking-address" style="margin-top:4px;">CommerÃ§ant: <strong>${activeMission.sellerId}</strong></div>
            <div class="parking-address">Destinataire: <strong>${activeMission.addressId}</strong></div>
            <div style="font-size:11px; margin-top:2px; font-weight:700;">Montant Ã  encaisser: <span style="color:#2563EB">${activeMission.totalAmount} DH</span></div>
          </div>
          <span class="status-badge ${activeMission.status}">${getDeliveryStatusLabel(activeMission.status)}</span>
        </div>
        
        <div style="margin-top:10px; display:flex; flex-direction:column; gap:6px;">
          ${actionBtn}
          <a class="trip-btn muted" style="width:100%; text-align:center; display:flex; align-items:center; justify-content:center; gap:6px; text-decoration:none;" href="${mapsUrl}" target="_blank">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
            Ouvrir l'itinÃ©raire (Google Maps)
          </a>
          <button class="parking-mini-btn" style="width:100%; margin-top:4px;" onclick="focusOnDelivery('${activeMission.orderId}')">ðŸ“ Centrer la carte</button>
        </div>
      </article>
    `;
  }

  function renderAdminOrders() {
    const list = document.getElementById('admin-orders-list');
    if (!list) return;
    renderAdminRiders();
    
    let filtered = deliveryOrders;
    if (activeDeliveryAdminFilter !== 'all') {
      filtered = deliveryOrders.filter(o => o.status === activeDeliveryAdminFilter);
    }
    
    if (filtered.length === 0) {
      list.innerHTML = `<div class="parking-empty-state"><div class="parking-name">Aucune commande trouvÃ©e</div></div>`;
      return;
    }
    
    // Sort reverse chronological
    const sorted = [...filtered].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    list.innerHTML = sorted.map(o => {
      const riderName = o.deliveryPersonId ? "Rachid" : "Aucun";
      
      const selectStatus = `
        <div style="margin-top:8px;">
          <label style="font-size:8px; font-weight:700; color:#6B7280; text-transform:uppercase; display:block; margin-bottom:2px;">Changer statut (Manuel)</label>
          <select class="trip-input" style="height:28px; font-size:10px; padding:0 4px;" onchange="adminManualStatusChange('${o.orderId}', this.value)">
            <option value="normal" ${o.status === 'normal' ? 'selected' : ''}>En attente (normal)</option>
            <option value="accepted" ${o.status === 'accepted' ? 'selected' : ''}>Acceptée (accepted)</option>
            <option value="arrived_seller" ${o.status === 'arrived_seller' ? 'selected' : ''}>Chez commerçant</option>
            <option value="picking" ${o.status === 'picking' ? 'selected' : ''}>Récupérée (picking)</option>
            <option value="delivering" ${o.status === 'delivering' ? 'selected' : ''}>Livraison (delivering)</option>
            <option value="ended" ${o.status === 'ended' ? 'selected' : ''}>LivrÃ©e (ended)</option>
            <option value="cancelled" ${o.status === 'cancelled' ? 'selected' : ''}>AnnulÃ©e (cancelled)</option>
          </select>
        </div>
      `;

      return `
        <article class="parking-card" style="margin-bottom:8px; padding:10px;">
          <div class="parking-card-header" style="margin-bottom:4px;">
            <div>
              <div style="font-weight:800; font-size:12px;">Com. #${o.orderId.split('-')[1]}</div>
              <div style="font-size:10px; color:#64748B; margin-top:2px;">Marchand: ${o.sellerId}</div>
              <div style="font-size:10px; color:#64748B;">Client: ${o.addressId}</div>
              <div style="font-size:10px; color:#64748B;">Livreur: <strong>${riderName}</strong></div>
              <div style="font-size:10px; font-weight:700; color:#2563EB; margin-top:2px;">Montant: ${o.totalAmount} DH</div>
            </div>
            <span class="status-badge ${o.status}" style="font-size:8px;">${getDeliveryStatusLabel(o.status)}</span>
          </div>
          ${selectStatus}
          <button class="parking-mini-btn primary" style="width:100%; margin-top:8px;" onclick="focusOnDelivery('${o.orderId}')">Suivre / gérer sur la carte</button>
          <div style="font-size:8px; color:#94A3B8; margin-top:6px; border-top:1px solid #F1F5F9; padding-top:4px;">Mis Ã  jour: ${o.updatedAt}</div>
        </article>
      `;
    }).join('');
  }

  function renderAdminRiders() {
    const target = document.getElementById('admin-riders-list');
    if (!target) return;
    target.innerHTML = DELIVERY_RIDERS.map(rider => {
      const active = deliveryOrders.find(order => order.deliveryPersonId === rider.id && ['accepted', 'arrived_seller', 'picking', 'delivering'].includes(order.status));
      return `
        <article class="parking-card" style="margin-bottom:8px; padding:10px;">
          <div class="parking-card-header">
            <div>
              <div style="font-weight:800; font-size:12px;">${rider.name}</div>
              <div style="font-size:10px; color:#64748B;">Zone: ${rider.area}</div>
              <div style="font-size:10px; color:#64748B;">Mission: ${active ? active.orderId : 'Aucune'}</div>
            </div>
            <span class="status-badge ${active ? 'delivering' : 'normal'}" style="font-size:8px;">${active ? getDeliveryStatusLabel(active.status) : rider.status}</span>
          </div>
        </article>
      `;
    }).join('');
  }

  function updateAdminStats() {
    const stats = { pending: 0, active: 0, ended: 0, cancelled: 0 };
    deliveryOrders.forEach(o => {
      if (o.status === 'normal') stats.pending++;
      else if (['accepted', 'arrived_seller', 'picking', 'delivering'].includes(o.status)) stats.active++;
      else if (o.status === 'ended') stats.ended++;
      else if (o.status === 'cancelled') stats.cancelled++;
    });
    
    const pNode = document.getElementById('admin-stat-pending');
    const aNode = document.getElementById('admin-stat-active');
    const eNode = document.getElementById('admin-stat-ended');
    const cNode = document.getElementById('admin-stat-cancelled');
    
    if (pNode) pNode.textContent = stats.pending;
    if (aNode) aNode.textContent = stats.active;
    if (eNode) eNode.textContent = stats.ended;
    if (cNode) cNode.textContent = stats.cancelled;
  }

  function filterAdminOrders(status) {
    activeDeliveryAdminFilter = status;
    document.querySelectorAll('#delivery-admin-space .parking-filter-chip').forEach(chip => {
      chip.classList.toggle('active', chip.id === `admin-filter-${status}`);
    });
    renderDeliveryUI();
  }

  function createSimulatedOrder() {
    if (getConnectedDeliveryRole() !== 'client') return;
    const sellerSelect = document.getElementById('sim-order-seller');
    const clientSelect = document.getElementById('sim-order-client-address');
    const amountInput = document.getElementById('sim-order-amount');
    
    if (!sellerSelect || !clientSelect || !amountInput) return;
    
    const sellerOpt = sellerSelect.options[sellerSelect.selectedIndex];
    const clientOpt = clientSelect.options[clientSelect.selectedIndex];
    
    const sellerId = sellerSelect.value;
    const sellerLat = parseFloat(sellerOpt.dataset.lat);
    const sellerLng = parseFloat(sellerOpt.dataset.lng);
    
    const addressId = clientSelect.value;
    const clientLat = parseFloat(clientOpt.dataset.lat);
    const clientLng = parseFloat(clientOpt.dataset.lng);
    
    const totalAmount = parseInt(amountInput.value) || 120;
    
    const newOrder = {
      orderId: "ORD-" + Math.floor(Math.random() * 9000000 + 1000000),
      clientId: "client-AM",
      sellerId,
      deliveryPersonId: null,
      addressId,
      totalAmount,
      paymentMethod: "Cash on Delivery",
      status: "normal",
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
      sellerLat,
      sellerLng,
      clientLat,
      clientLng,
      riderLat: null,
      riderLng: null
    };
    
    deliveryOrders.push(newOrder);
    saveDeliveryOrders();
    showToast("Commande confirmÃ©e et placÃ©e !");
    renderDeliveryUI();
    
    // Zoom/focus on client & seller on the map
    focusOnDelivery(newOrder.orderId);
  }

  function acceptDeliveryOrder(orderId) {
    if (getConnectedDeliveryRole() !== 'rider') return;
    const order = deliveryOrders.find(o => o.orderId === orderId);
    if (!order) return;
    
    order.deliveryPersonId = "rider-1";
    order.status = "accepted";
    order.riderLat = DEFAULT_RIDER_POSITION[0];
    order.riderLng = DEFAULT_RIDER_POSITION[1];
    order.updatedAt = new Date().toLocaleString();
    
    saveDeliveryOrders();
    showToast("Commande acceptée. Direction le commerçant.");
    renderDeliveryUI();
    
    startRiderSimulation(orderId);
    focusOnDelivery(orderId);
  }

  function arriveAtSeller(orderId) {
    if (getConnectedDeliveryRole() !== 'rider') return;
    const order = deliveryOrders.find(o => o.orderId === orderId);
    if (!order || order.deliveryPersonId !== 'rider-1') return;
    order.status = "arrived_seller";
    order.riderLat = order.sellerLat;
    order.riderLng = order.sellerLng;
    order.deliveryRoutePath = null;
    order.updatedAt = new Date().toLocaleString();
    saveDeliveryOrders();
    showToast("Livreur arrivé chez le commerçant.");
    renderDeliveryUI();
    focusOnDelivery(orderId);
  }

  function pickupDeliveryOrder(orderId) {
    if (getConnectedDeliveryRole() !== 'rider') return;
    const order = deliveryOrders.find(o => o.orderId === orderId);
    if (!order) return;
    
    order.status = "picking";
    order.deliveryRoutePath = null;
    order.updatedAt = new Date().toLocaleString();
    
    saveDeliveryOrders();
    showToast("Commande récupérée.");
    renderDeliveryUI();
    focusOnDelivery(orderId);
  }

  function startDeliveryToClient(orderId) {
    if (getConnectedDeliveryRole() !== 'rider') return;
    const order = deliveryOrders.find(o => o.orderId === orderId);
    if (!order || order.deliveryPersonId !== 'rider-1') return;
    order.status = "delivering";
    order.deliveryRoutePath = null;
    order.updatedAt = new Date().toLocaleString();
    saveDeliveryOrders();
    showToast("En route vers le client.");
    renderDeliveryUI();
    startRiderSimulation(orderId);
    focusOnDelivery(orderId);
  }

  function completeDeliveryOrder(orderId) {
    if (getConnectedDeliveryRole() !== 'rider') return;
    const order = deliveryOrders.find(o => o.orderId === orderId);
    if (!order) return;
    
    order.status = "ended";
    order.riderLat = order.clientLat;
    order.riderLng = order.clientLng;
    order.deliveryRoutePath = null;
    order.updatedAt = new Date().toLocaleString();
    
    saveDeliveryOrders();
    showToast("Commande livrÃ©e avec succÃ¨s ! FÃ©licitations.");
    renderDeliveryUI();
    launchConfetti();
    
    // Stop simulation
    if (riderSimulationInterval) {
      clearInterval(riderSimulationInterval);
      riderSimulationInterval = null;
    }
    
    setTimeout(() => {
      focusOnDelivery(orderId);
    }, 200);
  }

  function cancelDeliveryOrder(orderId) {
    if (getConnectedDeliveryRole() !== 'client') return;
    const order = deliveryOrders.find(o => o.orderId === orderId);
    if (!order) return;
    
    order.status = "cancelled";
    order.updatedAt = new Date().toLocaleString();
    
    saveDeliveryOrders();
    showToast("Commande annulÃ©e.");
    renderDeliveryUI();
    
    if (riderSimulationInterval) {
      clearInterval(riderSimulationInterval);
      riderSimulationInterval = null;
    }
    updateMapDeliveryMarkers();
  }

  function adminManualStatusChange(orderId, newStatus) {
    if (getConnectedDeliveryRole() !== 'admin') return;
    const order = deliveryOrders.find(o => o.orderId === orderId);
    if (!order) return;
    
    order.status = newStatus;
    order.updatedAt = new Date().toLocaleString();
    
    if (['accepted', 'arrived_seller', 'picking', 'delivering'].includes(newStatus)) {
      order.deliveryPersonId = "rider-1";
      order.riderLat = order.riderLat || DEFAULT_RIDER_POSITION[0];
      order.riderLng = order.riderLng || DEFAULT_RIDER_POSITION[1];
      startRiderSimulation(orderId);
    } else if (newStatus === 'ended') {
      order.riderLat = order.clientLat;
      order.riderLng = order.clientLng;
      if (riderSimulationInterval) {
        clearInterval(riderSimulationInterval);
        riderSimulationInterval = null;
      }
      launchConfetti();
    } else {
      if (riderSimulationInterval) {
        clearInterval(riderSimulationInterval);
        riderSimulationInterval = null;
      }
    }
    
    saveDeliveryOrders();
    showToast(`Commande mise Ã  jour: ${newStatus}`);
    renderDeliveryUI();
  }

  function getDeliveryDestination(order) {
    if (!order) return null;
    if (['accepted', 'arrived_seller'].includes(order.status)) {
      return [order.sellerLat, order.sellerLng];
    }
    return [order.clientLat, order.clientLng];
  }

  function getDeliveryRouteCacheKey(order, origin, destination) {
    return [
      order.orderId,
      order.status,
      origin.map(value => value.toFixed(5)).join(','),
      destination.map(value => value.toFixed(5)).join(',')
    ].join(':');
  }

  async function getRoadAwareDeliveryRoute(order, origin, destination) {
    const cacheKey = getDeliveryRouteCacheKey(order, origin, destination);
    if (deliveryRouteCache.has(cacheKey)) return deliveryRouteCache.get(cacheKey);

    const fallback = densifyRoute([origin, destination]);
    const routePromise = fetchRoadRoute([origin, destination])
      .then(route => route.length ? route : fallback)
      .catch(() => fallback);
    deliveryRouteCache.set(cacheKey, routePromise);
    return routePromise;
  }

  function advanceDeliveryRiderOnRoute(order, route, metersPerTick = 70) {
    const metric = buildRouteMetric(route);
    if (!metric.path.length || !metric.totalDistance) return true;

    const current = [order.riderLat || route[0][0], order.riderLng || route[0][1]];
    let nearestDistance = 0;
    let nearestGap = Infinity;

    metric.path.forEach((point, index) => {
      const gap = haversineDistance(current, point);
      if (gap < nearestGap) {
        nearestGap = gap;
        nearestDistance = metric.distances[index] || 0;
      }
    });

    const nextDistance = Math.min(metric.totalDistance, nearestDistance + (metersPerTick / 1000));
    const progress = metric.totalDistance ? nextDistance / metric.totalDistance : 1;
    const nextPoint = getPointOnRouteMetric(metric, progress);
    order.riderLat = nextPoint[0];
    order.riderLng = nextPoint[1];
    order.deliveryRoutePath = route;
    return metric.totalDistance - nextDistance < 0.08;
  }

  // Live Map Simulation for Rider movement
  function startRiderSimulation(orderId) {
    if (riderSimulationInterval) clearInterval(riderSimulationInterval);
    
    riderSimulationInterval = setInterval(async () => {
      const order = deliveryOrders.find(o => o.orderId === orderId);
      if (!order || !['accepted', 'delivering'].includes(order.status)) {
        clearInterval(riderSimulationInterval);
        riderSimulationInterval = null;
        return;
      }
      
      const origin = [order.riderLat || DEFAULT_RIDER_POSITION[0], order.riderLng || DEFAULT_RIDER_POSITION[1]];
      const destination = getDeliveryDestination(order);
      const route = await getRoadAwareDeliveryRoute(order, origin, destination);
      const arrived = advanceDeliveryRiderOnRoute(order, route, 85);

      if (arrived) {
        order.riderLat = destination[0];
        order.riderLng = destination[1];
        saveDeliveryOrders();
        updateMapDeliveryMarkers();
        if (order.status === 'accepted') {
          showToast("Livreur arrivé chez le commerçant !");
        } else {
          showToast("Livreur arrivé chez le client !");
        }
      } else {
        saveDeliveryOrders();
        updateMapDeliveryMarkers();
        if (activeDeliveryTab === 'rider') {
          renderRiderOrders();
        }
      }
    }, 1800);
  }

  // Clear all delivery markers from leaflet map
  function clearDeliveryMarkers() {
    deliveryRouteDrawToken += 1;
    if (deliveryRiderMarker) { deliveryRiderMarker.remove(); deliveryRiderMarker = null; }
    if (deliveryClientMarker) { deliveryClientMarker.remove(); deliveryClientMarker = null; }
    if (deliverySellerMarker) { deliverySellerMarker.remove(); deliverySellerMarker = null; }
    if (deliveryRouteLine) { deliveryRouteLine.remove(); deliveryRouteLine = null; }
  }

  // Update/Redraw delivery markers on Leaflet map
  function updateMapDeliveryMarkers() {
    if (!cityMap) return;
    
    clearDeliveryMarkers();
    deliveryRouteDrawToken += 1;
    const drawToken = deliveryRouteDrawToken;
    
    // Find active tracked order (the first active picking or delivering order, or the last placed order)
    let trackedOrder = deliveryOrders.find(o => ['accepted', 'arrived_seller', 'picking', 'delivering'].includes(o.status));
    if (!trackedOrder) {
      // Fallback to the latest order placed
      const clientOrders = deliveryOrders.filter(o => o.clientId === 'client-AM');
      if (clientOrders.length > 0) {
        trackedOrder = clientOrders[clientOrders.length - 1];
      }
    }
    
    if (!trackedOrder) return;
    
    const configs = {
      client: { bg: '#2563EB', text: 'ðŸ‘¤' },
      seller: { bg: '#F97316', text: 'ðŸª' },
      rider: { bg: '#16A34A', text: 'ðŸï¸' }
    };
    
    const createCustomIcon = (type) => {
      const c = configs[type];
      return L.divIcon({
        className: '',
        html: `<div class="map-pin"><div class="pin-body" style="background:${c.bg};font-size:16px;display:flex;align-items:center;justify-content:center;color:white;border-radius:50%;width:100%;height:100%;box-shadow:0 2px 4px rgba(0,0,0,0.2);">${c.text}</div></div>`,
        iconSize: [34, 40],
        iconAnchor: [17, 38],
        popupAnchor: [0, -34]
      });
    };
    
    // Draw client marker
    deliveryClientMarker = L.marker([trackedOrder.clientLat, trackedOrder.clientLng], { icon: createCustomIcon('client') })
      .addTo(cityMap)
      .bindPopup(`<strong>Client: ${trackedOrder.addressId}</strong><br>Commande #${trackedOrder.orderId.split('-')[1]}`);
      
    // Draw seller marker
    deliverySellerMarker = L.marker([trackedOrder.sellerLat, trackedOrder.sellerLng], { icon: createCustomIcon('seller') })
      .addTo(cityMap)
      .bindPopup(`<strong>CommerÃ§ant: ${trackedOrder.sellerId}</strong><br>Retrait Colis`);
      
    // Draw rider if available
    if (trackedOrder.riderLat && trackedOrder.riderLng) {
      deliveryRiderMarker = L.marker([trackedOrder.riderLat, trackedOrder.riderLng], { icon: createCustomIcon('rider') })
        .addTo(cityMap)
        .bindPopup(`<strong>Livreur: Rachid (R-1)</strong><br>Statut: ${getDeliveryStatusLabel(trackedOrder.status)}`);
        
      const destCoords = getDeliveryDestination(trackedOrder);
      drawRoadAwareDeliveryLine(trackedOrder, [trackedOrder.riderLat, trackedOrder.riderLng], destCoords, drawToken);
    } else {
      drawRoadAwareDeliveryLine(trackedOrder, [trackedOrder.sellerLat, trackedOrder.sellerLng], [trackedOrder.clientLat, trackedOrder.clientLng], drawToken, '#2563EB');
    }
  }

  async function drawRoadAwareDeliveryLine(order, origin, destination, drawToken, color = '#16A34A') {
    const route = await getRoadAwareDeliveryRoute(order, origin, destination);
    if (drawToken !== deliveryRouteDrawToken || !cityMap) return;
    if (deliveryRouteLine) deliveryRouteLine.remove();
    deliveryRouteLine = L.polyline(route, {
      color,
      weight: 5,
      opacity: 0.82,
      lineCap: 'round',
      lineJoin: 'round',
      smoothFactor: 1.1
    }).addTo(cityMap).bindPopup(['accepted', 'arrived_seller'].includes(order.status) ? "Itinéraire par rues vers le commerçant" : "Itinéraire par rues vers le client");
    deliveryRouteLine.bringToFront();
  }

  // Zoom/Center on active delivery
  function focusOnDelivery(orderId) {
    if (!['client', 'rider', 'admin'].includes(getConnectedDeliveryRole())) return;
    const order = deliveryOrders.find(o => o.orderId === orderId);
    if (!order || !cityMap) return;
    
    // Trigger map redraw first
    updateMapDeliveryMarkers();
    
    const bounds = L.latLngBounds([
      [order.clientLat, order.clientLng],
      [order.sellerLat, order.sellerLng]
    ]);
    
    if (order.riderLat && order.riderLng) {
      bounds.extend([order.riderLat, order.riderLng]);
    }
    
    cityMap.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
  }

  window.setDeliveryTab = setDeliveryTab;
  window.selectLoginRole = selectLoginRole;
  window.setLoginMode = setLoginMode;
  window.submitLogin = submitLogin;
  window.renderDeliveryUI = renderDeliveryUI;
  window.createSimulatedOrder = createSimulatedOrder;
  window.acceptDeliveryOrder = acceptDeliveryOrder;
  window.arriveAtSeller = arriveAtSeller;
  window.pickupDeliveryOrder = pickupDeliveryOrder;
  window.startDeliveryToClient = startDeliveryToClient;
  window.completeDeliveryOrder = completeDeliveryOrder;
  window.cancelDeliveryOrder = cancelDeliveryOrder;
  window.adminManualStatusChange = adminManualStatusChange;
  window.filterAdminOrders = filterAdminOrders;
  window.clearDeliveryMarkers = clearDeliveryMarkers;
  window.updateMapDeliveryMarkers = updateMapDeliveryMarkers;
  window.focusOnDelivery = focusOnDelivery;
  window.loadDeliveryOrders = loadDeliveryOrders;

  window.renderParkingService = renderParkingService;
  window.renderParkingCards = renderParkingCards;
  window.toggleSheet = toggleSheet;
  window.showPanel = showPanel;
  window.setChip = setChip;
  window.setNav = setNav;
  window.toggleDarkMode = toggleDarkMode;
  window.startDemoTour = startDemoTour;
  window.nextOnboardingSlide = nextOnboardingSlide;
  window.locateUser = locateUser;
  window.openIncidentPanel = openIncidentPanel;
  window.closeIncidentPanel = closeIncidentPanel;
  window.selectIncidentType = selectIncidentType;
  window.submitIncident = submitIncident;
  window.toggleCityBot = toggleCityBot;
  window.askCityBot = askCityBot;
  window.requestCityNotification = requestCityNotification;
  window.shareMyPosition = shareMyPosition;
  window.setParkingTypeFilter = setParkingTypeFilter;
  window.toggleParkingView = toggleParkingView;
  window.subscribeDelayAlerts = subscribeDelayAlerts;
  window.showParkingLotsOnMap = showParkingLotsOnMap;
  window.chooseCurrentLocation = chooseCurrentLocation;
  window.enableParkingLocationSelection = enableParkingLocationSelection;
  window.setParkingUserLocation = setParkingUserLocation;
  window.searchParkingLocation = searchParkingLocation;
  window.searchMockPlace = searchMockPlace;
  window.geocodeLocation = geocodeLocation;
  window.renderBusLinesList = renderBusLinesList;
  window.setBusLineFilter = setBusLineFilter;
  window.showAllBusLines = showAllBusLines;
  window.showBusLine = showBusLine;
  window.clearSelectedLine = clearSelectedLine;
  window.renderLineDetails = renderLineDetails;
  window.drawBusOverviewLines = drawBusOverviewLines;
  window.enableStartSelection = enableStartSelection;
  window.enableDestinationSelection = enableDestinationSelection;
  window.handleMapClick = handleMapClick;
  window.setStartLocation = setStartLocation;
  window.setDestinationLocation = setDestinationLocation;
  window.setStartFromInput = setStartFromInput;
  window.setDestinationFromInput = setDestinationFromInput;
  window.findTripFromInputs = findTripFromInputs;
  window.setRouteMode = setRouteMode;
  window.calculateRoute = calculateRoute;
  window.toggleRouteAlternatives = toggleRouteAlternatives;
  window.findBestBusRoute = findBestBusRoute;
  window.findBusRouteOptions = findBusRouteOptions;
  window.findNearestStop = findNearestStop;
  window.calculateWalkingTime = calculateWalkingTime;
  window.calculateBusRideTime = calculateBusRideTime;
  window.renderRouteRecommendation = renderRouteRecommendation;
  window.showRecommendedRoute = showRecommendedRoute;
  window.selectRouteSuggestion = selectRouteSuggestion;
  window.createActiveBusesForLine = createActiveBusesForLine;
  window.startMultipleBusTracking = startMultipleBusTracking;
  window.interpolatePosition = interpolatePosition;
  window.findBestAvailableBusForStop = findBestAvailableBusForStop;
  window.calculateETA = calculateETA;
  window.updateLiveBusInfo = updateLiveBusInfo;
  window.followRecommendedBus = followRecommendedBus;
  window.stopFollowingBus = stopFollowingBus;
  window.followBusesArea = followBusesArea;
  window.showAllStopsForRecommendedRoute = showAllStopsForRecommendedRoute;
  window.clearTripPlanning = clearTripPlanning;
  window.getNearbyAvailableParkings = getNearbyAvailableParkings;
  window.haversineDistance = haversineDistance;
  window.formatDistance = formatDistance;
  window.showNearbyParkingsOnMap = showNearbyParkingsOnMap;
  window.expandParkingSearchRadius = expandParkingSearchRadius;
  window.reserveParkingSpot = reserveParkingSpot;
  window.cancelExpiredReservation = cancelExpiredReservation;
  window.updateParkingAvailability = updateParkingAvailability;
  window.getParkingStatus = getParkingStatus;
  window.getParkingStatusLabel = getParkingStatusLabel;
  window.guideToParking = guideToParking;
  window.startParkingLiveSimulation = startParkingLiveSimulation;
  window.stopParkingLiveSimulation = stopParkingLiveSimulation;
  window.simulateParkingChange = simulateParkingChange;
  window.updateParkingServiceUI = updateParkingServiceUI;
  window.clearParkingMarkers = clearParkingMarkers;
  window.clearParkingRoute = clearParkingRoute;
  window.renderReservationTimer = renderReservationTimer;
  window.clearParkingService = clearParkingService;
  window.renderTrafficService = renderTrafficService;
  window.showTrafficCameras = showTrafficCameras;
  window.clearTrafficLayers = clearTrafficLayers;
  window.drawTrafficRoadSegments = drawTrafficRoadSegments;
  window.getTrafficStatus = getTrafficStatus;
  window.getPriorityDirection = getPriorityDirection;
  window.renderTrafficIntersectionCard = renderTrafficIntersectionCard;
  window.renderAvoidRoadsList = renderAvoidRoadsList;
  window.openTrafficCameraView = openTrafficCameraView;
  window.closeTrafficCameraView = closeTrafficCameraView;
  window.renderTrafficCameraScene = renderTrafficCameraScene;
  window.startTrafficCameraSimulation = startTrafficCameraSimulation;
  window.stopTrafficCameraSimulation = stopTrafficCameraSimulation;
  window.updateCameraVehicleCounts = updateCameraVehicleCounts;
  window.updateTrafficUI = updateTrafficUI;
  window.resetTrafficSimulation = resetTrafficSimulation;

