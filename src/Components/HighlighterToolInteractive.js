// File: /src/Components/HighlighterToolInteractive.js

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


const HighlighterToolInteractive = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the Highlighter tool
	const {
		handleSetActiveDefault,
		handleAddInteractiveDefault,
		handleAddInteractiveCustom,
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
						<Grid item xs={4}>
							<Button variant="contained" onClick={handleSetActiveDefault} fullWidth disabled={!chartReady} color="primary">
								Activate Default
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Highlighter')`. Drag on chart.
							</Typography>
						</Grid>
						<Grid item xs={4}>
							<Button variant="contained" onClick={handleAddInteractiveDefault} fullWidth disabled={!chartReady} color="secondary">
								Add Highlighter (Interactive)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Highlighter')`. New tool created, then drag on chart.
							</Typography>
						</Grid>
						<Grid item xs={4}>
							<Button variant="contained" onClick={handleAddInteractiveCustom} fullWidth disabled={!chartReady} color="secondary">
								Add Highlighter (Custom Opts)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Highlighter', [], customOpts)`. Thinner red style.
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default HighlighterToolInteractive;