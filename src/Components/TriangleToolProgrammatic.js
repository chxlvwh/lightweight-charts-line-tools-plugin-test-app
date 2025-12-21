// File: /src/Components/TriangleToolProgrammatic.js

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


const TriangleToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the Triangle tool
	const {
		handleAddTriangleA,
		handleAddTriangleB,
		handleCreateTriangleX,
		handleUpdateTriangleX,
		handleRemoveTriangleX,
		handleRemoveTrianglesRegex,
		handleGenerateAllTests,
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
 
						{/* Group: Programmatic Tool Creation */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddTriangleA} fullWidth disabled={!chartReady} color="primary">
								Add Triangle A (Upright)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `TRIANGLE_PROG_A`. Programmatic 3-point tool.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddTriangleB} fullWidth disabled={!chartReady} color="primary">
								Add Triangle B (Right Angle)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `TRIANGLE_PROG_B`. Programmatic 3-point tool.
							</Typography>
						</Grid>

						{/* Group: Creation/Update/Removal Tests */}
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleCreateTriangleX} fullWidth disabled={!chartReady} color="secondary">
								Create TRIANGLE_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`createOrUpdateLineTool`
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleUpdateTriangleX} fullWidth disabled={!chartReady} color="secondary">
								Update TRIANGLE_X
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Updates points/options for `TRIANGLE_X`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveTriangleX} fullWidth disabled={!chartReady} color="error">
								Remove TRIANGLE_X by ID
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsById(['TRIANGLE_X'])`.
							</Typography>
						</Grid>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleRemoveTrianglesRegex} fullWidth disabled={!chartReady} color="error">
								Remove Prog Triangles (Regex)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeLineToolsByIdRegex(/^TRIANGLE_PROG_.*$/)`.
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

export default TriangleToolProgrammatic;