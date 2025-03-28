import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ChatInput } from "./ChatInput";
import { useChat } from "@ai-sdk/react";
import "@testing-library/jest-dom";

jest.mock("@ai-sdk/react", () => ({
  useChat: jest.fn(),
}));

describe("ChatInput", () => {
  let handleInputChange, handleSubmit, setInput, status;

  beforeEach(() => {
    handleInputChange = jest.fn();
    handleSubmit = jest.fn();
    setInput = jest.fn();
    status = "idle";
    useChat.mockReturnValue({ handleInputChange, handleSubmit, setInput });

    render(
      <ChatInput
        input=""
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        setInput={setInput}
        status={status}
      />
    );
  });

  test("renders the input and button", () => {
    expect(screen.getByPlaceholderText("Ask anything")).toBeInTheDocument();
    expect(screen.getByTestId("button-test-id")).toBeInTheDocument();
  });

  test("calls handleSubmit on form submit", async () => {
    const form = screen.getByTestId("form-test-id");
    fireEvent.submit(form);

    await waitFor(() => expect(handleSubmit).toHaveBeenCalled());
  });

  test("handles input change", () => {
    const inputElement = screen.getByPlaceholderText("Ask anything");
    fireEvent.change(inputElement, { target: { value: "Hello" } });

    expect(handleInputChange).toHaveBeenCalled();
  });

  test("clears input after form submission", async () => {
    const inputElement = screen.getByPlaceholderText("Ask anything");
    fireEvent.change(inputElement, { target: { value: "Hello" } });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });
    await waitFor(() => expect(handleSubmit).toHaveBeenCalled());
    expect(setInput).toHaveBeenCalledWith("");
  });
});
