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
import LineToolTestPanel from './LineToolTestPanel'; // Import the new test panel
import { Box, Grid } from '@mui/material'; // Import MUI components for layout


const colors = {
	backgroundColor: '#1E222D', // Dark background
	lineColor: '#2962FF',
	textColor: '#D1D4DC',
};

/**
 * Generates a consistent, repeatable set of daily candlestick data between two dates.
 * @param {string} startDateStr - The start date in 'YYYY-MM-DD' format.
 * @param {string} endDateStr - The end date in 'YYYY-MM-DD' format.
 * @returns {Array<object>} An array of candlestick data points.
 */
function generateTestCandlestickData(startDateStr, endDateStr) {
	const data = [];
	const startDate = new Date(startDateStr + 'T00:00:00Z');
	const endDate = new Date(endDateStr + 'T00:00:00Z');

	let currentDate = new Date(startDate);
	let i = 0;

	const basePrice = 150;
	const amplitude = 50;

	while (currentDate <= endDate) {
		// Convert the date to a numeric UTC timestamp (seconds)
		const time = Math.floor(currentDate.getTime() / 1000);

		const open = basePrice + Math.cos(i / 20) * amplitude * 0.8;
		const close = basePrice + Math.sin(i / 10) * amplitude;

		const highFuzz = (i % 5) + 1;
		const lowFuzz = (i % 7) + 1;

		const high = Math.max(open, close) + highFuzz;
		const low = Math.min(open, close) - lowFuzz;

		data.push({ time, open, high, low, close });

		currentDate.setUTCDate(currentDate.getUTCDate() + 1);
		i++;
	}
	return data;
}

