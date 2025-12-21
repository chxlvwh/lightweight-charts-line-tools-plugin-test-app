// /src/Components/CalloutToolProgrammatic.js

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
import { useLineToolCallout } from '../Hooks/useLineToolCallout';


const CalloutToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the Callout tool
	const {
		handleAddCalloutA,
		handleAddCalloutB,
		handleAddCalloutC_OffScreen,
		handleCreateCalloutX,
		handleUpdateCalloutX,
		handleRemoveCalloutX,
		handleRemoveCalloutRegex,
		handleGenerateAllTests,
	} = useLineToolCallout(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Callout Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #444' }}>
					<Grid container spacing={1}>
 
						{/* Programmatic Creation */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddCalloutA} fullWidth disabled={!chartReady} color="primary">
								Add Callout A (Top/Right)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `CLOT_PROG_A`. Pointer low, box high.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddCalloutB} fullWidth disabled={!chartReady} color="primary">
								Add Callout B (Bottom/Left)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `CLOT_PROG_B`. Pointer high, box low.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddCalloutC_OffScreen} fullWidth disabled={!chartReady} color="primary">
								Add Callout C (Off-Screen Test)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `CLOT_PROG_C`. Test of culling logic (off-screen top).
							</Typography>
						</Grid>
 
						{/* Creation/Update/Removal Tests */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleCreateCalloutX} fullWidth disabled={!chartReady} color="secondary">
								Create CLOT_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`createOrUpdateLineTool` (Initial).
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleUpdateCalloutX} fullWidth disabled={!chartReady} color="secondary">
								Update CLOT_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Updates position/options for `CLOT_X`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveCalloutX} fullWidth disabled={!chartReady} color="error">
								Remove CLOT_X by ID
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsById(['CLOT_X'])`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveCalloutRegex} fullWidth disabled={!chartReady} color="error">
								Remove Prog Callouts (Regex)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsByIdRegex(/^CLOT_PROG_.*$/)`.
							</Typography>
						</Grid>
						{/* Add New Automated Test Button */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleGenerateAllTests} fullWidth disabled={!chartReady} color="warning">
								Generate All Tests
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Automated Test Surface.
							</Typography>
						</Grid>
 
					</Grid>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default CalloutToolProgrammatic;