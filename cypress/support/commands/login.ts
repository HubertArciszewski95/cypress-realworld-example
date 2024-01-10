export const login = ((email: string, password: string) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/users/login`,
        body: {
            user: {
                email,
                password
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
});

Cypress.Commands.add('login', login);
