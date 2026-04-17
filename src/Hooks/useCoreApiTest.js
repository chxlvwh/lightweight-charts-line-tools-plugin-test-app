// File: /src/Hooks/useCoreApiTest.js

import { useState, useCallback, useRef, useEffect } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';
import { taggedTrendLineOptions } from '../Data/TrendLineToolData';

/**
 * Helper to format a UTC timestamp into a human-readable string for console validation.
 * @param {number|null} timestamp - The UNIX timestamp in seconds.
 * @returns {string} Formatted date (e.g., "Fri, Sep 5, 2025") or "null".
 */
const formatTimestampUTC = (timestamp) => {
	if (!timestamp) return 'null';
	return new Date(timestamp * 1000).toLocaleDateString('en-US', {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		timeZone: 'UTC'
	});
};


/**
 * Custom hook to manage all handlers and state related to testing the Core Plugin API.
 * This covers Events, Targeted Retrieval, Persistence, Crosshair, Magnet Snapping, 
 * Interaction Locking, and the Data Lookup Engine proofs.
 * 
 * @param {Object} api0 - The API wrapper for Pane 0.
 * @param {Object} api1 - The API wrapper for Pane 1.
 * @param {React.MutableRefObject} chartRef - Reference to the chart instance.
 * @param {React.MutableRefObject} series0Ref - Reference to the primary series.
 * @param {boolean} chartReady - Flag indicating if the chart is initialized.
 */
