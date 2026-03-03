import TradingViewWidget from "@/components/TradingViewWidget";
import WatchlistButton from "@/components/WatchlistButton";
import {
    SYMBOL_INFO_WIDGET_CONFIG,
    CANDLE_CHART_WIDGET_CONFIG,
    BASELINE_WIDGET_CONFIG,
    TECHNICAL_ANALYSIS_WIDGET_CONFIG,
    COMPANY_PROFILE_WIDGET_CONFIG,
    COMPANY_FINANCIALS_WIDGET_CONFIG,
} from "@/lib/constants";

export default async function StockDetails({ params }: StockDetailsPageProps) {
    const { symbol } = await params;
       const normalizedSymbol = symbol.trim().toUpperCase();
       if (!/^[A-Z0-9.\-:]{1,15}$/.test(normalizedSymbol)) {
           return <div className="p-4 md:p-6 lg:p-8">Invalid stock symbol.</div>;
           }
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    return (
        <div className="flex min-h-screen p-4 md:p-6 lg:p-8">
         {/*<div className="min-h-screen p-4 md:p-6 lg:p-8">*/}
        {/*// <div className="flex flex-col gap-6 min-w-0">*/}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/*    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">*/}
            {/*<section className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8 max-w-7xl mx-auto">*/}
            {/*<section className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8 max-w-7xl mx-auto items-start">*/}
            {/*<section className="grid grid-cols-2 gap-8 w-full">*/}
            {/*    <section className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">*/}
                {/* Left column */}
                <div className="flex flex-col gap-6">
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}symbol-info.js`}
                        // config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
                        config={SYMBOL_INFO_WIDGET_CONFIG(normalizedSymbol)}
                        height={170}

                    />

                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}advanced-chart.js`}
                        // config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
                        config={CANDLE_CHART_WIDGET_CONFIG(normalizedSymbol)}
                        className="custom-chart"
                        height={600}
                    />

                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}advanced-chart.js`}
                        // config={BASELINE_WIDGET_CONFIG(symbol)}
                        config={BASELINE_WIDGET_CONFIG(normalizedSymbol)}
                        className="custom-chart"
                        height={600}
                    />
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        {/*<WatchlistButton symbol={symbol.toUpperCase()} company={symbol.toUpperCase()} isInWatchlist={false} />*/}
                        <WatchlistButton symbol={normalizedSymbol} company={normalizedSymbol} isInWatchlist={false} />
                    </div>

                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}technical-analysis.js`}
                        // config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
                        config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(normalizedSymbol)}
                        height={400}
                    />

                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}company-profile.js`}
                        // config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
                        config={COMPANY_PROFILE_WIDGET_CONFIG(normalizedSymbol)}
                        height={440}
                    />

                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}financials.js`}
                        // config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
                        config={COMPANY_FINANCIALS_WIDGET_CONFIG(normalizedSymbol)}
                        height={464}
                    />
                </div>
            </section>
        </div>
    );
}