import { commonElements } from "../../page-object/components/common-elements";

export const selectDropdownValue = (
    InputElement: Cypress.Chainable<JQuery<HTMLElement>>,
    dropdownValue: string
): void => {
    InputElement.click();
    commonElements.dropdownMenuItem(dropdownValue).click()
}

Cypress.Commands.add("selectDropdownValue", selectDropdownValue);