// /src/Components/HorizontalLineToolProgrammatic.js

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
import { useLineToolHorizontalLine } from '../Hooks/useLineToolHorizontalLine';


const HorizontalLineToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the HorizontalLine tool
	const {
		handleAddHorizontalA,
		handleAddHorizontalB,
		handleAddHorizontalC_OffScreen,
		handleCreateHorizontalX,
		handleUpdateHorizontalX,
		handleRemoveHorizontalX,
		handleRemoveHorizontalRegex,
		handleGenerateAllTests,
	} = useLineToolHorizontalLine(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Horizontal Line Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #444' }}>
					<Grid container spacing={1}>
 
						{/* Programmatic Creation */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddHorizontalA} fullWidth disabled={!chartReady} color="primary">
								Add Horizontal A (Top)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `HL_PROG_A`. Top price level.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddHorizontalB} fullWidth disabled={!chartReady} color="primary">
								Add Horizontal B (Middle)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `HL_PROG_B`. Middle price level.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddHorizontalC_OffScreen} fullWidth disabled={!chartReady} color="primary">
								Add Horizontal C (Off-Screen Test)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `HL_PROG_C`. Test of culling logic (off-screen top).
							</Typography>
						</Grid>
 
						{/* Creation/Update/Removal Tests */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleCreateHorizontalX} fullWidth disabled={!chartReady} color="secondary">
								Create HL_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`createOrUpdateLineTool` (Initial).
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleUpdateHorizontalX} fullWidth disabled={!chartReady} color="secondary">
								Update HL_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Updates position/options for `HL_X`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveHorizontalX} fullWidth disabled={!chartReady} color="error">
								Remove HL_X by ID
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsById(['HL_X'])`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveHorizontalRegex} fullWidth disabled={!chartReady} color="error">
								Remove Prog Horizontal Lines (Regex)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsByIdRegex(/^HL_PROG_.*$/)`.
							</Typography>
						</Grid>
						{/* Add New Automated Test Button */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleGenerateAllTests} fullWidth disabled={!chartReady} color="warning">
								Generate All Tests
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Automated Test Surface (approx 60 tools).
							</Typography>
						</Grid>
 
					</Grid>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default HorizontalLineToolProgrammatic;