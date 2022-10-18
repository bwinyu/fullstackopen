describe('Blog App', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'root',
      username: 'root',
      password: 'sekret',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('h2').contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#loginSubmit').click()
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('wrongpassword')
      cy.get('#loginSubmit').click()

      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'sekret' })
    })

    it('A blog can be created', function () {
      cy.contains('new note').click()
      cy.get('[name="blogTitle"]').type('test blog')
      cy.get('[name="blogAuthor"]').type('test author')
      cy.get('[name="blogUrl"]').type('test url')
      cy.get('#newBlogSubmit').click()

      cy.contains('test blog')
    })

    describe('After blog creatd', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'test blog',
          author: 'test author',
          url: 'test url',
        })
      })

      it('A blog can be liked', function () {
        cy.contains('test blog test author').as('blog')
        cy.get('@blog').contains('view').click()
        cy.get('@blog').contains('like').click()
        cy.get('@blog').contains('likes 1')
      })

      it('A blog can be deleted', function () {
        cy.contains('test blog test author').as('blog')
        cy.get('@blog').contains('view').click()
        cy.get('@blog').contains('remove').click()
      })
    })

    it('Blogs are sorted by likes', function () {
      cy.createBlog({
        title: 'test blog 1',
        author: 'test author',
        url: 'test url',
      })
      cy.createBlog({
        title: 'test blog 2',
        author: 'test author',
        url: 'test url',
      })
      cy.createBlog({
        title: 'test blog 3',
        author: 'test author',
        url: 'test url',
      })

      cy.contains('test blog 2 test author').as('blog')
      cy.get('@blog').contains('view').click()
      cy.get('@blog').contains('like').click()
      cy.get('@blog').contains('like').click()
      cy.get('@blog').contains('like').click()

      cy.contains('test blog 3 test author').as('blog')
      cy.get('@blog').contains('view').click()
      cy.get('@blog').contains('like').click()
      cy.get('@blog').contains('like').click()

      cy.visit('http://localhost:3000')
      cy.get('.blog-post').eq(0).contains('test blog 2')
      cy.get('.blog-post').eq(1).contains('test blog 3')
      cy.get('.blog-post').eq(2).contains('test blog 1')
    })
  })
})
