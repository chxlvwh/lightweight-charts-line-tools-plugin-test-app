// /src/Components/MarketDepthToolInteractive.js

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


const MarketDepthToolInteractive = ({ lineToolsApi, chartReady }) => {
	// Use the dedicated hook to get all the necessary handlers for the MarketDepth tool
	const {
		handleSetActiveDefault,
		handleSetActiveExotic,
		handleAddInteractiveDefault,
	} = useLineToolMarketDepth(lineToolsApi);
	
	// --- Render Function ---

	return (
		<Accordion sx={{ bgcolor: 'background.paper', border: '1px solid #555', boxShadow: 3 }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="subtitle1" fontWeight="bold">Market Depth Tool</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ p: 1, borderTop: '1px solid #555' }}>
					<Grid item xs={12}>
						<Typography variant="caption" color="text.secondary" display="block">
							Market Depth tool is not intended to be created by hand, but can be for fun, its intended to use time of the current candle as the points x and close price of the candle as the points y,
							and the marketDepthData Ask is above the close price,
							and Bid is below the close price.
							The tool is updated every tick to reposition the point, and then the incoming market depth data for the marketDepthData
						</Typography>
					</Grid>
					<Grid container spacing={1}>
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleSetActiveDefault} fullWidth disabled={!chartReady} color="primary">
								Activate Default
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('MarketDepth')`. Click once on chart.
							</Typography>
						</Grid>
 
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleSetActiveExotic} fullWidth disabled={!chartReady} color="primary">
								Activate Exotic
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('MarketDepth', exoticOptions)`.
							</Typography>
						</Grid>
 
						<Grid item xs={3}>
							<Button variant="contained" onClick={handleAddInteractiveDefault} fullWidth disabled={!chartReady} color="secondary">
								Add Depth (Interactive)
							</Button>
							<Typography variant="caption" color="text.secondary" display="block">
								`addLineTool('MarketDepth')`. New tool created immediately.
							</Typography>
						</Grid>
 
					</Grid>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default MarketDepthToolInteractive;