export const useCoreApiTest = (api0, api1, chartRef, series0Ref, chartReady) => {
	const [exportedJson, setExportedJson] = useState('');
	
	// --- Subscription State ---
	const [subscribedAfterEdit, setSubscribedAfterEdit] = useState(false);
	const [subscribedDoubleClick, setSubscribedDoubleClick] = useState(false);
	const [subscribedSingleClick, setSubscribedSingleClick] = useState(false);

	// --- Global Settings State ---
	const [magnetThreshold, setMagnetThreshold] = useState(0);
	const [isLocked0, setIsLocked0] = useState(false);
	const [isLocked1, setIsLocked1] = useState(false);

	// Refs for event handlers to manage subscriptions safely
	const afterEditHandlerRef = useRef(null);
	const doubleClickHandlerRef = useRef(null);
	const singleClickHandlerRef = useRef(null);
	
	// --- Base Event Handlers (Loggers) ---
	const handleAfterEdit = useCallback((params) => {
		console.log("%c--- EVENT: AfterEdit ---", 'color: #FFA500; font-weight: bold;', params);
	}, []);

	const handleDoubleClick = useCallback((params) => {
		console.log("%c--- EVENT: DoubleClick ---", 'color: #FFA500; font-weight: bold;', params);
	}, []);

	const handleSingleClick = useCallback((params) => {
		console.log("%c--- EVENT: SingleClick (Selection) ---", 'color: #FFA500; font-weight: bold;', params);
	}, []);

	// Sync handlers to refs
	useEffect(() => {
		afterEditHandlerRef.current = handleAfterEdit;
		doubleClickHandlerRef.current = handleDoubleClick;
		singleClickHandlerRef.current = handleSingleClick;
	}, [handleAfterEdit, handleDoubleClick, handleSingleClick]);


	// --- Group 1: Event Subscriptions ---

	const toggleSubscribeAfterEdit = useCallback(() => {
		if (!chartReady) return;
		if (subscribedAfterEdit) {
			api0.unsubscribeLineToolsAfterEdit(afterEditHandlerRef.current);
			setSubscribedAfterEdit(false);
		} else {
			api0.subscribeLineToolsAfterEdit(afterEditHandlerRef.current);
			setSubscribedAfterEdit(true);
		}
	}, [chartReady, subscribedAfterEdit, api0]);

	const toggleSubscribeDoubleClick = useCallback(() => {
		if (!chartReady) return;
		if (subscribedDoubleClick) {
			api0.unsubscribeLineToolsDoubleClick(doubleClickHandlerRef.current);
			setSubscribedDoubleClick(false);
		} else {
			api0.subscribeLineToolsDoubleClick(doubleClickHandlerRef.current);
			setSubscribedDoubleClick(true);
		}
	}, [chartReady, subscribedDoubleClick, api0]);

	const toggleSubscribeSingleClick = useCallback(() => {
		if (!chartReady) return;
		if (subscribedSingleClick) {
			api0.unsubscribeLineToolsSingleClick(singleClickHandlerRef.current);
			setSubscribedSingleClick(false);
		} else {
			api0.subscribeLineToolsSingleClick(singleClickHandlerRef.current);
			setSubscribedSingleClick(true);
		}
	}, [chartReady, subscribedSingleClick, api0]);


	// --- Group 2: Persistence & Retrieval ---

	const handleExportAll = useCallback(() => {
		const json = api0.exportLineTools();
		setExportedJson(json);
	}, [api0]);

	const handleImportAll = useCallback(() => {
		if (exportedJson) api0.importLineTools(exportedJson);
	}, [api0, exportedJson]);

	const handleGetSelected = useCallback(() => {
		api0.getSelectedLineTools();
	}, [api0]);

	const handleCreateTaggedTools = useCallback(() => {
		// Creates specific tools to test Targeted Retrieval
		const day = 24 * 60 * 60;
		// Sept 1, 2025 00:00:00 UTC (The first Monday)
		const baseTime = 1756684800; 
		
		// [FIX] Changed 'time' to 'timestamp' to match Core v1.1 LineToolPoint interface
		api0.createOrUpdateLineTool(
			'TrendLine', 
			[
				{ timestamp: baseTime, price: 190 }, 
				{ timestamp: baseTime + day * 4, price: 190 } // End on Friday Sep 5
			], 
			taggedTrendLineOptions.debug1, 
			'DEBUG_1'
		);

		api0.createOrUpdateLineTool(
			'TrendLine', 
			[
				{ timestamp: baseTime, price: 185 }, 
				{ timestamp: baseTime + day * 5, price: 185 }
			], 
			taggedTrendLineOptions.debug2, 
			'DEBUG_2'
		);

		api0.createOrUpdateLineTool(
			'TrendLine', 
			[
				{ timestamp: baseTime, price: 180 }, 
				{ timestamp: baseTime + day * 5, price: 180 }
			], 
			taggedTrendLineOptions.regex1, 
			'REGEX_TEST_1'
		);
		
		console.log("%cTagged Tools Created: DEBUG_1, DEBUG_2, REGEX_TEST_1", 'color: #32CD32;');
	}, [api0]);

	const handleGetById = useCallback(() => {
		api0.getLineToolByID('DEBUG_1');
	}, [api0]);

	const handleGetByRegex = useCallback(() => {
		api0.getLineToolsByIdRegex(/^DEBUG_/);
	}, [api0]);


	// --- Group 3: Global Settings (v1.1) ---

	const handleMagnetChange = useCallback((event, newValue) => {
		setMagnetThreshold(newValue);
		api0.setMagnetThreshold(newValue);
	}, [api0]);

	const toggleLock0 = useCallback(() => {
		const newState = !isLocked0;
		setIsLocked0(newState);
		api0.setLocked(newState);
	}, [api0, isLocked0]);

	const toggleLock1 = useCallback(() => {
		const newState = !isLocked1;
		setIsLocked1(newState);
		api1.setLocked(newState);
	}, [api1, isLocked1]);

	/**
	 * Handlers for the Time Formatter buttons.
	 * Includes weekday names in all presets for better gap visualization.
	 */
	const handleSetFormatter = useCallback((type) => {
		if (type === 'default') {
			api0.setTimeFormatter((t) => {
				const date = new Date(t * 1000);
				return `Chart UTC: ${date.toLocaleDateString('en-US', { 
					weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' 
				})}`;
			});
		} else if (type === 'short') {
			api0.setTimeFormatter((t) => {
				const date = new Date(t * 1000);
				return `SHORT: ${date.toLocaleDateString('en-US', { 
					weekday: 'short', month: 'numeric', day: 'numeric', timeZone: 'UTC' 
				})}`;
			});
		} else if (type === 'full') {
			api0.setTimeFormatter((t) => {
				const date = new Date(t * 1000);
				const weekday = date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
				const iso = date.toISOString().replace('T', ' ').substring(0, 19);
				return `FULL: ${weekday} ${iso} UTC`;
			});
		}
		
		console.log(`%cFormatter Button Clicked: ${type}`, 'color: #00BFFF;');
	}, [api0]);


	// --- Group 4: Data Inspector (Proofs) ---

	/**
	 * Logs the first and last bars currently in the series.
	 */
	const logEarliestLatest = useCallback(() => {
		console.log("%c--- DATA PROOF: Boundaries ---", 'color: #00BFFF; font-weight: bold;');
		api0.getEarliestBar();
		api0.getLatestBar();
	}, [api0]);

	/**
	 * Logs the full time range covered by the dataset.
	 */
	const logFullRange = useCallback(() => {
		console.log("%c--- DATA PROOF: Full Time Range ---", 'color: #00BFFF; font-weight: bold;');
		api0.getFullTimeRange();
	}, [api0]);

	/**
	 * Resolves which bar is physically in the middle of the current view.
	 */
	const logBarAtCenter = useCallback(() => {
		if (chartRef.current) {
			const width = chartRef.current.chartElement().clientWidth;
			console.log(`%c--- DATA PROOF: Bar at pixel ${width / 2} ---`, 'color: #00BFFF; font-weight: bold;');
			api0.getBarAtCoordinate(width / 2);
		}
	}, [api0, chartRef]);

	/**
	 * Requests an array of data for an inclusive 11-day window.
	 * Proves that the search engine correctly handles boundaries and skips weekends.
	 */
	const logDataRange = useCallback(() => {
		const latest = api0.getLatestBar();
		if (latest) {
			// Calculate 11 days worth of seconds.
			// Since the search is inclusive of both 'from' and 'to', 
			// subtracting 10 days results in an 11-day calendar span.
			const elevenDaysAgo = latest.time - (10 * 24 * 60 * 60);
			
			console.log("%c--- DATA PROOF: Range (Last 11 Days, Inclusive) ---", 'color: #00BFFF; font-weight: bold;');
			api0.getDataInRange({ from: elevenDaysAgo, to: latest.time });
		}
	}, [api0]);

	/**
	 * Proof of the Search Engine's Intelligence.
	 * Tests how the binary search handles weekend gaps by comparing 
	 * the core's return against expected chronological values.
	 */
	const logClosestBarModes = useCallback(() => {
		// --- 1. Define Ground Truth for September 2025 ---
		const tsFri = 1757030400; // Sept 5
		const tsSat = 1757116800; // Sept 6 (Target - No Data)
		const tsMon = 1757289600; // Sept 8

		const targetDateStr = formatTimestampUTC(tsSat);
		
		console.log(`%c--- DATA PROOF: ClosestBar Validation (Target: ${targetDateStr}) ---`, 'color: #2196F3; font-weight: bold; font-size: 12px;');

		/**
		 * Local runner to execute a search mode and validate the result.
		 */
		const validate = (mode, expectedTs, label) => {
			const bar = api0.getClosestBar(tsSat, mode);
			const actualTs = bar ? bar.time : null;
			const isPass = actualTs === expectedTs;

			const statusStyle = isPass 
				? 'color: #4CAF50; font-weight: bold;' // Green PASS
				: 'color: #F44336; font-weight: bold;'; // Red FAIL

			console.log(
				`%c[${isPass ? 'PASS' : 'FAIL'}] %cMode '${mode}': %cExpected ${formatTimestampUTC(expectedTs)} %c| Received ${formatTimestampUTC(actualTs)}`,
				statusStyle,
				'color: #FFF; font-weight: bold;',
				'color: #AAA;',
				isPass ? 'color: #AAA;' : 'color: #FFEB3B; font-weight: bold;' // Highlight mismatch in yellow
			);
		};

		// --- 2. Run the Battery of Tests ---
		
		// Mode 'exact': Saturday doesn't exist, should be null.
		validate('exact', null, "Saturday (Missing)");

		// Mode 'floor': Nearest logic looking BACKWARDS.
		validate('floor', tsFri, "Previous Friday");

		// Mode 'ceil': Nearest logic looking FORWARDS.
		validate('ceil', tsMon, "Next Monday");

		// Mode 'nearest': Comparison of distances (24h vs 48h).
		validate('nearest', tsFri, "Closest (Friday)");

	}, [api0]);


	// --- Group 5: Crosshair & Destruction ---

	const handleSetCrosshairPixel = useCallback(() => api0.setCrossHairXY(300, 200, true), [api0]);
	const handleClearCrosshair = useCallback(() => api0.clearCrossHair(), [api0]);

	/**
	 * Logical Destruction of Pane 0.
	 * Tests the self-neutering logic without affecting Pane 1.
	 */
	const handleDestroyPane0 = useCallback(() => {
		console.warn("CRITICAL: Destroying Plugin Instance for PANE 0. Browser refresh required to restore its functionality.");
		api0.destroy();
	}, [api0]);

	/**
	 * Tests the getBarAtTime method using multiple input formats.
	 * Fixed: Timestamps now strictly align to UTC midnight boundaries.
	 */
	const logExactBarLookups = useCallback(() => {
		// Sept 10, 2025 00:00:00 UTC
		const tsWed = 1757462400; 
		const strMon = "2025-09-15"; 

		console.log("%c--- DATA PROOF: Exact Lookups (Polymorphic) ---", 'color: #00BFFF; font-weight: bold;');

		// 1. Test Number Input: Expecting Wed Sept 10
		console.log(`%cLookup by Timestamp: %c${tsWed} (${formatTimestampUTC(tsWed)})`, 'font-weight: bold;', 'color: #AAA;');
		api0.getBarAtTime(tsWed);

		// 2. Test String Input: Expecting Mon Sept 15
		console.log(`%cLookup by Date String: %c"${strMon}"`, 'font-weight: bold;', 'color: #AAA;');
		api0.getBarAtTime(strMon);
	}, [api0]);

	/**
	 * Tests "Smart" search logic using strictly string-based date inputs.
	 * Proves that ISO strings work for gap-handling and range-slicing.
	 */
	const logPolymorphicSearch = useCallback(() => {
		const strSat = "2025-09-06"; // Target: Saturday
		const tsFri = 1757030400;    // Expected result (Friday)
		
		const range = { from: "2025-09-01", to: "2025-09-05" }; // Mon-Fri

		console.log("%c--- DATA PROOF: String-Based Smart Search ---", 'color: #00BFFF; font-weight: bold;');

		// Proof 1: getClosestBar handles strings over weekend gaps
		console.log(
			`%cClosestBar 'floor' (String "${strSat}"): %cExpected ${formatTimestampUTC(tsFri)}`, 
			'font-weight: bold;', 
			'color: #AAA;'
		);
		api0.getClosestBar(strSat, 'floor');

		// Proof 2: getDataInRange handles string boundaries correctly
		console.log(`%cRange Fetch (Strings "Sep 01" to "Sep 05"): %cExpected 5 Bars (Mon-Fri)`, 'font-weight: bold;', 'color: #AAA;');
		api0.getDataInRange(range);
	}, [api0]);

	/**
	 * Moves the crosshair to the exact pixel coordinates of the earliest loaded candle.
	 */
	const handleCrosshairToFirst = useCallback(() => {
		if (!chartRef.current) return;
		
		const firstBar = api0.getEarliestBar();
		if (firstBar) {
			const x = chartRef.current.timeScale().timeToCoordinate(firstBar.time);
			const el = chartRef.current.chartElement();
			const midY = el.clientHeight / 2; // Arbitrary Y, the core will snap the X correctly
			
			if (x !== null) {
				console.log(`%c-> Crosshair Jump: First Candle (${formatTimestampUTC(firstBar.time)})`, 'color: #9C27B0; font-weight: bold;');
				api0.setCrossHairXY(x, midY, true);
			}
		}
	}, [api0, chartRef]);

	/**
	 * Moves the crosshair to the exact pixel coordinates of the most recent candle.
	 */
	const handleCrosshairToLast = useCallback(() => {
		if (!chartRef.current) return;
		
		const lastBar = api0.getLatestBar();
		if (lastBar) {
			const x = chartRef.current.timeScale().timeToCoordinate(lastBar.time);
			const el = chartRef.current.chartElement();
			const midY = el.clientHeight / 2; // Arbitrary Y
			
			if (x !== null) {
				console.log(`%c-> Crosshair Jump: Last Candle (${formatTimestampUTC(lastBar.time)})`, 'color: #9C27B0; font-weight: bold;');
				api0.setCrossHairXY(x, midY, true);
			}
		}
	}, [api0, chartRef]);

	/**
	 * Moves the crosshair to the physical center of the chart canvas.
	 */
	const handleCrosshairToMiddle = useCallback(() => {
		if (!chartRef.current) return;
		
		const el = chartRef.current.chartElement();
		const midX = el.clientWidth / 2;
		const midY = el.clientHeight / 2;
		
		console.log(`%c-> Crosshair Jump: Middle of Screen (Pixels: ${Math.round(midX)}, ${Math.round(midY)})`, 'color: #9C27B0; font-weight: bold;');
		api0.setCrossHairXY(midX, midY, true);
	}, [api0, chartRef]);

	/**
	 * Performs a partial update on the tool with ID 'DEBUG_1'.
	 * Proves that applyLineToolOptions can merge visual changes (color and text)
	 * without requiring the point coordinates to be provided again.
	 */
	const handlePartialUpdateDebug1 = useCallback(() => {
		// Construct a partial payload targeting the DEBUG_1 tool
		const partialData = {
			id: 'DEBUG_1',
			toolType: 'TrendLine',
			options: {
				line: { color: '#FF9800', width: 5 }, // Change to Thick Orange
				text: { value: 'DEBUG_1 (PARTIALLY UPDATED)' }
			}
		};

		console.log("%c-> Requesting Partial Update for DEBUG_1", 'color: #DAA520; font-weight: bold;');
		api0.applyLineToolOptions(partialData);
	}, [api0]);

	/**
	 * Queries the Core Plugin for its current interaction lock state.
	 * Proves the isLocked() getter accurately tracks the internal manager state.
	 */
	const logLockStatus0 = useCallback(() => {
		const locked = api0.isLocked();
		console.log(`%c[GETTER] Pane 0 Locked Status: %c${locked}`, 'font-weight: bold;', locked ? 'color: #F44336;' : 'color: #4CAF50;');
	}, [api0]);

	/**
	 * Queries the secondary plugin for its lock state.
	 * Used to prove that locking Pane 0 does not inadvertently lock Pane 1.
	 */
	const logLockStatus1 = useCallback(() => {
		const locked = api1.isLocked();
		console.log(`%c[GETTER] Pane 1 Locked Status: %c${locked}`, 'font-weight: bold;', locked ? 'color: #F44336;' : 'color: #4CAF50;');
	}, [api1]);	

	// --- Pane-Specific Removal Wrappers ---
	// These allow the UI to target specific plugin instances for cleanup.

	const handleRemoveSelected0 = useCallback(() => api0.removeSelectedLineTools(), [api0]);
	const handleRemoveAll0 = useCallback(() => api0.removeAllLineTools(), [api0]);
	const handleRemoveSelected1 = useCallback(() => api1.removeSelectedLineTools(), [api1]);
	const handleRemoveAll1 = useCallback(() => api1.removeAllLineTools(), [api1]);

	return {
		// State
		subscribedAfterEdit, subscribedDoubleClick, subscribedSingleClick,
		magnetThreshold, isLocked0, isLocked1, exportedJson,

		// Handlers: Events
		toggleSubscribeAfterEdit, toggleSubscribeDoubleClick, toggleSubscribeSingleClick,

		// Handlers: Retrieval/Persistence
		handleExportAll, handleImportAll, handleGetSelected, handleCreateTaggedTools, handleGetById, handleGetByRegex,

		// Handlers: Settings
		handleMagnetChange, toggleLock0, toggleLock1, handleSetFormatter,

		// Handlers: Data Inspector
		logEarliestLatest, logFullRange, logBarAtCenter, logClosestBarModes, logDataRange,

		// Handlers: Crosshair / Removal / Destruction
		handleSetCrosshairPixel, handleClearCrosshair, 
		handleRemoveSelected: () => api0.removeSelectedLineTools(),
		handleRemoveAll: () => api0.removeAllLineTools(),
		handleDestroyPane0,
		logExactBarLookups,
		logPolymorphicSearch,
		handleCrosshairToFirst,
		handleCrosshairToLast,
		handleCrosshairToMiddle,
		handleRemoveSelected0,
		handleRemoveAll0,
		handleRemoveSelected1,
		handleRemoveAll1,
		handlePartialUpdateDebug1,
		logLockStatus0,
		logLockStatus1,
	};
};