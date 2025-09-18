import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ModalAddReminder from "../components/addReminderModal/AddReminderModal";

const mockMedications = [
  { id: 1, name: "Ibuprofeno", dose: "200mg" },
  { id: 2, name: "Paracetamol", dose: "500mg" },
];

describe("ModalAddReminder component", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onSave: vi.fn(),
    registeredMedications: mockMedications,
  };

  it("renders modal when isOpen is true", () => {
    render(<ModalAddReminder {...defaultProps} />);
    expect(screen.getByText(/new reminder/i)).toBeInTheDocument();
    expect(screen.getByText(/Ibuprofeno/i)).toBeInTheDocument();
    expect(screen.getByText(/Paracetamol/i)).toBeInTheDocument();
  });

  it("does not render modal when isOpen is false", () => {
    render(<ModalAddReminder {...defaultProps} isOpen={false} />);
    expect(screen.queryByText(/new reminder/i)).not.toBeInTheDocument();
  });

  it("calls onClose when clicking cancel button", () => {
    render(<ModalAddReminder {...defaultProps} />);
    const cancelBtn = screen.getByText(/cancel/i);
    fireEvent.click(cancelBtn);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls onSave when filling form and submitting", async () => {
    render(<ModalAddReminder {...defaultProps} />);
    const saveBtn = screen.getByText(/save reminder/i);

    // Rellenamos campos básicos
    fireEvent.change(screen.getByLabelText(/medication/i), {
    target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/dose/i), {
      target: { value: "250mg" },
    });

    fireEvent.click(saveBtn);
    expect(defaultProps.onSave).toHaveBeenCalled();
  });
});
