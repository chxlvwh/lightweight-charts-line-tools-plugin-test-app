// File: /src/Components/TrendLineToolInteractive.js

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
import { useLineToolTrendLine } from '../Hooks/useLineToolTrendLine';


const TrendLineToolInteractive = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the TrendLine tool
	const {
		handleSetActiveDefault,
		handleSetActiveExotic,
		handleAddInteractiveDefault,
		handleAddInteractiveExtended,
	} = useLineToolTrendLine(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Trend Line Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #555' }}>
					<Grid container spacing={1}>
						
						<Grid item size={3}>
							<Button variant="contained" onClick={handleSetActiveDefault} fullWidth disabled={!chartReady} color="primary">
								Activate Default
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('TrendLine')`. Click twice on chart.
							</Typography>
						</Grid>
						
						<Grid item size={3}>
							<Button variant="contained" onClick={handleSetActiveExotic} fullWidth disabled={!chartReady} color="primary">
								Activate Exotic
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('TrendLine', exoticOptions)`.
							</Typography>
						</Grid>
						
						<Grid item size={3}>
							<Button variant="contained" onClick={handleAddInteractiveDefault} fullWidth disabled={!chartReady} color="secondary">
								Add TrendLine (Default)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('TrendLine')`. New tool instance created immediately, then click on chart.
							</Typography>
						</Grid>
						
						<Grid item size={3}>
							<Button variant="contained" onClick={handleAddInteractiveExtended} fullWidth disabled={!chartReady} color="secondary">
								Add TrendLine (Extended Opts)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('TrendLine', [], extendedOptions)`. Interactive drawing with Infinite Line options.
							</Typography>
						</Grid>
						
					</Grid>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default TrendLineToolInteractive;