// File: /src/Components/CoreApiTestPanel.js

import React, { useState, useCallback } from 'react';
import {
	Button,
	Grid,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	FormControlLabel,
	Switch,
	Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Import the hook that contains the logic for all core API tests
import { useCoreApiTest } from '../Hooks/useCoreApiTest';


const CoreApiTestPanel = ({ lineToolsApi, chartInstanceRef, candlestickSeriesRef, chartReady }) => {
	// Use the hook to get all the handlers and state
	const {
		subscribedAfterEdit,
		subscribedDoubleClick,
		exportedJson,

		toggleSubscribeAfterEdit,
		toggleSubscribeDoubleClick,
		handleExportAll,
		handleImportAll,
		handleGetSelected,
		handleRemoveSelected,
		handleRemoveAll,
		handleSetCrosshairPixel,
		handleSetCrosshairCenter,
		handleSetCrosshairLogical,
		handleClearCrosshair,

		// Get core handlers that the sub-panels will need
		handleRemoveToolsById,
		handleRemoveToolsRegex,
		handleApplyOptions,
	} = useCoreApiTest(lineToolsApi, chartInstanceRef, candlestickSeriesRef, chartReady);
	
	// Internal expanded state for the Core Test Panel itself
	const [expanded, setExpanded] = useState('events');

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	
	// --- Render Function ---

	return (
		<Box sx={{ width: '100%', mb: 2 }}>
			
			{/* Panel: Event Subscriptions */}
			<Accordion expanded={expanded === 'events'} onChange={handleChange('events')} sx={{ mb: 1 }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6">1. Event Subscriptions</Typography></AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={1} >
						<Grid item size={6}>
							<FormControlLabel
								control={<Switch checked={subscribedAfterEdit} onChange={toggleSubscribeAfterEdit} name="afterEdit" />}
								labelPlacement="end"
								label={subscribedAfterEdit ? "AfterEdit: ON" : "AfterEdit: OFF"}
							/>
							<Typography variant="caption" color="text.secondary" display="block">
								Toggles subscription to `LineToolsAfterEdit` event.
							</Typography>
						</Grid>
						<Grid item size={6}>
							<FormControlLabel
								control={<Switch checked={subscribedDoubleClick} onChange={toggleSubscribeDoubleClick} name="doubleClick" />}
								labelPlacement="end"
								label={subscribedDoubleClick ? "DoubleClick: ON" : "DoubleClick: OFF"}
							/>
							<Typography variant="caption" color="text.secondary" display="block">
								Toggles subscription to `LineToolsDoubleClick` event.
							</Typography>
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>
			
			{/* Panel: Tool Retrieval & Persistence */}
			<Accordion expanded={expanded === 'persistence'} onChange={handleChange('persistence')} sx={{ mb: 1 }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6">2. Tool Retrieval & Persistence</Typography></AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={1}>
						<Grid item size={4}>
							<Button variant="contained" onClick={handleGetSelected} fullWidth disabled={!chartReady}>
								Get Selected Tools (JSON)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`getSelectedLineTools()`.
							</Typography>
						</Grid>
						<Grid item size={4}>
							<Button variant="contained" onClick={handleExportAll} fullWidth disabled={!chartReady}>
								Export All Tools
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`exportLineTools()`. Stores JSON internally.
							</Typography>
						</Grid>
						<Grid item size={4}>
							<Button variant="contained" onClick={handleImportAll} fullWidth disabled={!chartReady || !exportedJson}>
								Import All Tools
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`importLineTools(json)`. Requires a prior export.
							</Typography>
						</Grid>
						<Grid item size={4}>
							<Button variant="contained" onClick={handleRemoveSelected} fullWidth disabled={!chartReady}>
								Remove Selected Tool(s)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeSelectedLineTools()`.
							</Typography>
						</Grid>
						<Grid item size={4}>
							<Button variant="contained" onClick={handleRemoveAll} fullWidth disabled={!chartReady}>
								Remove All Tools
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`removeAllLineTools()`.
							</Typography>
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>

			{/* Panel: Crosshair Control */}
			<Accordion expanded={expanded === 'crosshair'} onChange={handleChange('crosshair')} sx={{ mb: 1 }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6">3. Crosshair Control</Typography></AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={1}>
						<Grid item size={3}>
							<Button variant="contained" onClick={handleSetCrosshairPixel} fullWidth disabled={!chartReady}>
								Set Crosshair (Pixel 300, 200)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`setCrossHairXY(300, 200, true)`.
							</Typography>
						</Grid>
						<Grid item size={3}>
							<Button variant="contained" onClick={handleSetCrosshairCenter} fullWidth disabled={!chartReady}>
								Set Crosshair (Chart Center)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`setCrossHairXY(centerX, centerY, true)`.
							</Typography>
						</Grid>
						<Grid item size={3}>
							<Button variant="contained" onClick={handleSetCrosshairLogical} fullWidth disabled={!chartReady}>
								Set Crosshair (Logical Offset)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								Uses coords derived from logical index + offset.
							</Typography>
						</Grid>
						<Grid item size={3}>
							<Button variant="contained" onClick={handleClearCrosshair} fullWidth disabled={!chartReady}>
								Clear Crosshair
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`clearCrossHair()`.
							</Typography>
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>

		</Box>
	);
};

export default CoreApiTestPanel;