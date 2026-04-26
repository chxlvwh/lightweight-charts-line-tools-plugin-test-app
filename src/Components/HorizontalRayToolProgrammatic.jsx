// /src/Components/HorizontalRayToolProgrammatic.js

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
import { useLineToolHorizontalRay } from '../Hooks/useLineToolHorizontalRay';


const HorizontalRayToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the HorizontalRay tool
	const {
		handleAddHorizontalRayA,
		handleAddHorizontalRayB,
		handleAddHorizontalRayC_OffScreen,
		handleCreateHorizontalRayX,
		handleUpdateHorizontalRayX,
		handleRemoveHorizontalRayX,
		handleRemoveHorizontalRayRegex,
		handleGenerateAllTests,
	} = useLineToolHorizontalRay(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Horizontal Ray Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #444' }}>
					<Grid container spacing={1}>
 
						{/* Programmatic Creation */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddHorizontalRayA} fullWidth disabled={!chartReady} color="primary">
								Add Horizontal Ray A (Top)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `HR_PROG_A`. Top price level.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddHorizontalRayB} fullWidth disabled={!chartReady} color="primary">
								Add Horizontal Ray B (Middle)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `HR_PROG_B`. Middle price level.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddHorizontalRayC_OffScreen} fullWidth disabled={!chartReady} color="primary">
								Add Horizontal Ray C (Off-Screen Test)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `HR_PROG_C`. Test of culling logic (off-screen top).
							</Typography>
						</Grid>
 
						{/* Creation/Update/Removal Tests */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleCreateHorizontalRayX} fullWidth disabled={!chartReady} color="secondary">
								Create HR_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`createOrUpdateLineTool` (Initial).
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleUpdateHorizontalRayX} fullWidth disabled={!chartReady} color="secondary">
								Update HR_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Updates position/options for `HR_X`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveHorizontalRayX} fullWidth disabled={!chartReady} color="error">
								Remove HR_X by ID
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsById(['HR_X'])`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveHorizontalRayRegex} fullWidth disabled={!chartReady} color="error">
								Remove Prog Horizontal Ray Lines (Regex)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsByIdRegex(/^HR_PROG_.*$/)`.
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

export default HorizontalRayToolProgrammatic;