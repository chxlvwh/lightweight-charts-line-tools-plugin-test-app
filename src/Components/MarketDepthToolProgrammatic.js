// /src/Components/MarketDepthToolProgrammatic.js

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
import { useLineToolMarketDepth } from '../Hooks/useLineToolMarketDepth';


const MarketDepthToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the MarketDepth tool
	const {
		handleAddMarketDepthA,
		handleAddMarketDepthB,
		handleAddMarketDepthC_OffScreen,
		handleCreateMarketDepthX,
		handleUpdateMarketDepthX,
		handleRemoveMarketDepthX,
		handleRemoveMarketDepthRegex,
		handleGenerateAllTests,
	} = useLineToolMarketDepth(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Market Depth Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #444' }}>
					<Grid container spacing={1}>
 
						{/* Programmatic Creation */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddMarketDepthA} fullWidth disabled={!chartReady} color="primary">
								Add Depth A (Center)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `MD_PROG_A`. Center screen placement.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddMarketDepthB} fullWidth disabled={!chartReady} color="primary">
								Add Depth B (Exotic Style)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `MD_PROG_B`. Exotic colors/width.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddMarketDepthC_OffScreen} fullWidth disabled={!chartReady} color="primary">
								Add Depth C (Off-Screen Test)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `MD_PROG_C`. Test of culling logic (off-screen left).
							</Typography>
						</Grid>
 
						{/* Creation/Update/Removal Tests */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleCreateMarketDepthX} fullWidth disabled={!chartReady} color="secondary">
								Create MD_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`createOrUpdateLineTool` (Initial).
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleUpdateMarketDepthX} fullWidth disabled={!chartReady} color="secondary">
								Update MD_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Updates style/calc method for `MD_X`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveMarketDepthX} fullWidth disabled={!chartReady} color="error">
								Remove MD_X by ID
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsById(['MD_X'])`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveMarketDepthRegex} fullWidth disabled={!chartReady} color="error">
								Remove Prog Market Depths (Regex)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsByIdRegex(/^MD_PROG_.*$/)`.
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

export default MarketDepthToolProgrammatic;