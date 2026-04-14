// File: /src/Components/Pane1TestPanel.js

import React from 'react';
import {
	Button,
	Grid,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box,
	Chip,
	Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { usePane1Test } from '../Hooks/usePane1Test';

/**
 * UI Panel specifically for testing Pane 1 (Secondary Pane) functionality.
 * 
 * This component focuses on testing:
 * 1. Interaction isolation (Drawing on Pane 1 should not affect Pane 0).
 * 2. Timeframe interpolation (Switching data density while keeping tools anchored).
 * 
 * @param {Object} props
 * @param {Object} props.api1 - The API wrapper for the Pane 1 plugin.
 * @param {React.MutableRefObject} props.candlestickSeriesRef1 - Ref to the secondary series.
 * @param {boolean} props.chartReady - Flag indicating if the chart is ready.
 * @param {string} props.pane1Interval - Current interval state ('daily' | '4h').
 * @param {Function} props.setPane1Interval - State setter for the interval.
 */
const Pane1TestPanel = ({ api1, candlestickSeriesRef1, chartReady, pane1Interval, setPane1Interval }) => {
	
	const {
		handleSetDaily,
		handleSet4Hour,
		handleAddTrendLinePane1,
		handleAddRectanglePane1,
	} = usePane1Test(api1, candlestickSeriesRef1, pane1Interval, setPane1Interval);

	return (
		<Accordion sx={{ mb: 2, border: '1px solid #2196F3' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Stack direction="row" spacing={2} alignItems="center">
					<Typography variant="h6">Pane 1: Multi-Interval Lab</Typography>
					<Chip 
						label={pane1Interval === 'daily' ? 'Daily Data' : '4-Hour Data'} 
						color="primary" 
						size="small" 
						variant="outlined" 
					/>
				</Stack>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ width: '100%' }}>
					<Grid container spacing={2}>
						
						{/* Data Interval Controls */}
						<Grid item size={12}>
							<Typography variant="subtitle2" gutterBottom>1. Switch Data Density (Interpolation Test)</Typography>
							<Grid container spacing={1}>
								<Grid item size={6}>
									<Button 
										variant={pane1Interval === 'daily' ? "contained" : "outlined"} 
										onClick={handleSetDaily} 
										fullWidth 
										disabled={!chartReady}
									>
										Set Daily Data
									</Button>
								</Grid>
								<Grid item size={6}>
									<Button 
										variant={pane1Interval === '4h' ? "contained" : "outlined"} 
										onClick={handleSet4Hour} 
										fullWidth 
										disabled={!chartReady}
									>
										Set 4-Hour Data
									</Button>
								</Grid>
							</Grid>
							<Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
								Switching to 4-Hour increases bar count 6x. Verify that existing tools on Pane 1 stay anchored to their timestamps.
							</Typography>
						</Grid>

						{/* Interactive Creation Controls */}
						<Grid item size={12} sx={{ mt: 1 }}>
							<Typography variant="subtitle2" gutterBottom>2. Interactive Drawing (Pane 1 Targeted)</Typography>
							<Grid container spacing={1}>
								<Grid item size={6}>
									<Button 
										variant="contained" 
										color="primary" 
										onClick={handleAddTrendLinePane1} 
										fullWidth 
										disabled={!chartReady}
									>
										Add TrendLine
									</Button>
								</Grid>
								<Grid item size={6}>
									<Button 
										variant="contained" 
										color="primary" 
										onClick={handleAddRectanglePane1} 
										fullWidth 
										disabled={!chartReady}
									>
										Add Rectangle
									</Button>
								</Grid>
							</Grid>
							<Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
								These buttons explicitly use the Pane 1 API instance. Drawing here should be clamped to the bottom pane.
							</Typography>
						</Grid>

					</Grid>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default Pane1TestPanel;