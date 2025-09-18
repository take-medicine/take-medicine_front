import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddButton from "../components/addButton/AddButton.jsx";

describe("AddButton component", () => {
  it("renders the + button", () => {
    render(<AddButton onGoToTreatment={() => {}} onGoToReminder={() => {}} />);
    
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("opens modal when clicked", () => {
    render(<AddButton onGoToTreatment={() => {}} onGoToReminder={() => {}} />);
    
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // comprueba que se renderizó el modal
    expect(screen.getByText(/añadir tratamiento/i)).toBeInTheDocument();
    expect(screen.getByText(/añadir recordatorio/i)).toBeInTheDocument();
  });
});
