// File: /src/Components/CircleToolProgrammatic.js

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


const CircleToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the Circle tool
	const {
		handleAddCircleA,
		handleAddCircleB,
		handleAddCircleC,
		handleCreateCircleX,
		handleUpdateCircleX,
		handleRemoveCircleX,
		handleRemoveCirclesRegex,
		handleGenerateAllTests, // New handler for automated tests
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
 
						{/* Group: Programmatic Tool Creation */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddCircleA} fullWidth disabled={!chartReady} color="primary">
								Add Circle A (Diagonal)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `CIRCLE_PROG_A`. Diagonal Radius.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddCircleB} fullWidth disabled={!chartReady} color="primary">
								Add Circle B (Vertical Lock)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `CIRCLE_PROG_B`. Vertical Radius.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddCircleC} fullWidth disabled={!chartReady} color="primary">
								Add Circle C (Horizontal Lock)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `CIRCLE_PROG_C`. Horizontal Radius.
							</Typography>
						</Grid>

						{/* Group: Creation/Update/Removal Tests */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleCreateCircleX} fullWidth disabled={!chartReady} color="secondary">
								Create CIRCLE_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`createOrUpdateLineTool`
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleUpdateCircleX} fullWidth disabled={!chartReady} color="secondary">
								Update CIRCLE_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Updates points/options for `CIRCLE_X`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveCircleX} fullWidth disabled={!chartReady} color="error">
								Remove CIRCLE_X by ID
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsById(['CIRCLE_X'])`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveCirclesRegex} fullWidth disabled={!chartReady} color="error">
								Remove Prog Circles (Regex)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsByIdRegex(/^CIRCLE_PROG_.*$/)`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleGenerateAllTests} fullWidth disabled={!chartReady} color="warning">
								Generate All Tests
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Automated Test Surface Generation.
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default CircleToolProgrammatic;