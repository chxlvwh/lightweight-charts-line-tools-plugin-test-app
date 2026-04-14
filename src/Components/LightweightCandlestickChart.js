// File: /src/Components/LightweightCandlestickChart.js

import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, CandlestickSeries, CrosshairMode } from 'lightweight-charts';
import { createLineToolsPlugin } from 'lightweight-charts-line-tools-core';
import { LineToolRectangle } from 'lightweight-charts-line-tools-rectangle';
import {
	LineToolTrendLine,
	LineToolExtendedLine,
	LineToolArrow,
	LineToolRay,
	LineToolHorizontalLine,
	LineToolHorizontalRay,
	LineToolVerticalLine,
	LineToolCrossLine,
	LineToolCallout,
} from 'lightweight-charts-line-tools-lines'; 
import { LineToolCircle } from 'lightweight-charts-line-tools-circle';
import { LineToolBrush, LineToolHighlighter } from 'lightweight-charts-line-tools-freehand';
import { LineToolPath } from 'lightweight-charts-line-tools-path';
import { LineToolTriangle } from 'lightweight-charts-line-tools-triangle';
import { LineToolText } from 'lightweight-charts-line-tools-text';
import { LineToolParallelChannel } from 'lightweight-charts-line-tools-parallel-channel';
import { LineToolPriceRange } from 'lightweight-charts-line-tools-price-range';
import { LineToolLongShortPosition } from 'lightweight-charts-line-tools-long-short-position';
import { LineToolFibRetracement } from 'lightweight-charts-line-tools-fib-retracement';
import { LineToolMarketDepth } from 'lightweight-charts-line-tools-market-depth';
import LineToolTestPanel from './LineToolTestPanel'; 
import { Box, Grid } from '@mui/material'; 
import { generate4HourTestData } from '../Data/TrendLineToolData';

// Import from centralized UTC data source
import { 
	generateTestCandlestickData, 
	generatePane1DailyData 
} from '../Data/CandlestickTestData';


const colors = {
	backgroundColor: '#1E222D', 
	lineColor: '#2962FF',
	textColor: '#D1D4DC',
};

