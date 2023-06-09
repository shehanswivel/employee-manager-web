import EditForm from "@/pages/employee/edit/[id]";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

jest.mock("next/router", () => require("next-router-mock"));

describe("EditForm", () => {
  const initialState = {
    employees: {
      selected: {
        data: {},
        loading: false,
      },
      submit: {
        loading: false,
        success: false,
      },
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockStore = configureStore();
  const store = mockStore(initialState);

  it("Edit Employee page title should be 'Edit Employee'", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <EditForm />
      </Provider>
    );

    const title = getByRole("heading", { name: "Edit Employee" });
    expect(title).toBeTruthy();
  });

  it("All the edit form elements should be in the Edit Employee page", () => {
    const { getByRole, getByLabelText } = render(
      <Provider store={store}>
        <EditForm />
      </Provider>
    );

    const firstNameInput = getByRole("textbox", { name: "First Name" });
    const lastNameInput = getByRole("textbox", { name: "Last Name" });
    const emailInput = getByRole("textbox", { name: "Email" });
    const phoneNumberInput = getByRole("textbox", { name: "Phone" });
    const genderSelect = getByLabelText("Gender");
    const addBtn = getByRole("button", { name: "Save" });

    expect(firstNameInput).toBeTruthy();
    expect(lastNameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(phoneNumberInput).toBeTruthy();
    expect(genderSelect).toBeTruthy();
    expect(addBtn).toBeTruthy();
  });

  it("Form's submit button label should be 'Save'", () => {
    const { container } = render(
      <Provider store={store}>
        <EditForm />
      </Provider>
    );

    const submitButton = container.querySelector("#employee-form-submit-btn");
    expect(submitButton).toHaveTextContent("Save");
  });
});
