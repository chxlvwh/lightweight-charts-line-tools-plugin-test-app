# Lightweight Charts Line Tools Plugin React Test App

**Vibe Coded** with precision for the modern web.

This is the official testing and validation suite for the [Line Tools Core](https://github.com/difurious/lightweight-charts-line-tools-core) and its 12 companion plugins. It is a react ap to provide a comprehensive, interactive environment to ensure that all 21 drawing tools function perfectly within [Lightweight Charts v5+](https://github.com/tradingview/lightweight-charts).

## 🎥 Video Demo
https://github.com/user-attachments/assets/900a6759-d0cd-42e5-a09c-7ed0d94bd42e

## 🚀 Getting Started

Thanks to the automated build scripts in the suite, getting the test environment up and running requires only a few steps.

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/difurious/lightweight-charts-line-tools-plugin-test-app.git
    cd lightweight-charts-line-tools-plugin-test-app
    ```

2.  **Install & Auto-Build**:
    This command will download the Core orchestrator and all 12 tool plugins from GitHub. It will then automatically trigger the build process for every individual dependency.
    ```bash
    npm install
    ```

3.  **Launch the App**:
    ```bash
    npm start
    ```
    *Note: The app defaults to port **3001**.*

## 🛠 Features & Testing Workflow

### 📋 Comprehensive Validation Spreadsheet
Located in the root directory (`line_tools_plugin_testing.ods`), this document serves as the master QA record for the project.

*   **Methodology:** Using the **"Generate All Tests"** feature (see Section 5), every single configuration option permutation was visually inspected and logged. Have a look at the [TOOL NAME]TestConfig.js file in the TestConfig folder to see all the options that are logged into the spreadsheet.
*   **Coverage:** Contains a dedicated sheet for all 21 line tools.
*   **Status Tracking:** Records specific results for every property: ✅ **Works**, ⚪ **N/A**, or ❌ **Fail** (with detailed issue logs).

### 🗓️ Data Standard & Gap Handling
To ensure the mathematical integrity of the Line Tools Core, this test app implements a strict global data standard.

*   **Strict UTC-Midnight Basis**: All candlestick data is generated at exactly `00:00:00Z`. By standardizing on UTC, we eliminate the "Phantom Day-Shift" bug, where a bar representing Monday Sept 1st might appear as Sunday Aug 31st due to the local browser's timezone offset.
*   **Market-Hour Simulation (Gaps)**: Data generation explicitly excludes Saturdays and Sundays. This creates "Data Gaps" in the series, serving as a continuous stress test for the Core's binary search engine.
*   **Gap-Proof Search Validation**: The **"Test Weekend Modes"** suite (Section 4) targets these specific gaps. It proves that the plugin can correctly resolve the "Floor" (Friday) or "Ceiling" (Monday) when a user interacts with a point in time where no data exists.
*   **GUI Synchronization**: Both the Lightweight Charts native crosshair and the plugin’s supplemental "Blank Space" labels are forced to use UTC formatting. This ensures that the crosshair displays the exact same date regardless of the developer's physical location.

### The Test App
The Test App is organized into 8 functional sections that mirror the internal API surface of the Core.

### 1. Event Subscriptions & Selection Logic
This section validates the Core Plugin’s event bus. It ensures that the `InteractionManager` is successfully delegating user interactions back to the frontend application. Use the toggles in the UI to enable real-time logging for these events.

*   **AfterEdit Event (`subscribeLineToolsAfterEdit`)**:
    *   **Purpose**: Validates that the plugin signals when a tool has been created or modified.
    *   **Validation**: When toggled, every interaction (placing a point, dragging an anchor, dragging the body) will log a payload containing the `selectedLineTool` (Export Data) and the current `stage` (e.g., `lineToolEdited`, `lineToolFinished`).

*   **DoubleClick Event (`subscribeLineToolsDoubleClick`)**:
    *   **Purpose**: Validates that the event fires on a double-click interaction.
    *   **Validation**: Logs the `selectedLineTool` export data. This is intended to test the trigger mechanism used for opening settings modals or tool-specific configuration panels.

*   **SingleClick / Selection Event (`subscribeLineToolsSingleClick`)**:
    *   **Purpose**: Validates the "State-Aware" selection logic of the plugin.
    *   **Validation**: This fires whenever a tool is selected or deselected. It tests the Core's "Predictive Payload" architecture:
        *   **On Selection**: The payload includes the full `points` and `options` arrays.
        *   **On Deselection**: The payload explicitly returns `null` for `points` and `options` to keep the event bus traffic lightweight.
    *   **Developer Tip**: Use this to ensure your UI correctly tracks tool focus and cleans up tool-specific settings panels when a user clicks off to empty space.

### 2. Tool Retrieval, Updates & Persistence
This section demonstrates the Core Plugin's capability to manage tool state dynamically and perform bulk operations with pane-level isolation.

*   **Search & Targeted Updates**:
    *   **Create Tagged Tools**: Initializes specific tools with custom IDs for retrieval testing.
    *   **Get DEBUG_1 (ID)**: Proof of `getLineToolByID()` functionality.
    *   **Update DEBUG_1 (Partial)**: Proof of `applyLineToolOptions()`. This tests the ability to modify specific tool properties (like line color or label text) without re-providing the point coordinates, proving the partial-merge logic is sound.
    *   **Get by Regex**: Proof of `getLineToolsByIdRegex()` to retrieve tools based on naming patterns.
    *   **Get Selected Tools:** Invokes `getSelectedLineTools()` and logs the JSON of any currently highlighted tools.

*   **Bulk Removal (Pane Isolated)**:
    *   **Pane-Specific Controls**: We have split removal buttons for Pane 0 and Pane 1. 
    *   **Isolation Proof**: Clicking "Remove All" in the Pane 0 group will delete everything on the top chart, while tools drawn on Pane 1 remain completely untouched. This verifies that the plugin instances (api0 vs api1) manage their own internal registries independently.

*   **State Persistence (JSON)**:
    *   **Export/Import**: Validates the `exportLineTools()` and `importLineTools()` methods. This is essential for saving drawing states to databases. The test confirms that tool IDs, positions, and complex option structures are serialized and deserialized accurately without data loss.

*   **Remove Selected/All:** Validates `removeSelectedLineTools()` and `removeAllLineTools()`, ensuring that all primitives and axis labels are correctly detached and garbage-collected.    

### 3. Global Settings, Snapping, Locking & Crosshair Control
This section tests the plugin's ability to manipulate global chart state and verify synchronization between the Plugin API and the underlying Lightweight Charts engine.
*   **Magnet Snapping**:
    *   **Threshold Slider**: Tests `setMagnetThreshold()`. This verifies that crosshair ghosting and drawing tool anchors successfully "lock" onto OHLC price points within a defined pixel radius.
    *   **Verification**: When enabled, moving the mouse near a bar should cause a visual snap to the high/low/open/close, preventing "pixel-misalignment" in tool placement.

*   **Interaction Locks (Pane-Isolated)**:
    *   **Lock Toggles**: Tests `setLocked(bool)`. Validates that we can make tools "read-only" (cannot be moved/deleted/created) on a per-pane basis.
    *   **Verification**: The "Verify" buttons call `isLocked()` to prove the plugin's internal state manager is tracking the lock independently for Pane 0 and Pane 1. This is critical for complex dashboard layouts where you may want to lock the main chart while allowing exploration on secondary panels.

*   **Formatter Proxy Engine**:
    *   **Localization Sync**: Validates `setTimeFormatter()`. The plugin acts as a proxy for the chart's native localization. By toggling these, you prove that the plugin automatically "repairs" the time axis labels in the blank space (where native LWC normally stops displaying time) to match the custom format provided to the chart.

*   **Programmatic Crosshair Control**:
    *   **Coordinate Jumping**: Tests `setCrossHairXY`API. This confirms that the chart can be "remote controlled" to show the crosshair at specific times and prices, which is essential for keeping multiple charts perfectly aligned as you move your mouse.
    *   **Native Snapping Disclaimer**: Note that while the API accepts arbitrary coordinates, **Lightweight Charts natively snaps the vertical crosshair line to the nearest discrete data bar index that exists. It cannot move to the blank space because that data does not exist.** 
    *   **Future-Proofing**: We manually inject the time label when jumping into the future ("Blank Space"), ensuring that the crosshair displays information even where LWC native labels are suppressed.
    *   **Clear Crosshair**: Confirms `clearCrossHair()` removes all native and plugin-injected elements.

### 4. Series Data Inspector
This section validates the Core Plugin’s high-performance data engine. It does not copy the entire datasets into memory to perform lookups, this engine utilizes `dataByIndex` and $O(\log n)$ binary search to perform all operations with minimal memory footprint and zero array duplication.

*   **Boundary Validation**:
    *   **Log Boundaries**: Triggers `getEarliestBar()` and `getLatestBar()`. Uses direct index-probes to find the start/end points instantly without iterating the series array.
    *   **Log Full Range**: Validates `getFullTimeRange()`, ensuring the entire series bounds are calculated based on the boundary timestamps.

*   **Exact Lookups (Polymorphic)**:
    *   **Test Exact Lookups**: Proves `getBarAtTime()` support for both numeric UNIX timestamps (e.g., `1757452800`) and ISO Date strings (e.g., `"2025-09-15"`). This validates that the plugin's internal `horzScaleBehavior` correctly normalizes inputs regardless of the format.

*   **Weekend Gap Intelligence**:
    *   **Test Weekend Modes**: A battery of tests for `getClosestBar()` using a Saturday timestamp (a gap in the market data).
        *   `exact`: Verifies `null` return on gaps.
        *   `floor`: Validates finding the nearest data *before* the weekend.
        *   `ceil`: Validates finding the nearest data *after* the weekend.
        *   `nearest`: Confirms the mathematical proximity logic.

*   **Spatial & Range Lookups**:
    *   **Log Bar at Center-X**: Tests `getBarAtCoordinate()`. Proves that the pixel-to-logical-index math correctly snaps to the crooshair to the closest candle nearest to the X-coordinate provided.
    *   **Log 11-Day Window**: Tests `getDataInRange()`. By using an 11-day inclusive window, we prove the plugin correctly slices the series array, skipping weekend indices while correctly including all valid trading bars between the boundaries. To returns that ranges candle data.

### 5. Pane 0 Lifecycle & "Destroy" Lab
This section validates the critical teardown phase of the plugin lifecycle. It proves that the plugin can be fully uninstalled from the chart without leaving behind detached event listeners, stale renderers, or memory leaks.

*   **The "Destroy" Protocol**:
    *   When the "Destroy Pane 0" button is clicked, the plugin instance performs a total cleanup:
        1.  It detaches all primitives from the Lightweight Charts series.
        2.  It removes all DOM-level event listeners (mousedown/move/up).
        3.  It severs the connection to the `IChartApiBase` and `ISeriesApi` to allow for immediate garbage collection.
    *   **Dummy Transformation**: Instead of throwing an error if the app tries to call an API method on a destroyed instance, the plugin "neutering" logic replaces every method with a no-op "dummy" function. This verifies that your host application will not crash if it accidentally calls an API method after destruction.

*   **Verification**:
    *   After destroying Pane 0, you can verify success by attempting to add a new tool or interact with existing ones. The plugin should remain completely silent and non-interactive, proving that the core has been fully purged.

### 6. Interactive Drawing
This section contains nested accordions for all 21 available tool types. It is the primary area for testing manual user experience (UX).
*   **Interactive Toggles:** Clicking "Activate Default" or "Activate Exotic" triggers `addLineTool` with an empty points array, placing the plugin into **Interactive Creation Mode**.
*   **Gesture Validation:** Use this to test the tools—ensuring that ghosting follows the mouse smoothly, Shift-key constraints snap to the expected axes, and resize anchors appear only when the tool is selected or hovered.

### 7. Programmatic Tool Creation
This section validates the API's ability to create and update tools via code using `createOrUpdateLineTool`.
*   **Static Test Cases:** Buttons for "Add Tool A/B/C" place tools at hardcoded coordinates to verify that the math for rendering remains consistent across different zoom levels and price ranges.
*   **The "X" Test (Idempotency):** The "Create/Update/Remove FIB_X" buttons test the ability to target a specific ID, modify its properties in real-time through code, and delete it without affecting other tools.
*   **Generate All Tests (Automated Test Surface):** This is the most comprehensive validation tool. It utilizes the `useToolTestSurfaceGenerator` hook to produce a massive grid of tools on the chart.
    *   **Visual Documentation:** Each tool in the grid is a "Unit Test" for a single property (e.g., one tool tests a specific `lineStyle`, another tests a specific `backgroundOpacity`).
    *   **Interactive Discovery:** By using this in tandem with the **DoubleClick Subscription** in Section 1, you can double-click any tool in the generated grid to see the raw code required to achieve that specific visual result.

### 8. Pane 1: Multi-Interval & Isolation Lab
This section serves as the "Experimental Sandbox." It validates the plugin’s capability to function in complex layouts involving multiple series, multiple panes, and varying data granularities.

*   **Multi-Interval Interpolation (Data Density Test)**:
    *   **Daily vs. 4-Hour Data**: Allows toggling the Pane 1 series between Daily data and 4-Hour data (which increases the bar count 6x). 
    *   **The Validation**: If you draw a tool on Pane 1 while it's in Daily mode, it anchors to a specific UTC timestamp. When you switch to 4-Hour mode, the plugin's interpolation engine must recalculate the logical index. The tool should remain "pinned" to the exact same calendar date. If the tool "slides" to a different bar, the interpolation math is failing. The best way to test is to go to the 4 hour, then draw a trend line starting and ending 4 hours after a daily candle. Then change to daily data, then you will notice that the points of the line tool are perfectly offset by 4 hours after the daily candle and not artificially moved to the nearest daily candle.

*   **Pane Interaction Isolation**:
    *   **Clamped Drawing**: Proves that drawing tools on Pane 1 are strictly confined to the bottom pane's coordinate system.
    *   **Normalization Proof**: Validates that when you click in Pane 1, the `InteractionManager` correctly performs Y-offset normalization. It prevents the crosshair or tool-drawings from appearing in Pane 0, despite both panes being part of the same `ChartApi` instance.

*   **Stability Lab**:
    *   This is the primary area to test complex layouts. Because Pane 1 has a smaller vertical footprint than Pane 0, it tests the **clamping logic** of your `getBarAtCoordinate` and `screenPointToLineToolPoint` methods. It ensures that the plugin doesn't perform "out of bounds" math when mouse coordinates fall outside the main pane's defined vertical range.    

## 💡 How to use this App for Discovery
Since the individual plugin source code is optimized for performance rather than verbose commenting, use the Test App as your live documentation:
1.  Navigate to **Programmatic Tool Creation** for the tool you are interested in.
2.  Click **Generate All Tests** to see every visual permutation the tool can offer.
3.  Open the **Browser Console (F12)** and enable the **DoubleClick Subscription** in Section 1.
4.  Double-click any tool on the chart to see the raw `options` object. This is the fastest way to understand the full customization surface of the suite.

## 📂 Project Structure

*   **`/src/Components`**: UI panels and logic for each specific line tool.
*   **`/src/Hooks`**: The "Engines" of the test app, including the `useToolTestSurfaceGenerator`.
*   **`/src/TestConfig`**: Property maps that define every value tested by the automated generator.
*   **`/src/Data`**: Static data and coordinates for programmatic test cases.

## 🤝 Community & Contributions

This app is designed to be a "Live Specification" of the drawing tool suite. If you develop a new line tool using the Core, you are encouraged to add a test panel here and share it with the community.