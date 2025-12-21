// File: /src/Components/TriangleToolInteractive.js

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
import { useLineToolTriangle } from '../Hooks/useLineToolTriangle';


const TriangleToolInteractive = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the Triangle tool
	const {
		handleSetActiveDefault,
		handleSetActiveCustom,
		handleAddInteractiveDefault,
		handleAddInteractiveCustom,
	} = useLineToolTriangle(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Triangle Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #555' }}>
					<Grid container spacing={1}>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleSetActiveDefault} fullWidth disabled={!chartReady} color="primary">
								Activate Default
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Triangle')`. Click 3 times.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleSetActiveCustom} fullWidth disabled={!chartReady} color="primary">
								Activate Custom Style
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Triangle', customOpts)`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddInteractiveDefault} fullWidth disabled={!chartReady} color="secondary">
								Add Triangle (Interactive)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Triangle')`. New tool instance created immediately.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddInteractiveCustom} fullWidth disabled={!chartReady} color="secondary">
								Add Triangle (Custom Opts)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('Triangle', [], customOpts)`. New tool instance created immediately.
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default TriangleToolInteractive;