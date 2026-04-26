// /src/Components/ExtendedLineToolInteractive.js

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


const ExtendedLineToolInteractive = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the ExtendedLine tool
	const {
		handleSetActiveDefault,
		handleSetActiveExotic,
		handleAddInteractiveDefault,
	} = useLineToolExtendedLine(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Extended Line Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #555' }}>
					<Grid container spacing={1}>
 
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleSetActiveDefault} fullWidth disabled={!chartReady} color="primary">
								Activate Default
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('ExtendedLine')`. Click twice on chart.
							</Typography>
						</Grid>
 
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleSetActiveExotic} fullWidth disabled={!chartReady} color="primary">
								Activate Exotic
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('ExtendedLine', exoticOptions)`.
							</Typography>
						</Grid>
 
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddInteractiveDefault} fullWidth disabled={!chartReady} color="secondary">
								Add ExtendedLine (Default)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('ExtendedLine')`. New tool instance created immediately, then click on chart.
							</Typography>
						</Grid>
 
					</Grid>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default ExtendedLineToolInteractive;