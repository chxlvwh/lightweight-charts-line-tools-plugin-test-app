// /src/Components/RayToolProgrammatic.js

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
import { useLineToolRay } from '../Hooks/useLineToolRay';


const RayToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the Ray tool
	const {
		handleAddRayA,
		handleAddRayB,
		handleAddRayC_OffScreen,
		handleCreateRayX,
		handleUpdateRayX,
		handleRemoveRayX,
		handleRemoveRayRegex,
		handleGenerateAllTests,
	} = useLineToolRay(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Ray Line Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #444' }}>
					<Grid container spacing={1}>
 
						{/* Programmatic Creation */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddRayA} fullWidth disabled={!chartReady} color="primary">
								Add Ray A (Default)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `RAY_PROG_A`. Basic ray segment.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddRayB} fullWidth disabled={!chartReady} color="primary">
								Add Ray B (Exotic Style)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `RAY_PROG_B`. Custom style/text.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddRayC_OffScreen} fullWidth disabled={!chartReady} color="primary">
								Add Ray C (Off-Screen Test)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `RAY_PROG_C`. Test of culling logic.
							</Typography>
						</Grid>
 
						{/* Creation/Update/Removal Tests */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleCreateRayX} fullWidth disabled={!chartReady} color="secondary">
								Create RAY_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`createOrUpdateLineTool` (Initial).
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleUpdateRayX} fullWidth disabled={!chartReady} color="secondary">
								Update RAY_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Updates points/options for `RAY_X`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveRayX} fullWidth disabled={!chartReady} color="error">
								Remove RAY_X by ID
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsById(['RAY_X'])`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveRayRegex} fullWidth disabled={!chartReady} color="error">
								Remove Prog Rays (Regex)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsByIdRegex(/^RAY_PROG_.*$/)`.
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

export default RayToolProgrammatic;