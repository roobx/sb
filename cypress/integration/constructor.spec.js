/*
  По cypress дается довольно мало теории и нет практики в тренажере, поэтому 
  студенты не все смогут протестировать нормально, если сами не пойдут изучать документацию
  Поэтому требуем по минимуму и в замечаниях "можно лучше" пытаемся дополнить 
  знания студнта. 
  Что по заданию нужно протестировать: 
  - перетаскивания ингредиента (из списка ингредиентов в конструктор) - обязательно
  - работу модальных окон на странице «Конструктор» 
    - модальное окно ингредиента (открытие/закрытие) - обязательно
    - модальное окно оформления заказа - в можно лучше, т.к. для 
      этого обязательно нужно мокать, что не рассказывается в теории
  - создания заказа
    - это и есть по сути тестирование окна оформления заказа - в можно лучше
 */

describe("drags ingredients to constructor works correctly", function () {
  beforeEach(function () {
    /*
      В можно лучше: лучше тестировать приложение не на боевом сервере,
      а либо поднять тестовый сервер отдельно (что в нашей ситуации не представляется
      возможным) или мокать запросы. При этом cypress будет перехватывать
      запросы и возращать результаты с данными из файлов из папки fixtures
      Т.к. иначе мы тестируем не только фронтенд, а и бэкенд. Так же изменения данных
      на бэке могут сломать тесты (например если изменятся ингредиенты) или мы можем 
      там сломать что нибудь ненужными запрсоами

      Пример мока запросов:
      beforeEach(function () {
        cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
      }
      где ingredients.json - файл в папке fixtures содержащий данные ингредиентов

      Подробнее о fixtures можно прочитать в документации
      https://docs.cypress.io/api/commands/fixture
     */
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    cy.viewport(1300, 800);
    cy.visit("http://localhost:3000");
  });

  /* тут два теста - перетаскивание булок и перетаскивание ингредиента,
     студенту достаточно написать хотя бы один */
  it("should drag bun", function () {
    cy.get("[data-cy=ingredients]")
      .contains("Ингредиент 1")
      .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop");
    cy.get("[data-cy=constructor-bun-1]")
      .contains("Ингредиент 1")
      .should("exist");
    cy.get("[data-cy=constructor-bun-2]")
      .contains("Ингредиент 1")
      .should("exist");
  });

  it("should drag ingredient", function () {
    cy.get("[data-cy=ingredients]")
      .contains("Ингредиент 3")
      .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop");
    cy.get("[data-cy=ingredients]")
      .contains("Ингредиент 4")
      .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop");
    cy.get("[data-cy=constructor-ingredients]")
      .contains("Ингредиент 3")
      .should("exist");
    cy.get("[data-cy=constructor-ingredients]")
      .contains("Ингредиент 4")
      .should("exist");
  });
});

/* тестируем открытие модального окна ингредиента, закрытие по кнопке и закрытие
   по клику на оверлей (по оверлею в "Можно лучше") */
describe("ingredient modal works correctly", function () {
  beforeEach(function () {
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    cy.viewport(1300, 800);
    cy.visit("http://localhost:3000");
  });

  it("should work open modal", function () {
    cy.contains("Детали ингредиента").should("not.exist");
    cy.contains("Ингредиент 1").click();
    cy.contains("Детали ингредиента").should("exist");
    cy.get("#modals").contains("Ингредиент 1").should("exist");
  });

  it("should work close modal on button click", function () {
    cy.contains("Ингредиент 1").click();
    cy.contains("Детали ингредиента").should("exist");
    cy.get('#modals button[aria-label="закрыть"]').click();
    cy.contains("Детали ингредиента").should("not.exist");
  });

  it("should work close modal on overlay click", function () {
    cy.contains("Ингредиент 1").click();
    cy.contains("Детали ингредиента").should("exist");
    cy.get("[data-cy=modal-overlay]").click("left", { force: true });
    cy.contains("Детали ингредиента").should("not.exist");
  });
});

//тестирование оформления заказа - в "Можно лучше"
describe("order modal works correctly", function () {
  beforeEach(function () {
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "post_order.json" }).as(
      "postOrder"
    );

    /* подставляем моковые токены, иначе не авторизированному 
    пользователю не даст заказать бургер */
    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    cy.setCookie('accessToken', 'test-accessToken')
    cy.viewport(1300, 800);
    cy.visit("http://localhost:3000");
  });

  afterEach(function () {
     cy.clearLocalStorage();
     cy.clearCookies();
  })

  it("should order burger work", function () {
    //собираем бургер
    cy.get("[data-cy=ingredients]")
      .contains("Ингредиент 1")
      .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop");
    cy.get("[data-cy=ingredients]")
      .contains("Ингредиент 3")
      .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop");
    cy.get("[data-cy=ingredients]")
      .contains("Ингредиент 4")
      .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop");
    cy.get("[data-cy=order-summ] button").click();

    /* такая проверка не обязательна, но можно показать в можно лучше как сделать 
       проверку того, что в запросе отправляется именно то, что нужно */
    cy.wait("@postOrder")
      .its("request.body")
      .should("deep.equal", {
        ingredients: ["1", "3", "4", "1"],
      });

    //проверяем, что модальное окно показало номер заказа
    cy.get("[data-cy=order-number]").contains("123456").should("exist");

    //закрываем окно и проверяем, что закрылось
    cy.get('#modals button[aria-label="закрыть"]').click();
    cy.get("[data-cy=order-number]").should("not.exist");

    //можно дополнительно проверить, что конструктор очистился
    cy.get("[data-cy=constructor]")
      .contains("Ингредиент 1")
      .should("not.exist");
    cy.get("[data-cy=constructor]")
      .contains("Ингредиент 3")
      .should("not.exist");
    cy.get("[data-cy=constructor]")
      .contains("Ингредиент 4")
      .should("not.exist");
  });
});

/* 
    Альтернатива подстановке моковых токенов в хранилище - пройти авторизацию
    но это не лучший путь, т.к. тогда помимо тестирования конструктора мы тестируем
    дополнительно весь процесс авторизации.
    Пример авторизации:

    //в beforeEach мокаем запрос авторизации:
    cy.intercept("POST", "api/auth/login", { fixture: "login.json" }).as(
      "postLogin"
    );

    //в тесте переходим на страницу авторизации и входим
    cy.get("[data-cy=profile-link]").click();
    cy.get("form input[type=email]").type("test@mail.com");
    cy.get("form input[type=password]").type("12345678");
    cy.get("form button").click();

    cy.wait("@postLogin").its("request.body").should("deep.equal", {
      email: "test@mail.com",
      password: "12345678",
    });

    //возвращаемся на главную 
    cy.get("[data-cy=mainpage-link]").click();
*/