const LightweightCandlestickChart = () => {
	const chartContainerRef = useRef(null);
	const chartInstanceRef = useRef(null);

	// Refs for Pane 0 (Primary)
	const lineToolsPluginRef0 = useRef(null);
	const candlestickSeriesRef0 = useRef(null);

	// Refs for Pane 1 (Secondary/Interval Testing)
	const lineToolsPluginRef1 = useRef(null);
	const candlestickSeriesRef1 = useRef(null);

	const [chartReady, setChartReady] = useState(false);
	const [pane1Interval, setPane1Interval] = useState('daily');

	useEffect(() => {
		const handleResize = () => {
			if (chartInstanceRef.current && chartContainerRef.current) {
				chartInstanceRef.current.applyOptions({
					width: chartContainerRef.current.clientWidth,
					height: 1000,
				});
			}
		};

		if (!chartContainerRef.current) {
			return;
		}

		// 1. Initialize Chart
		const chart = createChart(chartContainerRef.current, {
			layout: {
				background: { type: ColorType.Solid, color: colors.backgroundColor },
				textColor: colors.textColor,
			},
			width: chartContainerRef.current.clientWidth,
			height: 1000, 
			grid: { vertLines: { visible: false }, horzLines: { visible: false } },
			crosshair: { mode: CrosshairMode.Normal },
			localization: {
				/**
				 * Strictly format the crosshair time as UTC and include the weekday.
				 * This helps visually identify data gaps (weekends).
				 */
				timeFormatter: (timestamp) => {
					const date = new Date(timestamp * 1000);
					return `Chart UTC: ${date.toLocaleDateString('en-US', { 
						weekday: 'short', // Adds "Mon", "Tue", etc.
						month: 'short', 
						day: 'numeric', 
						year: 'numeric', 
						timeZone: 'UTC' 
					})}`;
				},
				//timeFormatter: undefined
			},
		});
		chartInstanceRef.current = chart;

		// 2. Setup Pane 0: Primary Candlestick Series (Explicitly set to Pane 0)
		const series0 = chart.addSeries(CandlestickSeries, {
			upColor: '#26A69A',
			downColor: '#EF5350',
			borderVisible: false,
			title: 'Pane 0: Daily Lab',
		},0);
		candlestickSeriesRef0.current = series0;
		series0.setData(generateTestCandlestickData('2025-09-01', '2025-09-30'));

		// 3. Setup Pane 1: Experimental Series (Explicitly set to Pane 1)
		const series1 = chart.addSeries(CandlestickSeries, {
			upColor: '#2196F3',
			downColor: '#FF9800',
			borderVisible: false,
			title: 'Pane 1: Multi-Interval Lab',
		},1);
		candlestickSeriesRef1.current = series1;
		series1.setData(generatePane1DailyData('2025-09-01', '2025-09-30'));

		chart.timeScale().fitContent();

		// 4. Initialize Plugins for both instances
		// This tests coordinate isolation and normalization logic in InteractionManager
		const lineTools0 = createLineToolsPlugin(chart, series0);
		lineToolsPluginRef0.current = lineTools0;

		const lineTools1 = createLineToolsPlugin(chart, series1);
		lineToolsPluginRef1.current = lineTools1;

		// 5. Register All Tools to Pane 0
		const allTools = [
			{ name: 'TrendLine', class: LineToolTrendLine },
			{ name: 'Rectangle', class: LineToolRectangle },
			{ name: 'Circle', class: LineToolCircle },
			{ name: 'Brush', class: LineToolBrush },
			{ name: 'Highlighter', class: LineToolHighlighter },
			{ name: 'Path', class: LineToolPath },
			{ name: 'Triangle', class: LineToolTriangle },
			{ name: 'ExtendedLine', class: LineToolExtendedLine },
			{ name: 'Arrow', class: LineToolArrow },
			{ name: 'Ray', class: LineToolRay },
			{ name: 'HorizontalLine', class: LineToolHorizontalLine },
			{ name: 'HorizontalRay', class: LineToolHorizontalRay },
			{ name: 'VerticalLine', class: LineToolVerticalLine },
			{ name: 'CrossLine', class: LineToolCrossLine },
			{ name: 'Text', class: LineToolText },
			{ name: 'Callout', class: LineToolCallout },
			{ name: 'ParallelChannel', class: LineToolParallelChannel },
			{ name: 'PriceRange', class: LineToolPriceRange },
			{ name: 'LongShortPosition', class: LineToolLongShortPosition },
			{ name: 'FibRetracement', class: LineToolFibRetracement },
			{ name: 'MarketDepth', class: LineToolMarketDepth }
		];

		allTools.forEach(t => lineTools0.registerLineTool(t.name, t.class));

		// 6. Register a subset to Pane 1
		lineTools1.registerLineTool('TrendLine', LineToolTrendLine);
		lineTools1.registerLineTool('Rectangle', LineToolRectangle);

		setChartReady(true);
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			if (chartInstanceRef.current) {
				// Tests the logical destruction and self-neutering of both instances
				lineToolsPluginRef0.current?.destroy();
				lineToolsPluginRef1.current?.destroy();
				chartInstanceRef.current.remove();
				chartInstanceRef.current = null;
			}
		};
	}, [chartContainerRef]);

	return (
		<Grid container spacing={2} sx={{ padding: '10px' }}>
			{/* Left side: Buttons Panel */}
			<Grid size={12} sx={{ maxHeight: '100vh', overflowY: 'auto' }}>
				<LineToolTestPanel
					lineToolsPluginRef0={lineToolsPluginRef0}
					lineToolsPluginRef1={lineToolsPluginRef1}
					chartInstanceRef={chartInstanceRef}
					candlestickSeriesRef0={candlestickSeriesRef0}
					candlestickSeriesRef1={candlestickSeriesRef1}
					chartReady={chartReady}
					pane1Interval={pane1Interval}
					setPane1Interval={setPane1Interval}
				/>
			</Grid>

			{/* Right side: Chart Area */}
			<Grid size={12} sx={{ height: '1000px', width: '100%', padding: '50px' }}>
				<Box
					ref={chartContainerRef}
					sx={{
						width: '100%',
						height: '100%',
						border: `1px solid ${colors.lineColor}`,
						boxSizing: 'border-box',
						bgcolor: '#000'
					}}
				/>
			</Grid>
		</Grid>
	);
};

export default LightweightCandlestickChart;