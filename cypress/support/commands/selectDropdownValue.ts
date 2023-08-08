import { sharedElements } from "../../page-object/components/shared-elements";


export const selectDropdownValue = (
    InputElement: Cypress.Chainable<JQuery<HTMLElement>>,
    dropdownValue: string
): void => {
    InputElement.click();
    sharedElements.dropdownMenuItem(dropdownValue).click()
}

Cypress.Commands.add("selectDropdownValue", selectDropdownValue);