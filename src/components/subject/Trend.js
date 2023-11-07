"use client";
import { ResponsiveLine } from "@nivo/line";

export const Trend = ({ data }) => {
    const flat = data.map((v) => v.data).flat();
    const maxY = flat.reduce((prev, curr) => (Number(prev.y) > Number(curr.y) ? prev : curr), { y: 0 })["y"];
    const tickValues = new Array(Math.ceil(Math.ceil(maxY) / Math.ceil(maxY / 6)) + 1 || 0).fill(null).map((_, i) => Math.ceil(maxY / 6) * i);

    return (
        <section className="relative w-full h-full flex flex-col p-4">
            <div className="text-xs">Volume(V)</div>
            <ResponsiveLine
                data={data}
                margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
                xScale={{ type: "point" }}
                yScale={{ type: "linear", min: 0, max: tickValues[tickValues.length - 1] }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                }}
                axisLeft={{
                    tickValues,
                    tickSize: 5,
                    tickPadding: 5,
                    format: ".2f",
                }}
                lineWidth={1}
                enablePointLabel
                pointLabelYOffset={15}
                gridYValues={tickValues}
                theme={{ axis: { domain: { line: { stroke: "#72B9CE" } } } }}
            />
            <div className="text-right text-xs">Date</div>
        </section>
    );
};
