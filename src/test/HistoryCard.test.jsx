import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import HistorialTratamientos, { HistorialTratamientosContainer, useTratamientos } from "../components/historyCard/HistoryCard";

// Mock del fetch para el container
global.fetch = vi.fn();

// Datos de ejemplo
const mockTratamientos = [
  {
    id: 1,
    medicamento: "Ibuprofeno",
    condicion: "Dolor de cabeza",
    tipo: "Oral",
    fechaInicio: "2025-09-01",
    fechaFin: "2025-09-10",
    estado: "activo",
  },
  {
    id: 2,
    medicamento: "Paracetamol",
    condicion: "Fiebre",
    tipo: "Oral",
    fechaInicio: "2025-08-15",
    fechaFin: "2025-08-20",
  },
];

describe("HistorialTratamientos component", () => {
  it("renders loading state", () => {
    render(<HistorialTratamientos loading={true} />);
    expect(screen.getByText("Historial de tratamientos")).toBeInTheDocument();
    expect(screen.getAllByText((_, el) => el.className.includes("historial-loading-item")).length).toBe(4);
  });

  it("renders error state", () => {
    render(<HistorialTratamientos error="Error cargando" />);
    expect(screen.getByText("Error cargando")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    render(<HistorialTratamientos tratamientos={[]} />);
    expect(screen.getByText("No hay tratamientos registrados")).toBeInTheDocument();
  });

  it("renders list of tratamientos and handles click", () => {
    const handleClick = vi.fn();
    render(<HistorialTratamientos tratamientos={mockTratamientos} onClickTratamiento={handleClick} />);
    
    expect(screen.getByText("Ibuprofeno")).toBeInTheDocument();
    expect(screen.getByText("Paracetamol")).toBeInTheDocument();

    const item = screen.getByText("Ibuprofeno").closest("div.historial-item");
    fireEvent.click(item);
    expect(handleClick).toHaveBeenCalledWith(mockTratamientos[0]);
  });
});

describe("HistorialTratamientosContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches tratamientos and renders them", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTratamientos,
    });

    render(<HistorialTratamientosContainer />);

    expect(screen.getByText("Historial de tratamientos")).toBeInTheDocument();
    // Espera a que los items se rendericen
    await waitFor(() => expect(screen.getByText("Ibuprofeno")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Paracetamol")).toBeInTheDocument());
  });

  it("shows error if fetch fails", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<HistorialTratamientosContainer />);

    await waitFor(() => expect(screen.getByText("Error al cargar los tratamientos")).toBeInTheDocument());
  });

  it("calls onClickTratamiento from container", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTratamientos,
    });

    const handleClick = vi.fn();
    render(<HistorialTratamientosContainer onClickTratamiento={handleClick} />);

    await waitFor(() => screen.getByText("Ibuprofeno"));

    const item = screen.getByText("Ibuprofeno").closest("div.historial-item");
    fireEvent.click(item);

    expect(handleClick).toHaveBeenCalledWith(mockTratamientos[0]);
  });
});
