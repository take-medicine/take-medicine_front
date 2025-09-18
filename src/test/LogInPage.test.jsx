import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LogInPage from "../pages/LogInPage/LogInPage"; 

test("login modal opens, switch to register and back", () => {
  render(<LogInPage />);

  const loginTitle = screen.getByText(/Iniciar sesión/i, { selector: 'h2' });
  expect(loginTitle).toBeInTheDocument();

  const goToRegisterBtn = screen.getByText(/regístrate aquí/i, { selector: 'button' });
  fireEvent.click(goToRegisterBtn);

  const registerTitle = screen.getByText(/Regístrate/i, { selector: 'h2' });
  expect(registerTitle).toBeInTheDocument();

  const goToLoginBtn = screen.getByRole('button', { name: /Inicia sesión/i });
    fireEvent.click(goToLoginBtn);

  expect(screen.getByText(/Iniciar sesión/i, { selector: 'h2' })).toBeInTheDocument();
});

test("close modal clicking outside", () => {
  render(<LogInPage />);
  const overlay = document.querySelector('.log-in__modal-container');
  fireEvent.click(overlay);
});
