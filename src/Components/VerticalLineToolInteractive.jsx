// /src/Components/VerticalLineToolInteractive.js

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
import { useLineToolVerticalLine } from '../Hooks/useLineToolVerticalLine';


const VerticalLineToolInteractive = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the VerticalLine tool
	const {
		handleSetActiveDefault,
		handleSetActiveExotic,
		handleAddInteractiveDefault,
	} = useLineToolVerticalLine(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Vertical Line Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #555' }}>
					<Grid container spacing={1}>
 
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleSetActiveDefault} fullWidth disabled={!chartReady} color="primary">
								Activate Default
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('VerticalLine')`. Click once on chart.
							</Typography>
						</Grid>
 
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleSetActiveExotic} fullWidth disabled={!chartReady} color="primary">
								Activate Exotic
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('VerticalLine', exoticOptions)`.
							</Typography>
						</Grid>
 
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddInteractiveDefault} fullWidth disabled={!chartReady} color="secondary">
								Add Vertical Line (Default)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('VerticalLine')`. New tool created immediately, then click on chart.
							</Typography>
						</Grid>
 
					</Grid>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default VerticalLineToolInteractive;