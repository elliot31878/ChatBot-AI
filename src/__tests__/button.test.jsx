import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../components/Button";

describe("Button Component", () => {
  test("renders correctly with default props", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).not.toBeNull();
  });

  test("applies the correct variant class", () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByRole("button", { name: /outline button/i });
    expect(button.className).toMatch(/\bborder\b/);
  });

  test("applies the correct color class", () => {
    render(<Button color="error">Error Button</Button>);
    const button = screen.getByRole("button", { name: /error button/i });
    expect(button.className).toMatch("bg-error");
  });

  test("renders as a child component when `asChild` is true", () => {
    render(
      <Button>
        <a href="#">Link Button</a>
      </Button>
    );
    const link = screen.getByRole("link", { name: /link button/i });

    expect(link).not.toBeNull();
  });

  test("renders loading state when `isLoading` is true", () => {
    render(<Button isLoading>Loading...</Button>);
    const loadingIcon = screen.getByTestId("loading-icon");
    expect(screen.getByRole("button")).toContainElement(loadingIcon);
  });

  test("handles click events", async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("disables button when `disabled` prop is set", async () => {
    const onClick = jest.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>
    );
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();

    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
