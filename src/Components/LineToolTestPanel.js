// File: /src/Components/LineToolTestPanel.js

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
	Box,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolsApi } from '../Hooks/useLineToolsApi';

// Import New Components (The Refactored UI)
import CoreApiTestPanel from './CoreApiTestPanel';
import RectangleToolInteractive from './RectangleToolInteractive';
import RectangleToolProgrammatic from './RectangleToolProgrammatic';
import TrendLineToolInteractive from './TrendLineToolInteractive';
import TrendLineToolProgrammatic from './TrendLineToolProgrammatic';
import CircleToolInteractive from './CircleToolInteractive'; 
import CircleToolProgrammatic from './CircleToolProgrammatic';
import BrushToolInteractive from './BrushToolInteractive';
import BrushToolProgrammatic from './BrushToolProgrammatic';
import HighlighterToolInteractive from './HighlighterToolInteractive';
import HighlighterToolProgrammatic from './HighlighterToolProgrammatic';
import PathToolInteractive from './PathToolInteractive';
import PathToolProgrammatic from './PathToolProgrammatic';
import TriangleToolInteractive from './TriangleToolInteractive';
import TriangleToolProgrammatic from './TriangleToolProgrammatic';
import ExtendedLineToolInteractive from './ExtendedLineToolInteractive';
import ExtendedLineToolProgrammatic from './ExtendedLineToolProgrammatic';
import ArrowToolInteractive from './ArrowToolInteractive';
import ArrowToolProgrammatic from './ArrowToolProgrammatic';
import RayToolInteractive from './RayToolInteractive';
import RayToolProgrammatic from './RayToolProgrammatic';
import HorizontalLineToolInteractive from './HorizontalLineToolInteractive';
import HorizontalLineToolProgrammatic from './HorizontalLineToolProgrammatic';
import HorizontalRayToolInteractive from './HorizontalRayToolInteractive';
import HorizontalRayToolProgrammatic from './HorizontalRayToolProgrammatic';
import VerticalLineToolInteractive from './VerticalLineToolInteractive';
import VerticalLineToolProgrammatic from './VerticalLineToolProgrammatic';
import CrossLineToolInteractive from './CrossLineToolInteractive';
import CrossLineToolProgrammatic from './CrossLineToolProgrammatic';
import TextToolInteractive from './TextToolInteractive';
import TextToolProgrammatic from './TextToolProgrammatic';
import CalloutToolInteractive from './CalloutToolInteractive';
import CalloutToolProgrammatic from './CalloutToolProgrammatic';
import ParallelChannelToolInteractive from './ParallelChannelToolInteractive';
import ParallelChannelToolProgrammatic from './ParallelChannelToolProgrammatic';
import PriceRangeToolInteractive from './PriceRangeToolInteractive';
import PriceRangeToolProgrammatic from './PriceRangeToolProgrammatic';
import LongShortPositionToolInteractive from './LongShortPositionToolInteractive';
import LongShortPositionToolProgrammatic from './LongShortPositionToolProgrammatic';
import FibRetracementToolInteractive from './FibRetracementToolInteractive';
import FibRetracementToolProgrammatic from './FibRetracementToolProgrammatic';
import MarketDepthToolInteractive from './MarketDepthToolInteractive';
import MarketDepthToolProgrammatic from './MarketDepthToolProgrammatic';

import Pane1TestPanel from './Pane1TestPanel';


