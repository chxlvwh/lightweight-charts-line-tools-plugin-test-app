// File: /src/Components/BrushToolInteractive.js

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
import { useLineToolBrush } from '../Hooks/useLineToolBrush';


const BrushToolInteractive = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the Brush tool
	const {
		handleSetActiveDefault,
		handleAddInteractiveDefault,
	} = useLineToolBrush(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Brush Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #555' }}>
					<Grid container spacing={1}>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleSetActiveDefault} fullWidth disabled={!chartReady} color="primary">
								Activate Default
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Brush')`. Click & Drag to draw.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddInteractiveDefault} fullWidth disabled={!chartReady} color="secondary">
								Add Brush (Interactive)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Brush')`. New tool instance created immediately.
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default BrushToolInteractive;