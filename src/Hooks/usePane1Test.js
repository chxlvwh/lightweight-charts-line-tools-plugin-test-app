// File: /src/Hooks/usePane1Test.js

import { useCallback } from 'react';
import { generatePane1DailyData, generate4HourTestData } from '../Data/CandlestickTestData';


/**
 * Custom hook to manage the Pane 1 Experimental Lab logic.
 * 
 * @param {Object} api1 - The API wrapper for the Pane 1 plugin instance.
 * @param {React.MutableRefObject} series1Ref - Ref to the Pane 1 series instance.
 * @param {string} pane1Interval - Current interval state ('daily' or '4h').
 * @param {Function} setPane1Interval - State setter for the interval.
 */
export const usePane1Test = (api1, series1Ref, pane1Interval, setPane1Interval) => {

	/**
	 * Switches the Pane 1 data to Daily intervals.
	 * Used to test how existing drawings respond to a decrease in data density.
	 */
	const handleSetDaily = useCallback(() => {
		if (series1Ref.current) {
			console.log("%c--- Lab: Switching Pane 1 to Daily Data ---", 'color: #2196F3; font-weight: bold;');
			const data = generatePane1DailyData('2025-09-01', '2025-09-30');
			series1Ref.current.setData(data);
			setPane1Interval('daily');
		}
	}, [series1Ref, setPane1Interval]);

	/**
	 * Switches the Pane 1 data to 4-Hour intervals.
	 * Used to test the interpolation engine's ability to keep tools anchored
	 * correctly when the number of bars increases 6x.
	 */
	const handleSet4Hour = useCallback(() => {
		if (series1Ref.current) {
			console.log("%c--- Lab: Switching Pane 1 to 4-Hour Data ---", 'color: #2196F3; font-weight: bold;');
			const data = generate4HourTestData('2025-09-01', '2025-09-30', 50);
			series1Ref.current.setData(data);
			setPane1Interval('4h');
		}
	}, [series1Ref, setPane1Interval]);

	/**
	 * Initiates interactive TrendLine creation on Pane 1.
	 */
	const handleAddTrendLinePane1 = useCallback(() => {
		console.log("%c--- Lab: Drawing TrendLine on Pane 1 ---", 'color: #2196F3; font-weight: bold;');
		api1.addLineTool('TrendLine');
	}, [api1]);

	/**
	 * Initiates interactive Rectangle creation on Pane 1.
	 */
	const handleAddRectanglePane1 = useCallback(() => {
		console.log("%c--- Lab: Drawing Rectangle on Pane 1 ---", 'color: #2196F3; font-weight: bold;');
		api1.addLineTool('Rectangle');
	}, [api1]);

	return {
		pane1Interval,
		handleSetDaily,
		handleSet4Hour,
		handleAddTrendLinePane1,
		handleAddRectanglePane1,
	};
};