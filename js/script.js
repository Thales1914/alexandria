/* ===============================
   DADOS FAKE DOS LIVROS
================================ */
const livros = {
  "dom-casmurro": {
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    meta: "Publicado em 1899 • Romance Clássico",
    capa: "assets/img/dom-casmurro.jpg",
    sinopse: "A história de Bento Santiago e seu amor por Capitu, narrada com dúvidas e ciúmes.",
    rating: "⭐⭐⭐⭐⭐ (4.8)"
  },
  "pequeno-principe": {
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    meta: "Publicado em 1943 • Infantojuvenil",
    capa: "assets/img/pequeno-principe.jpg",
    sinopse: "Uma fábula poética sobre amizade, amor e responsabilidade, contada por um pequeno príncipe.",
    rating: "⭐⭐⭐⭐⭐ (4.9)"
  },
  "revolucao-bichos": {
    titulo: "A Revolução dos Bichos",
    autor: "George Orwell",
    meta: "Publicado em 1945 • Sátira política",
    capa: "assets/img/revolucao-bichos.jpg",
    sinopse: "Uma fábula satírica em que animais de uma fazenda tomam o poder, refletindo sobre regimes autoritários.",
    rating: "⭐⭐⭐⭐ (4.6)"
  },
  "senhor-aneis": {
    titulo: "O Senhor dos Anéis: A Sociedade do Anel",
    autor: "J.R.R. Tolkien",
    meta: "Publicado em 1954 • Fantasia",
    capa: "assets/img/senhor-aneis.jpg",
    sinopse: "Frodo e seus companheiros partem em uma jornada épica para destruir o Um Anel.",
    rating: "⭐⭐⭐⭐⭐ (4.9)"
  },
  "hobbit": {
    titulo: "O Hobbit",
    autor: "J.R.R. Tolkien",
    meta: "Publicado em 1937 • Fantasia",
    capa: "assets/img/hobbit.jpg",
    sinopse: "A jornada de Bilbo Bolseiro ao lado de anões em busca de um tesouro guardado por um dragão.",
    rating: "⭐⭐⭐⭐ (4.7)"
  },
  "orgulho-preconceito": {
    titulo: "Orgulho e Preconceito",
    autor: "Jane Austen",
    meta: "Publicado em 1813 • Romance",
    capa: "assets/img/orgulho-preconceito.jpg",
    sinopse: "A clássica história de Elizabeth Bennet e o orgulhoso Sr. Darcy.",
    rating: "⭐⭐⭐⭐⭐ (4.8)"
  },
  "cem-anos": {
    titulo: "Cem Anos de Solidão",
    autor: "Gabriel García Márquez",
    meta: "Publicado em 1967 • Realismo Mágico",
    capa: "assets/img/cem-anos.jpg",
    sinopse: "A saga da família Buendía na cidade fictícia de Macondo.",
    rating: "⭐⭐⭐⭐⭐ (4.9)"
  },
  "metamorfose": {
    titulo: "A Metamorfose",
    autor: "Franz Kafka",
    meta: "Publicado em 1915 • Novela",
    capa: "assets/img/metamorfose.jpg",
    sinopse: "Gregor Samsa acorda transformado em um inseto gigante, explorando alienação e identidade.",
    rating: "⭐⭐⭐⭐ (4.6)"
  }
};

