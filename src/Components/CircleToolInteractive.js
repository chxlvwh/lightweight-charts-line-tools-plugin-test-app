// File: /src/Components/CircleToolInteractive.js

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
import { useLineToolCircle } from '../Hooks/useLineToolCircle';


const CircleToolInteractive = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the Circle tool
	const {
		handleSetActiveDefault,
		handleSetActiveBlue,
		handleAddInteractiveDefault,
		handleAddInteractiveCustom,
	} = useLineToolCircle(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Circle Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #555' }}>
					<Grid container spacing={1}>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleSetActiveDefault} fullWidth disabled={!chartReady} color="primary">
								Activate Default
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Circle')`. Click twice on chart (Center, Radius).
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleSetActiveBlue} fullWidth disabled={!chartReady} color="primary">
								Activate Blue Custom
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Circle', customOpts)`. Click twice on chart.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddInteractiveDefault} fullWidth disabled={!chartReady} color="secondary">
								Add Circle (Interactive)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Circle')`. New tool instance created immediately, then click on chart.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddInteractiveCustom} fullWidth disabled={!chartReady} color="secondary">
								Add Circle (Custom Opts)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Circle', [], customOpts)`. New tool instance created immediately, then click on chart.
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default CircleToolInteractive;