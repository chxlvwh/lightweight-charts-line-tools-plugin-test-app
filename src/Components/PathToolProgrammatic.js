// /src/Components/PathToolProgrammatic.js

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
import { useLineToolPath } from '../Hooks/useLineToolPath';


const PathToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the Path tool
	const {
		handleAddPathA,
		handleAddPathB,
		handleCreatePathX,
		handleUpdatePathX,
		handleRemovePathX,
		handleRemovePathsRegex,
		handleGenerateAllTests,
	} = useLineToolPath(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Path Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #555' }}>
					<Grid container spacing={1}>
 
						{/* Group: Programmatic Tool Creation */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddPathA} fullWidth disabled={!chartReady} color="primary">
								Add Path A (Simple)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `PATH_PROG_A`. Programmatic 3-point path.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddPathB} fullWidth disabled={!chartReady} color="primary">
								Add Path B (Custom Style)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `PATH_PROG_B`. Programmatic 4-point path with custom style.
							</Typography>
						</Grid>

						{/* Group: Creation/Update/Removal Tests */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleCreatePathX} fullWidth disabled={!chartReady} color="secondary">
								Create PATH_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`createOrUpdateLineTool`
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleUpdatePathX} fullWidth disabled={!chartReady} color="secondary">
								Update PATH_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Updates points/options for `PATH_X`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemovePathX} fullWidth disabled={!chartReady} color="error">
								Remove PATH_X by ID
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsById(['PATH_X'])`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemovePathsRegex} fullWidth disabled={!chartReady} color="error">
								Remove Prog Paths (Regex)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsByIdRegex(/^PATH_PROG_.*$/)`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleGenerateAllTests} fullWidth disabled={!chartReady} color="warning">
								Generate All Tests
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Automated Test Surface Generation (Canned Path).
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default PathToolProgrammatic;