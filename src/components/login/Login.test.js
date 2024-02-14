import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";
import axios from "axios";

jest.mock("axios", () => ({
	__esModule: true,

	default: {
		get: () => ({
			data: { id: 1, name: "John" },
		}),
	},
}));

test("username input should be rendered", () => {
	render(<Login />);
	const usernameInputEl = screen.getByPlaceholderText(/username/i);
	expect(usernameInputEl).toBeInTheDocument();
});

test("password input should be rendered", () => {
	render(<Login />);
	const passwordInputEl = screen.getByPlaceholderText(/password/i);
	expect(passwordInputEl).toBeInTheDocument();
});

test("button should be rendered", () => {
	render(<Login />);
	const buttonEl = screen.getByRole("button");
	expect(buttonEl).toBeInTheDocument();
});

test("username input should be empty", () => {
	render(<Login />);
	const usernameInputEl = screen.getByPlaceholderText(/username/i);
	expect(usernameInputEl.value).toBe("");
});

test("password input should be empty", () => {
	render(<Login />);
	const passwordInputEl = screen.getByPlaceholderText(/password/i);
	expect(passwordInputEl.value).toBe("");
});

test("button should be disabled", () => {
	render(<Login />);
	const buttonEl = screen.getByRole("button");
	expect(buttonEl).toBeDisabled();
});

test("loading should not be rendered", () => {
	render(<Login />);
	const buttonEl = screen.getByRole("button");
	expect(buttonEl).not.toHaveTextContent(/please wait/i);
});

test("error message should not be visible", () => {
	render(<Login />);
	const errorEl = screen.getByTestId("error");
	expect(errorEl).not.toBeVisible();
});

test("username input should change", async () => {
	render(<Login />);
	const usernameInputEl = screen.getByPlaceholderText(/username/i);
	const testValue = "test";

	fireEvent.change(usernameInputEl, { target: { value: testValue } });
	await waitFor(() => expect(usernameInputEl.value).toBe(testValue));
});

test("password input should change", async () => {
	render(<Login />);
	const passwordInputEl = screen.getByPlaceholderText(/password/i);
	const testValue = "test";

	fireEvent.change(passwordInputEl, { target: { value: testValue } });
	await waitFor(() => expect(passwordInputEl.value).toBe(testValue));
});

test("button should not be disabled when inputs exist", async () => {
	render(<Login />);
	const buttonEl = screen.getByRole("button");
	const usernameInputEl = screen.getByPlaceholderText(/username/i);
	const passwordInputEl = screen.getByPlaceholderText(/password/i);

	const testValue = "test";

	fireEvent.change(usernameInputEl, { target: { value: testValue } });
	fireEvent.change(passwordInputEl, { target: { value: testValue } });

	await waitFor(() => expect(buttonEl).not.toBeDisabled());
});

test("loading should be rendered when click", async () => {
	render(<Login />);
	const buttonEl = screen.getByRole("button");
	const usernameInputEl = screen.getByPlaceholderText(/username/i);
	const passwordInputEl = screen.getByPlaceholderText(/password/i);

	const testValue = "test";

	fireEvent.change(usernameInputEl, { target: { value: testValue } });
	fireEvent.change(passwordInputEl, { target: { value: testValue } });
	fireEvent.click(buttonEl);

	await waitFor(() => expect(buttonEl).toHaveTextContent(/please wait/i));
});

test("loading should not be rendered after fetching", async () => {
	render(<Login />);
	const buttonEl = screen.getByRole("button");
	const usernameInputEl = screen.getByPlaceholderText(/username/i);
	const passwordInputEl = screen.getByPlaceholderText(/password/i);

	const testValue = "test";

	fireEvent.change(usernameInputEl, { target: { value: testValue } });
	fireEvent.change(passwordInputEl, { target: { value: testValue } });
	fireEvent.click(buttonEl);

	await waitFor(() => expect(buttonEl).not.toHaveTextContent(/please wait/i));
});

test("user should be rendered after fetching", async () => {
	render(<Login />);
	const buttonEl = screen.getByRole("button");
	const usernameInputEl = screen.getByPlaceholderText(/username/i);
	const passwordInputEl = screen.getByPlaceholderText(/password/i);

	const testValue = "test";

	fireEvent.change(usernameInputEl, { target: { value: testValue } });
	fireEvent.change(passwordInputEl, { target: { value: testValue } });
	fireEvent.click(buttonEl);
	const userItem = await screen.findByText("John");

	await waitFor(() => expect(userItem).toBeInTheDocument());
});

//"handles button click and prevents default form submission"
test("handles button click and prevents default form submission", async () => {
	render(<Login />);
	const buttonEl = screen.getByRole("button");

	fireEvent.click(buttonEl);

	await waitFor(() => expect(buttonEl).toBeDisabled());
});
