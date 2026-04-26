// /src/Components/ExtendedLineToolProgrammatic.js

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
import { useLineToolExtendedLine } from '../Hooks/useLineToolExtendedLine';


const ExtendedLineToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the ExtendedLine tool
	const {
		handleAddExtendedA,
		handleAddExtendedB,
		handleAddExtendedC_OffScreen,
		handleCreateExtendedX,
		handleUpdateExtendedX,
		handleRemoveExtendedX,
		handleRemoveExtendedRegex,
		handleGenerateAllTests,
	} = useLineToolExtendedLine(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Extended Line Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #444' }}>
					<Grid container spacing={1}>
 
						{/* Programmatic Creation */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddExtendedA} fullWidth disabled={!chartReady} color="primary">
								Add Extended A (Default)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `EXTENDED_PROG_A`. Basic extended segment.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddExtendedB} fullWidth disabled={!chartReady} color="primary">
								Add Extended B (Exotic Text)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `EXTENDED_PROG_B`. Custom style/text.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddExtendedC_OffScreen} fullWidth disabled={!chartReady} color="primary">
								Add Extended C (Off-Screen Test)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `EXTENDED_PROG_C`. Test of culling logic.
							</Typography>
						</Grid>
 
						{/* Creation/Update/Removal Tests */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleCreateExtendedX} fullWidth disabled={!chartReady} color="secondary">
								Create EXTENDED_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`createOrUpdateLineTool` (Initial).
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleUpdateExtendedX} fullWidth disabled={!chartReady} color="secondary">
								Update EXTENDED_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Updates points/options for `EXTENDED_X`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveExtendedX} fullWidth disabled={!chartReady} color="error">
								Remove EXTENDED_X by ID
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsById(['EXTENDED_X'])`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveExtendedRegex} fullWidth disabled={!chartReady} color="error">
								Remove Prog Extended Lines (Regex)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsByIdRegex(/^EXTENDED_PROG_.*$/)`.
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

export default ExtendedLineToolProgrammatic;