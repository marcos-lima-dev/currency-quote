import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HistoricalChart from "../../currency/HistoricalChart";

describe("HistoricalChart", () => {
    it("renders chart with default 1d filter", () => {
        render(<HistoricalChart />);
        expect(
            screen.getByText("Historical Exchange Rate")
        ).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "1D" })).toHaveClass(
            "bg-primary"
        );
    });

    it("changes time period when filter clicked", async () => {
        render(<HistoricalChart />);
        fireEvent.click(screen.getByRole("button", { name: "7D" }));
        expect(screen.getByRole("button", { name: "7D" })).toHaveClass(
            "bg-primary"
        );
        await waitFor(() => {
            expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
        });
    });

    it("shows loading state while fetching data", () => {
        render(<HistoricalChart />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("displays chart after loading", async () => {
        render(<HistoricalChart />);
        await waitFor(() => {
            expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
            expect(
                document.querySelector(".recharts-surface")
            ).toBeInTheDocument();
        });
    });
});