const LightweightCandlestickChart = () => {
	const chartContainerRef = useRef(null);
	const chartInstanceRef = useRef(null);
	const lineToolsPluginRef = useRef(null);
	const candlestickSeriesRef = useRef(null);
	const [chartReady, setChartReady] = useState(false);

	// --- Chart & Plugin Initialization Effect ---
	useEffect(() => {
		const handleResize = () => {
			if (chartInstanceRef.current && chartContainerRef.current) {
				// Use parent container's full available width and the desired fixed height
				chartInstanceRef.current.applyOptions({
					width: chartContainerRef.current.clientWidth,
					height: 800, // Fixed height for chart
				});
			}
		};

		// Guard against chart creation before container has dimensions
		// It's crucial for chartContainerRef.current to exist and have non-zero width/height
		if (!chartContainerRef.current || chartContainerRef.current.clientWidth === 0 || chartContainerRef.current.clientHeight === 0) {
			return; // Defer chart creation until container has valid dimensions
		}

		// 1. Initialize Chart
		const chart = createChart(chartContainerRef.current, {
			layout: {
				background: {
					type: ColorType.Solid,
					color: colors.backgroundColor,
				},
				textColor: colors.textColor,
			},
			width: chartContainerRef.current.clientWidth,   // Dynamic width
			height: 800, // Fixed height for chart
			grid: {
				vertLines: { visible: false },
				horzLines: { visible: false }
			},
			crosshair: {
				mode: CrosshairMode.Normal,
			}
		});
		chartInstanceRef.current = chart;

		chart.timeScale().fitContent();

		const newCandlestickSeries = chart.addSeries(CandlestickSeries, {
			upColor: '#26A69A',
			downColor: '#EF5350',
			borderVisible: false,
			wickUpColor: '#26A69A',
			wickDownColor: '#EF5350',
		});
		candlestickSeriesRef.current = newCandlestickSeries;

		newCandlestickSeries.setData(generateTestCandlestickData('2025-09-01', '2025-09-30'));

		// 2. Initialize Line Tools Plugin
		console.log("Initializing Line Tools Core Plugin...");
		const lineTools = createLineToolsPlugin(
			chartInstanceRef.current,
			candlestickSeriesRef.current
		);
		lineToolsPluginRef.current = lineTools;

		// 3. Register Line Tools (Rectangle for this test app)
		console.log("Registering LineToolRectangle with Core Plugin...");
		lineTools.registerLineTool('Rectangle', LineToolRectangle);
		console.log("LineToolRectangle registered.");

		// TrendLine ---
		console.log("Registering LineToolTrendLine with Core Plugin...");
		lineTools.registerLineTool('TrendLine', LineToolTrendLine);
		console.log("LineToolTrendLine registered.");

		// Circle ---
		console.log("Registering LineToolCircle with Core Plugin...");
		lineTools.registerLineTool('Circle', LineToolCircle);
		console.log("LineToolCircle registered.");

		// Brush Tool ---
		console.log("Registering LineToolBrush with Core Plugin...");
		lineTools.registerLineTool('Brush', LineToolBrush);
		console.log("Brush Tool registered.");

		// Highlighter Tool ---
		console.log("Registering LineToolHighlighter with Core Plugin...");
		lineTools.registerLineTool('Highlighter', LineToolHighlighter);
		console.log("Highlighter Tool registered.");

		// Path Tool
		console.log("Registering LineToolPath with Core Plugin...");		
		lineTools.registerLineTool('Path', LineToolPath);
		console.log("Path Tool registered.");

		// Triangle Tool
		console.log("Registering LineToolTriangle with Core Plugin...");
		lineTools.registerLineTool('Triangle', LineToolTriangle);
		console.log("Triangle Tool registered.");

		// ExtendedLine
		console.log("Registering LineToolExtendedLine with Core Plugin...");
		lineTools.registerLineTool('ExtendedLine', LineToolExtendedLine);
		console.log("LineToolExtendedLine registered.");

		// Arrow
		console.log("Registering LineToolArrow with Core Plugin...");
		lineTools.registerLineTool('Arrow', LineToolArrow);
		console.log("LineToolArrow registered.");

		// Ray
		console.log("Registering LineToolRay with Core Plugin...");
		lineTools.registerLineTool('Ray', LineToolRay);
		console.log("LineToolRay registered.");

		// HorizontalLine
		console.log("Registering LineToolHorizontalLine with Core Plugin...");
		lineTools.registerLineTool('HorizontalLine', LineToolHorizontalLine);
		console.log("LineToolHorizontalLine registered.");
		
		// HorizontalRay
		console.log("Registering LineToolHorizontalRay with Core Plugin...");
		lineTools.registerLineTool('HorizontalRay', LineToolHorizontalRay);
		console.log("LineToolHorizontalRay registered.");

		// VerticalLine
		console.log("Registering LineToolVerticalLine with Core Plugin...");
		lineTools.registerLineTool('VerticalLine', LineToolVerticalLine);
		console.log("LineToolVerticalLine registered.");

		// CrossLine
		console.log("Registering LineToolCrossLine with Core Plugin...");
		lineTools.registerLineTool('CrossLine', LineToolCrossLine);
		console.log("LineToolCrossLine registered.");

		// Text
		console.log("Registering LineToolText with Core Plugin...");
		lineTools.registerLineTool('Text', LineToolText);
		console.log("LineToolText registered.");

		// Callout
		console.log("Registering LineToolCallout with Core Plugin...");
		lineTools.registerLineTool('Callout', LineToolCallout);
		console.log("LineToolCallout registered.");

		// ParallelChannel
		console.log("Registering LineToolParallelChannel with Core Plugin...");
		lineTools.registerLineTool('ParallelChannel', LineToolParallelChannel);
		console.log("LineToolParallelChannel registered.");

		// PriceRange
		console.log("Registering LineToolPriceRange with Core Plugin...");
		lineTools.registerLineTool('PriceRange', LineToolPriceRange);
		console.log("LineToolPriceRange registered.");

		// LongShortPosition
		console.log("Registering LineToolLongShortPosition with Core Plugin...");
		lineTools.registerLineTool('LongShortPosition', LineToolLongShortPosition);
		console.log("LineToolLongShortPosition registered.");

		// FibRetracement
		console.log("Registering LineToolFibRetracement with Core Plugin...");
		lineTools.registerLineTool('FibRetracement', LineToolFibRetracement);
		console.log("LineToolFibRetracement registered.");

		// MarketDepth
		console.log("Registering LineToolMarketDepth with Core Plugin...");
		lineTools.registerLineTool('MarketDepth', LineToolMarketDepth);
		console.log("LineToolMarketDepth registered.");

		// Set chartReady to true AFTER chart, series, and plugin are initialized and ready
		setChartReady(true);

		window.addEventListener('resize', handleResize);

		// Cleanup function
		return () => {
			window.removeEventListener('resize', handleResize);
			if (chartInstanceRef.current) {
				if (lineToolsPluginRef.current) {
					lineToolsPluginRef.current.removeAllLineTools(); 
					console.log("Removed all line tools on cleanup.");
				}
				chartInstanceRef.current.remove();
				chartInstanceRef.current = null;
				console.log("Chart instance removed on cleanup.");
			}
		};
	}, [chartContainerRef]); // Dependency array: Re-run effect if chartContainerRef changes

    // Added a specific height to the Grid item that contains the chart
    // and ensured the Box inside it can flex grow to use that height.
	return (
		<Grid container spacing={2} sx={{ padding: '10px' }}>
			{/* Left side: Buttons Panel */}
			<Grid size={12} sx={{ maxHeight: '100vh', overflowY: 'auto' }}>
				<LineToolTestPanel
					lineToolsPluginRef={lineToolsPluginRef}
					chartInstanceRef={chartInstanceRef}
					candlestickSeriesRef={candlestickSeriesRef}
					chartReady={chartReady}
				/>
			</Grid>

			{/* Right side: Chart Area */}
			{/* Set a fixed height for the chart's Grid item */}
			<Grid size={12} sx={{ height: '800px', width: '100%', padding: '50px'}}> {/* Chart's fixed height */}
				<Box
					ref={chartContainerRef}
					sx={{
						width: '100%', // Take full width of its Grid item
						height: '100%', // Take full height of its Grid item
						border: `1px solid ${colors.lineColor}`,
						boxSizing: 'border-box',
						
					}}
				>
					{/* Chart will be rendered inside this div */}
				</Box>
			</Grid>
		</Grid>
	);
};

export default LightweightCandlestickChart;