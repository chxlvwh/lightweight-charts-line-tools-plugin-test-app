// File: /src/Components/HighlighterToolProgrammatic.js

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
import { useLineToolHighlighter } from '../Hooks/useLineToolHighlighter';


const HighlighterToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the Highlighter tool
	const {
		handleAddHighlighterA,
		handleAddHighlighterB,
		handleCreateHighlighterX,
		handleUpdateHighlighterX,
		handleRemoveHighlighterX,
		handleRemoveHighlightersRegex,
		handleGenerateAllTests,
	} = useLineToolHighlighter(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Highlighter Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #555' }}>
					<Grid container spacing={1}>
 
						{/* Group: Programmatic Tool Creation */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddHighlighterA} fullWidth disabled={!chartReady} color="primary">
								Add Highlighter A (Yellow)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `HL_PROG_A`. Standard Yellow Highlighter.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddHighlighterB} fullWidth disabled={!chartReady} color="primary">
								Add Highlighter B (Thinner/Green)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `HL_PROG_B`. Custom Green style.
							</Typography>
						</Grid>

						{/* Group: Creation/Update/Removal Tests */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleCreateHighlighterX} fullWidth disabled={!chartReady} color="secondary">
								Create HIGHLIGHTER_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`createOrUpdateLineTool` (Initial).
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleUpdateHighlighterX} fullWidth disabled={!chartReady} color="secondary">
								Update HIGHLIGHTER_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Updates points/options for `HIGHLIGHTER_X`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveHighlighterX} fullWidth disabled={!chartReady} color="error">
								Remove HIGHLIGHTER_X by ID
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsById(['HIGHLIGHTER_X'])`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveHighlightersRegex} fullWidth disabled={!chartReady} color="error">
								Remove Prog Highlighters (Regex)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsByIdRegex(/^HL_PROG_.*$/)`.
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

export default HighlighterToolProgrammatic;