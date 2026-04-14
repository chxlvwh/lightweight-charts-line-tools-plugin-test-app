// File: /src/Components/CoreApiTestPanel.js

import React, { useState } from 'react';
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
	Slider,
	ButtonGroup,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useCoreApiTest } from '../Hooks/useCoreApiTest';

/**
 * UI Panel for testing the Line Tools Core Plugin API.
 * 
 * Provides controls for event subscriptions, data persistence, global settings (lock/magnet),
 * and proofs for the O(1) data lookup engine.
 * 
 * @param {Object} props
 * @param {Object} props.api0 - API wrapper for Pane 0.
 * @param {Object} props.api1 - API wrapper for Pane 1.
 * @param {React.MutableRefObject} props.chartInstanceRef - Ref to the chart instance.
 * @param {React.MutableRefObject} props.candlestickSeriesRef0 - Ref to the primary series.
 * @param {boolean} props.chartReady - Flag indicating if chart is ready.
 */
const CoreApiTestPanel = ({ api0, api1, chartInstanceRef, candlestickSeriesRef0, chartReady }) => {
	const {
		// Event State
		subscribedAfterEdit, subscribedDoubleClick, subscribedSingleClick,
		magnetThreshold, isLocked0, isLocked1, exportedJson,

		// Handlers
		toggleSubscribeAfterEdit, toggleSubscribeDoubleClick, toggleSubscribeSingleClick,
		handleExportAll, handleImportAll, handleGetSelected, 
		handleCreateTaggedTools, handleGetById, handleGetByRegex,
		handleMagnetChange, toggleLock0, toggleLock1, handleSetFormatter,
		logEarliestLatest, logFullRange, logBarAtCenter, logClosestBarModes, logDataRange,
		handleSetCrosshairPixel, handleClearCrosshair, handleRemoveSelected, handleRemoveAll,
		handleDestroyPane0,
		logExactBarLookups,
		logPolymorphicSearch,
		handleCrosshairToFirst,
		handleCrosshairToLast,
		handleCrosshairToMiddle,
		handlePartialUpdateDebug1,
		logLockStatus0,
		logLockStatus1,
		handleRemoveSelected0,
		handleRemoveAll0,
		handleRemoveSelected1,
		handleRemoveAll1,
	} = useCoreApiTest(api0, api1, chartInstanceRef, candlestickSeriesRef0, chartReady);
	
	const [expanded, setExpanded] = useState('events');

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<Box sx={{ width: '100%', mb: 2 }}>
			
			{/* Panel 1: Event Subscriptions */}
			<Accordion expanded={expanded === 'events'} onChange={handleChange('events')} sx={{ mb: 1 }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6">1. Event Subscriptions</Typography></AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={1}>
						<Grid item size={4}>
							<FormControlLabel
								control={<Switch checked={subscribedAfterEdit} onChange={toggleSubscribeAfterEdit} />}
								label={subscribedAfterEdit ? "AfterEdit: ON" : "AfterEdit: OFF"}
							/>
						</Grid>
						<Grid item size={4}>
							<FormControlLabel
								control={<Switch checked={subscribedDoubleClick} onChange={toggleSubscribeDoubleClick} />}
								label={subscribedDoubleClick ? "DoubleClick: ON" : "DoubleClick: OFF"}
							/>
						</Grid>
						<Grid item size={4}>
							<FormControlLabel
								control={<Switch checked={subscribedSingleClick} onChange={toggleSubscribeSingleClick} />}
								label={subscribedSingleClick ? "Selection: ON" : "Selection: OFF"}
							/>
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>
			
			{/* Panel 2: Tool Retrieval & Persistence - REFACTORED FOR CLARITY */}
			<Accordion expanded={expanded === 'persistence'} onChange={handleChange('persistence')} sx={{ mb: 1 }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant="h6">2. Retrieval, Updates & Persistence</Typography>
				</AccordionSummary>
				<AccordionDetails sx={{ p: 0 }}> {/* Remove padding for cleaner internal grouping */}
					
					{/* Group A: Targeted Actions & Retrieval */}
					<Box sx={{ p: 2, borderBottom: '1px solid #444' }}>
						<Typography variant="subtitle2" gutterBottom color="primary" sx={{ textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 'bold' }}>
							Search & Targeted Updates
						</Typography>
						<Grid container spacing={1}>
							<Grid item size={4}><Button variant="outlined" onClick={handleCreateTaggedTools} fullWidth color="success" size="small">Create Tagged</Button></Grid>
							<Grid item size={4}><Button variant="outlined" onClick={handleGetById} fullWidth color="success" size="small">Get DEBUG_1</Button></Grid>
							<Grid item size={4}><Button variant="outlined" onClick={handlePartialUpdateDebug1} fullWidth color="warning" size="small">Update DEBUG_1</Button></Grid>
							<Grid item size={6}><Button variant="outlined" onClick={handleGetByRegex} fullWidth color="success" size="small">Get by Regex (DEBUG_)</Button></Grid>
							<Grid item size={6}><Button variant="contained" onClick={handleGetSelected} fullWidth size="small">Get Selected (JSON)</Button></Grid>
						</Grid>
					</Box>

					{/* Group B: Removal Controls (Stacked for Isolation Testing) */}
					<Box sx={{ p: 2, bgcolor: 'rgba(244, 67, 54, 0.05)', borderBottom: '1px solid #444' }}>
						<Typography variant="subtitle2" gutterBottom color="error" sx={{ textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 'bold' }}>
							Bulk Removal (Pane Isolated)
						</Typography>
						
						{/* Pane 0 Row */}
						<Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 2 }}>
							<Typography sx={{ minWidth: '60px', fontSize: '0.8rem' }}>Pane 0:</Typography>
							<Button variant="outlined" onClick={handleRemoveSelected0} fullWidth color="error" size="small">Remove Selected Pane 0</Button>
							<Button variant="contained" onClick={handleRemoveAll0} fullWidth color="error" size="small">Remove All Pane 0</Button>
						</Box>

						{/* Pane 1 Row */}
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
							<Typography sx={{ minWidth: '60px', fontSize: '0.8rem' }}>Pane 1:</Typography>
							<Button variant="outlined" onClick={handleRemoveSelected1} fullWidth color="error" size="small">Remove Selected Pane 1</Button>
							<Button variant="contained" onClick={handleRemoveAll1} fullWidth color="error" size="small">Remove All Pane 1</Button>
						</Box>
					</Box>

					{/* Group C: Data Persistence */}
					<Box sx={{ p: 2 }}>
						<Typography variant="subtitle2" gutterBottom color="secondary" sx={{ textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 'bold' }}>
							State Persistence
						</Typography>
						<Grid container spacing={1}>
							<Grid item size={6}><Button variant="contained" onClick={handleExportAll} fullWidth color="info" size="small">Export All (JSON)</Button></Grid>
							<Grid item size={6}><Button variant="contained" onClick={handleImportAll} fullWidth color="info" size="small" disabled={!exportedJson}>Import All (JSON)</Button></Grid>
						</Grid>
					</Box>
				</AccordionDetails>
			</Accordion>

			{/* Panel 3: Global Settings*/}
			<Accordion expanded={expanded === 'settings'} onChange={handleChange('settings')} sx={{ mb: 1 }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6">3. Global Settings (Snapping, Locking, Crosshair)</Typography></AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={3}>
						<Grid item size={12}>
							<Typography gutterBottom>Magnet Threshold: {magnetThreshold}px</Typography>
							<Slider value={magnetThreshold} onChange={handleMagnetChange} min={0} max={100} valueLabelDisplay="auto" />
						</Grid>
						<Grid item size={6}>
							<Grid item size={3}>
								<Box sx={{ display: 'flex', alignItems: 'left', justifyContent: 'space-between', pr: 1 }}>
									<FormControlLabel control={<Switch checked={isLocked0} onChange={toggleLock0} />} label="Lock Pane 0" />
									<Button variant="contained" size="small" onClick={logLockStatus0} sx={{ minWidth: 0 }}>Check Pane 0 Lock</Button>
								</Box>
							</Grid>
						</Grid>
						<Grid item size={6}>
							<Grid item size={3}>
								<Box sx={{ display: 'flex', alignItems: 'right', justifyContent: 'space-between', pr: 1 }}>
									<FormControlLabel control={<Switch checked={isLocked1} onChange={toggleLock1} />} label="Lock Pane 1" />
									<Button variant="contained" size="small" onClick={logLockStatus1} sx={{ minWidth: 0 }}>Check Pane 1 Lock</Button>
								</Box>
							</Grid>
						</Grid>
						<Grid item size={12}>
							<Typography gutterBottom variant="subtitle2">Time Formatter (Crosshair & Axis)</Typography>
							<Box sx={{ display: 'flex', gap: 1 }}>
								<Button variant="contained" onClick={() => handleSetFormatter('default')} fullWidth>Default</Button>
								<Button variant="contained" onClick={() => handleSetFormatter('short')} fullWidth>Short (MM/DD)</Button>
								<Button variant="contained" onClick={() => handleSetFormatter('full')} fullWidth>Full (ISO)</Button>
							</Box>
						</Grid>
						<Grid item size={12}>
							<Typography gutterBottom variant="subtitle2">Programmatic Crosshair Control</Typography>
							<ButtonGroup variant="outlined" fullWidth size="small">
								<Button onClick={handleCrosshairToFirst}>First Candle</Button>
								<Button onClick={handleCrosshairToLast}>Last Candle</Button>
								<Button onClick={handleCrosshairToMiddle}>Middle of Screen</Button>
								<Button onClick={handleClearCrosshair} color="error">Clear</Button>
							</ButtonGroup>
							<Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
								* Note: Native Lightweight Charts behavior forces the vertical (time) crosshair to snap to the nearest existing data bar. It cannot float between bars or enter blank space. The horizontal (price) line will move to the exact requested pixel.
							</Typography>
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>

			{/* Panel 4: Data Inspector (NEW v1.1 Proofs) */}
			<Accordion expanded={expanded === 'inspector'} onChange={handleChange('inspector')} sx={{ mb: 1 }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6">4. Series Data Inspector</Typography></AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={1}>
						<Grid item size={4}><Button variant="outlined" onClick={logEarliestLatest} fullWidth>Log Boundaries</Button></Grid>
						<Grid item size={4}><Button variant="outlined" onClick={logFullRange} fullWidth>Log Full Range</Button></Grid>
						<Grid item size={4}><Button variant="outlined" onClick={logBarAtCenter} fullWidth>Log Bar at Center-X</Button></Grid>
						<Grid item size={4}><Button variant="outlined" onClick={logExactBarLookups} fullWidth color="info">Test Exact Lookups</Button></Grid>
						<Grid item size={4}><Button variant="outlined" onClick={logPolymorphicSearch} fullWidth color="info">Test String Inputs</Button></Grid>
						
						<Grid item size={4}><Button variant="outlined" onClick={logClosestBarModes} fullWidth color="info">Test Weekend Modes</Button></Grid>
						<Grid item size={12}><Button variant="outlined" onClick={logDataRange} fullWidth color="info">Log 11-Day Window (Inclusive)</Button></Grid>						
					</Grid>
				</AccordionDetails>
			</Accordion>
			<Accordion expanded={expanded === 'destruction'} onChange={handleChange('destruction')} sx={{ mb: 1 }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant="h6" color="error">5. Destroy Pane 0</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Box sx={{ p: 1, border: '1px solid #D32F2F', borderRadius: 1, bgcolor: 'rgba(211, 47, 47, 0.05)' }}>
						<Typography variant="body2" color="error" gutterBottom>
							Warning: Clicking the button below will permanently disable the line tools core for <strong>Pane 0 only</strong>. 
							You will need to refresh the browser to restore functionality.
						</Typography>
						<Button variant="contained" color="error" onClick={handleDestroyPane0} sx={{ mt: 1 }} fullWidth>
							Destroy Pane 0 Plugin
						</Button>
					</Box>
				</AccordionDetails>
			</Accordion>

		</Box>
	);
};

export default CoreApiTestPanel;