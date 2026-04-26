// /src/Components/VerticalLineToolProgrammatic.js

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
import { useLineToolVerticalLine } from '../Hooks/useLineToolVerticalLine';


const VerticalLineToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the VerticalLine tool
	const {
		handleAddVerticalLineA,
		handleAddVerticalLineB,
		handleAddVerticalLineC_OffScreen,
		handleCreateVerticalX,
		handleUpdateVerticalX,
		handleRemoveVerticalX,
		handleRemoveVerticalRegex,
		handleGenerateAllTests,
	} = useLineToolVerticalLine(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Vertical Line Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #444' }}>
					<Grid container spacing={1}>
 
						{/* Programmatic Creation */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddVerticalLineA} fullWidth disabled={!chartReady} color="primary">
								Add Vertical A (Left)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `VL_PROG_A`. Left time position.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddVerticalLineB} fullWidth disabled={!chartReady} color="primary">
								Add Vertical B (Right)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `VL_PROG_B`. Right time position.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddVerticalLineC_OffScreen} fullWidth disabled={!chartReady} color="primary">
								Add Vertical C (Off-Screen Test)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `VL_PROG_C`. Test of culling logic (off-screen left).
							</Typography>
						</Grid>
 
						{/* Creation/Update/Removal Tests */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleCreateVerticalX} fullWidth disabled={!chartReady} color="secondary">
								Create VL_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`createOrUpdateLineTool` (Initial).
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleUpdateVerticalX} fullWidth disabled={!chartReady} color="secondary">
								Update VL_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Updates position/options for `VL_X`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveVerticalX} fullWidth disabled={!chartReady} color="error">
								Remove VL_X by ID
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsById(['VL_X'])`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveVerticalRegex} fullWidth disabled={!chartReady} color="error">
								Remove Prog Vertical Lines (Regex)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsByIdRegex(/^VL_PROG_.*$/)`.
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

export default VerticalLineToolProgrammatic;