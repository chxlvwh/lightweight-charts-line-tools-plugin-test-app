// /src/Components/ArrowToolProgrammatic.js

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
import { useLineToolArrow } from '../Hooks/useLineToolArrow';


const ArrowToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the Arrow tool
	const {
		handleAddArrowA,
		handleAddArrowB,
		handleAddArrowC_OffScreen,
		handleCreateArrowX,
		handleUpdateArrowX,
		handleRemoveArrowX,
		handleRemoveArrowRegex,
		handleGenerateAllTests,
	} = useLineToolArrow(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Arrow Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #444' }}>
					<Grid container spacing={1}>
 
						{/* Programmatic Creation */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddArrowA} fullWidth disabled={!chartReady} color="primary">
								Add Arrow A (Default)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `ARROW_PROG_A`. Basic arrow segment.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddArrowB} fullWidth disabled={!chartReady} color="primary">
								Add Arrow B (Exotic Style)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `ARROW_PROG_B`. Custom style/text.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddArrowC_OffScreen} fullWidth disabled={!chartReady} color="primary">
								Add Arrow C (Off-Screen Test)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `ARROW_PROG_C`. Test of culling logic.
							</Typography>
						</Grid>
 
						{/* Creation/Update/Removal Tests */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleCreateArrowX} fullWidth disabled={!chartReady} color="secondary">
								Create ARROW_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`createOrUpdateLineTool` (Initial).
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleUpdateArrowX} fullWidth disabled={!chartReady} color="secondary">
								Update ARROW_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Updates points/options for `ARROW_X`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveArrowX} fullWidth disabled={!chartReady} color="error">
								Remove ARROW_X by ID
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsById(['ARROW_X'])`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveArrowRegex} fullWidth disabled={!chartReady} color="error">
								Remove Prog Arrows (Regex)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsByIdRegex(/^ARROW_PROG_.*$/)`.
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

export default ArrowToolProgrammatic;