import user from '../../fixtures/user-existing.json';

export const login = () => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/users/login`,
        body: {
            user: {
                email: user.email,
                password: user.password
            }
        }
    }).then((response) => {
        const { email, username, bio, image, token } = response.body.user;

        const loggedUser = {
            headers: {
                Authorization: `Token ${token}`,
            },
            isAuth: true,
            loggedUser: {
                email,
                username,
                bio,
                image,
                token,
            },
        };

        window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    });
}

Cypress.Commands.add('login', login);
