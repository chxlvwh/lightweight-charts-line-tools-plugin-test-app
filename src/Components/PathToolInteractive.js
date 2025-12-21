// File: /src/Components/PathToolInteractive.js

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


const PathToolInteractive = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the Path tool
	const {
		handleSetActiveDefault,
		handleSetActiveCustom,
		handleAddInteractiveDefault,
		handleAddInteractiveCustom,
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
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleSetActiveDefault} fullWidth disabled={!chartReady} color="primary">
								Activate Default
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Path')`. Click to add point, Double-click to finish.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleSetActiveCustom} fullWidth disabled={!chartReady} color="primary">
								Activate Custom Style
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Path', customOpts)`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddInteractiveDefault} fullWidth disabled={!chartReady} color="secondary">
								Add Path (Interactive)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Path')`. New tool instance created immediately.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddInteractiveCustom} fullWidth disabled={!chartReady} color="secondary">
								Add Path (Custom Opts)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Path', [], customOpts)`. New tool instance created immediately.
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default PathToolInteractive;