/* ===============================
   LOGIN / CADASTRO
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const authForms = document.querySelectorAll(".auth-card form");
  authForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Pegando valores pelos IDs
      const nome = document.getElementById("nome")?.value;
      const username = document.getElementById("username")?.value;
      const bio = document.getElementById("bio")?.value || "";
      const foto = document.getElementById("foto")?.value || "assets/img/user-default.png";
      const email = document.getElementById("email")?.value;
      const senha = document.getElementById("senha")?.value;

      if (form.closest("body").querySelector("h1").innerText.includes("Entrar")) {
        // LOGIN
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.email === email && user.senha === senha) {
          alert(`✅ Bem-vindo de volta, ${user.nome}!`);
          sessionStorage.setItem("loggedUser", JSON.stringify(user));
          window.location.href = "./perfil.html";
        } else {
          alert("❌ Usuário ou senha inválidos.");
        }
      } else {
        // CADASTRO
        const novoUsuario = { 
          nome, 
          username, 
          bio, 
          foto, 
          email, 
          senha, 
          listas: { lidos: [], queroLer: [], lendo: [], favoritos: [] }, 
          resenhas: [] 
        };
        localStorage.setItem("user", JSON.stringify(novoUsuario));
        alert("✅ Conta criada com sucesso!");
        window.location.href = "./login.html";
      }
    });
  });

  /* ===============================
     LIVRO.HTML DINÂMICO
  =============================== */
  const params = new URLSearchParams(window.location.search);
  const livroId = params.get("livro");

  if (livroId && livros[livroId]) {
    const livro = livros[livroId];
    const cover = document.getElementById("book-cover");
    if (cover) {
      cover.src = livro.capa;
      document.getElementById("book-title").innerText = livro.titulo;
      document.getElementById("book-author").innerText = "por " + livro.autor;
      document.getElementById("book-meta").innerText = livro.meta;
      document.getElementById("book-synopsis").innerText = livro.sinopse;
      document.getElementById("book-rating").innerText = livro.rating;
    }
  }

  /* ===============================
     ADICIONAR LIVROS À LISTAS
  =============================== */
  const bookActions = document.querySelectorAll(".book-actions button");
  bookActions.forEach(btn => {
    btn.addEventListener("click", () => {
      const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
      if (!loggedUser) {
        alert("⚠️ Você precisa estar logado para usar esta função.");
        window.location.href = "./login.html";
        return;
      }

      const livro = document.getElementById("book-title")?.innerText || "Livro";

      if (btn.innerText.includes("Quero Ler")) {
        loggedUser.listas.queroLer.push(livro);
      } else if (btn.innerText.includes("Adicionar à Lista")) {
        loggedUser.listas.lendo.push(livro);
      } else {
        loggedUser.listas.lidos.push(livro);
      }

      sessionStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      localStorage.setItem("user", JSON.stringify(loggedUser));
      alert(`📚 O livro "${livro}" foi adicionado com sucesso!`);
    });
  });

  /* ===============================
     AVALIAÇÃO / RESENHA
  =============================== */
  const reviewForm = document.querySelector("#review-form");
  if (reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = JSON.parse(sessionStorage.getItem("loggedUser"));
      if (!user) {
        alert("⚠️ Faça login para escrever uma resenha.");
        window.location.href = "./login.html";
        return;
      }

      const nota = reviewForm.querySelector("select").value;
      const texto = reviewForm.querySelector("textarea").value;

      const newReview = {
        livro: document.getElementById("book-title").innerText,
        nota,
        texto
      };
      user.resenhas.push(newReview);

      sessionStorage.setItem("loggedUser", JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));

      const reviews = document.querySelector(".book-reviews");
      const newReviewDiv = document.createElement("div");
      newReviewDiv.classList.add("review-card");
      newReviewDiv.innerHTML = `<strong>${user.nome}</strong> ${"⭐".repeat(nota)}<p>${texto}</p>`;
      reviews.appendChild(newReviewDiv);

      reviewForm.reset();
      alert("✅ Resenha adicionada com sucesso!");
    });
  }

  /* ===============================
     PERFIL DINÂMICO
  =============================== */
  if (window.location.pathname.includes("perfil.html")) {
    const user = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (user) {
      document.getElementById("profile-name").innerText = user.nome;
      document.getElementById("profile-username").innerText = user.username;
      document.getElementById("profile-bio").innerText = user.bio;
      document.getElementById("profile-pic").src = user.foto;

      document.getElementById("stat-lidos").innerText = user.listas.lidos.length;
      document.getElementById("stat-quero").innerText = user.listas.queroLer.length;
      document.getElementById("stat-lendo").innerText = user.listas.lendo.length;
      document.getElementById("stat-fav").innerText = user.listas.favoritos.length;

      // Render listas
      const renderList = (id, lista) => {
        const container = document.getElementById(id);
        container.innerHTML = "";
        lista.forEach(livro => {
          const div = document.createElement("div");
          div.classList.add("list-card");
          div.innerText = livro;
          container.appendChild(div);
        });
      };
      renderList("lista-lidos", user.listas.lidos);
      renderList("lista-quero", user.listas.queroLer);
      renderList("lista-lendo", user.listas.lendo);
      renderList("lista-fav", user.listas.favoritos);

      // Render resenhas
      const reviewsContainer = document.getElementById("resenhas-list");
      if (reviewsContainer) {
        reviewsContainer.innerHTML = "";
        user.resenhas.forEach(r => {
          const div = document.createElement("div");
          div.classList.add("review-card");
          div.innerHTML = `<strong>${r.livro}</strong> ${"⭐".repeat(r.nota)}<p>${r.texto}</p>`;
          reviewsContainer.appendChild(div);
        });
      }
    }
  }

  /* ===============================
     FEED DA COMUNIDADE (simples)
  =============================== */
  const feed = document.querySelector(".feed-container");
  if (feed) {
    const user = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (user) {
      const novaAtividade = document.createElement("div");
      novaAtividade.classList.add("post-card");
      novaAtividade.innerHTML = `
        <div class="post-header">
          <img src="${user.foto}" class="profile-pic" alt="perfil">
          <div><strong>${user.nome}</strong> entrou no Alexandria 🎉</div>
        </div>
      `;
      feed.prepend(novaAtividade);
    }
  }

  /* ===============================
     FILTROS EXPLORAR (SIMULAÇÃO)
  =============================== */
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      alert(`Filtro aplicado: ${btn.innerText}`);
    });
  });
});
