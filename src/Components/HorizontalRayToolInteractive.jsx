// /src/Components/HorizontalRayToolInteractive.js

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
import { useLineToolHorizontalRay } from '../Hooks/useLineToolHorizontalRay';


const HorizontalRayToolInteractive = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the HorizontalRay tool
	const {
		handleSetActiveDefault,
		handleSetActiveExotic,
		handleAddInteractiveDefault,
	} = useLineToolHorizontalRay(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Horizontal Ray Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #555' }}>
					<Grid container spacing={1}>
 
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleSetActiveDefault} fullWidth disabled={!chartReady} color="primary">
								Activate Default
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('HorizontalRay')`. Click once on chart.
							</Typography>
						</Grid>
 
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleSetActiveExotic} fullWidth disabled={!chartReady} color="primary">
								Activate Exotic
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('HorizontalRay', exoticOptions)`.
							</Typography>
						</Grid>
 
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddInteractiveDefault} fullWidth disabled={!chartReady} color="secondary">
								Add Horizontal Ray (Default)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('HorizontalRay')`. New tool created immediately, then click on chart.
							</Typography>
						</Grid>
 
					</Grid>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default HorizontalRayToolInteractive;