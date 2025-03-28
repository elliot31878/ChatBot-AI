import { render, screen, fireEvent } from "@testing-library/react";
import { Textarea } from "../components/TextArea";
import "@testing-library/jest-dom";

describe("Textarea Component", () => {
  test("renders without crashing", () => {
    render(<Textarea placeholder="Enter text" />);
    const textarea = screen.getByPlaceholderText("Enter text");
    expect(textarea).toBeInTheDocument();
  });

  test("applies the correct size variant class", () => {
    render(<Textarea size="xl" />);
    const wrapper = screen.getByRole("textbox").closest("div");
    expect(wrapper).toHaveClass("min-h-14");
  });

  test("applies the correct color variant class", () => {
    render(<Textarea color="error" />);
    const wrapper = screen.getByRole("textbox").closest("div");
    expect(wrapper).toHaveClass("border-error");
  });

  test("displays label correctly", () => {
    render(<Textarea label="Test Label" />);
    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();
  });

  test("focuses on click", () => {
    render(<Textarea label="Clickable" />);
    const textarea = screen.getByRole("textbox");
    fireEvent.click(textarea);
    expect(textarea).toHaveFocus();
  });

  test("renders message when provided", () => {
    render(<Textarea message="Error message" color="error" />);
    const message = screen.getByText("Error message");
    expect(message).toBeInTheDocument();
  });

  test("hides message when `noMessage` is true", () => {
    render(<Textarea message="Hidden message" noMessage />);
    expect(screen.queryByText("Hidden message")).not.toBeInTheDocument();
  });

  test("renders disabled state correctly", () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeDisabled();
  });
});
