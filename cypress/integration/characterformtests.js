describe("login page",() => {
    it("can be navigated to", () => {
        cy.visit("localhost:3000/login")
    });
    it("can accept e-mail address", () => {
        cy.get('#email')
            .type('nathangropp@gmail.com')
            .should('have.value', 'nathangropp@gmail.com')
    })
    it('can accept password', () => {
        cy.get('#password')
            .type('Covenant1')
            .should('have.value', "Covenant1")
    })
    it("can log in", () => {
        cy.get('button').click()
        cy.url()
        .should('include', '/userlanding')
    } )
})

describe("landing page",() => {
    it("can navigate", () => {
        cy.get('#newcharacter').click()
        cy.url()
        .should('include', '/newcharacter')
    })
    it('can accept character name', () =>{
        cy.get('#name')
        .type('Darius Grouch III')
        .should('have.value', 'Darius Grouch III')
    })
    it('can accept character gender', () =>{
        cy.get('#gender')
        .type('male')
        .should('have.value', 'male')
    })
    it('can accept character race', () => {
        cy.get('#race')
        .type('human')
        .should('have.value', 'human')
    })
    it('can accept character occupation', () =>{
        cy.get('#occupation')
        .type('crime lord')
        .should('have.value', 'crime lord')
    })
    it('can accept character skills', () =>{
        cy.get('#skills')
        .type('crime, wild allegory')
        .should('have.value', 'crime, wild allegory')
    })
    it('can accept character age', () =>{
        cy.get('#age')
        .type('52')
        .should('have.value', '52')
    })
    it('can create character', () =>{
        cy.get('#submit').click()
        cy.url()
        .should('include', '/CharacterList')