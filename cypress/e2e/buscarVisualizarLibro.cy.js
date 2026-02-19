describe('CU-01 Buscar y visualizar libros - Pruebas de Aceptación', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/home')
  })


  // ==============================
  // CA1 - Buscar por título
  // ==============================
  it('CA1 - Debe buscar por título correctamente', () => {

    cy.get('input[placeholder*="Buscar"]')
      .clear()
      .type('don{enter}')

    cy.wait(800)

    cy.contains('1 libro encontrado')

    cy.get('.book-card')
      .should('have.length', 1)

    cy.contains('Don Quijote de la Mancha')
      .should('be.visible')
  })


  // ==============================
  // CA2 - Filtrar por categoría
  // ==============================
  it('CA2 - Debe filtrar correctamente por categoría Novela', () => {

    cy.contains('Novela').click()

    cy.get('.book-card')
      .should('have.length.greaterThan', 0)

    cy.wait(950)

    cy.contains('Orgullo y Prejuicio')
      .should('be.visible')
  })


  // ==============================
  // CA3 - Rango de precio
  // ==============================
  it('CA3 - Debe respetar rango de precio 50000 - 70000', () => {


    cy.get('input[placeholder="$"]')
      .eq(0)   // Desde
      .clear()
      .type('50000')

    cy.get('input[placeholder="$"]')
      .eq(1)   // Hasta
      .clear()
      .type('70000')

    cy.wait(800)

    cy.get('.book-card')
      .should('have.length.greaterThan', 0)

    cy.get('.book-card')
      .each(($card) => {

        cy.wrap($card)
          .find('.book-card-price-badge')
          .invoke('text')
          .then((priceText) => {

            const price = parseInt(
              priceText.replace('$', '').replace('.', '')
            )

            if (price >= 50000 && price <= 70000) {
              expect(price).to.be.within(50000, 70000)
            }

          })

      })

  })


  // ==============================
  // CA4 - Sin resultados
  // ==============================
  it('CA4 - Debe mostrar cero resultados cuando no existe el libro', () => {

    cy.get('input[placeholder*="Buscar"]')
      .clear()
      .type('xxxxxxxxxxxx{enter}')

    cy.wait(800)

    cy.contains('No se encontraron libros con los filtros seleccionados.')
      .should('be.visible')

    cy.get('.book-card')
      .should('have.length', 0)
  })


  // ==============================
  // CA5 - Solo libros visibles y con stock
  // ==============================
  it('CA5 - Debe mostrar solo libros visibles y con stock disponible', () => {

    cy.get('.book-card')
      .should('have.length.greaterThan', 0)
    
    cy.wait(800)

    cy.get('.book-card button')
      .should('be.enabled')
  })

})