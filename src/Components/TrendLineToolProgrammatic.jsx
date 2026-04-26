// File: /src/Components/TrendLineToolProgrammatic.js

import React from 'react';
import {
	Button,
	Grid,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolTrendLine } from '../Hooks/useLineToolTrendLine';


const TrendLineToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the TrendLine tool
	const {
		handleAddTrendA,
		handleAddTrendB,
		handleAddTrendC_OffScreen,
		handleCreateTrendX,
		handleUpdateTrendX,
		handleRemoveTrendX,
		handleRemoveTrendsRegex,
		handleGenerateAllTests,
	} = useLineToolTrendLine(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Trend Line Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #444' }}>
					<Grid container spacing={1}>
						
						{/* Programmatic Creation */}
						<Grid item size={3}>
							<Button variant="contained" onClick={handleAddTrendA} fullWidth disabled={!chartReady} color="primary">
								Add Trend A (Default)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `TREND_PROG_A`. Basic segment.
							</Typography>
						</Grid>
						<Grid item size={3}>
							<Button variant="contained" onClick={handleAddTrendB} fullWidth disabled={!chartReady} color="primary">
								Add Trend B (Exotic Text)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `TREND_PROG_B`. Custom style/text.
							</Typography>
						</Grid>
						<Grid item size={3}>
							<Button variant="contained" onClick={handleAddTrendC_OffScreen} fullWidth disabled={!chartReady} color="primary">
								Add Trend C (Off-Screen Test)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `TREND_PROG_C`. Test of culling logic.
							</Typography>
						</Grid>
						
						{/* Creation/Update/Removal Tests */}
						<Grid item size={3}>
							<Button variant="contained" onClick={handleCreateTrendX} fullWidth disabled={!chartReady} color="secondary">
								Create TREND_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`createOrUpdateLineTool` (Initial).
							</Typography>
						</Grid>
						<Grid item size={3}>
							<Button variant="contained" onClick={handleUpdateTrendX} fullWidth disabled={!chartReady} color="secondary">
								Update TREND_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Updates points/options for `TREND_X`.
							</Typography>
						</Grid>
						<Grid item size={3}>
							<Button variant="contained" onClick={handleRemoveTrendX} fullWidth disabled={!chartReady} color="error">
								Remove TREND_X by ID
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsById(['TREND_X'])`.
							</Typography>
						</Grid>
						<Grid item size={3}>
							<Button variant="contained" onClick={handleRemoveTrendsRegex} fullWidth disabled={!chartReady} color="error">
								Remove Prog Trends (Regex)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsByIdRegex(/^TREND_PROG_.*$/)`.
							</Typography>
						</Grid>
                        {/* Add New Automated Test Button */}
						<Grid item size={3}>
							<Button variant="contained" onClick={handleGenerateAllTests} fullWidth disabled={!chartReady} color="warning">
								Generate All Tests
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Automated Test Surface (approx 60 tools).
							</Typography>
						</Grid>
                        {/* SNIPPET END */}						

					</Grid>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default TrendLineToolProgrammatic;