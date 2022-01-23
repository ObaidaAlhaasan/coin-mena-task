import { render, screen } from "@testing-library/react";
import LoginModal from "./login";
import user from "@testing-library/user-event";

describe("Login", () => {
  beforeEach(() => {
    render(<LoginModal show={true} />);
  });

  it("should display username password inputs", function () {
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(getEmailInput()).toBeInTheDocument();
    expect(getPasswordInput()).toBeInTheDocument();
    expect(getLoginButton()).toBeInTheDocument();
  });

  it("initially form should be empty and Login disabled", () => {
    expect(getLoginButton()).toBeDisabled();
    expect(getEmailInput()).toHaveValue("");
    expect(getPasswordInput()).toHaveValue("");
  });

  describe("Login Form validation", () => {
    it('Invalid credentials Login button should be "disabled" and err messages "should" present', function () {
      user.type(getEmailInput(), "solar@@solar.com");
      user.type(getPasswordInput(), "p");
      expect(getLoginButton()).toBeDisabled();
      expect(getPasswordInvalidFeedBack()).toBeInTheDocument();
      expect(getEmailInvalidFeedBack()).toBeInTheDocument();
    });

    it('Valid credentials Login button should be "enabled" and err messages "should not" present', function () {
      user.type(getEmailInput(), "solar@solar.com");
      user.type(getPasswordInput(), "pass123@");
      expect(getLoginButton()).toBeEnabled();
      expect(getPasswordInvalidFeedBack()).not.toBeInTheDocument();
      expect(getEmailInvalidFeedBack()).not.toBeInTheDocument();
    });
  });
});

const getEmailInput = () => screen.getByRole("textbox", { name: /email/i });
const getLoginButton = () => screen.getByRole("button", { name: "Login" });
const getPasswordInput = () => screen.getByLabelText(/password/i);
const getPasswordInvalidFeedBack = () =>
  screen.queryByText(
    /password field is invalid should contain one special character, one number/i
  );
const getEmailInvalidFeedBack = () =>
  screen.queryByText(/email field is invalid and required/i);
