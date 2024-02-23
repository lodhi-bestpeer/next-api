import React from "react";
import { render, screen ,fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import Header from "../src/app/user/common/Header";
import Form from "../src/app/user/common/Form";

// Mock the next-auth/react module
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
    signOut: jest.fn(),
  }));

describe("Header Component", () => {
  it("renders app name as a link", () => {
    render(<Header />);
    expect(
      screen.getByRole("link", { name: "NextJS App" })
    ).toBeInTheDocument();
  });

  it("renders login and signup links when not logged in", () => {
    useSession.mockReturnValue({ data: null });

    render(<Header />);

    expect(screen.getByRole("link", { name: "Sign Up" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Log In" })).toBeInTheDocument();
  });

  it("renders dashboard and form when logged in", () => {
    useSession.mockReturnValue({ data: { user: { name: "Test User" } } });

    render(<Header />);

    expect(screen.getByRole("link", { name: "Dashboard" })).toBeInTheDocument();
  });

  test("renders dashboard and form when logged in", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: "Dashboard" })).toBeInTheDocument();

    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBe(2);

    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });

});

