// /src/Components/LongShortPositionToolProgrammatic.js

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
import { useLineToolLongShortPosition } from '../Hooks/useLineToolLongShortPosition';


const LongShortPositionToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the LongShortPosition tool
	const {
		handleAddPositionA_Long,
		handleAddPositionB_Short,
		handleAddPositionC_OffScreen,
		handleCreatePositionX,
		handleUpdatePositionX,
		handleRemovePositionX,
		handleRemovePositionRegex,
		handleGenerateAllTests,
	} = useLineToolLongShortPosition(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Long/Short Position Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #444' }}>
					<Grid container spacing={1}>
 
						{/* Programmatic Creation */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddPositionA_Long} fullWidth disabled={!chartReady} color="primary">
								Add Position A (Long)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `LSP_PROG_A`. Long position.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddPositionB_Short} fullWidth disabled={!chartReady} color="primary">
								Add Position B (Short)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `LSP_PROG_B`. Short position.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddPositionC_OffScreen} fullWidth disabled={!chartReady} color="primary">
								Add Position C (Off-Screen Test)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `LSP_PROG_C`. Test of culling logic (off-screen top).
							</Typography>
						</Grid>
 
						{/* Creation/Update/Removal Tests */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleCreatePositionX} fullWidth disabled={!chartReady} color="secondary">
								Create LSP_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`createOrUpdateLineTool` (Initial).
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleUpdatePositionX} fullWidth disabled={!chartReady} color="secondary">
								Update LSP_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Updates points/options for `LSP_X`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemovePositionX} fullWidth disabled={!chartReady} color="error">
								Remove LSP_X by ID
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsById(['LSP_X'])`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemovePositionRegex} fullWidth disabled={!chartReady} color="error">
								Remove Prog Positions (Regex)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsByIdRegex(/^LSP_PROG_.*$/)`.
							</Typography>
						</Grid>
						{/* Add New Automated Test Button */}
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

export default LongShortPositionToolProgrammatic;