const LineToolTestPanel = ({ 
	lineToolsPluginRef0, 
	lineToolsPluginRef1, 
	chartInstanceRef, 
	candlestickSeriesRef0, 
	candlestickSeriesRef1,
	chartReady,
	pane1Interval,
	setPane1Interval 
}) => {
	// Initialize two separate API instances for independent control
	const api0 = useLineToolsApi(lineToolsPluginRef0);
	const api1 = useLineToolsApi(lineToolsPluginRef1);

	// --- Accordion Expanded State ---
	// Default expanded state to keep the main tool panels open
	const [expanded, setExpanded] = useState('interactivePanel');

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	// --- Render Function ---
	return (
		<Box sx={{ width: '100%', height: '100%', overflowY: 'auto', padding: 2, bgcolor: 'background.paper' }}>
			<Typography variant="h5" component="h2" gutterBottom>
				Line Tools Plugin Test Panel
			</Typography>

			{/* Section 1: Core API Tests (Event Subscriptions, Removal, Export/Import, Crosshair) */}
			<CoreApiTestPanel
				api0={api0}
				api1={api1}
				lineToolsApi={api0}
				chartInstanceRef={chartInstanceRef}
				candlestickSeriesRef={candlestickSeriesRef0}
				chartReady={chartReady}
			/>
			{/* Section 2: Interactive Drawing (Targeting api0) */}
			<Accordion onChange={handleChange('interactivePanel')} sx={{ mb: 2 }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6">4. Interactive Drawing (Click Chart to Draw)</Typography></AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={2}>
						{/* Nested Accordion for Rectangle Tool (Interactive) */}
						<Grid item size={12}>
							<RectangleToolInteractive lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for TrendLine Tool (Interactive) */}
						<Grid item size={12}>
							<TrendLineToolInteractive lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Circle Tool (Interactive) */}
						<Grid item size={12}>
							<CircleToolInteractive lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Brush Tool (Interactive) */}
						<Grid item size={12}>
							<BrushToolInteractive lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Highlighter Tool (Interactive) */}
						<Grid item size={12}>
							<HighlighterToolInteractive lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Path Tool (Interactive) */}
						<Grid item size={12}>
							<PathToolInteractive lineToolsApi={api0} chartReady={chartReady} />
						</Grid>		
						{/* Nested Accordion for Triangle Tool (Interactive) */}
						<Grid item size={12}>
							<TriangleToolInteractive lineToolsApi={api0} chartReady={chartReady} />
						</Grid>	
						{/* Nested Accordion for ExtendedLine Tool (Interactive) */}
						<Grid item size={12}>
							<ExtendedLineToolInteractive lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Arrow Tool (Interactive) */}
						<Grid item size={12}>
							<ArrowToolInteractive lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Ray Tool (Interactive) */}
						<Grid item size={12}>
							<RayToolInteractive lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for HorizontalLine Tool (Interactive) */}
						<Grid item size={12}>
							<HorizontalLineToolInteractive lineToolsApi={api0} chartReady={chartReady} />
						</Grid>		
						{/* Nested Accordion for HorizontalRay Tool (Interactive) */}
						<Grid item size={12}>
							<HorizontalRayToolInteractive lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for VerticalLine Tool (Interactive) */}
						<Grid item size={12}>
							<VerticalLineToolInteractive lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for CrossLine Tool (Interactive) */}
						<Grid item size={12}>
							<CrossLineToolInteractive lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Text Tool (Interactive) */}
						<Grid item size={12}>
							<TextToolInteractive lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Callout Tool (Interactive) */}
						<Grid item size={12}>
							<CalloutToolInteractive lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for ParallelChannel Tool (Interactive) */}
						<Grid item size={12}>
							<ParallelChannelToolInteractive lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for PriceRange Tool (Interactive) */}
						<Grid item size={12}>
							<PriceRangeToolInteractive lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for LongShortPosition Tool (Interactive) */}
						<Grid item size={12}>
							<LongShortPositionToolInteractive lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for FibRetracement Tool (Interactive) */}
						<Grid item size={12}>
							<FibRetracementToolInteractive lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for MarketDepth Tool (Interactive) */}
						<Grid item size={12}>
							<MarketDepthToolInteractive lineToolsApi={api0} chartReady={chartReady} />
						</Grid>								
					</Grid>
				</AccordionDetails>
			</Accordion>

			{/* Section 3: Programmatic Tool Creation (Nested Accordions for Each Tool) */}
			<Accordion onChange={handleChange('programmaticPanel')} sx={{ mb: 2 }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6">5. Programmatic Tool Creation</Typography></AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={2}>
						{/* Nested Accordion for Rectangle Tool (Programmatic) */}
						<Grid item size={12}>
							<RectangleToolProgrammatic lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for TrendLine Tool (Programmatic) */}
						<Grid item size={12}>
							<TrendLineToolProgrammatic lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Circle Tool (Programmatic) */}
						<Grid item size={12}>
							<CircleToolProgrammatic lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Brush Tool (Programmatic) */}
						<Grid item size={12}>
							<BrushToolProgrammatic lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Highlighter Tool (Programmatic) */}
						<Grid item size={12}>
							<HighlighterToolProgrammatic lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						<Grid item size={12}>
							<PathToolProgrammatic lineToolsApi={api0} chartReady={chartReady} />
						</Grid>		
						{/* Nested Accordion for Triangle Tool (Programmatic) */}
						<Grid item size={12}>
							<TriangleToolProgrammatic lineToolsApi={api0} chartReady={chartReady} />
						</Grid>		
						{/* Nested Accordion for ExtendedLine Tool (Programmatic) */}
						<Grid item size={12}>
							<ExtendedLineToolProgrammatic lineToolsApi={api0} chartReady={chartReady} />
						</Grid>	
						{/* Nested Accordion for Arrow Tool (Programmatic) */}
						<Grid item size={12}>
							<ArrowToolProgrammatic lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Ray Tool (Programmatic) */}
						<Grid item size={12}>
							<RayToolProgrammatic lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for HorizontalLine Tool (Programmatic) */}
						<Grid item size={12}>
							<HorizontalLineToolProgrammatic lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for HorizontalRay Tool (Programmatic) */}
						<Grid item size={12}>
							<HorizontalRayToolProgrammatic lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for VerticalLine Tool (Programmatic) */}
						<Grid item size={12}>
							<VerticalLineToolProgrammatic lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for CrossLine Tool (Programmatic) */}
						<Grid item size={12}>
							<CrossLineToolProgrammatic lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Text Tool (Programmatic) */}
						<Grid item size={12}>
							<TextToolProgrammatic lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Callout Tool (Programmatic) */}
						<Grid item size={12}>
							<CalloutToolProgrammatic lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for ParallelChannel Tool (Programmatic) */}
						<Grid item size={12}>
							<ParallelChannelToolProgrammatic lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for PriceRange Tool (Programmatic) */}
						<Grid item size={12}>
							<PriceRangeToolProgrammatic lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for LongShortPosition Tool (Programmatic) */}
						<Grid item size={12}>
							<LongShortPositionToolProgrammatic lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for FibRetracement Tool (Programmatic) */}
						<Grid item size={12}>
							<FibRetracementToolProgrammatic lineToolsApi={api0} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for MarketDepth Tool (Programmatic) */}
						<Grid item size={12}>
							<MarketDepthToolProgrammatic lineToolsApi={api0} chartReady={chartReady} />
						</Grid>			
					</Grid>
				</AccordionDetails>
			</Accordion>
			{/* Section 4: Pane 1 Experimental Lab [NEW] */}
			<Pane1TestPanel 
				api1={api1}
				candlestickSeriesRef1={candlestickSeriesRef1}
				chartReady={chartReady}
				pane1Interval={pane1Interval}
				setPane1Interval={setPane1Interval}
			/>
		</Box>
	);
};

export default LineToolTestPanel;