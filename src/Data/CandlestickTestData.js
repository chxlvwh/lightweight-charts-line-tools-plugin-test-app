// /src/Data/CandlestickTestData.js

const UTC_MIDNIGHT = 'T00:00:00Z';

/**
 * Generates test candlestick data for Pane 0 (Price range 100-200).
 * Skips Saturdays and Sundays to test the Core Plugin's gap-handling logic.
 */
export function generateTestCandlestickData(startDateStr, endDateStr) {
	const data = [];
	const startDate = new Date(startDateStr + UTC_MIDNIGHT);
	const endDate = new Date(endDateStr + UTC_MIDNIGHT);
	let currentDate = new Date(startDate);
	let i = 0;
	const basePrice = 150;
	const amplitude = 50;

	while (currentDate <= endDate) {
		const dayOfWeek = currentDate.getUTCDay();
		
		// Only add data if it is a weekday (Monday=1 through Friday=5)
		if (dayOfWeek !== 0 && dayOfWeek !== 6) {
			const time = Math.floor(currentDate.getTime() / 1000);
			const open = basePrice + Math.cos(i / 20) * amplitude * 0.8;
			const close = basePrice + Math.sin(i / 10) * amplitude;
			data.push({ 
				time, 
				open, 
				high: Math.max(open, close) + (i % 5) + 1, 
				low: Math.min(open, close) - (i % 7) - 1, 
				close 
			});
		}
		
		currentDate.setUTCDate(currentDate.getUTCDate() + 1);
		i++;
	}
	return data;
}

/**
 * Generates daily candlestick data for Pane 1 (Price range 35-65).
 * Skips Saturdays and Sundays.
 */
export function generatePane1DailyData(startDateStr, endDateStr) {
	const data = [];
	const startDate = new Date(startDateStr + UTC_MIDNIGHT);
	const endDate = new Date(endDateStr + UTC_MIDNIGHT);
	let currentDate = new Date(startDate);
	let i = 0;
	const basePrice = 50;
	const amplitude = 15;

	while (currentDate <= endDate) {
		const dayOfWeek = currentDate.getUTCDay();

		if (dayOfWeek !== 0 && dayOfWeek !== 6) {
			const time = Math.floor(currentDate.getTime() / 1000);
			const open = basePrice + Math.cos(i / 20) * amplitude;
			const close = basePrice + Math.sin(i / 10) * amplitude;
			data.push({ time, open, high: open + 2, low: close - 2, close });
		}

		currentDate.setUTCDate(currentDate.getUTCDate() + 1);
		i++;
	}
	return data;
}

/**
 * Generates 4-hour candlestick data for Pane 1.
 * Skips Saturdays and Sundays.
 */
export function generate4HourTestData(startDateStr, endDateStr, basePrice = 50) {
	const data = [];
	const startDate = new Date(startDateStr + UTC_MIDNIGHT);
	const endDate = new Date(endDateStr + UTC_MIDNIGHT);
	let currentDate = new Date(startDate);
	let i = 0;
	const amplitude = 15;
	const fourHoursInSeconds = 4 * 60 * 60;

	while (currentDate <= endDate) {
		const dayOfWeek = currentDate.getUTCDay();

		if (dayOfWeek !== 0 && dayOfWeek !== 6) {
			for (let hourIdx = 0; hourIdx < 6; hourIdx++) {
				const time = Math.floor(currentDate.getTime() / 1000) + (hourIdx * fourHoursInSeconds);
				const open = basePrice + Math.cos(i / 40) * amplitude;
				const close = basePrice + Math.sin(i / 25) * amplitude;
				data.push({ time, open, high: Math.max(open, close) + 1, low: Math.min(open, close) - 1, close });
				i++;
			}
		}
		currentDate.setUTCDate(currentDate.getUTCDate() + 1);
	}
	return data;
}