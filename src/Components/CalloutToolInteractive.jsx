// /src/Components/CalloutToolInteractive.js

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
import { useLineToolCallout } from '../Hooks/useLineToolCallout';


const CalloutToolInteractive = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the Callout tool
	const {
		handleSetActiveDefault,
		handleSetActiveExotic,
		handleAddInteractiveDefault,
	} = useLineToolCallout(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Callout Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #555' }}>
					<Grid container spacing={1}>
 
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleSetActiveDefault} fullWidth disabled={!chartReady} color="primary">
								Activate Default
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Callout')`. Click P0, then P1.
							</Typography>
						</Grid>
 
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleSetActiveExotic} fullWidth disabled={!chartReady} color="primary">
								Activate Exotic
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Callout', exoticOptions)`.
							</Typography>
						</Grid>
 
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddInteractiveDefault} fullWidth disabled={!chartReady} color="secondary">
								Add Callout (Default)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Callout')`. New tool created immediately.
							</Typography>
						</Grid>
 
					</Grid>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default CalloutToolInteractive;