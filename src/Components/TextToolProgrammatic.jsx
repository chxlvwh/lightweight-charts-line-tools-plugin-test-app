// /src/Components/TextToolProgrammatic.js

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
import { useLineToolText } from '../Hooks/useLineToolText';


const TextToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the Text Tool
	const {
		handleAddTextA,
		handleAddTextB,
		handleAddTextC_OffScreen,
		handleCreateTextX,
		handleUpdateTextX,
		handleRemoveTextX,
		handleRemoveTextRegex,
		handleGenerateAllTests,
	} = useLineToolText(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Text Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #444' }}>
					<Grid container spacing={1}>
 
						{/* Programmatic Creation */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddTextA} fullWidth disabled={!chartReady} color="primary">
								Add Text A (Top)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `TX_PROG_A`. Top price level.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddTextB} fullWidth disabled={!chartReady} color="primary">
								Add Text B (Middle)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `TX_PROG_B`. Middle price level.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddTextC_OffScreen} fullWidth disabled={!chartReady} color="primary">
								Add Text C (Off-Screen Test)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `TX_PROG_C`. Test of culling logic (off-screen top).
							</Typography>
						</Grid>
 
						{/* Creation/Update/Removal Tests */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleCreateTextX} fullWidth disabled={!chartReady} color="secondary">
								Create TX_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`createOrUpdateLineTool` (Initial).
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleUpdateTextX} fullWidth disabled={!chartReady} color="secondary">
								Update TX_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Updates position/options for `TX_X`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveTextX} fullWidth disabled={!chartReady} color="error">
								Remove TX_X by ID
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsById(['TX_X'])`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveTextRegex} fullWidth disabled={!chartReady} color="error">
								Remove Prog Text Tools (Regex)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsByIdRegex(/^TX_PROG_.*$/)`.
							</Typography>
						</Grid>
						{/* Add New Automated Test Button */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleGenerateAllTests} fullWidth disabled={!chartReady} color="warning">
								Generate All Tests
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Automated Test Surface.
							</Typography>
						</Grid>
 
					</Grid>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default TextToolProgrammatic;