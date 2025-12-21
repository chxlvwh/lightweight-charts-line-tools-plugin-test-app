// /src/Components/PriceRangeToolProgrammatic.js

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
import { useLineToolPriceRange } from '../Hooks/useLineToolPriceRange';


const PriceRangeToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the PriceRange tool
	const {
		handleAddPriceRangeA,
		handleAddPriceRangeB,
		handleAddPriceRangeC_OffScreen,
		handleCreatePriceRangeX,
		handleUpdatePriceRangeX,
		handleRemovePriceRangeX,
		handleRemovePriceRangeRegex,
		handleGenerateAllTests,
	} = useLineToolPriceRange(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Price Range Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #444' }}>
					<Grid container spacing={1}>
 
						{/* Programmatic Creation */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddPriceRangeA} fullWidth disabled={!chartReady} color="primary">
								Add Range A (Upward)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `PR_PROG_A`. Upward price move.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddPriceRangeB} fullWidth disabled={!chartReady} color="primary">
								Add Range B (Downward)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `PR_PROG_B`. Downward price move.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddPriceRangeC_OffScreen} fullWidth disabled={!chartReady} color="primary">
								Add Range C (Off-Screen Test)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `PR_PROG_C`. Test of culling logic (off-screen top).
							</Typography>
						</Grid>
 
						{/* Creation/Update/Removal Tests */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleCreatePriceRangeX} fullWidth disabled={!chartReady} color="secondary">
								Create PR_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`createOrUpdateLineTool` (Initial).
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleUpdatePriceRangeX} fullWidth disabled={!chartReady} color="secondary">
								Update PR_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Updates points/options for `PR_X`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemovePriceRangeX} fullWidth disabled={!chartReady} color="error">
								Remove PR_X by ID
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsById(['PR_X'])`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemovePriceRangeRegex} fullWidth disabled={!chartReady} color="error">
								Remove Prog Price Ranges (Regex)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsByIdRegex(/^PR_PROG_.*$/)`.
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

export default PriceRangeToolProgrammatic;