import { NextResponse } from "next/server";

export const revalidate = 86400;

const fallbackQuotes = [
	{
		quote: "There are no limits to what you can accomplish except the limits you place on your own thinking.",
		author: "Brian Tracy",
	},
	{
		quote: "Success is the sum of small efforts, repeated day in and day out.",
		author: "Robert Collier",
	},
	{
		quote: "The future depends on what you do today.",
		author: "Mahatma Gandhi",
	},
	{
		quote: "Consistency is what transforms average into excellence.",
		author: "Robin Sharma",
	},
	{
		quote: "The best way to predict the future is to create it.",
		author: "Peter Drucker",
	},
];

function getFallbackQuoteForToday() {
	const dayIndex = Math.floor(Date.now() / 86400000);
	return fallbackQuotes[dayIndex % fallbackQuotes.length];
}

function normalizeQuotePayload(payload) {
	if (Array.isArray(payload) && payload[0]?.q) {
		return {
			quote: payload[0].q,
			author: payload[0].a || "Unknown",
		};
	}

	if (payload?.content) {
		return {
			quote: payload.content,
			author: payload.author || "Unknown",
		};
	}

	if (payload?.quote) {
		return {
			quote: payload.quote,
			author: payload.author || "Unknown",
		};
	}

	return null;
}

export async function GET(request) {
	const fallback = getFallbackQuoteForToday();
	const { searchParams } = new URL(request.url);
	const mode = searchParams.get("mode") || "daily";
	const isRandomMode = mode === "random";
	const quoteEndpoint = isRandomMode
		? "https://zenquotes.io/api/random"
		: "https://zenquotes.io/api/today";

	try {
		const response = await fetch(
			quoteEndpoint,
			isRandomMode
				? { cache: "no-store" }
				: { next: { revalidate } }
		);

		if (!response.ok) {
			throw new Error(`Quote API failed with status ${response.status}`);
		}

		const payload = await response.json();
		const normalized = normalizeQuotePayload(payload);

		if (!normalized?.quote) {
			throw new Error("Quote API returned unexpected payload");
		}

		return NextResponse.json(
			{ ...normalized, source: "zenquotes" },
			{
				headers: {
					"Cache-Control": isRandomMode
						? "no-store"
						: "s-maxage=86400, stale-while-revalidate=43200",
				},
			}
		);
	} catch {
		return NextResponse.json(
			{ ...fallback, source: "fallback", mode },
			{
				headers: {
					"Cache-Control": isRandomMode
						? "no-store"
						: "s-maxage=86400, stale-while-revalidate=43200",
				},
			}
		);
	}
}
