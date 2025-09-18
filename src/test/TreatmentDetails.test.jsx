// TreatmentDetails.test.jsx
import React, { useEffect} from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import TreatmentDetails from "../components/treatmentDetails/TreatmentDetails";

const mockTreatment = {
  medicationName: "Paracetamol",
  description: "Para dolor y fiebre",
  duration: "5 días",
  dosage: "500mg",
  time: ["08:00", "20:00"],
  days: ["Lunes", "Miércoles", "Viernes"],
};

describe("TreatmentDetails", () => {
  test("no renderiza si treatment es null", () => {
    const { container } = render(<TreatmentDetails treatment={null} onClose={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  test("muestra la información del tratamiento correctamente", () => {
    render(<TreatmentDetails treatment={mockTreatment} onClose={vi.fn()} />);

    expect(screen.getByText("Paracetamol")).toBeInTheDocument();
    expect(screen.getByText("Para dolor y fiebre")).toBeInTheDocument();
    expect(screen.getByText("5 días")).toBeInTheDocument();
    expect(screen.getByText("500mg")).toBeInTheDocument();

    // Times
    mockTreatment.time.forEach(time => {
      expect(screen.getByText(time)).toBeInTheDocument();
    });

    // Days
    mockTreatment.days.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  test("llama a onClose al hacer click en el overlay", () => {
    const handleClose = vi.fn();
    render(<TreatmentDetails treatment={mockTreatment} onClose={handleClose} />);

    const overlay = screen.getByRole("dialog").parentElement; // el overlay es el padre
    fireEvent.click(overlay);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("no llama a onClose al hacer click dentro del modal", () => {
    const handleClose = vi.fn();
    render(<TreatmentDetails treatment={mockTreatment} onClose={handleClose} />);

    const modal = screen.getByRole("dialog");
    fireEvent.click(modal);

    expect(handleClose).not.toHaveBeenCalled();
  });

  test("cierra modal al presionar Escape", () => {
    const handleClose = vi.fn();
    render(<TreatmentDetails treatment={mockTreatment} onClose={handleClose} />);

    fireEvent.keyDown(window, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
