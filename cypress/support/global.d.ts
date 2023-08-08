import { getByTestId } from './commands/getByTestId';
import { login } from './commands/login';
import { selectDropdownValue } from "./commands/selectDropdownValue";

declare global {
    namespace Cypress {
        interface Chainable {
            /**
            * Login via API.
            */
            login: typeof login;

            /**
             * Yields elements with a data-testid attribute that match a specified selector.
             */
            getByTestId: typeof getByTestId;

            /**
             * Allwos to select value in dropdown menu
             * 
             * @example
             * cy.selectDropdownValue(this.elements.unitFilterInput(), "1cm");
             */
            selectDropdownValue: typeof selectDropdownValue;
        }
    }
}