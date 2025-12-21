// /src/Components/CrossLineToolProgrammatic.js

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
import { useLineToolCrossLine } from '../Hooks/useLineToolCrossLine';


const CrossLineToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the CrossLine tool
	const {
		handleAddCrossLineA,
		handleAddCrossLineB,
		handleAddCrossLineC_OffScreen,
		handleCreateCrossLineX,
		handleUpdateCrossLineX,
		handleRemoveCrossLineX,
		handleRemoveCrossLineRegex,
		handleGenerateAllTests,
	} = useLineToolCrossLine(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Cross Line Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #444' }}>
					<Grid container spacing={1}>
 
						{/* Programmatic Creation */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddCrossLineA} fullWidth disabled={!chartReady} color="primary">
								Add Cross A (Top)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `CL_PROG_A`. Top price level.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddCrossLineB} fullWidth disabled={!chartReady} color="primary">
								Add Cross B (Middle)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `CL_PROG_B`. Middle price level.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddCrossLineC_OffScreen} fullWidth disabled={!chartReady} color="primary">
								Add Cross C (Off-Screen Test)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `CL_PROG_C`. Test of culling logic (off-screen top).
							</Typography>
						</Grid>
 
						{/* Creation/Update/Removal Tests */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleCreateCrossLineX} fullWidth disabled={!chartReady} color="secondary">
								Create CL_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`createOrUpdateLineTool` (Initial).
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleUpdateCrossLineX} fullWidth disabled={!chartReady} color="secondary">
								Update CL_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Updates position/options for `CL_X`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveCrossLineX} fullWidth disabled={!chartReady} color="error">
								Remove CL_X by ID
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsById(['CL_X'])`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveCrossLineRegex} fullWidth disabled={!chartReady} color="error">
								Remove Prog Cross Lines (Regex)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsByIdRegex(/^CL_PROG_.*$/)`.
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

export default CrossLineToolProgrammatic;