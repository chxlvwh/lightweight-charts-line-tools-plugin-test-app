// /src/Components/BrushToolProgrammatic.js

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


const BrushToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the Brush tool
	const {
		handleAddBrushA,
		handleAddBrushB,
		handleCreateBrushX,
		handleUpdateBrushX,
		handleRemoveBrushX,
		handleRemoveBrushesRegex,
		handleGenerateAllTests,
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
 
						{/* Group: Programmatic Tool Creation */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddBrushA} fullWidth disabled={!chartReady} color="primary">
								Add Brush A (Simple)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `BRUSH_PROG_A`. Programmatic with small path.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddBrushB} fullWidth disabled={!chartReady} color="primary">
								Add Brush B (Highlighter Style)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `BRUSH_PROG_B`. Thick/Translucent path.
							</Typography>
						</Grid>

						{/* Group: Creation/Update/Removal Tests */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleCreateBrushX} fullWidth disabled={!chartReady} color="secondary">
								Create BRUSH_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`createOrUpdateLineTool`
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleUpdateBrushX} fullWidth disabled={!chartReady} color="secondary">
								Update BRUSH_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Updates points/options for `BRUSH_X`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveBrushX} fullWidth disabled={!chartReady} color="error">
								Remove BRUSH_X by ID
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsById(['BRUSH_X'])`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveBrushesRegex} fullWidth disabled={!chartReady} color="error">
								Remove Prog Brushes (Regex)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsByIdRegex(/^BRUSH_PROG_.*$/)`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleGenerateAllTests} fullWidth disabled={!chartReady} color="warning">
								Generate All Tests
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Automated Test Surface Generation (Canned Path).
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default BrushToolProgrammatic;