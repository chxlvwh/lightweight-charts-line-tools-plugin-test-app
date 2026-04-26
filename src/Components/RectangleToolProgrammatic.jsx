// File: /src/Components/RectangleToolProgrammatic.js

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
import { useLineToolRectangle } from '../Hooks/useLineToolRectangle';


const RectangleToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the Rectangle tool
	const {
		handleAddRectA,
		handleAddRectB,
		handleAddRectC,
		handleAddRectD_Outside,
		handleAddRectE_FarOutside,
		handleCreateRectX,
		handleUpdateRectX,
		handleCreateRectY,
		handleRemoveRectX,
		handleRemoveRectsRegex,
		handleApplyOptionsRectX,
		handleGenerateAllTests,
	} = useLineToolRectangle(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Rectangle Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #555' }}>
					<Grid container spacing={1}>
						
						{/* Group: Programmatic Tool Creation */}
						<Grid item size={3}>
							<Button variant="contained" onClick={handleAddRectA} fullWidth disabled={!chartReady} color="primary">
								Add Rect A (Programmatic)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `RECT_PROG_A`. Programmatic with default options.
							</Typography>
						</Grid>
						<Grid item size={3}>
							<Button variant="contained" onClick={handleAddRectB} fullWidth disabled={!chartReady} color="primary">
								Add Rect B (Programmatic Text)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `RECT_PROG_B`. Programmatic with custom options.
							</Typography>
						</Grid>
						<Grid item size={3}>
							<Button variant="contained" onClick={handleAddRectC} fullWidth disabled={!chartReady} color="primary">
								Add Rect C (WordWrap)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `RECT_PROG_C`. Programmatic with word wrap.
							</Typography>
						</Grid>
						<Grid item size={3}>
							<Button variant="contained" onClick={handleAddRectD_Outside} fullWidth disabled={!chartReady} color="primary">
								Add Rect D (Partial Outside)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `RECT_PROG_D`. Test of partial culling.
							</Typography>
						</Grid>
						<Grid item size={3}>
							<Button variant="contained" onClick={handleAddRectE_FarOutside} fullWidth disabled={!chartReady} color="primary">
								Add Rect E (Far Outside Range)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								ID: `RECT_PROG_E`. Test of full culling.
							</Typography>
						</Grid>
					</Grid>
					
					<Box sx={{ mt: 2, borderTop: '1px solid #444', pt: 2 }}>
						<Typography variant="subtitle2" component="h3" gutterBottom>
							Creation/Update/Modification Tests
						</Typography>
						<Grid container spacing={1}>
							<Grid item size={3}>
								<Button variant="contained" onClick={handleCreateRectX} fullWidth disabled={!chartReady} color="secondary">
									Create RECT_X
								</Button>
								<Typography variant="caption" color="text.secondary" display="block">
									`createOrUpdateLineTool`
								</Typography>
							</Grid>
							<Grid item size={3}>
								<Button variant="contained" onClick={handleUpdateRectX} fullWidth disabled={!chartReady} color="secondary">
									Update RECT_X
								</Button>
								<Typography variant="caption" color="text.secondary" display="block">
									Updates points/options for `RECT_X`.
								</Typography>
							</Grid>
							<Grid item size={3}>
								<Button variant="contained" onClick={handleApplyOptionsRectX} fullWidth disabled={!chartReady} color="secondary">
									Apply Options to RECT_X
								</Button>
								<Typography variant="caption" color="text.secondary" display="block">
									Makes `RECT_X` non-editable/deselects.
								</Typography>
							</Grid>
							<Grid item size={3}>
								<Button variant="contained" onClick={handleCreateRectY} fullWidth disabled={!chartReady} color="secondary">
									Create RECT_Y
								</Button>
								<Typography variant="caption" color="text.secondary" display="block">
									Tests another unique ID (`RECT_Y`).
								</Typography>
							</Grid>
							<Grid item size={3}>
								<Button variant="contained" onClick={handleRemoveRectX} fullWidth disabled={!chartReady} color="error">
									Remove RECT_X by ID
								</Button>
								<Typography variant="caption" color="text.secondary" display="block">
									`removeLineToolsById(['RECT_X'])`.
								</Typography>
							</Grid>
							<Grid item size={3}>
								<Button variant="contained" onClick={handleRemoveRectsRegex} fullWidth disabled={!chartReady} color="error">
									Remove Prog Rects (Regex)
								</Button>
								<Typography variant="caption" color="text.secondary" display="block">
									`removeLineToolsByIdRegex(/^RECT_PROG_.*$/)`.
								</Typography>
							</Grid>
							<Grid item size={3}>
								<Button variant="contained" onClick={handleGenerateAllTests} fullWidth disabled={!chartReady} color="warning">
									Generate All Tests
								</Button>
								<Typography variant="caption" color="text.secondary" display="block">
									Automated Test Surface (all options).
								</Typography>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default RectangleToolProgrammatic;