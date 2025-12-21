// /src/Components/FibRetracementToolProgrammatic.js

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
import { useLineToolFibRetracement } from '../Hooks/useLineToolFibRetracement';


const FibRetracementToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the FibRetracement tool
	const {
		handleAddFibA,
		handleAddFibB,
		handleAddFibC_OffScreen,
		handleCreateFibX,
		handleUpdateFibX,
		handleRemoveFibX,
		handleRemoveFibRegex,
		handleGenerateAllTests,
	} = useLineToolFibRetracement(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Fib Retracement Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #444' }}>
					<Grid container spacing={1}>
 
						{/* Programmatic Creation */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddFibA} fullWidth disabled={!chartReady} color="primary">
								Add Fib A (Downward)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `FIB_PROG_A`. Simple downward fib.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddFibB} fullWidth disabled={!chartReady} color="primary">
								Add Fib B (Upward)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `FIB_PROG_B`. Upward fib with exotic style.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddFibC_OffScreen} fullWidth disabled={!chartReady} color="primary">
								Add Fib C (Off-Screen Test)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `FIB_PROG_C`. Test of culling logic (off-screen top).
							</Typography>
						</Grid>
 
						{/* Creation/Update/Removal Tests */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleCreateFibX} fullWidth disabled={!chartReady} color="secondary">
								Create FIB_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`createOrUpdateLineTool` (Initial).
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleUpdateFibX} fullWidth disabled={!chartReady} color="secondary">
								Update FIB_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Updates points/options for `FIB_X`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveFibX} fullWidth disabled={!chartReady} color="error">
								Remove FIB_X by ID
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsById(['FIB_X'])`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveFibRegex} fullWidth disabled={!chartReady} color="error">
								Remove Prog Fibs (Regex)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsByIdRegex(/^FIB_PROG_.*$/)`.
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

export default FibRetracementToolProgrammatic;