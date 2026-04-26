// /src/Components/ParallelChannelToolProgrammatic.js

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
import { useLineToolParallelChannel } from '../Hooks/useLineToolParallelChannel';


const ParallelChannelToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the ParallelChannel tool
	const {
		handleAddChannelA,
		handleAddChannelB,
		handleAddChannelC_OffScreen,
		handleCreateChannelX,
		handleUpdateChannelX,
		handleRemoveChannelX,
		handleRemoveChannelRegex,
		handleGenerateAllTests,
	} = useLineToolParallelChannel(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Parallel Channel Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #444' }}>
					<Grid container spacing={1}>
 
						{/* Programmatic Creation */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddChannelA} fullWidth disabled={!chartReady} color="primary">
								Add Channel A (Upward)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `PCH_PROG_A`. Simple upward channel.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddChannelB} fullWidth disabled={!chartReady} color="primary">
								Add Channel B (Downward)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `PCH_PROG_B`. Downward, custom style.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddChannelC_OffScreen} fullWidth disabled={!chartReady} color="primary">
								Add Channel C (Off-Screen Test)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `PCH_PROG_C`. Test of culling logic (off-screen top).
							</Typography>
						</Grid>
 
						{/* Creation/Update/Removal Tests */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleCreateChannelX} fullWidth disabled={!chartReady} color="secondary">
								Create PCH_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`createOrUpdateLineTool` (Initial).
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleUpdateChannelX} fullWidth disabled={!chartReady} color="secondary">
								Update PCH_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Updates points/options for `PCH_X`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveChannelX} fullWidth disabled={!chartReady} color="error">
								Remove PCH_X by ID
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsById(['PCH_X'])`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveChannelRegex} fullWidth disabled={!chartReady} color="error">
								Remove Prog Channels (Regex)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsByIdRegex(/^PCH_PROG_.*$/)`.
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

export default ParallelChannelToolProgrammatic;