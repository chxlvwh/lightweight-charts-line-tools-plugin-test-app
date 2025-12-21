// File: /src/Components/RectangleToolInteractive.js

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
import { useLineToolRectangle } from '../Hooks/useLineToolRectangle';


const RectangleToolInteractive = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the Rectangle tool
	const {
		handleSetActiveDefault,
		handleSetActiveRedRounded,
		handleAddInteractiveNoPointsNoOptions,
		handleAddInteractiveEmptyPointsCustomOptions,
	} = useLineToolRectangle(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Rectangle Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #555' }}>
					<Grid container spacing={1}>
						<Grid item size={3}>
							<Button variant="contained" onClick={handleSetActiveDefault} fullWidth disabled={!chartReady} color="primary">
								Activate Default
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Rectangle')`. Click twice on chart.
							</Typography>
						</Grid>
						<Grid item size={3}>
							<Button variant="contained" onClick={handleSetActiveRedRounded} fullWidth disabled={!chartReady} color="primary">
								Activate Red Rounded
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Rectangle', redOptions)`. Click twice on chart.
							</Typography>
						</Grid>
						<Grid item size={3}>
							<Button variant="contained" onClick={handleAddInteractiveNoPointsNoOptions} fullWidth disabled={!chartReady} color="secondary">
								Add Rect (Interactive)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Rectangle')`. New tool instance created immediately, then click on chart.
							</Typography>
						</Grid>
						<Grid item size={3}>
							<Button variant="contained" onClick={handleAddInteractiveEmptyPointsCustomOptions} fullWidth disabled={!chartReady} color="secondary">
								Add Rect (Custom Opts)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Rectangle', [], customOpts)`. New tool instance created immediately, then click on chart.
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default RectangleToolInteractive;